const express = require('express');
const router = express.Router();
const { requireJwtAuth } = require('../middleware/');
const omnexioBalanceController = require('../controllers/omnexio/OmnexioBalance');
const omnexioSubscriptionCheckoutController = require('../controllers/omnexio/OmnexioSubscriptionCheckout');
const omnexioSubscriptionPlans = require('~/server/controllers/omnexio/OmnexioSubscriptionPlans');
const omnexioSubscriptionChangeController = require('~/server/controllers/omnexio/OmnexioSubscriptionChange');
const omnexioChatModels = require('~/server/controllers/omnexio/OmnexioChatModels');
const omnexioNewsletterController = require('~/server/controllers/omnexio/OmnexioNewsletter');

router.get('/balance', requireJwtAuth, omnexioBalanceController);
router.post('/subscriptions', requireJwtAuth, omnexioSubscriptionCheckoutController);
router.get('/subscription-plans', requireJwtAuth, omnexioSubscriptionPlans);
router.get('/pricing-subscription-plans', omnexioSubscriptionPlans);
router.post('/subscription/change', requireJwtAuth, omnexioSubscriptionChangeController);
router.get('/chat-models', omnexioChatModels);
router.post('/newsletter', omnexioNewsletterController);

module.exports = router;
