#!/usr/bin/node

var CryptoModule = require('../models/CryptoModule');

var crypto = require('crypto');

console.log("CryptoTest")

function cryptoTest () {
  console.log("Generando par de claves...");
  pair = CryptoModule.generatePair();
  console.log("Par generado");

  fraseImportante = "Esta frase es muy importante.";
  console.log("\nFirmando: ", fraseImportante);
  data = new Buffer(fraseImportante);
  console.log(crypto)
  signature = crypto.Sign(null, data, pair.privateKey);
  console.log("Firma: ", signature)

  console.log("Validando...");
  result = crypto.verify(null, pair.publicKey,  signature);
  console.log("Es correcta: ", result);

}


cryptoTest()
