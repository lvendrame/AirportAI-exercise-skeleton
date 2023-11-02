const { createHash } = require('node:crypto');

function getAuthSecretKey() {
    return process.env.AUTH_SECRET_KEY || 'AIRPORT_SECRET_KEY_A1B2C3';
}

function getPasswordHash(password) {
    const hash = createHash('sha256');

    hash.update(password);

    return hash.digest('hex');
}

function comparePasswordHash(password, hash) {
    return getPasswordHash(password) === hash;
}

module.exports = {
    getAuthSecretKey,
    getPasswordHash,
    comparePasswordHash,
};