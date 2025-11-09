const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ status: 'ok', message: 'API root' }));

router.use('/billings', require('./billings'));

module.exports = router;
