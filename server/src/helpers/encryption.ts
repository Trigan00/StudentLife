import * as crypto from 'crypto';

class Encryption {
  encrypt(password: string, secretKey: string) {
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv(
      'aes-256-ctr',
      Buffer.from(secretKey.substring(0, 32)),
      iv,
    );

    const encryptedPassword = Buffer.concat([
      cipher.update(password),
      cipher.final(),
    ]);

    return encryptedPassword.toString('hex') + iv.toString('hex');
  }

  decrypt(
    encryption: string, //password + iv
    secretKey: string,
  ) {
    const iv = encryption.substring(encryption.length - 32);
    const password = encryption.substring(0, encryption.length - 32);
    const decipher = crypto.createDecipheriv(
      'aes-256-ctr',
      Buffer.from(secretKey.substring(0, 32)),
      Buffer.from(iv, 'hex'),
    );

    const decryptedPassword = Buffer.concat([
      decipher.update(Buffer.from(password, 'hex')),
      decipher.final(),
    ]);

    return decryptedPassword.toString('utf8');
  }
}

export default new Encryption();
