#!/usr/bin/node
var CryptoModule = require('../models/CryptoModule');
const fs = require('fs');

class Setup {

  static generateUsersJson () {
    console.log("[Setup] Creating users keys file: ");

    var k1 = CryptoModule.generatePair();
    var k2 = CryptoModule.generatePair();
    var k3 = CryptoModule.generatePair();

    var keys = [k1, k2, k3]
    var keysJson = {keys: keys}

    let data = JSON.stringify(keysJson, null, 2);
    const keysFile ='./users.json';
    try {
      keysJson = require(keysFile);
      console.log("Loadding users keys")
    } catch(error) {
      console.log("Creating users keys")
      fs.writeFile(keysFile, data, 'utf8', function(err) {
        if (err) {
            console.log('[setupConfig] Error writting file ' + err);
        }
      });
    }

    return keysJson;
  }
}

module.exports = Setup;
