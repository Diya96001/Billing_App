const Billing = require('../models/billingModel');
const BillingData = require('../models/billingModel').BillingData;


exports.createBilling = async (req, res) => {
  const data = req.body;
  const created = await Billing.create(data);
  res.status(201).json(created);
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
    if (typeof req.next === 'function') return req.next(err);
    return res.statusx(500).json({ error: err.message || 'Internal Server Error' });
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

exports.createBillingData = async (req, res) => {
  try {
    const data = req.body;
    const created = await BillingData.create(data);
      console.log("Created Billing Data:", created);

    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', data:req.body });
  }
};

exports.listBillingData = async (req, res) => {
  try {
    const { q, sort, page = 1, limit = 50 } = req.query;
    const pageNum = Math.max(1, Number(page) || 1);
    const lim = Math.max(1, Math.min(1000, Number(limit) || 50));
    const filter = {};
    
    if (q) {
      const re = new RegExp(q, 'i');
      filter.$or = [
        { name: re },
        { amount: re }
      ];
    }

    let query = BillingData .find(filter);  
    if (sort) {
      const sortObj = {};
      sort.split(',').forEach(s => {
        if (!s) return;
        if (s.startsWith('-')) sortObj[s.slice(1)] = -1;
        else sortObj[s] = 1;
      }
      );
      query = query.sort(sortObj);
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const total = await BillingData.countDocuments(filter);
    const items = await query.skip((pageNum - 1) * lim).limit(lim).exec();
    res.json({ data: items, page: pageNum, limit: lim, total });
  } catch (err) {
    if (typeof req.next === 'function') return req.next(err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};

exports.getBillingDataByParentId = async (req, res) => {
  try {
       const doc = await BillingData.aggregate([
      { $match: { billingId } },
      {
        $project: {
          _id: 1,
          name: 1,
          amount: 1,
          date: 1
        }
      }
    ]);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  }
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateBillingData = async (req, res) => {
  try {
    const doc = await Billing
      .findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });        
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteBillingData = async (req, res) => {
  try {
    const doc = await BillingData.findByIdAndDelete(req.params.id);        
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



