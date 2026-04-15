import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchMarkets } from '../services/api'
import { transformMarkets } from '../services/marketTransformer'

/**
 * useMarkets
 * ----------
 * Fetches, transforms and paginates markets from the Rails API.
 * Aborts in-flight requests when params change (avoids stale updates).
 */
export function useMarkets(apiParams) {
  const [markets, setMarkets] = useState([])
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const abortRef = useRef(null)

  const load = useCallback(async (params) => {
    // Cancel any previous in-flight request
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)

    try {
      const json = await fetchMarkets(params)
      if (controller.signal.aborted) return

      setMarkets(transformMarkets(json.data ?? []))
      setMeta(json.meta ?? null)
    } catch (err) {
      if (err.name === 'AbortError') return
      setError(err.message ?? 'Unknown error')
    } finally {
      if (!controller.signal.aborted) setLoading(false)
    }
  }, [])

  useEffect(() => {
    load(apiParams)
    return () => abortRef.current?.abort()
  }, [JSON.stringify(apiParams)]) // stringify for deep equality

  const refresh = useCallback(() => load(apiParams), [apiParams, load])

  return { markets, meta, loading, error, refresh }
}
