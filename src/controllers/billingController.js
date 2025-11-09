const Billing = require('../models/billingModel');

exports.createBilling = async (req, res) => {
  const data = req.body;
  const created = await Billing.create(data);
  res.status(201).json(created);
};

exports.listBillings = async (req, res) => {
  const items = await Billing.find().sort({ createdAt: -1 }).limit(100);
  res.json(items);
};

exports.getBilling = async (req, res) => {
  const doc = await Billing.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
};

exports.updateBilling = async (req, res) => {
  const doc = await Billing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
};

exports.deleteBilling = async (req, res) => {
  const doc = await Billing.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
};
