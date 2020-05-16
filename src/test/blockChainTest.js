#!/usr/bin/node
var Block = require('../models/Block');
var BlockChain = require('../models/BlockChain');
var Transaction = require('../models/Transaction');
var CryptoModule = require('../models/CryptoModule');

console.log("Iniciando test blockchain: ");

var blockChain = new BlockChain();
console.log(blockChain.getBlockChainInfo())

console.log("Validando blockchain vacía: " + blockChain.validateBlockchain())


// datos para poder usar transacciones, bloques...
var client1Key = CryptoModule.generatePair();
var client1Amount = 10;
var client2Key = CryptoModule.generatePair();
var client2Amount = 5;

var tr1 = new Transaction(client1Key.publicKey, client2Key.publicKey, client1Amount);
var tr2 = new Transaction(client2Key.publicKey, client1Key.publicKey, client2Amount);
var transactions = [tr1, tr2]

//
//
//
//

console.log("\nGenerando bloque genesis...");
var genesis = new Block("genesis", 2, ["a", "b", "c"]);
blockChain.addBlock(genesis)
console.log(blockChain.getBlockChainInfo())
console.log("Validando blockchain solo con génesis: " + blockChain.validateBlockchain())

console.log("\nGenerando segundo bloque...");
let lastBlock = blockChain.getLastBlock();
if (lastBlock == null) {
  console.log("No se ha podido obtener el último bloque o la cadena está vacía")
} else {
  var block2 = new Block(lastBlock.getHash(), 2, transactions);
  blockChain.addBlock(block2)
}
console.log(blockChain.getBlockChainInfo())
console.log("Validando blockchain: " + blockChain.validateBlockchain())
