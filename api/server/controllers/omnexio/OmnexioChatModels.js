const axios = require('axios');
const { logger } = require('~/config');

async function omnexioChatModels(req, res) {
  const { OMNEXIO_BASE_URL, OMNEXIO_API_KEY } = process.env;
  const url = `${OMNEXIO_BASE_URL}/v1/chat-models`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${OMNEXIO_API_KEY}`,
    },
  });

  return res.status(200).send(response.data);
}

module.exports = omnexioChatModels;
