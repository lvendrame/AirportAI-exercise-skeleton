const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { getAuthSecretKey, comparePasswordHash } = require('../utils/auth');
const Agent = require('../models/agent');

router.post('/',
    body('username').isString().notEmpty(),
    body('password').isString().notEmpty(),

    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            const agent = await Agent.findOne({ username });
            if (!agent) {
                return res.status(401).json({ message: 'Authentication failed' });
            }

            if (!comparePasswordHash(password, agent.password)) {
                return res.status(401).json({ message: 'Authentication failed' });
            }

            const token = jwt.sign(
                { agentId: agent.id },
                getAuthSecretKey(),
                { expiresIn: '1h' }
            );

            res.json({ token });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    });

module.exports = router;