import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

const SORT_OPTIONS = [
  { value: 'liquidity', label: 'Liquidity' },
  { value: 'volume', label: 'Volume' },
  { value: 'end_date', label: 'Expiry' },
]

export function SortControls({ sortBy, sortOrder, onSortBy, onSortOrder }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-500 uppercase tracking-wider mr-1">Sort</span>
      <div className="flex rounded-lg overflow-hidden border border-white/5">
        {SORT_OPTIONS.map((opt) => {
          const active = sortBy === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => onSortBy(opt.value)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
                active
                  ? 'bg-brand-600 text-white'
                  : 'bg-surface-900 text-slate-400 hover:text-slate-200 hover:bg-surface-800'
              }`}
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      <button
        onClick={() => onSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
        className="p-1.5 rounded-lg bg-surface-900 border border-white/5 text-slate-400
                   hover:text-slate-200 hover:bg-surface-800 transition-colors duration-150"
        title={`Order: ${sortOrder}`}
      >
        {sortOrder === 'desc' ? (
          <ArrowDown className="w-4 h-4" />
        ) : (
          <ArrowUp className="w-4 h-4" />
        )}
      </button>
    </div>
  )
}
