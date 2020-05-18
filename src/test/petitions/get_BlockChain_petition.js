#!/usr/bin/node

var axios = require('axios');
var Block = require('../../models/Block');
var BlockChain = require('../../models/BlockChain');
var Transaction = require('../../models/Transaction');
var Pool = require('../../models/Pool');
var CryptoModule = require('../../models/CryptoModule');

console.log("Getting BlockChain... ")
let blockChain;
try {
  axios.get('http://localhost:8005/getBlockChain')
    .then(function (response) {
      let newBlockChain = response.data;
      blockChain = new BlockChain(blockChain=newBlockChain);
      console.log(blockChain.getBlockChainInfo());
    })
    .catch(function (error) {
      console.log(error);
    });
} catch (err) {
  console.log(err);
}
