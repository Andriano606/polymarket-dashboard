import { BarChart2, Zap, TrendingUp, Shield } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'

function StatItem({ icon: Icon, label, value, accent }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface-900 border border-white/5">
      <div className={`p-1.5 rounded-md ${accent}`}>
        <Icon className="w-3.5 h-3.5" />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-slate-500 leading-none mb-0.5">{label}</p>
        <p className="text-sm font-semibold font-mono text-slate-100">{value}</p>
      </div>
    </div>
  )
}

export function StatsBar({ markets, meta }) {
  const totalLiquidity = markets.reduce((s, m) => s + m.liquidity, 0)
  const extremeCount = markets.filter((m) => m.riskTier === 'extreme').length
  const safeCount = markets.filter((m) => m.riskTier === 'safe').length

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <StatItem
        icon={BarChart2}
        label="Markets shown"
        value={markets.length}
        accent="bg-brand-600/20 text-brand-400"
      />
      <StatItem
        icon={Shield}
        label="Extreme safe"
        value={extremeCount}
        accent="bg-extreme-600/20 text-extreme-400"
      />
      <StatItem
        icon={Zap}
        label="Safe bets"
        value={safeCount}
        accent="bg-safe-600/20 text-safe-400"
      />
      <StatItem
        icon={TrendingUp}
        label="Total liquidity"
        value={formatCurrency(totalLiquidity)}
        accent="bg-gold-500/20 text-gold-400"
      />
    </div>
  )
}
