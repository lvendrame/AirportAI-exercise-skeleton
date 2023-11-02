const jwt = require('jsonwebtoken');
const Agent = require('../models/agent');
const { getAuthSecretKey } = require('../utils/auth');

async function authorization(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), getAuthSecretKey());
        const agent = await Agent.findById(decoded.agentId);

        if (!agent) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        req.agent = agent;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Failed to authenticate.' });
    }
}

module.exports = authorization;
