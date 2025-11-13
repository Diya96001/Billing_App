const Billing = require('../models/billingModel');

exports.createBilling = async (req, res) => {
  try {
    const data = req.body;
    const created = await Billing.create(data);
    res.status(201).json({status: true, message: 'Billing created successfully', data});
  
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.listBillings = async (req, res) => {
  try {
    const { q, sort, page = 1, limit = 50 } = req.query;
    const pageNum = Math.max(1, Number(page) || 1);
    const lim = Math.max(1, Math.min(1000, Number(limit) || 50));
    const filter = {};

    if (q) {
      const re = new RegExp(q, 'i');
      filter.$or = [
        { name: re },
        { email: re }
      ];
    }

    let query = Billing.find(filter);

    if (sort) {
      const sortObj = {};
      sort.split(',').forEach(s => {
        if (!s) return;
        if (s.startsWith('-')) sortObj[s.slice(1)] = -1;
        else sortObj[s] = 1;
      });
      query = query.sort(sortObj);
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const total = await Billing.countDocuments(filter);
    const items = await query.skip((pageNum - 1) * lim).limit(lim).exec();
    res.json({ data: items, page: pageNum, limit: lim, total });
  } catch (err) {
    // delegate to centralized error handler if present
    if (typeof req.next === 'function') return req.next(err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
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
