/**
 * This module will generate a public and private keypair and save to current directory
 *
 * Make sure to save the private key elsewhere after generated!
 */
require('dotenv').config({ silent: true });
require(`../src/globals`);

const crypto = require('crypto');
const { exit } = require('process');
const { OAuthClient } = require('../src/database/models');
const { encrypt } = require('../src/middleware/encryption');

const genKeyPair = async () => {
  try {
    // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
    const keyPair = await crypto.generateKeyPairSync('ed25519', {
      modulusLength: 256, // bits - standard for ed25519 keys
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    // Get all password keys from database
    const oldKeys = await OAuthClient.findAll({
      where: {
        type: 'password',
      },
    });

    // Revoke all old keys
    if (oldKeys && process.env.NODE_ENV === 'production') {
      log.warn('Revoking all old keys');
      await oldKeys.forEach(key => {
        key.revoked = true;
        key.save();
      });
    }

    if (process.env.NODE_ENV !== 'production') {
      log.warn('Only one key pair is generated in development mode');
      exit();
    }

    // TODO - revoke all user access tokens for each user

    log.warn('Generating new key pair');
    // Save the private key to the database
    await OAuthClient.create({
      name: 'password grant client',
      secret: encrypt(keyPair.privateKey),
      type: 'password',
      public: false,
      revoked: false,
    });

    // Save the public key to the database
    await OAuthClient.create({
      name: 'password grant client',
      secret: encrypt(keyPair.publicKey),
      type: 'password',
      public: true,
      revoked: false,
    });

    exit();
  } catch (err) {
    log.error('Error generating key pair: ', err);
  }
};

// Generate the keypair
genKeyPair();
