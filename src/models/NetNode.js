'use strict';

class NetNode {

/* Métodos */
  constructor (previousHash, nonce, transactions, jsonBlock="") {
    /*
    * Construye el bloque a partir de una string
    */
    if (jsonBlock != "") {
      let json = jsonBlock;
      this.previousHash = json.previousHash;
      this.transactions = json.transactions;
      this.nonce = json.nonce;
      this.timestamp = json.timestamp;
      this.raizArbolMerkle = json.raizArbolMerkle;
      this.hash = json.hash;
    } else {
      this.previousHash = previousHash;
      this.transactions = transactions;
      this.nonce = nonce;
      this.timestamp = Date.now();
      this.raizArbolMerkle = this.getMerkleRoot();
      this.hash = this.calculateHash();
    }
  }
}

module.exports = NetNode;
