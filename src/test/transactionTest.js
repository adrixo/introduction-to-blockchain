#!/usr/bin/node
var Transaction = require('../models/Transaction');
var CryptoModule = require('../models/CryptoModule');

console.log("Iniciando test transacciones: ");

// 1. Claves del destinatario
emitterKeys = CryptoModule.generatePair();
receiverKeys = CryptoModule.generatePair();

// 2. Claves del emisor
amount = 100;
console.log("Generando transacción por un valor de " + amount);
customTransaction = new Transaction(emitterKeys.publicKey, receiverKeys.publicKey, amount);

// console.log("\nTransacción: " + customTransaction.stringify() + "\n")
console.log("Firmando la transacción... ");
customTransaction.sign(emitterKeys.privateKey);

console.log("\nLa transacción es válida: " + customTransaction.validate());

console.log("\nTransacción: " + customTransaction.stringify() + "\n")

console.log("\n Guardando transacción como string... ")
stringTransaction = customTransaction.stringify();

console.log("\n Recuperando transacción... ")
secondTransaction = new Transaction(null, null, null, strTransaction=stringTransaction);

console.log("\nTransacción recuperada: " + secondTransaction.stringify() + "\n")
