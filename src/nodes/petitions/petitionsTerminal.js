#!/usr/bin/node
const readline = require('readline');
const Petitions = require('./Petitions');

var Block = require('../../models/Block');
var Transaction = require('../../models/Transaction');
var CryptoModule = require('../../models/CryptoModule');

function newRandomTransactions() {
  var client1Key = CryptoModule.generatePair();
  var client1Amount = 10;
  var client2Key = CryptoModule.generatePair();
  var client2Amount = 5;

  var tr1 = new Transaction(client1Key.publicKey, client2Key.publicKey, client1Amount);
  tr1.sign(client1Key.privateKey);
  var tr2 = new Transaction(client2Key.publicKey, client1Key.publicKey, client2Amount);
  tr2.sign(client2Key.privateKey);

  var transactions = [tr1, tr2]

  return transactions;
}

var workingIp = "localhost";
var workingPort = 8005;

/**********************************************************************************/
/********************************Terminal *****************************************/
/**********************************************************************************/
var terminalText = ">> "
function userInput() {
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
  });

  return new Promise(resolve => rl.question(terminalText, ans => {
      rl.close();
      resolve(ans);
  }));
}

var exit = false;
//Simple interactive terminal
async function openInteractiveTerminal() {
  while(!exit) {
    try {
      const userCommand = await userInput();

      switch (userCommand) {
        case "reset":
        case "r":
          break;
        case "version":
        case "v":
          break;
        case "mode":
          break;

        case "ip":
          terminalText = "Enter IP>> "
          workingIp = await userInput();
          terminalText = ">> "
          break;

        case "port":
          terminalText = "Enter Port>> "
          workingPort = await userInput();
          terminalText = ">> "
          break;

        case "getNodes":
        case "gn":
          let auxNodes = await Petitions.getNodes(workingIp, workingPort);
          console.log(auxNodes.data);
          break;

        case "addNode":
        case "an":
          terminalText = "Enter ip>> "
          nodeIp = await userInput();
          terminalText = "Enter port>> "
          nodePort = await userInput();
          let resNode = await Petitions.addNode(workingIp, workingPort, {"ip": nodeIp, "port": nodePort});
          console.log(resNode);
          break;

        case "deleteNode":
        case "dn":
          terminalText = "Enter ip>> "
          nodeIp = await userInput();
          terminalText = "Enter port>> "
          nodePort = await userInput();
          let resDel = await Petitions.deleteNode(workingIp, workingPort, {"ip": nodeIp, "port": nodePort});
          console.log(resDel);
          break;

        case "getBlockchain":
        case "gb":
          let auxBC = await Petitions.getBlockChain(workingIp, workingPort);
          console.log(auxBC.data);
          break;

        case "addBlock":
        case "ab":
          break;

        case "getPool":
        case "gp":
          let auxPool = await Petitions.getPool(workingIp, workingPort);
          console.log(auxPool.data);
          break;

        case "addTransaction":
        case "at":
          let randomTransactions = newRandomTransactions();
          Petitions.addTransaction(workingIp, workingPort, randomTransactions[0]);
          break;

        case "addUserTransaction":
        case "aut":
          let randomUserTransactions = newRandomTransactions();
          Petitions.addUserTransaction(workingIp, workingPort, randomUserTransactions[0]);
          break;

        case "exit":
          exit = true;
          break;
        default:
          console.log("Invalid command");
      }
    } catch (err) {
      console.log("ERRROR ", err);
    }
  }
}

// Classical sleep function
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

try {
  openInteractiveTerminal();
} catch (err) {
  console.log(err);
}
