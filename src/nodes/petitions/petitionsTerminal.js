#!/usr/bin/node
const readline = require('readline');
const Petitions = require('./Petitions');


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
