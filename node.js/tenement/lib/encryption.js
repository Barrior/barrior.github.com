const crypto = require('crypto');

const secretKey = `You don't know the key`;

const cipher = (data) => {
    const ciphter = crypto.createCipher('aes-256-cbc', secretKey);
    let secret = ciphter.update(data, 'utf8', 'hex');
    secret += ciphter.final('hex');
    return secret;
};

const decipher = (data) => {
    const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
    let raw = decipher.update(data, 'hex', 'utf8');
    raw += decipher.final('utf8');
    return raw;
};

module.exports = {cipher, decipher};