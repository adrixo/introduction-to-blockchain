var crypto = require('crypto');

class CryptoModule {

  static generatePair (passphrase="", modulusLength=2048) {
    var { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
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
    });
    return {"publicKey": publicKey, "privateKey": privateKey}
  }


// Genera par claves pública y privada de forma asíncrona
// TODO: Ver que sucede con las firmas
  static generatePairAsync (passphrase="", modulusLength=2048) {
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
      }, (err, publicKey, privateKey) => {
        if (err) {
          console.log(err);
          reject(err)
        } else {
          resolve( {"publicKey": publicKey, "privateKey": privateKey});
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
    privateKey = privateKey.toString('ascii');

    let sign = crypto.createSign('RSA-SHA256');
    sign.update(input, 'ascii');
    sign.end();

    let signature = sign.sign(privateKey, 'hex');

    return signature;
  }

// Valida la firma
  static validateSign (publicKey, input) {
    publicKey = publicKey.toString('ascii');

    let verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(input, 'ascii');

    let publicKeyBuf = new Buffer(publicKey, 'ascii')
    let inputBuf = new Buffer(input, 'hex')
    let result = verifier.verify(publicKeyBuf, inputBuf);

    return result;
  }
}

module.exports = CryptoModule;
