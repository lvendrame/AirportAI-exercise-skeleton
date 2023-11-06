const sinon = require('sinon');
const request = require('supertest');
const assert = require('assert');
const { createHash } = require('node:crypto');
const app = require('../../app');
const Agent = require('../../server/models/agent');
const Product = require('../../server/models/product');

afterEach(() => {
    sinon.restore();
});

async function getToken() {
    sinon.stub(Agent, 'findOne').resolves({
        username: 'test',
        password: createHash('sha256').update('test').digest('hex'),
    });

    const req = await request(app)
        .post('/login')
        .send({ username: 'test', password: 'test' });

    return req.body.token;
}

describe('GET /products', () => {
    it('should return 200 if agent is logged in', async () => {
        sinon.stub(Product, 'find').resolves([{ id: 1 }, { id: 2 }]);

        const token = await getToken();

        const expected = 200;
        const actual = await request(app)
            .get('/products')
            .set('Authorization', `Bearer ${token}`)
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 401 if agent is not logged in', async () => {
        const expected = 401;
        const actual = await request(app)
            .get('/products')
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });
});


describe('POST /products', () => {
    it('should return 200 if agent is logged in', async () => {
        sinon.stub(Product.prototype, 'save').resolves({});

        const token = await getToken();

        const expected = 200;
        const actual = await request(app)
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                type: 'test',
                brand: 'test',
                color: 'test',
                description: 'test',
                lostTime: new Date(),
            })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 401 if agent is not logged in', async () => {
        const expected = 401;
        const actual = await request(app)
            .post('/products')
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 400 if type is missing', async () => {
        const token = await getToken();

        const expected = 400;
        const actual = await request(app)
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                brand: 'test',
                color: 'test',
                description: 'test',
                lostTime: new Date(),
            })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 400 if brand is missing', async () => {
        const token = await getToken();

        const expected = 400;
        const actual = await request(app)
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                type: 'test',
                color: 'test',
                description: 'test',
                lostTime: new Date(),
            })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 400 if color is missing', async () => {
        const token = await getToken();

        const expected = 400;
        const actual = await request(app)
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                type: 'test',
                brand: 'test',
                description: 'test',
                lostTime: new Date(),
            })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 400 if description is missing', async () => {
        const token = await getToken();

        const expected = 400;
        const actual = await request(app)
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                type: 'test',
                brand: 'test',
                color: 'test',
                lostTime: new Date(),
            })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 400 if lostTime is missing', async () => {
        const token = await getToken();

        const expected = 400;
        const actual = await request(app)
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                type: 'test',
                brand: 'test',
                color: 'test',
                description: 'test',
            })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 400 if type is empty', async () => {
        const token = await getToken();

        const expected = 400;
        const actual = await request(app)
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                type: '',
                brand: 'test',
                color: 'test',
                description: 'test',
                lostTime: new Date(),
            })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 400 if brand is empty', async () => {
        const token = await getToken();

        const expected = 400;
        const actual = await request(app)
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                type: 'test',
                brand: '',
                color: 'test',
                description: 'test',
                lostTime: new Date(),
            })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 400 if color is empty', async () => {
        const token = await getToken();

        const expected = 400;
        const actual = await request(app)
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                type: 'test',
                brand: 'test',
                color: '',
                description: 'test',
                lostTime: new Date(),
            })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 400 if description is empty', async () => {
        const token = await getToken();

        const expected = 400;
        const actual = await request(app)
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                type: 'test',
                brand: 'test',
                color: 'test',
                description: '',
                lostTime: new Date(),
            })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 400 if lostTime is empty', async () => {
        const token = await getToken();

        const expected = 400;
        const actual = await request(app)
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                type: 'test',
                brand: 'test',
                color: 'test',
                description: 'test',
                lostTime: '',
            })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 500 if server error occurs', async () => {
        sinon.stub(Product.prototype, 'save').throws();

        const token = await getToken();

        const expected = 500;
        const actual = await request(app)
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                type: 'test',
                brand: 'test',
                color: 'test',
                description: 'test',
                lostTime: new Date(),
            })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });
});

describe('DELETE /products/:id', () => {
    it('should return 200 if agent is logged in', async () => {
        sinon.stub(Product, 'findByIdAndDelete').resolves({});

        const token = await getToken();

        const expected = 200;
        const actual = await request(app)
            .delete('/products/65491ac2a99a0cfee398bd5c')
            .set('Authorization', `Bearer ${token}`)
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 401 if agent is not logged in', async () => {
        const expected = 401;
        const actual = await request(app)
            .delete('/products/65491ac2a99a0cfee398bd5c')
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 400 if id is not a valid Mongo ID', async () => {
        const token = await getToken();

        const expected = 400;
        const actual = await request(app)
            .delete('/products/invalid')
            .set('Authorization', `Bearer ${token}`)
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 404 if product was not found', async () => {
        sinon.stub(Product, 'findByIdAndDelete').resolves(null);

        const token = await getToken();

        const expected = 404;
        const actual = await request(app)
            .delete('/products/65491ac2a99a0cfee398bd5c')
            .set('Authorization', `Bearer ${token}`)
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 500 if server error occurs', async () => {
        sinon.stub(Product, 'findByIdAndDelete').throws();

        const token = await getToken();

        const expected = 500;
        const actual = await request(app)
            .delete('/products/65491ac2a99a0cfee398bd5c')
            .set('Authorization', `Bearer ${token}`)
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });
});

/*
router.get('/search',
    query('keywords').isString().optional(),
    query('lostTime').isISO8601().optional(),
    async (req, res) => {
        const { keywords, lostTime } = req.query;
        const searchParams = {};

        if (keywords) {
            const keywordArr = keywords.split(' ');
            searchParams['$or'] = keywordArr.map(keyword => ({ description: new RegExp(keyword, 'i') }));
        }

        if (lostTime) {
            searchParams.lostTime = new Date(lostTime);
        }

        try {
            const products = await Product.find(searchParams);
            res.json(products);
        } catch (error) {
            logError(error);
            res.status(500).json({ message: 'Server error' });
        }
    });
 */
describe('GET /products/search', () => {
    it('should return 401 if agent is not logged in', async () => {
        const expected = 401;
        const actual = await request(app)
            .get('/products/search')
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 400 if lostTime is not a valid ISO 8601 date', async () => {
        const token = await getToken();

        const expected = 400;
        const actual = await request(app)
            .get('/products/search')
            .set('Authorization', `Bearer ${token}`)
            .query({ lostTime: 'invalid' })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 500 if server error occurs', async () => {
        sinon.stub(Product, 'find').throws();

        const token = await getToken();

        const expected = 500;
        const actual = await request(app)
            .get('/products/search')
            .set('Authorization', `Bearer ${token}`)
            .query({ keywords: 'test' })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 200 if no query parameters are provided', async () => {
        sinon.stub(Product, 'find').resolves([]);

        const token = await getToken();

        const expected = 200;
        const actual = await request(app)
            .get('/products/search')
            .set('Authorization', `Bearer ${token}`)
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 200 if keywords is empty and lostTime is missing', async () => {
        sinon.stub(Product, 'find').resolves([]);

        const token = await getToken();

        const expected = 200;
        const actual = await request(app)
            .get('/products/search')
            .set('Authorization', `Bearer ${token}`)
            .query({ keywords: '' })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 200 if keywords is empty and lostTime is a valid ISO 8601 date', async () => {
        sinon.stub(Product, 'find').resolves([]);

        const token = await getToken();

        const expected = 200;
        const actual = await request(app)
            .get('/products/search')
            .set('Authorization', `Bearer ${token}`)
            .query({ keywords: '', lostTime: new Date().toISOString() })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 200 if keywords is a string and lostTime is missing', async () => {
        sinon.stub(Product, 'find').resolves([]);

        const token = await getToken();

        const expected = 200;
        const actual = await request(app)
            .get('/products/search')
            .set('Authorization', `Bearer ${token}`)
            .query({ keywords: 'test' })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });

    it('should return 200 if keywords is a string and lostTime is a valid ISO 8601 date', async () => {
        sinon.stub(Product, 'find').resolves([]);

        const token = await getToken();

        const expected = 200;
        const actual = await request(app)
            .get('/products/search')
            .set('Authorization', `Bearer ${token}`)
            .query({ keywords: 'test', lostTime: new Date().toISOString() })
            .then((res) => res.statusCode);
        assert.strictEqual(actual, expected);
    });
});