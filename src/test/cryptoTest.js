#!/usr/bin/node

var CryptoModule = require('../models/CryptoModule');


console.log("CryptoTest")

async function cryptoTest () {
  console.log("Generando par de claves...");
  pair = await CryptoModule.generatePair();
  console.log("Par generado");

  fraseImportante = "Esta frase es muy importante.";
  console.log("\nFirmando: ", fraseImportante);
  signature = CryptoModule.sign(pair.privateKey, fraseImportante);
  console.log("Firma: ", signature)

  console.log("Validando...");
  result = CryptoModule.validateSign(pair.publicKey, signature);
  console.log("Es correcta: ", result);

  console.log("\nObteniendo hash de la firma...");
  hash = CryptoModule.getHash(signature);
  console.log(hash)
}

cryptoTest()
