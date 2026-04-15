import { Droplets, TrendingUp, Clock, ExternalLink, Zap } from 'lucide-react'
import {
  formatCurrency,
  formatProbability,
  formatTimeRemaining,
  formatDate,
  getTimeUrgency,
} from '../../utils/formatters'

// ── Probability Bar ──────────────────────────────────────────────────────────

function ProbabilityBar({ yesProbability, riskTier }) {
  const pct = yesProbability !== null ? yesProbability * 100 : null
  const displayPct = pct !== null ? pct : 50

  const barColor = {
    extreme: 'bg-gradient-to-r from-extreme-600 to-extreme-400',
    safe: 'bg-gradient-to-r from-safe-600 to-safe-400',
    moderate: 'bg-gradient-to-r from-brand-600 to-brand-400',
    unknown: 'bg-slate-600',
  }[riskTier]

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[10px] uppercase tracking-widest text-slate-500">Yes probability</span>
        <span
          className={`text-sm font-bold font-mono ${
            riskTier === 'extreme'
              ? 'text-extreme-400'
              : riskTier === 'safe'
              ? 'text-safe-400'
              : 'text-brand-400'
          }`}
        >
          {pct !== null ? `${displayPct.toFixed(1)}%` : '—'}
        </span>
      </div>
      <div className="h-2 bg-surface-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${displayPct}%` }}
        />
      </div>
    </div>
  )
}

// ── Badge ────────────────────────────────────────────────────────────────────

function Badge({ icon: Icon, value, accent }) {
  return (
    <div className={`badge ${accent}`}>
      <Icon className="w-3 h-3" />
      {value}
    </div>
  )
}

// ── Time Badge ───────────────────────────────────────────────────────────────

function TimeBadge({ endDate }) {
  const urgency = getTimeUrgency(endDate)
  const remaining = formatTimeRemaining(endDate)

  const styles = {
    critical: 'bg-danger-500/15 text-danger-400 border border-danger-500/30 animate-pulse-slow',
    warning: 'bg-gold-500/15 text-gold-400 border border-gold-500/30',
    normal: 'bg-surface-800 text-slate-400 border border-white/5',
    expired: 'bg-surface-800 text-slate-600 border border-white/5',
  }[urgency]

  return (
    <div className={`badge ${styles}`}>
      <Clock className="w-3 h-3" />
      {remaining}
    </div>
  )
}

// ── Risk Badge ────────────────────────────────────────────────────────────────

function RiskBadge({ riskTier }) {
  if (riskTier === 'moderate' || riskTier === 'unknown') return null

  const styles = {
    extreme: 'bg-extreme-500/15 text-extreme-400 border border-extreme-500/30',
    safe: 'bg-safe-500/15 text-safe-400 border border-safe-500/30',
  }[riskTier]

  const labels = {
    extreme: '★ Extreme Safe',
    safe: '✓ Safe Bet',
  }

  return <div className={`badge text-[10px] font-semibold tracking-wide ${styles}`}>{labels[riskTier]}</div>
}

// ── MarketCard ────────────────────────────────────────────────────────────────

export function MarketCard({ market }) {
  const { question, event, yesProbability, liquidity, volume, endDate, riskTier, slug } = market

  const isExtreme = riskTier === 'extreme'

  const borderStyle = isExtreme
    ? 'border-extreme-500/40 glow-extreme'
    : riskTier === 'safe'
    ? 'border-safe-500/20 glow-safe'
    : 'border-white/5'

  return (
    <article
      className={`card border animate-fade-in flex flex-col gap-3 p-4 ${borderStyle}
                  hover:border-white/10 transition-all duration-200`}
    >
      {/* Top row: event title + badges */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          {event.title && event.title !== question && (
            <p className="text-[10px] uppercase tracking-wider text-slate-500 truncate mb-0.5">
              {event.title}
            </p>
          )}
          <h3 className="text-sm font-medium text-slate-100 leading-snug line-clamp-3">
            {question}
          </h3>
        </div>
        {isExtreme && (
          <Zap className="w-4 h-4 text-extreme-400 shrink-0 mt-0.5" />
        )}
      </div>

      {/* Probability bar */}
      <ProbabilityBar yesProbability={yesProbability} riskTier={riskTier} />

      {/* Stats row */}
      <div className="flex flex-wrap gap-1.5">
        <Badge
          icon={Droplets}
          value={formatCurrency(liquidity)}
          accent="bg-brand-600/10 text-brand-400 border border-brand-600/20"
        />
        <Badge
          icon={TrendingUp}
          value={formatCurrency(volume)}
          accent="bg-surface-800 text-slate-400 border border-white/5"
        />
        <TimeBadge endDate={endDate} />
        <RiskBadge riskTier={riskTier} />
      </div>

      {/* Footer: expiry date + external link */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <span className="text-[10px] text-slate-600 font-mono">
          Expires {formatDate(endDate)}
        </span>
        {slug && (
          <a
            href={`https://polymarket.com/event/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-brand-400 transition-colors"
          >
            View
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </article>
  )
}
