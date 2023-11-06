const assert = require('assert');
const { createHash } = require('node:crypto');
const {
    getAuthSecretKey,
    getPasswordHash,
    comparePasswordHash,
} = require('../../server/utils/auth');

describe('getAuthSecretKey', () => {
    it('should return process.env.AUTH_SECRET_KEY if defined', () => {
        const expected = 'secret';
        process.env.AUTH_SECRET_KEY = expected;
        const actual = getAuthSecretKey();
        assert.strictEqual(actual, expected);
    });

    it('should return default value if process.env.AUTH_SECRET_KEY is not defined', () => {
        const expected = 'AIRPORT_SECRET_KEY_A1B2C3';
        delete process.env.AUTH_SECRET_KEY;
        const actual = getAuthSecretKey();
        assert.strictEqual(actual, expected);
    });
});

describe('getPasswordHash', () => {
    it('should return a hash of the password', () => {
        const word = 'password';
        const expected = createHash('sha256').update(word).digest('hex');
        const actual = getPasswordHash(word);
        assert.strictEqual(actual, expected);
    });
});

describe('comparePasswordHash', () => {
    it('should return true if the password matches the hash', () => {
        const password = 'password';
        const hash = getPasswordHash(password);
        const actual = comparePasswordHash(password, hash);
        assert.strictEqual(actual, true);
    });

    it('should return false if the password does not match the hash', () => {
        const password = 'password';
        const hash = getPasswordHash('wrong password');
        const actual = comparePasswordHash(password, hash);
        assert.strictEqual(actual, false);
    });
});

