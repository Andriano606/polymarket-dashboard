/**
 * MarketTransformer
 * -----------------
 * Responsible for normalising raw API market objects into a shape
 * the UI can consume without any further data wrangling.
 */

/**
 * @param {string|number|null} value
 * @returns {number}
 */
function parseDecimal(value) {
  if (value === null || value === undefined) return 0
  const n = parseFloat(value)
  return isNaN(n) ? 0 : n
}

/**
 * Extracts the Yes-outcome probability (0–1) from outcome_prices.
 * Returns null when the format is unrecognised (e.g. object prices).
 *
 * @param {Array} outcomePrices
 * @returns {number|null}
 */
export function extractYesProbability(outcomePrices) {
  if (!Array.isArray(outcomePrices) || outcomePrices.length === 0) return null
  const first = outcomePrices[0]
  if (typeof first === 'object' && first !== null) return null // object-style price
  const p = parseDecimal(first)
  return p >= 0 && p <= 1 ? p : null
}

/**
 * Determines the risk tier of a market based on Yes probability.
 *
 * @param {number|null} yesProbability
 * @returns {'extreme'|'safe'|'moderate'|'unknown'}
 */
export function classifyRisk(yesProbability) {
  if (yesProbability === null) return 'unknown'
  const p = yesProbability
  if (p >= 0.98 || p <= 0.02) return 'extreme'
  if (p >= 0.96 || p <= 0.04) return 'safe'
  return 'moderate'
}

/**
 * Transforms a single raw market from the API into a normalised object.
 *
 * @param {Object} raw
 * @returns {Object} normalised market
 */
export function transformMarket(raw) {
  const yesProbability = extractYesProbability(raw.outcome_prices)
  const liquidity = parseDecimal(raw.liquidity)
  const volume = parseDecimal(raw.volume)
  const endDate = raw.event?.end_date ? new Date(raw.event.end_date) : null

  return {
    id: raw.id,
    question: raw.question ?? '',
    slug: raw.slug ?? null,
    conditionId: raw.condition_id ?? null,
    outcomes: raw.outcomes ?? ['Yes', 'No'],
    outcomePrices: raw.outcome_prices ?? [],
    yesProbability,
    noProbability: yesProbability !== null ? 1 - yesProbability : null,
    liquidity,
    volume,
    endDate,
    active: raw.active ?? true,
    closed: raw.closed ?? false,
    riskTier: classifyRisk(yesProbability),
    event: {
      id: raw.event?.id ?? null,
      title: raw.event?.title ?? raw.question ?? '',
      description: raw.event?.description ?? null,
      slug: raw.event?.slug ?? null,
    },
  }
}

/**
 * Transforms an array of raw markets.
 *
 * @param {Object[]} rawList
 * @returns {Object[]}
 */
export function transformMarkets(rawList) {
  return rawList.map(transformMarket)
}
