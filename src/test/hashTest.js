var crypto = require('crypto');

var hash = crypto.createHash("sha256")
  .update("We are the hash! We are the children!")
  .digest("hex");

console.log(hash)

var hmac = crypto.createHmac("sha256", "password")
  .update("prove it!")
  .digest("hex");

console.log(hmac)
