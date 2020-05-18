'use strict';

class NodeModel {

/* Métodos */
  constructor (ip, port, jsonNode="") {
    /*
    * Construye el nodo a partir de un json
    */
    if (jsonNode != "") {
      let json = jsonNode;
      this.ip = json.ip;
      this.port = json.port;
      this.id = "" + this.ip + ":" + this.port;
    } else {
      this.ip = ip;
      this.port = port;
      this.id = "" + this.ip + ":" + this.port;
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

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }
}

module.exports = NodeModel;
