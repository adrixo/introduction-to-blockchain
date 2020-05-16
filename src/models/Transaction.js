'use strict';

var CryptoModule = require('./CryptoModule');

class Transaction {

/* Variables*/


/* Métodos */
/* Constructor
* - Clave pública del emisor para validar la firma
* - Clave publica del destinatario
* - Fondos a transferir
* - Firma digital
* - Timestamp
*/
  constructor (senderPublicKey, receiverPublicKey, amount, strTransaction="") {
    /*
    * Construye la transacción a partir de una string
    */
    if (strTransaction != "") {
      let json = JSON.parse(strTransaction);
      this.senderPublicKey = json.senderPublicKey;
      this.receiverPublicKey = json.receiverPublicKey;
      this.amount = json.amount;
      this.digitalSign = json.digitalSign;
      this.timestamp = json.timestamp;
      this.hash = json.hash;
    } else {
      this.senderPublicKey = senderPublicKey;
      this.receiverPublicKey = receiverPublicKey;
      this.amount = amount;
      this.digitalSign = "";
      this.timestamp = "";
      this.hash = "";
    }
  }

/*
* Devuelve toda la información relevan te a ser firmada en forma de string
*/
  transactionToString_toSign() {
    return ""
     + this.senderPublicKey + ","
     + this.receiverPublicKey + ","
     + this.timestamp + ","
     + this.amount + ","
  }

/*
* Devuelve toda la información relevante para obtener el hash
*/
  transactionToString_toHash() {
    return ""
     + this.senderPublicKey + ","
     + this.receiverPublicKey + ","
     + this.digitalSign + ","
     + this.timestamp + ","
     + this.amount;
  }

  stringify() {
    return JSON.stringify(this);
    /*
    return ""
     + this.senderPublicKey + ","
     + this.receiverPublicKey + ","
     + this.digitalSign + ","
     + this.timestamp + ","
     + this.amount + ","
     + this.hash;
     */
  }

/*
* Firma la transacción, generando la firma digital y el hash
*/
  sign (senderPrivateKey) {
    this.timestamp = Date.now();

    let toSign = this.transactionToString_toSign();
    this.digitalSign = CryptoModule.sign(senderPrivateKey, toSign);

    let toHash = this.transactionToString_toHash();
    this.hash = CryptoModule.getHash(toHash);
  }

/*
* Valida que la transacción es correcta
*/
  validate() {

    if ( !CryptoModule.validateSign(this.senderPublicKey, this.digitalSign) )
      return false;

    let toHash = this.transactionToString_toHash();
    let lastHash = CryptoModule.getHash(toHash);
    if (this.hash != lastHash)
      return false;

    return true;
  }

/* Getter y setter*/

//1. senderPublicKey
  getSenderPublicKey() {
    return this.senderPublicKey;
  }

  setSenderPublicKey(senderPublicKey) {
    this.senderPublicKey = senderPublicKey;
  }

//2. receiverPublicKey
  getReceiverPublicKey() {
    return this.receiverPublicKey;
  }

  setReceiverPublicKey(receiverPublicKey) {
    this.receiverPublicKey = receiverPublicKey;
  }

//3. digitalSign
  getDigitalSign() {
    return this.digitalSign;
  }

  setDigitalSign(digitalSign) {
    this.digitalSign = digitalSign;
  }

//4. timestamp
  getTimestamp() {
    return this.timestamp;
  }

  setTimestamp(timestamp) {
    this.timestamp = timestamp;
  }

//5. amount
  getAmount() {
    return this.amount;
  }

  setAmount(amount) {
    this.amount = amount;
  }

//6. Hash
  getHash() {
    return this.hash;
  }

  setHash(hash) {
    this.hash = hash;
  }

}

module.exports = Transaction;
