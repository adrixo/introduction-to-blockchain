#!/usr/bin/node
var Block = require('../models/Block');
var Transaction = require('../models/Transaction');
var CryptoModule = require('../models/CryptoModule');

console.log("Iniciando test bloques: ");

client1Key = CryptoModule.generatePair();
client1Amount = 10;
client2Key = CryptoModule.generatePair();
client2Amount = 5;

var tr1 = new Transaction(client1Key.publicKey, client2Key.publicKey, client1Amount);
var tr2 = new Transaction(client2Key.publicKey, client1Key.publicKey, client2Amount);
transactions = [tr1, tr2]

console.log("Generando bloque genesis...");
customBlock = new Block("genesis", 2, transactions);

console.log("Guardando bloque como string...");
stringBlock = customBlock.stringify();

console.log("\nBloque: " + stringBlock + "\n");

console.log("\n Recuperando bloque... ")
blockCopy = new Block(null, null, null, strBlock=stringBlock);

console.log("\nBloque recuperado: " + blockCopy.stringify() + "\n")
