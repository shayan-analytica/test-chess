const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['active', 'inactive'], required: true },
    features: { type: [String], required: true }
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
