'use strict';

var Transaction = require('./Transaction');

class Pool {

/* Variables*/


/* Métodos */
/* Constructor
*/
  constructor (pool=[]) {
    this.pool = pool;
  }

  checkTransaction(transaction) {
    if (transaction.validate())
      return false;

    this.pool.forEach((tr, i) => {
      if (transaction.getHash() == tr.getHash())
        return false;
    });

    return true;
  }

  addTransaction(transaction) {
    if (this.checkTransaction(transaction)){
      this.pool.push(transaction);
      return true;
    }

    return false;
  }

/*
*
*/
  deleteTransaction(transaction) {
    if (transaction.validate())
      return false;

    this.pool.forEach((tr, i) => {
      if (transaction.getHash() == tr.getHash())
        this.pool.splice(i, 1); // TODO: testear
        return true;
    });

    return false;
  }

  getJsonPool() {
    return {pool: this.pool}
  }

  getPoolInfo() {
    let poolInfo = "" +
      "Transactions: " + this.pool.length;
    return poolInfo;
  }

/* Getter y setter*/

//1. pool
  getPool() {
    return this.pool;
  }

  setPool(pool) {
    this.pool = pool;
  }

}

module.exports = Pool;
