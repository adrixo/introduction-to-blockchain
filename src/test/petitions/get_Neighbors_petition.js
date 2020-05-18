#!/usr/bin/node

var axios = require('axios');

console.log("Getting nodes... ")
let pool;
let nodes;
try {
  axios.get('http://localhost:8005/getNodes')
    .then(function (response) {
      let nodesJson = response.data;
      console.log(nodesJson);
    })
    .catch(function (error) {
      console.log(error);
    });
} catch (err) {
  console.log(err);
}
