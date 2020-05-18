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
  var tr2 = new Transaction(client2Key.publicKey, client1Key.publicKey, client2Amount);
  var transactions = [tr1, tr2]

  return transactions;
}

var workingPort = 8005;

/**********************************************************************************/
/********************************Terminal *****************************************/
/**********************************************************************************/
const terminalText = ">> "
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

//Simple interactive terminal
async function openInteractiveTerminal() {
  while(true) {
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

        case "getNodes":
        case "gn":
          let auxNodes = await Petitions.getNodes(8006);
          console.log(auxNodes.data);
          console.log("hey");
          break;

        case "addUserTransaction":
        case "at":
          let randomTransactions = newRandomTransactions();
          Petitions.addUserTransaction(workingPort, randomTransactions[0]);

          break;
        default:
          log("Invalid command");
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
