import { AlertTriangle, RefreshCw } from 'lucide-react'

export function ErrorBanner({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="p-4 rounded-full bg-danger-500/10">
        <AlertTriangle className="w-8 h-8 text-danger-400" />
      </div>
      <div>
        <p className="text-slate-200 font-medium mb-1">Failed to load markets</p>
        <p className="text-slate-500 text-sm font-mono max-w-md break-all">{message}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary mt-2">
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      )}
    </div>
  )
}
