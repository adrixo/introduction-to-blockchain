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
