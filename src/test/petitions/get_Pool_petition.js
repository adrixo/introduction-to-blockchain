#!/usr/bin/node

var axios = require('axios');
var Block = require('../../models/Block');
var Transaction = require('../../models/Transaction');
var Pool = require('../../models/Pool');
var CryptoModule = require('../../models/CryptoModule');

console.log("Getting pool... ")
let pool;
try {
  axios.get('http://localhost:8005/getPool')
    .then(function (response) {
      let newPoolJson = response.data;
      pool = new Pool(pool=newPoolJson);
      console.log(pool.getPoolInfo());
    })
    .catch(function (error) {
      console.log(error);
    });
} catch (err) {
  console.log(err);
}
