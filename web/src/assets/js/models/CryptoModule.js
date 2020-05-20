var crypto = require('crypto');

export default class CryptoModule {

  static generatePair (modulusLength=2048) {
    var { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: modulusLength,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
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

      console.log("afdfaafd")
    let sign = crypto.createSign('RSA-SHA256');
    console.log("creado")
    sign.update(input, 'ascii');
    console.log("update")
    sign.end();
    console.log("end")

    console.log(input)
    console.log(privateKey)
    let signature = sign.sign(privateKey, 'hex');
console.log("firama")
    return signature;
  }

// Valida la firma
  static validateSign (publicKey, signed, plain) {
    publicKey = publicKey.toString('ascii');

    let verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(plain, 'ascii');

    let publicKeyBuf = new Buffer(publicKey, 'ascii')
    let signedBuf = new Buffer(signed, 'hex')
    let result = verifier.verify(publicKeyBuf, signedBuf);

    return result;
  }
}
