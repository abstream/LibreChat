const express = require('express');
const router = express.Router();
const omnexioBalanceController = require('../controllers/omnexio/OmnexioBalance');
const omnexioSubscriptionCheckoutController = require('../controllers/omnexio/OmnexioSubscriptionCheckout');
const { requireJwtAuth } = require('../middleware/');
const omnexioSubscriptionPlans = require('~/server/controllers/omnexio/omnexioSubscriptionPlans');
const omnexioSubscriptionChangeController = require('~/server/controllers/omnexio/OmnexioSubscriptionChange');

router.get('/balance', requireJwtAuth, omnexioBalanceController);
router.post('/subscriptions', requireJwtAuth, omnexioSubscriptionCheckoutController);
router.get('/subscription-plans', requireJwtAuth, omnexioSubscriptionPlans);
router.get('/subscription/change', requireJwtAuth, omnexioSubscriptionChangeController);

module.exports = router;
