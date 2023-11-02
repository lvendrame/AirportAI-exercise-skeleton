const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    name: String,
});

module.exports = mongoose.model('Agent', agentSchema);
