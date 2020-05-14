
class Transaction {

/* Variables*/
  var senderPublicKey;
  var receiverPublicKey;
  var digitalSign;
  var timestamp;
  var amount;
  var hash;

/* Métodos */
  Transaction () {
  }

/* Getter y setter*/

//1. senderPublicKey
  getSenderPublicKey() {
    return this.senderPublicKey;
  }

  setSenderPublicKey(senderPublicKey) {
    this.senderPublicKey = senderPublicKey;
  }

//2. receiverPublicKey
  getReceiverPublicKey() {
    return this.receiverPublicKey;
  }

  setReceiverPublicKey(receiverPublicKey) {
    this.receiverPublicKey = receiverPublicKey;
  }

//3. digitalSign
  getDigitalSign() {
    return this.digitalSign;
  }

  setDigitalSign(digitalSign) {
    this.digitalSign = digitalSign;
  }

//4. timestamp
  getTimestamp() {
    return this.timestamp;
  }

  setTimestamp(timestamp) {
    this.timestamp = timestamp;
  }

//5. amount
  getAmount() {
    return this.amount;
  }

  setAmount(amount) {
    this.amount = amount;
  }

//6. Hash
  getHash() {
    return this.hash;
  }

  setHash(hash) {
    this.hash = hash;
  }

}

module.exports = Transaction;
