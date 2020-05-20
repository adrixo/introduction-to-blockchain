<template>
    <div class="transaction">
        <v-container id="title" grid-list-xl>
            <h1> Carteras </h1>
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

                    <v-col class="field" cols="10">
                    </v-col>

                    <v-col class="field" cols="2">
                        <v-btn
                                id="mainDialogOKButtom"
                                class="futura"
                                color="rgb(26, 164, 182)"
                                @click="getWallets()"
                                :disabled="ip == null || ip.length == 0 ||
                                        puerto == null || puerto.length == 0"
                                left>
                            Solicitar
                        </v-btn>
                    </v-col>

                    <v-col class="field" cols="12">
                        <v-card>
                            <v-card-title id="tableTitle">
                                Carteras
                            </v-card-title>

                            <v-data-table
                                    :headers="headers"
                                    :items="wallets"
                                    :items-per-page="5"
                                    class="elevation-1"
                            >
                            </v-data-table>

                        </v-card>
                        
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
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                {
                    text: 'Saldo',
                    align: 'right',
                    value: 'amount'
                    }
            ],
            wallets:[] 
        }
    },
    methods: {
        getWallets() {
            axios.get('http://'+this.ip+':'+this.puerto+'/getWallets')
                .then((response) => {
                    // handle success
                    console.log(response);
                    this.wallets = response.data.wallets;
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
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

#tableTitle {
    text-align:center;
    font-family:"Futur";
    color: rgb(13, 72, 80);
}

.field {
    padding: 10px 3%;
}


</style>
