#!/usr/bin/node
var WalletRegister = require('../models/WalletRegister');
var CryptoModule = require('../models/CryptoModule');

console.log("Iniciando test wallet register: ");

// 1. Claves del destinatario
emitterKeys = CryptoModule.generatePair();
receiverKeys = CryptoModule.generatePair();


wallet1 = new WalletRegister(emitterKeys.publicKey, 50);
wallet2 = new WalletRegister(receiverKeys.publicKey, 50);

wallets = [wallet1, wallet2]

console.log("Carteras: ");
console.log(wallets);

console.log("Probando búsqueda cartera existente: ");
wallets.forEach((w, i) => {
  if ( w.isRegisterOf(receiverKeys.publicKey) ) {
    console.log(w);
  }
});


console.log("Probando búsqueda cartera inexistente: ");
wallets.forEach((w, i) => {
  if ( w.isRegisterOf("HOLA HOLA SOY UNA CLAVE PUBLICA DE VERDAD") ) {
    console.log(w);
  }
});
