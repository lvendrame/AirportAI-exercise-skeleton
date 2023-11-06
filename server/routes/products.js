const express = require('express');
const { body, query, param, validationResult } = require('express-validator');
const router = express.Router();
const Product = require('../models/product');
const { logError } = require('../utils/logger');

router.get('/', async (_, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        logError(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/',
    body('type').isString().notEmpty(),
    body('brand').isString().notEmpty(),
    body('color').isString().notEmpty(),
    body('description').isString().notEmpty(),
    body('lostTime').isISO8601().notEmpty(),
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const product = new Product(req.body);
        product.registeredBy = req.agent.id;
        try {
            await product.save();
            res.json(product);
        } catch (error) {
            logError(error);
            res.status(500).json({ message: 'Server error' });
        }
    });

router.delete('/:id',
    param('id').isMongoId(),
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const docs = await Product.findByIdAndDelete(req.params.id);
            if (!docs) {
                return res.status(404).json({ message: 'Product was not found' });
            }
            res.json({ message: 'Deleted successfully.' });
        } catch (error) {
            logError(error);
            return res.status(500).json({ message: 'Server error' });
        }
    });

router.get('/search',
    query('keywords').isString().optional(),
    query('lostTime').isISO8601().optional(),
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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

module.exports = router;
