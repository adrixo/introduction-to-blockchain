<template>
    <div class="transaction">
        <v-container id="title" grid-list-xl>
            <h1> Transacción </h1>
        </v-container>

        <v-container grid-list-xl text-xs-center>
            <v-layout row wrap>
                <v-row>
                    <v-col class="field" cols="6">
                        <v-text-field
                                outlined
                                v-model="ip"
                                label="IP"
                                clearable>
                        </v-text-field>
                    </v-col>

                    <v-col class="field" cols="6">
                        <v-text-field
                                outlined
                                v-model="puerto"
                                label="puerto"
                                clearable>
                        </v-text-field>
                    </v-col>

                    <v-col class="field" cols="12">
                       <v-textarea
                                outlined
                                :rows="3"
                                label="Clave pública emisor"
                                v-model="claveEmisor"
                                :value="claveEmisor"
                        ></v-textarea>
                    </v-col>

                    <v-col class="field" cols="12">
                        <v-textarea
                                outlined
                                :rows="3"
                                label="Clave privada emisor"
                                v-model="privadaEmisor"
                                :value="privadaEmisor"
                        ></v-textarea>
                    </v-col>

                    <v-col class="field" cols="12">
                        <v-textarea
                                outlined
                                :rows="3"
                                label="Clave destinatario"
                                v-model="claveDestinatario"
                                :value="claveDestinatario"
                        ></v-textarea>
                    </v-col>

                    <v-col class="field" cols="6">
                        <v-text-field
                                outlined
                                v-model="dinero"
                                label="Dinero"
                                clearable>
                        </v-text-field>
                    </v-col>

                    <v-col class="field" cols="4">
                    </v-col>

                    <v-col class="field" cols="2">
                        <v-btn
                                id="mainDialogOKButtom"
                                class="futura"
                                color="rgb(26, 164, 182)"
                                @click="sendTransaction()"
                                :disabled="ip == null || ip.length == 0 ||
                                        puerto == null || puerto.length == 0 ||
                                        claveEmisor == null || claveEmisor.length == 0 ||
                                        privadaEmisor == null || privadaEmisor.length == 0 ||
                                        claveDestinatario == null || claveDestinatario.length == 0 ||
                                        dinero == null || dinero.length == 0 ||
                                        parseFloat(dinero) <= 0 || isNaN(parseFloat(dinero))"
                                left>
                            EMITIR
                        </v-btn>
                    </v-col>
                </v-row>
            </v-layout>
        </v-container>

        <v-dialog
                v-model="showMessage"
                hide-overlay
                width="300">
            <v-card
                    color="rgb(13, 72, 80)"
                    dark>
                <v-card-text>
                    <p class="futura"> {{ messageTitle }} </p>
                    <p class="helveticaNeue"> {{  message }} </p>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>


<script>

import axios from 'axios';

import CryptoModule from '../assets/js/models/CryptoModule';


export default {
    data() {
        return {
            ip: null,
            puerto: null,
            claveEmisor: null,
            privadaEmisor: null,
            claveDestinatario: null,
            dinero: null,

            showMessage: false,
            messageTitle: null,
            message: null
        }
    },
    methods: {
        sendTransaction() {
            let timestamp = Date.now();

            let toSign = ""
                + this.claveEmisor + ","
                + this.claveDestinatario + ","
                + timestamp + ","
                + this.dinero;

            try {
                var digitalSign = CryptoModule.sign(this.privadaEmisor, toSign);

                var toHash = ""
                    + this.claveEmisor + ","
                    + this.claveDestinatario + ","
                    + digitalSign + ","
                    + timestamp + ","
                    + this.dinero;

                var hash = CryptoModule.getHash(toHash);

                var jsonTransaction = {
                    "senderPublicKey": this.claveEmisor,
                    "receiverPublicKey": this.claveDestinatario,
                    "amount": this.dinero,
                    "digitalSign": digitalSign,
                    "timestamp": timestamp,
                    "hash": hash
                }
                
            } catch (error) {
                console.log(error);
                this.messageTitle = "Error";
                this.message = "Comprueba el formato de las claves.";
                this.message += error;
                this.showMessage = true;
                return;
            }

            axios.post('http://'+this.ip+':'+this.puerto+'/addUserTransaction', jsonTransaction)
                .then((response) => {
                    // handle success
                    console.log(response);
                    if (!response.data.error) {
                        this.messageTitle = "Solicitado";
                    } else {
                        this.messageTitle = "Error";
                    }
                    
                    this.message = response.data.message;
                    this.showMessage = true;
                })
                .catch((error)  => {
                    // handle error
                    console.log(error);
                    this.messageTitle = "Error";
                    this.message = error;
                    this.showMessage = true;
                })
                .finally(() => {
                    // always executed
                });
        }
    }

}
</script>

<style>

#title {
    font-size: 1.6em;
    text-align:center;
    padding: 1% 0;
    font-family:"Futur";
    color: rgb(13, 72, 80);
}

.field {
    padding: 10px 3%;
}


</style>
