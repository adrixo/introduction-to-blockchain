'use strict';

class BlockChain {

/* Métodos */
  constructor (blockChain=[]) {
    this.blockChain = blockChain;
  }

  validateBlockchain(depth=0){
    if (this.blockChain.length == 0) {
      console.log("INTENTANDO VALIDAR CADENA VACÍA!")
      return true;
    }

    var operativeBlockchain;
    if (depth != 0) {
      operativeBlockchain = this.blockChain.splice(this.blockChain.length - depth, this.blockChain.length);
    } else {
      operativeBlockchain = this.blockChain; // esta copia quizas consume recursos innecesarios, lo mas eficaz me parece duplicar el siguiente código
    }

    previousHash = operativeBlockchain[0].getPreviousHash();
    this.blockChain.forEach((block, i) => {
      currentPreviousHash = block.getPreviousHash();
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

//1. hash
  getBlockChain() {
    return this.blockChain;
  }

  setBlockChain(hash) {
    this.blockChain = blockChain;
  }
}

module.exports = BlockChain;
