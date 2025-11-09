const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  paid: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Billing', billingSchema);
