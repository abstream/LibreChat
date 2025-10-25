const axios = require('axios');
const { logger } = require('~/config');

async function omnexioPdfController(req, res) {
  try {
    const { AISEARCHAPI_BASE_URL } = process.env;
    const url = `${AISEARCHAPI_BASE_URL}/pdf?url=${req.body.url}`;

    const response = await axios.get(url, {
      responseType: 'arraybuffer',
    });

    if (response.data) {
      // Convert arraybuffer to base64
      const base64 = Buffer.from(response.data).toString('base64');

      return res.status(200).json({
        pdf: base64,
      });
    } else {
      logger.warn('[omnexioPdfController] Invalid response format from AI Search API');
      return res.status(400).json({ error: 'No PDF data' });
    }
  } catch (error) {
    logger.error('[omnexioPdfController] Error fetching PDF:', error);
    return res.status(500).json({ error: 'Error fetching PDF' });
  }
}

module.exports = omnexioPdfController;
