const axios = require('axios');
const { logger } = require('~/config');

async function omnexioNewsletterController(req, res) {
  try {
    const { OMNEXIO_BASE_URL, OMNEXIO_API_KEY } = process.env;

    const payload = {
      code: req.body.code,
      username: req.body.username,
    };

    const url = `${OMNEXIO_BASE_URL}/v1/newsletter`;
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${OMNEXIO_API_KEY}`,
      },
    });

    return res.status(200).send(response.data);
  } catch (error) {
    logger.error('[omnexioNewsletterController] Error fetching checkout url:', error);
    // Return 0 as a fallback instead of exposing the error to the client
    return res.status(200).send('');
  }
}

module.exports = omnexioNewsletterController;
