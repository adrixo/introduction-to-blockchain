#!/usr/bin/node

const express = require("express");
const bodyParser = require('body-parser');
var Block = require('../models/Block');
var Transaction = require('../models/Transaction');
var BlockChain = require('../models/BlockChain');
var Pool = require('../models/Pool');
var CryptoModule = require('../models/CryptoModule');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/************************ Instanciacion *****************************/

var setupFinished = false;
//Indica al proceso si debe seguir minando
// Se pone a false si se añade un bloque a la cadena para que reconsidere transacciones
var mineFlag = false;
var difficulty = 3;
var blockChain = new BlockChain();
var pool = new Pool();

// Pedir nodo master o declararse como uno
// Si es nodo master crea el bloque genesis o lo carga de base de datos/fichero
let genesis = new Block("genesis", 1111, ["trGA", "trGB"]);
blockChain.addBlock(genesis);

console.log("Initialiced")

app.listen(8005, () => {
 console.log("localhost:8005");
});

/**********RESPUESTAS*************/
var notFound = {
 error: true,
 codigo: 404,
 mensaje: 'Element not found'
};

var blockAdded = {
 error: false,
 codigo: 200,
 mensaje: 'bloque añadido'
};

var blockError = {
 error: false,
 codigo: 200,
 mensaje: 'bloque incorrecto'
};

var error = {
 error: true,
 codigo: 200,
 mensaje: 'error'
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
app.get('/getBlockChain', function (req, res) {
  console.log("Sending blockChain");
  let jsonBlockChain = blockChain.getBlockChain();
  res.send(jsonBlockChain);
});

/* @post
* Recibe como parametro un bloque y lo instancia localmente como objeto block
*/
app.post('/addBlock', function (req, res) {

  blockJson = req.body;
  try {
    let newBlock = new Block(null, null, null, blockJson);
    console.log("Block received-hash: " + newBlock.getHash());

    // Se comprueba si es válido y encaja en la cadena de bloques
    if (newBlock.validate()) {
      if( blockChain.validateNewBlockCongruency(newBlock) ) {
        // Se añade el bloque y se responde
        blockChain.addBlock(newBlock);
        res.send(blockAdded);

      } else {
        console.log("The new block is valid but doesn't fix in the blockchain. ")
      }
    }
    console.log("Block error");
    res.send(blockError);

  } catch (err) {
    res.send(blockError);
  }
});

/************************ Peticiones de transaccion *****************************/

/* @post
* Devuelve el pool de transacciones
*/
app.get('/getPool', function (req, res) {
  try {
    console.log("Sending pool")
    let jsonPool = pool.getPool();
    res.send(jsonPool);
  } catch (err) {
    console.log(err);
    res.send(error);
  }
});


/* @post
* Añade una nueva transaccion
*/
app.get('/addTransaction', function (req, res) {
  try {
    console.log("Adding transaction")
    transactionJson = req.body;
    newTransaction = new Transaction(null, null, null, transactionJson);
    pool.transactionJson(newTransaction);
    res.send(jsonPool);
  } catch (err) {
    console.log(err);
    res.send(error);
  }
});

/* @post
* Elimina una transaccion
*/
app.get('/deleteTransaction', function (req, res) {
  // TODO: debe ser array transacciones
  res.send("Transaction deleted");
});


/* Funcion delay simple, */
async function delay(delayInms) {
  return new Promise(resolve  => {
    setTimeout(() => {
      resolve();
    }, delayInms);
  });
}


async function run() {

  let attemp = 0;
  // TODO: setupFinished, se espera hasta que sea falso, esto es hasta que sea master y tenga cadena, o reciba nodos vecinos y su cadenas
  while(true) {
    await delay(15000);
    attemp += 1;
    console.log("Mine attemp: " + attemp);
    console.log(blockChain.getBlockChainInfo());

    try {

      // Se seleccionan las transacciones y se intenta minar un bloque
      let transactionsToAdd = ["tr1", "tr2"]; // TODO: toma de transacciones
      let lastHash = blockChain.getLastHash();

      mineFlag = true;
      let blockAttemp;
      let triedHash = "";
      let prefix = "0".repeat(difficulty);
      while( !triedHash.startsWith(prefix) && mineFlag) {
        let nonce = Math.ceil(Math.random() * 10000);
        blockAttemp = new Block(lastHash, nonce, transactionsToAdd);
        triedHash = blockAttemp.getHash();
      }

      // Si se encuenrta un bloque válido
      if (triedHash.startsWith(prefix) && mineFlag) {
        console.log("Found a valid Block! starting proof of work")
        result = blockChain.addBlock(blockAttemp);
        console.log(result) // TODO: controlar error
        // notificamos a los demas nodos
        // lo añadimos a la cadena de bloques
        // eliminamos transacciones del pool
      }

    } catch (err) {
      console.log(err);
      await delay(3000);
      continue;
    }
  }
}

run();
