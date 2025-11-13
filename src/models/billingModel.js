const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  name: { type: String, required: true, unique : true, errorMessage: 'Name already exists' },
  email: { type: String, required: true },
  password: { type: String, required: false },
  paid: { type: Boolean, default: false },
}, { timestamps: true });

const billingData =  new mongoose.Schema({
  name : { type: String, required: true },
  amount: { type: Number, required: true },
  billingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Billing', required: true },
  date: { type: Date, default: Date.now },
});

module.exports = {
  Billing: mongoose.model('Billing', billingSchema),
  BillingData: mongoose.model('BillingData', billingData),
};
