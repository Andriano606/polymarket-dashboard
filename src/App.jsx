import { useState, useCallback } from 'react'
import { RefreshCw, Activity } from 'lucide-react'
import { useFilters } from './hooks/useFilters'
import { useMarkets } from './hooks/useMarkets'
import { FilterSidebar } from './components/FilterSidebar'
import { MarketGrid } from './components/MarketGrid'
import { StatsBar } from './components/StatsBar'
import { SortControls } from './components/SortControls'
import { Pagination } from './components/Pagination'

export default function App() {
  const [page, setPage] = useState(1)
  const { filters, updateFilter, resetFilters, toApiParams } = useFilters()

  // Rebuild API params whenever filters or page changes
  const apiParams = toApiParams(page, 25)

  const { markets, meta, loading, error, refresh } = useMarkets(apiParams)

  const handleFilterUpdate = useCallback(
    (key, value) => {
      updateFilter(key, value)
      setPage(1) // reset to first page on filter change
    },
    [updateFilter],
  )

  const handleReset = useCallback(() => {
    resetFilters()
    setPage(1)
  }, [resetFilters])

  const handleSortBy = useCallback(
    (value) => {
      updateFilter('sortBy', value)
      setPage(1)
    },
    [updateFilter],
  )

  const handleSortOrder = useCallback(
    (value) => {
      updateFilter('sortOrder', value)
      setPage(1)
    },
    [updateFilter],
  )

  return (
    <div className="min-h-screen bg-surface-950">
      {/* ── Top nav ─────────────────────────────────────────────────────── */}
      <header className="border-b border-white/5 bg-surface-950/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-screen-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-safe-500 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-100 tracking-tight">
              Polymarket
              <span className="text-gradient-brand ml-1.5">Safe Bets</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {meta && (
              <span className="text-xs text-slate-500 font-mono hidden sm:block">
                {meta.total.toLocaleString()} markets total
              </span>
            )}
            <button
              onClick={refresh}
              disabled={loading}
              className="btn-ghost text-slate-400 hover:text-slate-100 disabled:opacity-40"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Main layout ─────────────────────────────────────────────────── */}
      <main className="max-w-screen-2xl mx-auto px-6 py-6 flex gap-6">
        {/* Sidebar */}
        <FilterSidebar
          filters={filters}
          onUpdate={handleFilterUpdate}
          onReset={handleReset}
        />

        {/* Content column */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Stats */}
          <StatsBar markets={markets} meta={meta} />

          {/* Toolbar */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-slate-400">
              {loading
                ? 'Loading…'
                : `${markets.length} market${markets.length !== 1 ? 's' : ''}`}
            </h2>
            <SortControls
              sortBy={filters.sortBy}
              sortOrder={filters.sortOrder}
              onSortBy={handleSortBy}
              onSortOrder={handleSortOrder}
            />
          </div>

          {/* Market grid */}
          <MarketGrid
            markets={markets}
            loading={loading}
            error={error}
            onRetry={refresh}
          />

          {/* Pagination */}
          <Pagination meta={meta} onPageChange={setPage} />
        </div>
      </main>
    </div>
  )
}
