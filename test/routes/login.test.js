const sinon = require('sinon');
const request = require('supertest');
const assert = require('assert');
const { createHash } = require('node:crypto');
const app = require('../../app');
const Agent = require('../../server/models/agent');

afterEach(() => {
    sinon.restore();
});

describe('POST /login', () => {
    it('should return 400 if username is missing', async () => {
        const expected = 400;
        const actual = await request(app)
            .post('/login')
            .send({ password: 'test' })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 400 if password is missing', async () => {
        const expected = 400;
        const actual = await request(app)
            .post('/login')
            .send({ username: 'test' })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 400 if username is empty', async () => {
        const expected = 400;
        const actual = await request(app)
            .post('/login')
            .send({ username: '', password: 'test' })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 400 if password is empty', async () => {
        const expected = 400;
        const actual = await request(app)
            .post('/login')
            .send({ username: 'test', password: '' })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 401 if agent does not exist', async () => {
        sinon.stub(Agent, 'findOne').resolves(null);

        const expected = 401;
        const actual = await request(app)
            .post('/login')
            .send({ username: 'test', password: 'test' })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 401 if password is incorrect', async () => {
        sinon.stub(Agent, 'findOne').resolves({
            username: 'test',
            password: 'invalid',
        });

        const expected = 401;
        const actual = await request(app)
            .post('/login')
            .send({ username: 'test', password: 'test' })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 200 if agent exists and password is correct', async () => {
        sinon.stub(Agent, 'findOne').resolves({
            username: 'test',
            password: createHash('sha256').update('test').digest('hex'),
        });

        const expectedStatus = 200;
        const expectedToken = 'string';
        const actual = await request(app)
            .post('/login')
            .send({ username: 'test', password: 'test' });

        assert.strictEqual(actual.statusCode, expectedStatus);
        assert.strictEqual(typeof actual.body.token, expectedToken);
    });
});