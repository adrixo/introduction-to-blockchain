#!/usr/bin/node
const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');
var Block = require('../models/Block');
var Transaction = require('../models/Transaction');
var BlockChain = require('../models/BlockChain');
var NodeModel = require('../models/NodeModel');
var Pool = require('../models/Pool');
var WalletRegister = require('../models/WalletRegister');
var CryptoModule = require('../models/CryptoModule');
var Petitions = require('./petitions/Petitions');
var AsyncLock = require('async-lock');
const Setup = require('./Setup');
var ip = require("ip");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/************************ Instanciacion *****************************/

nodeKeys = CryptoModule.generatePair();

// Indica al proceso si debe seguir minando
// Se pone a false si se añade un bloque a la cadena para que reconsidere transacciones
var mineFlag = false;
var difficulty = 4;
var blockChain = new BlockChain();
var pool = new Pool();
var nodes = [];
var wallets = [];
// Si se le pasa parámetros ipMaster:puertoMaster entiende que no es master
// Si no, entiende que es nodo master
var args = process.argv.splice(2)

var isMasterNode;
var masterNodeAddr;
var masterNodePort;
var nodeAddr = ip.address();
var nodePort;
var selfNode;

if (args.length!=3) {
  console.log("Usage: [M|S] ip:port workingPort");
  return;
} else {
  masterNodeAddr = args[1].split(':')[0];
  masterNodePort = args[1].split(':')[1];
  nodePort = args[2];

  if (args[0] == 'M'){
    if (nodeAddr != masterNodeAddr) {
      console.log("Given Master ip doesn fit!")
      return;
    }
    isMasterNode = true;
    nodePort = masterNodePort;
    console.log("Starting master node at " + masterNodeAddr +':'+ masterNodePort)

    // Adicionalmente y para este caso de estudio, se van a cargar 3 claves de un archivo
    // e instanciar sus carteras asociadas con 100 unidades
    var usersKeys = Setup.generateUsersJson().keys;

    usersKeys.forEach((uKeys, i) => {
      let newWallet = new WalletRegister(uKeys.publicKey, 100);
      wallets.push(newWallet);
    });

  } else if (args[0] == 'S'){
    isMasterNode = false;
    console.log("Starting slave node at " + nodeAddr +':'+ nodePort);
    console.log("Master node at " + masterNodeAddr +':'+ masterNodePort);
  } else {
    console.log("Invalid argument")
    return;
  }
}

/************************************************************************/
/***************************Inicializacion*******************************/
/************************************************************************/
/* IDENTIFICADOR DEL NODO
* Cada nodo se identifica por el número de puerto, empezando en el 8005
* Primero intenta conectarse a los puertos 8005-8010 pidiendo por vecinos
* Si no recibe ninguno se declara como master y se selecciona como puerto 8005
*/
async function initialiceNode() {
  console.log("[STARTUP] Searching for nodes...");
  if (isMasterNode) {
    // Si esta instancia es la del nodo maestro
    selfNode = new NodeModel(nodeAddr, nodePort);
    nodes.push(selfNode);
    // Como nodo master,  crea el bloque genesis o lo carga de base de datos/fichero
    let firstRewardTransaction = new Transaction(nodeKeys.publicKey, nodeKeys.publicKey, 100);
    firstRewardTransaction.sign(nodeKeys.privateKey);
    let genesis = new Block("genesis", 12345, [firstRewardTransaction]);
    blockChain.addBlock(genesis);
  }

  if (!isMasterNode) {
    try {
      // Si esta instancia es la de un nodo esclavo
      let getNodesResponse = await Petitions.getNodes(masterNodeAddr, masterNodePort);
      let nodesJson = getNodesResponse.data.nodes;

      nodesJson.forEach((nJson, i) => {
        let auxNode = new NodeModel(null, null, jsonNode=nJson);
        nodes.push(auxNode);
      });

      console.log("[STARTUP] My neighbor nodes are: ", nodes);

      // 1. Se pide la cadena de bloques
      let getBlockChainResponse = await Petitions.getBlockChain(masterNodeAddr, masterNodePort);
      let newBlockChain = getBlockChainResponse.data;
      blockChain = new BlockChain(jsonBlockChain=newBlockChain);

      // 2. Se pide la Pool transacciones
      let getPoolResponse = await Petitions.getPool(masterNodeAddr, masterNodePort);
      let newPool = getPoolResponse.data;
      pool = new Pool(pool=newPool);

      // 3. Se pide las carteras con las que se esta trabajando
      let getWalletsResponse = await Petitions.getWallets(masterNodeAddr, masterNodePort);
      let walletsJson = getWalletsResponse.data.wallets;
      walletsJson.forEach((w, i) => {
        let newWalletRegister = new WalletRegister(null, null, jsonWalletRegister=w);
        wallets.push(newWalletRegister);
      });

      selfNode = new NodeModel(nodeAddr, nodePort);
      let selfNodeJson = selfNode.getJSON();

      // 3. Se informa de nuevo nodo
      nodes.forEach((node, i) => {
        try {
          Petitions.addNode(node.ip, node.port, selfNodeJson);
        } catch (err) {
          console.log("[STARTUP] Nodo caido " + node.id)
        }
      });

      nodes.push(selfNode);
    } catch (err) {
      console.log(err);
    }
  }
  console.log("[STARTUP] Setup Finished");
}


function swapAmounts(transaction) {
  console.log("[Wallet] Processing transaction: " + transaction.getHash());

  // Se elimina el dinero asociado a la cartera en x cantidad
  let auxWs = new WalletRegister(transaction.getSenderPublicKey(), 0);
  let auxWr = new WalletRegister(transaction.getReceiverPublicKey(), 0);
  let auxAmount = transaction.getAmount();
  auxAmount = parseInt(auxAmount, 10);

  wallets.forEach((w, i) => {
    if (w.isRegisterOf(auxWs.getId())) {
      w.setAmount(w.getAmount()-auxAmount);
    }

    if (w.isRegisterOf(auxWr.getId())) {
      w.setAmount(w.getAmount()+auxAmount);
    }

  });

}

/************************************************************************/
/************************* BLOCKCHAIN API REST **************************/
/************************************************************************/
function initialiceRest() {
  app.listen(nodePort, () => {
   console.log("[REST] Starting express at "+nodeAddr+":"+nodePort);
  });

  /*TODO: *********Mensajes respuesta*************/
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
  app.get('/getNodes', function (req, res) {
    console.log("[REST] Sending nodes...")
    let jsonNodes = [];

    nodes.forEach((n, i) => {
      let jsonNode = n.getJSON();
      jsonNodes.push(jsonNode);
    });

    let nodesJson = {nodes: jsonNodes};
    res.send(nodesJson);
  });

  /* @post
  * Da de alta un nuevo nodo en la red
  */
  app.post('/newNode', function (req, res) {
    let newNodeJson = req.body;
    let newNode = new NodeModel(null, null, jsonNode=newNodeJson);

    let repeated = false;
    nodes.forEach((node, i) => {
      if (node.getId() == newNode.getId())
        repeated = true;
    });

    if (!repeated){
      nodes.push(newNode);
      console.log("[REST] New node at "+newNode.getIp()+':'+newNode.getPort());
    }

    res.send("Done");
  });

  /* @post
  * Da de alta un nodo
  */
  app.post('/deleteNode', function (req, res) {
    let delNodeJson = req.body;
    let delNode = new NodeModel(null, null, jsonNode=delNodeJson);

    nodes.forEach((node, i) => {
      if (node.getId() == delNode.getId()) {
        nodes.splice(i, 1);
        console.log("[REST] Node down at "+delNode.getIp()+':'+delNode.getPort());
        break
      }
    });

    res.send("Done");
  });

  /************************ Peticiones de bloque *****************************/

  /* @post
  * Recibe como parametro un bloque y lo instancia localmente como objeto block
  */
  app.get('/getBlockChain', function (req, res) {
    console.log("[REST] Sending blockChain");
    let jsonBlockChain = blockChain.getBlockChain();
    res.send(jsonBlockChain);
  });

  /* @post
  * Recibe como parametro un bloque propuesto para cadena
  *  y lo instancia localmente como objeto block
  *  - Si es un bloque válido en la cadena
  *     Deja de minar (desactivar mineFlag)
  *     Elimina las transacciones
  *     Lo añade
  */
  app.post('/addBlock', function (req, res) {
    blockJson = req.body;
    console.log("[REST] New block discover by neighbor...");
    try {
      let newBlock = new Block(null, null, null, blockJson);
      console.log("[REST] Block received-hash: " + newBlock.getHash());

      // Se comprueba si es válido y encaja en la cadena de bloques
      if (newBlock.validate()) {
        if( blockChain.validateNewBlockCongruency(newBlock) ) {
          mineFlag = false;
          // Se añade el bloque y se responde
          blockChain.addBlock(newBlock);
          // Se eliminan del pool las transacciones correspondientes al bloque
          let processedTransactions = newBlock.getTransactions();
          processedTransactions.forEach((tr, i) => {
            let deletedTransaction = new Transaction(null, null, null, jsonTransaction=tr);
            console.log("[REST] Deleting transaction: " + deletedTransaction.getHash());
            pool.deleteTransaction(deletedTransaction);
            swapAmounts(deletedTransaction);
          });


          res.send(blockAdded);

        } else {
          console.log("[REST] The new block is valid but doesn't fix in the blockchain. ")
          res.send(blockError);
        }
      } else {
        console.log("[REST] Block error");
        res.send(blockError);
      }

    } catch (err) {
      console.log("[REST] Add block error", err);
      res.send(blockError);
    }
  });

  /************************ Peticiones de transaccion *****************************/

  /* @post
  * Devuelve el pool de transacciones
  */
  app.get('/getPool', function (req, res) {
    try {
      console.log("[REST] Sending pool")
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
  app.post('/addTransaction', function (req, res) {
    try {
      console.log("[REST] Adding transaction")
      let transactionJson = req.body;
      let newTransaction = new Transaction(null, null, null, jsonTransaction=transactionJson);
      pool.addTransaction(newTransaction);
      console.log("[REST] " + pool.getPoolInfo())
      res.send("transaccion anadida");
    } catch (err) {
      console.log(err);
      res.send(error);
    }
  });

  /* @post
  * Un usuario realiza una peticion de transaccion
  */
  app.post('/addUserTransaction', function (req, res) {
    try {
      console.log("[REST] Trying to add new user transaction")
      let transactionJson = req.body;
      transactionJson.senderPublicKey = transactionJson.senderPublicKey.replace(/\\n/g, "\n");
      transactionJson.receiverPublicKey = transactionJson.receiverPublicKey.replace(/\\n/g, "\n");
      let newTransaction = new Transaction(null, null, null, jsonTransaction=transactionJson);

      let validSignature = newTransaction.validate()
      // Comprobar que tiene para sacar saldo,
      // en conjunción con otras posibles transacciones anteriores en la cadena de bloques
      let userPublicKey = newTransaction.getSenderPublicKey();
      let auxW = new WalletRegister(userPublicKey, 0);
      let auxAmount = null;

      wallets.forEach((w, i) => {
        if (w.isRegisterOf(auxW.getId())) {
          auxAmount = w.getAmount() - newTransaction.getAmount();
        }
      });

      if (!validSignature) {
        console.log("[REST] The signature is invalid. ");
        res.send({error: false, message: "La transacción no está firmada correctamente."});

      } else if (auxAmount == null) {
        console.log("[REST] The user doesnt have a wallet. ");
        res.send({error: false, message: "El usuario no tiene una cartera."});

      } else {
        let poolTransactions = pool.getPool();
        poolTransactions.forEach((tr, i) => {
          if (tr.getSenderPublicKey() == newTransaction.getSenderPublicKey()) {
            auxAmount = auxAmount - newTransaction.getAmount();
          }
        });

        // Se comprueba si se puede añadir
        if (auxAmount>=0) {
          console.log("[REST] Adding new user transaction, user amount will be " + auxAmount)

          pool.addTransaction(newTransaction);
          console.log("[REST] " + pool.getPoolInfo())

          // Ademas, se multidifunde al resto
          nodes.forEach((node, i) => {
            try {
              if (node.getId() != selfNode.getId()) {
                console.log("[REST] Sending transaction to " + node.getId());
                Petitions.addTransaction(node.getIp(), node.getPort(), newTransaction);
              }
            } catch (err) {
              console.log("[REST] Error sending Transaction to " + node.getId());
            }
          });

          res.send({error: false, message: "Transacción solicitada."});
        } else {
          console.log("[REST] Lack of amount")

          res.send({error: false, message: "El usuario no tiene suficiente dinero."});
        }
      }

    } catch (err) {
      console.log(err);
      res.send(res.send({error: true, message: error}));
    }
  });

  /* @post
  * Devuelve el pool de transacciones
  */
  app.get('/getWallets', function (req, res) {
    try {
      console.log("[REST] Sending wallets")
      let jsonWallets = { wallets: []};

      wallets.forEach((w, i) => {
        let jsonWallet = w.getJSON();
        jsonWallets.wallets.push(jsonWallet);
      });

      res.send(jsonWallets);
    } catch (err) {
      console.log(err);
      res.send(error);
    }
  });
}

/* Funcion delay simple, */
async function delay(delayInms) {
  return new Promise(resolve  => {
    setTimeout(() => {
      resolve();
    }, delayInms);
  });
}

/************************************************************************/
/*************************** Lógica del nodo ****************************/
/************************************************************************/
async function mine() {

  let attemp = 0;

  while(true) {
    await delay(1500);
    attemp += 1;

    let stringNodes = []
    nodes.forEach((n, i) => {
      stringNodes.push(n.getId())
    });

    console.log("\n[Mine] ## Mine attemp: " + attemp);
    console.log("[Mine] ESTADO CADENA DE BLOQUES: " + blockChain.getBlockChainInfo());
    console.log("[Mine] ESTADO POOL TRANSACCIONES: " + pool.getPoolInfo());
    console.log("[Mine] Nodos vecinos: ", stringNodes);
    console.log("");


    try {

      // Se seleccionan las transacciones y se intenta minar un bloque
      let rewardTransaction = new Transaction(nodeKeys.publicKey, nodeKeys.publicKey, 100);
      rewardTransaction.sign(nodeKeys.privateKey);
      let transactionsToAdd = pool.getTransactionsToMine();
      transactionsToAdd.push(rewardTransaction);

      let lastHash = blockChain.getLastHash();

      mineFlag = true; // Flag indica si otro bloque minó y tenemos que desechar este intento
      let blockAttemp; // Bloque que se intenta minar
      let triedHash = "";  // hash de blockAttemp
      let prefix = "0".repeat(difficulty);
      let startMiningTime = new Date().getTime();

      while( !triedHash.startsWith(prefix) && mineFlag) {
        await delay(1);
        let nonce = Math.ceil(Math.random() * 100000);
        blockAttemp = new Block(lastHash, nonce, transactionsToAdd);
        triedHash = blockAttemp.getHash();
      }

      // Si se encuenrta un bloque válido se promueve para añadir
      if (triedHash.startsWith(prefix) && mineFlag) {

        let endMiningTime = new Date().getTime();
        let miningCompleteMsg = ""+
          "\n[Mine] Found a valid Block! starting proof of work" +
          "\n[Mine] Time: " + (endMiningTime - startMiningTime)/1000 + "s" +
          "\n[Mine] Difficulty: " + difficulty +
          "\n[Mine] Hash: " + triedHash +
          "\n[Mine] Transactions: " + blockAttemp.getTransactions().length + "";
          console.log(miningCompleteMsg);

        result = blockChain.addBlock(blockAttemp);

        nodes.forEach((node, i) => {
          try {
            if (node.getId() != selfNode.getId()) {
              console.log("[Mine] Sending block to  " + node.getId());
              Petitions.addBlock(node.getIp(), node.getPort(), blockAttemp);
            }
          } catch (err) {
            console.log("[Mine] Error sending block to " + node.getId())
          }
        });

        // Se eliminan del pool las transacciones correspondientes al bloque
        let processedTransactions = blockAttemp.getTransactions();
        processedTransactions.forEach((tr, i) => {
          console.log("[Mine] Deleting transaction: " + tr.getHash());
          swapAmounts(tr);
          pool.deleteTransaction(tr);
        });

      } else {
        // el bloque ha sido minado por otro
        let endMiningTime = new Date().getTime();
        console.log("[Mine] Block mined by another node " +
          "\n[Mine] Time spent: " + (endMiningTime - startMiningTime)/1000 + "s")
      }

    } catch (err) {
      console.log(err);
      await delay(3000);
      continue;
    }
  }
}

async function run() {
  await initialiceNode();

  initialiceRest();
  mine();
}

run();
