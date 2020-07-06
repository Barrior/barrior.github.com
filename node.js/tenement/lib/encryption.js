const crypto = require('crypto');

const secretKey = `You don't know the secret key`;

exports.cipher = (data, key = secretKey) => {
    const ciphter = crypto.createCipher('aes-256-cbc', key);
    let secret = ciphter.update(data, 'utf8', 'hex');
    secret += ciphter.final('hex');
    return secret;
};

exports.decipher = (data, key = secretKey) => {
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let raw = decipher.update(data, 'hex', 'utf8');
    raw += decipher.final('utf8');
    return raw;
};

// 密码不可逆加密
exports.encryptPassword = (password) => {
    return crypto.createHash('sha1').update(password).digest('hex');
};