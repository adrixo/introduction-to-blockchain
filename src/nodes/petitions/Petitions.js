var axios = require('axios');

class Petitions {

  static getNodes(ip, port) {
    return axios.get('http://'+ip+':'+port+'/getNodes');
  }

  static addNode(ip, port, node) {
    axios.post('http://'+ip+':'+port+'/newNode', node);
  }

  static deleteNode(ip, port, node) {
    return true;
  }

  static getBlockChain(ip, port) {
    return axios.get('http://'+ip+':'+port+'/getBlockChain');
  }

  static addBlock(ip, port, block) {
    var jsonBlock = block.getJSON();
    return axios.post('http://'+ip+':'+port+'/addBlock', jsonBlock);
  }

  static getPool(ip, port) {
    return axios.get('http://'+ip+':'+port+'/getPool');
  }

  static addTransaction(ip, port, transaction) {
    let jsonTransaction = transaction.getJSON();
    return axios.post('http://'+ip+':'+port+'/addTransaction', jsonTransaction);
  }

  static addUserTransaction(ip, port, transaction) {
    let jsonTransaction = transaction.getJSON();
    return axios.post('http://'+ip+':'+port+'/addUserTransaction', jsonTransaction);
  }

}

module.exports = Petitions;
