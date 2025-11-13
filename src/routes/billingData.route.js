const  express = require('express');
const routerbillingdata = express.Router();
const billingController = require('../controllers/billingController');
const validate = require('../middleware/validate');

routerbillingdata.post('/', billingController.createBillingData);
routerbillingdata.get('/', billingController.listBillingData);
routerbillingdata.get('/:billingId', billingController.getBillingDataByParentId);
routerbillingdata.put('/:id', billingController.updateBillingData);
routerbillingdata.delete('/:id', billingController.deleteBillingData);

module.exports = routerbillingdata;