'use strict';

class NodeModel {

/* Métodos */
  constructor (ip, port, jsonNode="") {
    /*
    * Construye el bloque a partir de una string
    */
    if (jsonNode != "") {
      let json = jsonNode;
      this.ip = json.ip;
      this.port = json.port;
    } else {
      this.ip = ip;
      this.port = port;
    }
  }

  stringify() {
    return JSON.stringify(this);
  }

  getJSON() {
    let jsonNode = {
      "ip": this.ip,
      "port": this.port
    }
    return jsonNode;
  }

  getIp() {
    return this.ip;
  }

  setIp(ip) {
    this.ip = ip;
  }

  getPort() {
    return this.port;
  }

  setPort(port) {
    this.port = port;
  }
}

module.exports = NodeModel;
