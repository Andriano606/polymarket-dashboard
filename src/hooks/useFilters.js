import { useState, useCallback } from 'react'

export const DEFAULT_FILTERS = {
  minProbability: 0.90,
  maxProbability: 0.99,
  minLiquidity: 10000,
  minVolume: 0,
  endsWithinHours: 72,
  onlyTradeable: true,
  sortBy: 'liquidity',
  sortOrder: 'desc',
}

/**
 * useFilters
 * ----------
 * Manages filter state and exposes helpers to build the API query params.
 */
export function useFilters() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
  }, [])

  /**
   * Converts filter state into the API query params object.
   * @returns {Object}
   */
  const toApiParams = useCallback(
    (page = 1, limit = 25) => {
      const params = {
        page,
        limit,
        sort_by: filters.sortBy,
        sort_order: filters.sortOrder,
      }

      if (filters.minProbability) params.min_probability = filters.minProbability
      if (filters.maxProbability) params.max_probability = filters.maxProbability
      if (filters.minLiquidity > 0) params.min_liquidity = filters.minLiquidity
      if (filters.minVolume > 0) params.min_volume = filters.minVolume
      if (filters.endsWithinHours > 0) params.ends_within_hours = filters.endsWithinHours
      if (filters.onlyTradeable) params.only_tradeable = true

      return params
    },
    [filters],
  )

  return { filters, updateFilter, resetFilters, toApiParams }
}
