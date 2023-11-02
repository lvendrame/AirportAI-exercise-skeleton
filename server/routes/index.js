/**
* App routes definitions.
*/
'use strict';

const express = require('express');
const router = express.Router();

const authorization = require('../middlewares/authorization');

const products = require('./products');
const agents = require('./agents');
const login = require('./login');

router.get('/', function (req, res) { return res.send('Hello world!'); });
router.use('/products', authorization, products);
router.use('/agents', agents);
router.use('/login', login);

module.exports = router;
