const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

router.post('/', async (req, res) => {
    const product = new Product(req.body);
    product.registeredBy = req.agent.id;

    await product.save();
    res.json(product);
});

router.delete('/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully.' });
});

router.get('/search', async (req, res) => {
    const { keywords, lostTime } = req.query;
    const searchParams = {};

    if (keywords) {
        const keywordArr = keywords.split(' ');
        searchParams['$or'] = keywordArr.map(keyword => ({ description: new RegExp(keyword, 'i') }));
    }

    if (lostTime) {
        searchParams.lostTime = new Date(lostTime);
    }

    const products = await Product.find(searchParams);
    res.json(products);
});

module.exports = router;
