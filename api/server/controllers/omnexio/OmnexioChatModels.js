const axios = require('axios');
const { logger } = require('~/config');

async function omnexioChatModels(req, res) {
  const { OMNEXIO_BASE_URL, OMNEXIO_API_KEY } = process.env;
  const url = `${OMNEXIO_BASE_URL}/v1/chat-models`;

  const config = {
    headers: {
      Authorization: `Bearer ${OMNEXIO_API_KEY}`,
    },
  };

  // Only add query params if model is provided
  if (req.query.model) {
    config.params = {
      label: req.query.model,
    };
  }

  const response = await axios.get(url, config);

  return res.status(200).send(response.data);
}

module.exports = omnexioChatModels;
