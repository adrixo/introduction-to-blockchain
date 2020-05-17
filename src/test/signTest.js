#!/usr/bin/node

var CryptoModule = require('../models/CryptoModule');


console.log("CryptoTest")

function cryptoTest () {
  console.log("Generando par de claves...");
  pair = CryptoModule.generatePair();
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

async function cryptoTestAsync () {
  console.log("Generando par de claves...");
  pair = await CryptoModule.generatePairAsync();
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
console.log("\n\n#################\nVersión asíncrona:\n")
cryptoTestAsync()
