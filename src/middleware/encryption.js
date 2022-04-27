const AesEncryption = require('aes-encryption');
const aes = new AesEncryption();

aes.setSecretKey(process.env.ENCRYPTION_SECRET);
module.exports = {
  encrypt(input) {
    return aes.encrypt(input);
  },
  decrypt(input) {
    return aes.decrypt(input);
  },
};
