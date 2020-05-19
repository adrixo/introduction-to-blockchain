'use strict';
var CryptoModule = require('./CryptoModule');

class WalletRegister {

/* Métodos */
  constructor (publicKey, amount, jsonWalletRegister="") {

    if (jsonWalletRegister != "") {
      let json = jsonWalletRegister;
      this.id = json.id;
      this.amount = json.amount;
    } else {
      this.id = CryptoModule.getHash(publicKey);
      this.amount = amount;
    }
  }

  stringify() {
    return JSON.stringify(this);
  }

  getJSON() {
    let jsonWalletRegister = {
      "id": this.id,
      "amount": this.amount
    }
    return jsonWalletRegister;
  }

  isRegisterOf(publicKey) {
    let publicKeyHash = CryptoModule.getHash(publicKey);

    if (publicKeyHash == this.id)
      return true;

    return false;
  }

  canExtract(amount) {
    let result = this.amount - amount;
    if (result < 0) {
      return false;
    }

    return true;
  }

  add(amount) {
    this.amount += amount
  }

  extract(amount) {
    this.amount -= amount
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getAmount() {
    return this.amount;
  }

  setAmount(amount) {
    this.amount = amount;
  }
}

module.exports = WalletRegister;
