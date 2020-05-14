
class Block {

/* Variables */
  var hash;
  var previousHash;
  var timestamp;
  var nonce;
  var merkleRoot;

/* Métodos */
  Block () {
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
