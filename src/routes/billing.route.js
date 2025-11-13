const express = require('express');
const routerbilling = express.Router();
const billingController = require('../controllers/billing.controller');
const validate = require('../middleware/validate');

routerbilling.post('/', billingController.createBilling);
routerbilling.get('/', billingController.listBillings);
routerbilling.get('/:id', billingController.getBilling);
routerbilling.put('/:id', billingController.updateBilling);
routerbilling.delete('/:id', billingController.deleteBilling);

module.exports = routerbilling;
