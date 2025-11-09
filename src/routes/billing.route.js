const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billing.controller');
const validate = require('../middleware/validate');
const { createBillingSchema } = require('../schemas/billingSchema');

router.post('/', validate(createBillingSchema), billingController.createBilling);
router.get('/', billingController.listBillings);
router.get('/:id', billingController.getBilling);
router.put('/:id',validate(createBillingSchema), billingController.updateBilling);
router.delete('/:id', billingController.deleteBilling);

module.exports = router;
