'use strict';

var CryptoModule = require('./CryptoModule');

class Block {

/* Variables */
  var hash;
  var previousHash;
  var timestamp;
  var nonce;
  var merkleRoot;

/* Métodos */
  constructor (previousHash, nonce, transactions) {
    this.previousHash = previousHash;
    this.transactions = transactions;
    this.nonce = nonce;
    this.timestamp = Date.now();
    this.raizArbolMerkle = getMerkleRoot();
    this.hash = calculateHash();
  }

/*
 * Un arbol jerárquico puede ser entendido como un heap en el que los hijos se corresponden a los padres segun
 * [1,2i,2d, 3ii,3id,3di,3dd,4iii,4iid,4idi,4idd,...]
 * y por lo tanto:
 * - padre = hijo / 2
 * -hijos = padre * 2 ó (padre*2)+1
*/
  getMerkleRoot(transactions) {
    if (transactions.length == 1)
      return CryptoModule.getHash(transactions[0]);

    leftTransactions = []
    rightTransactions = []
    transactions.forEach((tr, i) => {
      if ( i < (transactions.length)/2 )
        leftTransactions.push(tr)
      else
        rightTransactions.push(tr)
    });

    let leftSonHash = getMerkleRoot(leftTransactions);
    let rightSonHash = getMerkleRoot(rightTransactions);

    return CryptoModule.getHash(leftSonHash + rightSonHash);
  }

  calculateHash() {
    let toHash = '' +
      this.previousHash +
      this.timestamp +
      this.nonce +
      this.raizArbolMerkle;

    let hash = CryptoModule.getHash(toHash);

    return hash;
  }

/* Getter y setter*/

//1. hash
  getHash() {
    return this.hash;
  }

  setHash(hash) {
    this.hash = hash;
  }

//2. previousHash
  getPreviousHash() {
    return this.previousHash;
  }

  setPreviousHash(previousHash) {
    this.previousHash = previousHash;
  }

//3. Timestamp
  getTimestamp() {
    return this.timestamp;
  }

  setTimestamp(timestamp) {
    this.timestamp = timestamp;
  }

//4. Nonce
  getNonce() {
    return this.nonce;
  }

  setNonce(nonce) {
    this.nonce = nonce;
  }

//5. MerkleRoot
  getMerkleRoot() {
    return this.merkleRoot;
  }

  setMerkleRoot(merkleRoot) {
    this.merkleRoot = merkleRoot;
  }
}

module.exports = Block;
