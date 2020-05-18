#!/usr/bin/node

var axios = require('axios');
var Block = require('../../models/Block');
var Transaction = require('../../models/Transaction');
var CryptoModule = require('../../models/CryptoModule');

// Peticion simple
/*
axios.get('http://localhost:8005/block')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
*/

var client1Key = CryptoModule.generatePair();
var client1Amount = 10;
var client2Key = CryptoModule.generatePair();
var client2Amount = 5;

var tr1 = new Transaction(client1Key.publicKey, client2Key.publicKey, client1Amount);
var tr2 = new Transaction(client2Key.publicKey, client1Key.publicKey, client2Amount);
var transactions = [tr1, tr2]

var customBlock = new Block("genesis", 2, transactions);

var jsonBlock = customBlock.getJSON();

axios.post('http://localhost:8005/getBlockChain', jsonBlock)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
