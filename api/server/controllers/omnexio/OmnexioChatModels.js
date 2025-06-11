const axios = require('axios');
const { logger } = require('~/config');

async function omnexioChatModels() {
  const { OMNEXIO_BASE_URL, OMNEXIO_API_KEY } = process.env;
  const url = `${OMNEXIO_BASE_URL}/v1/chat-models`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${OMNEXIO_API_KEY}`,
    },
  });

  return response.data;
}

async function omnexioChatModelByLabel(label) {
  const { OMNEXIO_BASE_URL, OMNEXIO_API_KEY } = process.env;
  const url = `${OMNEXIO_BASE_URL}/v1/chat-models`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${OMNEXIO_API_KEY}`,
      },
      params: {
        label: label,
      },
    });

    return response.data[0];
  } catch (error) {
    logger.error('[fetchChatModelByLabel] Error:', error);
    return null;
  }
}

module.exports = omnexioChatModels;
