const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    type: String,
    brand: String,
    color: String,
    description: String,
    lostTime: Date,
    registeredBy: mongoose.Schema.Types.ObjectId, // Agent's ID
});

module.exports = mongoose.model('Product', productSchema);
