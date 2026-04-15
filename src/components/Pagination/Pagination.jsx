import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination({ meta, onPageChange }) {
  if (!meta || meta.pages <= 1) return null

  const { page, pages, next, prev, total, limit } = meta
  const from = (page - 1) * limit + 1
  const to = Math.min(page * limit, total)

  return (
    <div className="flex items-center justify-between pt-4 border-t border-white/5">
      <span className="text-xs text-slate-500 font-mono">
        {from}–{to} of {total.toLocaleString()}
      </span>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(prev)}
          disabled={!prev}
          className="p-1.5 rounded-lg bg-surface-900 border border-white/5 text-slate-400
                     hover:text-slate-200 hover:bg-surface-800 disabled:opacity-30
                     disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="px-3 py-1 text-xs font-mono text-slate-400">
          {page} / {pages}
        </span>

        <button
          onClick={() => onPageChange(next)}
          disabled={!next}
          className="p-1.5 rounded-lg bg-surface-900 border border-white/5 text-slate-400
                     hover:text-slate-200 hover:bg-surface-800 disabled:opacity-30
                     disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
