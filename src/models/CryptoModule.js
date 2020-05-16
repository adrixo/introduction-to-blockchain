var crypto = require('crypto');

class CryptoModule {

// Genera par claves pública y privada
  static generatePair (passphrase="", modulusLength=512) {
    return new Promise((resolve, reject) => {
      crypto.generateKeyPair('rsa', {
        modulusLength: modulusLength,
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
      }, (err, publicKey, secretKey) => {
        if (err) {
          console.log(err);
          reject(err)
        } else {
          resolve( {"publicKey": publicKey, "privateKey": secretKey});
        }
      });
    });
  }

// Devuelve el hash correspondiente a la cadena introducida
  static getHash (string) {
    var hash = crypto.createHash("sha256")
      .update(string)
      .digest("hex");

    return hash;
  }

// Firma la cadena introducida
  static sign (privateKey, input) {
    let sign = crypto.createSign('RSA-SHA256');
    sign.update(input);
    sign.end();

    let signature = sign.sign(privateKey);

    return signature;
  }

// Valida la firma
  static validateSign (publicKey, input) {
    let verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(input, 'ascii');
    sign.end();

    let publicKeyBuf = new Buffer(publicKey, 'ascii')
    let inputBuf = new Buffer(input, 'hex')
    let result = verifier.verify(publicKeyBuf, inputBuf);

    return result;
  }
}

module.exports = CryptoModule;
