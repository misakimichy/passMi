import crypto from 'crypto';

const getEncryptedPrefix = () => {
  return 'enc::';
};

// Convert user's password into cryptographic key
const deriveKeyFromPassword = (password, salt, iterations) => {
  return crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha512');
};

export const encrypt = (message, password) => {
  const salt = crypto.randomBytes(64);
  // Add iterations for security
  const iterations = Math.floor(Math.random() * (99999 - 10000 + 1)) + 500;
  const KEY = deriveKeyFromPassword(password, salt, Math.floor(iterations * 0.47 + 1337));

  // Initialization Vector - 16 bytes
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv);

  // Update the cipher with data to be encrypted and close cipher
  const encryptedData = Buffer.concat([cipher.update(message, 'utf8'), cipher.final()]);

  // 16 bytes - from cipher for decryption
  const authTag = cipher.getAuthTag();
  const output = Buffer.concat([
    salt,
    iv,
    authTag,
    Buffer.from(iterations.toString()),
    encryptedData,
  ]).toString('hex');
  return getEncryptedPrefix() + output;
};

export const decrypt = (cipherText, password) => {
  const cipherTextParts = cipherText.split('enc::');
  if (cipherTextParts.length !== 2) {
    console.error(
      "Couldn't determine the beginning of the cipherText. Maybe not encrypted by this method🧐"
    );
  } else {
    cipherText = cipherTextParts[1];
  }

  const inputData = Buffer.from(cipherText, 'hex');
  // Split ciphertext into partials
  const salt = inputData.slice(0, 64);
  const iv = inputData.slice(64, 80);
  const authTag = inputData.slice(80, 96);
  const iterations = parseInt(inputData.slice(96, 101).toString('utf-8'), 10);
  const encryptedData = inputData.slice(101);

  const KEY = deriveKeyFromPassword(password, salt, Math.floor(iterations * 0.47 + 1337));
  const decipher = crypto.createDecipheriv('aes-256-gcm', KEY, iv);
  decipher.setAuthTag(authTag);
  const decrypted = decipher.update(encryptedData, 'binary', 'utf-8') + decipher.final('utf-8');
  try {
    return JSON.parse(decrypted);
  } catch (error) {
    return decrypted;
  }
};
