#!/usr/bin/node
var CryptoModule = require('../models/CryptoModule');

console.log("Iniciando test merkle: ");

function getMerkleRoot(transactions, level) {
  // console.log("level=1", level, transactions)
  if (transactions.length == 1){
    console.log("hashing level=", level, transactions)
    return CryptoModule.getHash(transactions[0]);
  }

  leftTransactions = []
  rightTransactions = []
  transactions.forEach((tr, i) => {
    //console.log(i, (transactions.length)/2, tr)
    if ( i < (transactions.length)/2 )
      leftTransactions.push(tr)
    else
      rightTransactions.push(tr)
  });
  console.log(leftTransactions)
  console.log(rightTransactions)

  let leftSonHash = getMerkleRoot(leftTransactions, level+1);

  let rightSonHash = getMerkleRoot(rightTransactions, level+1);
  return CryptoModule.getHash(leftSonHash + rightSonHash);
}

// mr = getMerkleRoot(['a','b','c'], 0)
mr = getMerkleRoot(['a','b','c','d','e'], 0)

console.log(mr)
