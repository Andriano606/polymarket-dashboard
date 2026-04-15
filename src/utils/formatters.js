/**
 * Format a number as a compact currency string (USDC).
 * e.g. 1_500_000 → "$1.5M"
 *
 * @param {number} value
 * @returns {string}
 */
export function formatCurrency(value) {
  if (value === null || value === undefined || isNaN(value)) return '—'
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`
  return `$${value.toFixed(0)}`
}

/**
 * Format a probability (0–1) as a percentage string.
 * e.g. 0.9834 → "98.3%"
 *
 * @param {number|null} value
 * @returns {string}
 */
export function formatProbability(value) {
  if (value === null || value === undefined || isNaN(value)) return '—'
  return `${(value * 100).toFixed(1)}%`
}

/**
 * Returns a human-readable "time remaining" string from now until `date`.
 * e.g. "2h 14m", "3d 7h", "Expired"
 *
 * @param {Date|null} date
 * @returns {string}
 */
export function formatTimeRemaining(date) {
  if (!date) return '—'
  const now = Date.now()
  const diffMs = date.getTime() - now
  if (diffMs <= 0) return 'Expired'

  const totalSeconds = Math.floor(diffMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)

  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

/**
 * Returns urgency class based on how close the end date is.
 *
 * @param {Date|null} date
 * @returns {'critical'|'warning'|'normal'|'expired'}
 */
export function getTimeUrgency(date) {
  if (!date) return 'normal'
  const diffMs = date.getTime() - Date.now()
  if (diffMs <= 0) return 'expired'
  const hours = diffMs / 3_600_000
  if (hours <= 6) return 'critical'
  if (hours <= 24) return 'warning'
  return 'normal'
}

/**
 * Format an ISO date string to a short readable form.
 * e.g. "Dec 31, 23:59"
 *
 * @param {Date|null} date
 * @returns {string}
 */
export function formatDate(date) {
  if (!date) return '—'
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}
