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
                                v-model="ip"
                                label="IP"
                                clearable>
                        </v-text-field>
                    </v-col>
                    <v-col class="field" cols="6">
                        <v-text-field
                                v-model="puerto"
                                label="puerto"
                                clearable>
                        </v-text-field>
                    </v-col>
                
                
                    <v-col class="field" cols="6">
                        <v-text-field
                                v-model="claveEmisor"
                                label="Clave pública emisor"
                                clearable>
                        </v-text-field>
                    </v-col>
                    <v-col class="field" cols="6">
                        <v-text-field
                                v-model="claveDestinatario"
                                label="Clave pública destinatario"
                                clearable>
                        </v-text-field>
                    </v-col>
                    <v-col class="field" cols="6">
                        <v-text-field
                                v-model="dinero"
                                label="Dinero"
                                clearable>
                        </v-text-field>
                    </v-col>
                    <v-col class="field" cols="6">
                        <v-btn
                                id="mainDialogOKButtom"
                                class="futura"

                                color="rgb(26, 164, 182)"
                                @click="sendTransaction()"
                                :disabled="ip == null || ip.length == 0 ||
                                        puerto == null || puerto.length == 0 ||
                                        claveEmisor == null || claveEmisor.length == 0 ||
                                        claveDestinatario == null || claveDestinatario.length == 0 ||
                                        dinero == null || dinero.length == 0 ||
                                        parseFloat(dinero) <= 0"
                                left>
                            EMITIR
                        </v-btn>
                    </v-col>
                </v-row>
                
            </v-layout>
        </v-container>
    </div>
</template>


<script>

import axios from 'axios';


export default {


    data() {
        return {
            ip: null,
            puerto: null,
            claveEmisor: null,
            claveDestinatario: null,
            dinero: null
        }
    },
    methods: {
        sendTransaction() {
            let jsonTransaction = {
                "senderPublicKey": this.claveEmisor,
                "receiverPublicKey": this.claveDestinatario,
                "amount": this.dinero,
                "digitalSign": "",
                "timestamp": "",
                "hash": ""
            }
            
            console.log('http://'+this.ip+':'+this.puerto+'/addTransaction');
            axios.post('http://'+this.ip+':'+this.puerto+'/addUserTransaction', jsonTransaction)
                .then(function (response) {
                    // handle success
                    console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
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
    padding: 2% 0;
    font-family:"Futur";
    color: rgb(13, 72, 80);
}

.field {
    padding: 20px 3%;
}


</style>
