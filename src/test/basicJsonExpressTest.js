#!/usr/bin/node
const express = require("express");
const bodyParser = require('body-parser');
var Block = require('../models/Block');
var Transaction = require('../models/Transaction');
var CryptoModule = require('../models/CryptoModule');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(8005, () => {
 console.log("localhost:8005");
});

var client1Key = CryptoModule.generatePair();
var client1Amount = 10;
var client2Key = CryptoModule.generatePair();
var client2Amount = 5;

var tr1 = new Transaction(client1Key.publicKey, client2Key.publicKey, client1Amount);
var tr2 = new Transaction(client2Key.publicKey, client1Key.publicKey, client2Amount);
var transactions = [tr1, tr2]

console.log("Generando bloque genesis...");
var customBlock = new Block("genesis", 2, transactions);

var notFound = {
 error: true,
 codigo: 404,
 mensaje: 'URL no encontrada'
};

var ok = {
 error: false,
 codigo: 200,
 mensaje: 'bloque añadido'
};


app.get('/block', function(req, res) {
  console.log(req)
  try {
    block = customBlock.getJSON();
    res.send(block);
  } catch (err) {
    res.send(notFound);
  }
});


app.post('/block', function (req, res) {

  console.log(req);

  res.send(ok);
});
