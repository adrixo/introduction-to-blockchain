var crypto = require('crypto');

var passphrase = "dificileurrima";
var publicKey, privateKey;

function encrypt (publicKey, data) {
  var dataBuffer = Buffer.from(data, 'utf8');
  console.log("data: ", data)
  console.log(dataBuffer)

  var encryptedData = crypto.publicEncrypt(publicKey, dataBuffer);
  encryptedData = encryptedData.toString('base64');

  return encryptedData
}

function decrypt (privateKey, encryptedData) {
  encryptedData = Buffer.from(encryptedData, 'base64')
  const decryptedData = crypto.privateDecrypt(
    {
      key: privateKey.toString(),
      passphrase: passphrase,
    },
    encryptedData,
  )
  return decryptedData.toString('utf8')
}

crypto.generateKeyPair('rsa', {
  modulusLength: 512,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: passphrase
  }
}, (err, public, secret) => {
  // Handle errors and use the generated key pair.
  if (err) {
    console.log(err);
  } else {
    publicKey = public;
    console.log(publicKey);
    privateKey = secret;
    console.log(privateKey);

    var encryptedData = encrypt(publicKey, "Hola desencriptaditos!");
    console.log("Encrypted data: ", encryptedData)

    var decryptedData = decrypt(privateKey, encryptedData);
    console.log("DecryptedData data: ", decryptedData)
  }
});
