const BASE_URL = '/api/v1/polymarket'

/**
 * Serialises a params object into a URLSearchParams string,
 * omitting keys whose value is null / undefined / empty string.
 */
function buildQuery(params) {
  const q = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined && value !== '') {
      q.set(key, String(value))
    }
  }
  return q.toString()
}

/**
 * Fetches markets from the Rails API.
 *
 * @param {Object} params - Query parameters supported by the endpoint.
 * @returns {Promise<{data: Market[], meta: Meta}>}
 */
export async function fetchMarkets(params = {}) {
  const query = buildQuery(params)
  const url = `${BASE_URL}/markets${query ? `?${query}` : ''}`

  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`API ${response.status}: ${text}`)
  }

  return response.json()
}
