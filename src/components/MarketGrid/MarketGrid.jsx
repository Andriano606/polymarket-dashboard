import { MarketCard } from '../MarketCard'
import { LoadingSpinner } from '../LoadingSpinner'
import { ErrorBanner } from '../ErrorBanner'
import { Inbox } from 'lucide-react'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-600">
      <Inbox className="w-10 h-10" />
      <p className="text-sm">No markets match your current filters.</p>
      <p className="text-xs text-slate-700">Try relaxing the probability or liquidity thresholds.</p>
    </div>
  )
}

export function MarketGrid({ markets, loading, error, onRetry }) {
  if (loading) return <LoadingSpinner label="Fetching markets…" />
  if (error) return <ErrorBanner message={error} onRetry={onRetry} />
  if (markets.length === 0) return <EmptyState />

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-3">
      {markets.map((market) => (
        <MarketCard key={market.id} market={market} />
      ))}
    </div>
  )
}
