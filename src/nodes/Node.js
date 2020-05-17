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

/**********RESPUESTAS*************/
var notFound = {
 error: true,
 codigo: 404,
 mensaje: 'Element not found'
};

var blockOK = {
 error: false,
 codigo: 200,
 mensaje: 'bloque añadido'
};

var blockError = {
 error: false,
 codigo: 200,
 mensaje: 'bloque añadido'
};


/************************ Peticiones de nodo *****************************/
/* @post
* Devuelve la lista de nodos actualmente en la red
*/
app.post('/getNodes', function (req, res) {

    res.send("here is");
});

/* @post
* Da de alta un nuevo nodo en la red
*/
app.post('/newNode', function (req, res) {
  res.send("added");
});

/* @post
* Da de alta un nodo
*/
app.post('/deleteNode', function (req, res) {
  res.send("byebye");
});

/************************ Peticiones de bloque *****************************/

/* @post
* Recibe como parametro un bloque y lo instancia localmente como objeto block
*/
app.post('/getBlockChain', function (req, res) {
  res.send("here is the blockchain");
});

/* @post
* Recibe como parametro un bloque y lo instancia localmente como objeto block
*/
app.post('/addBlock', function (req, res) {

  blockJson = req.body;
  try {
    block = new Block(null, null, null, blockJson);
    res.send(ok);
  } catch (err) {
    res.send(blockError);
  }
});

/************************ Peticiones de transaccion *****************************/

/* @post
* Devuelve el pool de transacciones
*/
app.post('/getPool', function (req, res) {
  res.send("here is the pool");
});


/* @post
* Añade una nueva transaccion
*/
app.post('/addTransaction', function (req, res) {
  res.send("thank you for the transaction");
});

/* @post
* Elimina una transaccion
*/
app.post('/deleteTransaction', function (req, res) {
  res.send("Transaction deleted");
});
