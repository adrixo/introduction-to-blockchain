var axios = require('axios');

class Petitions {

  static getNodes(port) {
    return axios.get('http://localhost:'+port+'/getNodes');
  }

  static addNode(port, node) {
    let jsonNode = {'id': node};
    axios.post('http://localhost:'+port+'/newNode', jsonNode);
  }

  static deleteNode(port, node) {
    return true;
  }

  static getBlockChain(port) {
    return axios.get('http://localhost:'+port+'/getBlockChain');
  }

  static addBlock(port, block) {
    var jsonBlock = block.getJSON();
    return axios.post('http://localhost:'+port+'/addBlock', jsonBlock);
  }

  static getPool(port) {
    return axios.get('http://localhost:'+port+'/getPool');
  }

  static addTransaction(port, transaction) {
    let jsonTransaction = transaction.getJSON();
    return axios.post('http://localhost:'+port+'/addTransaction', jsonTransaction);
  }

  static addUserTransaction(port, transaction) {
    let jsonTransaction = transaction.getJSON();
    return axios.post('http://localhost:'+port+'/addUserTransaction', jsonTransaction);
  }

}

module.exports = Petitions;
