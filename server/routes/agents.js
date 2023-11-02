const express = require('express');
const router = express.Router();
const Agent = require('../models/agent');

router.get('/', async (req, res) => {
    const agents = await Agent.find();
    res.json(agents);
});

module.exports = router;