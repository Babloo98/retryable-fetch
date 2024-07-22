const fetch = require('node-fetch');

/**
 * Retries a fetch request with exponential backoff.
 * @param {string} url - The URL to fetch.
 * @param {object} options - The fetch options.
 * @param {number} retries - The number of retries.
 * @param {number} delay - The initial delay in milliseconds.
 * @returns {Promise<Response>} - The fetch response.
 */

async function retryFetch(url, options = {}, retries = 3, delay = 1000) {
    try {
        const response = await fetch(url, options);
        if (!response.ok && retries > 0) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return response;
    } catch (error) {
        if (retries > 0) {
            await new Promise(res => setTimeout(res, delay));
            return retryFetch(url, options, retries - 1, delay * 2);
        } else {
            throw error;
        }
    }
}

module.exports = retryFetch;