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

var notFound = {
 error: true,
 codigo: 404,
 mensaje: 'There is no block'
};

var ok = {
 error: false,
 codigo: 200,
 mensaje: 'bloque añadido'
};

var block = undefined;

app.get('/block', function(req, res) {
  console.log(req)
  try {
    if (block == undefined) {
      res.send(notFound);
    } else {
      block = customBlock.getJSON();
      res.send(block);
    }
  } catch (err) {
    res.send(notFound);
  }
});


app.post('/block', function (req, res) {
  blockJson = req.body;
  console.log(req.client)
  block = new Block(null, null, null, blockJson);
  console.log(block.stringify())
  res.send(ok);
});
