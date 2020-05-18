#!/usr/bin/node
const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.listen(8005, () => {
 console.log("localhost:8005");
});

app.get('/', function (req, res) {

  res.send('raiz');
});

app.post('/hello', function (req, res) {
  res.send('[POST] hello');
});
app.get('/hello', function (req, res) {
  res.send('[GET] hello');
});
