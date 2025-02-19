'use strict';
var Block = require('./Block');

class BlockChain {

/* Métodos */
  constructor (jsonBlockChain="") {
    this.blockChain = [];

    if (jsonBlockChain != "") {
      jsonBlockChain.forEach((jsonBlock, i) => {
        let newBlock = new Block(null, null, null, jsonBlock);
        this.blockChain.push(newBlock);
      });

    }
  }

  getBlockChainInfo() {
    if (this.blockChain.length == 0)
      return "Just instance of void blockchain."

    var info = ""
      + "Length: " + this.blockChain.length + "";
      //+ "CreationDate: " + this.blockChain[0].getTimestamp();

    return info;
  }

  getLastBlock() {
    if (this.blockChain.length <= 0)
      return null;

    return this.blockChain[this.blockChain.length - 1];
  }

  getLastHash() {
    let lastBlock = this.getLastBlock();
    if (lastBlock != null) {
      let lastHash = lastBlock.getHash();
      return lastHash;
    }
    return "genesis";
  }

  validateNewBlockCongruency(newBlock) {
    var lastBlock = this.getLastBlock();

    if (lastBlock == null)
      return true

    var auxBlock = newBlock;
    auxBlock.setPreviousHash(lastBlock.getHash());
    if (!auxBlock.validate())
      return false;

    if ( newBlock.calculateHash() != auxBlock.getHash())
      return false;

    return true;
  }

  addBlock(newBlock) {
    if (!this.validateNewBlockCongruency(newBlock))
      return false;

    this.blockChain.push(newBlock);

    return true;
  }

  validateBlockchain(depth=0){
    if (this.blockChain.length == 0) {
      console.log("Error: INTENTANDO VALIDAR CADENA VACÍA!")
      return true;
    }

    var operativeBlockchain;
    if (depth != 0) {
      operativeBlockchain = this.blockChain.splice(this.blockChain.length - depth, this.blockChain.length);

    }  else {
      operativeBlockchain = this.blockChain; // esta copia quizas consume recursos innecesarios, lo mas eficaz me parece duplicar el siguiente código
    }

    var currentHash = operativeBlockchain[0].getPreviousHash();
    this.blockChain.forEach((block, i) => {
      var currentPreviousHash = block.getPreviousHash();
      if (currentHash == currentPreviousHash)
        currentHash = block.calculateHash()
      else{
        console.log("INVALID BLOCK AT: " + i);
        return false;
      }
    });

    return true;
  }

/* Getter y setter*/

//1. Blookchain
  getBlockChain() {
    return this.blockChain;
  }

  setBlockChain(hash) {
    this.blockChain = blockChain;
  }
}

module.exports = BlockChain;
