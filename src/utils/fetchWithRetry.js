/**
 * fetchWithRetry(url, options, config)
 * 
 * Wrapper around fetch() that retries on failure with exponential backoff.
 * Only retries on network errors or HTTP 5xx responses.
 * 
 * @param {string} url 
 * @param {RequestInit} options 
 * @param {Object} config
 * @param {number} config.retries - Max number of retries (default: 3)
 * @param {number} config.delay - Initial delay in ms (default: 1000)
 * @returns {Promise<Response>}
 */
export async function fetchWithRetry(url, options = {}, { retries = 3, delay = 1000 } = {}) {
    let lastError;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, options);

            // Don't retry on client errors (4xx), only on server errors (5xx)
            if (response.ok || (response.status >= 400 && response.status < 500)) {
                return response;
            }

            lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
        } catch (error) {
            // Network error (offline, DNS, timeout, etc.)
            lastError = error;
        }

        // If we have retries remaining, wait with exponential backoff
        if (attempt < retries) {
            const backoff = delay * Math.pow(2, attempt);
            console.warn(`[fetchWithRetry] Attempt ${attempt + 1}/${retries + 1} failed. Retrying in ${backoff}ms...`);
            await new Promise(resolve => setTimeout(resolve, backoff));
        }
    }

    // All attempts exhausted
    throw new Error(
        `Fetch failed after ${retries + 1} attempts: ${lastError?.message || 'Unknown error'}. ` +
        `Verifica tu conexión a internet e intenta recargar la página.`
    );
}
