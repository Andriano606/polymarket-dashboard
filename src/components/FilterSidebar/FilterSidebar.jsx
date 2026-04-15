import { SlidersHorizontal, RotateCcw, ArrowLeftRight } from 'lucide-react'
import { DEFAULT_FILTERS } from '../../hooks/useFilters'
import { formatCurrency, formatProbability } from '../../utils/formatters'

function SectionLabel({ children }) {
  return (
    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
      {children}
    </p>
  )
}

function RangeSlider({ label, min, max, step, value, onChange, format }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-slate-400">{label}</span>
        <span className="text-xs font-mono text-brand-400">{format(value)}</span>
      </div>
      <input
        type="range"
        className="input-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  )
}

const TIME_PRESETS = [
  { label: '6h', value: 6 },
  { label: '12h', value: 12 },
  { label: '24h', value: 24 },
  { label: '48h', value: 48 },
  { label: '72h', value: 72 },
  { label: 'All', value: 0 },
]

export function FilterSidebar({ filters, onUpdate, onReset }) {
  return (
    <aside className="w-64 shrink-0 flex flex-col gap-5 sticky top-4 self-start">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-200 font-semibold">
          <SlidersHorizontal className="w-4 h-4 text-brand-400" />
          Filters
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Probability */}
      <div className="card p-4 flex flex-col gap-4">
        <SectionLabel>Probability (Yes)</SectionLabel>

        <RangeSlider
          label="Min probability"
          min={0}
          max={1}
          step={0.01}
          value={filters.minProbability}
          onChange={(v) => onUpdate('minProbability', v)}
          format={formatProbability}
        />

        <RangeSlider
          label="Max probability"
          min={0}
          max={1}
          step={0.01}
          value={filters.maxProbability}
          onChange={(v) => onUpdate('maxProbability', v)}
          format={formatProbability}
        />
      </div>

      {/* Liquidity */}
      <div className="card p-4 flex flex-col gap-4">
        <SectionLabel>Liquidity & Volume</SectionLabel>

        <RangeSlider
          label="Min liquidity"
          min={0}
          max={500000}
          step={5000}
          value={filters.minLiquidity}
          onChange={(v) => onUpdate('minLiquidity', v)}
          format={formatCurrency}
        />

        <RangeSlider
          label="Min volume"
          min={0}
          max={500000}
          step={5000}
          value={filters.minVolume}
          onChange={(v) => onUpdate('minVolume', v)}
          format={formatCurrency}
        />
      </div>

      {/* Time */}
      <div className="card p-4">
        <SectionLabel>Expiry window</SectionLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {TIME_PRESETS.map((preset) => {
            const active = filters.endsWithinHours === preset.value
            return (
              <button
                key={preset.value}
                onClick={() => onUpdate('endsWithinHours', preset.value)}
                className={`py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 ${
                  active
                    ? 'bg-brand-600 text-white'
                    : 'bg-surface-800 text-slate-400 hover:text-slate-200 hover:bg-surface-700'
                }`}
              >
                {preset.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tradeable toggle */}
      <div className="card p-4">
        <SectionLabel>Market status</SectionLabel>
        <button
          onClick={() => onUpdate('onlyTradeable', !filters.onlyTradeable)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg
                      border transition-colors duration-150 ${
                        filters.onlyTradeable
                          ? 'bg-safe-500/10 border-safe-500/30 text-safe-400'
                          : 'bg-surface-800 border-white/5 text-slate-400 hover:text-slate-200'
                      }`}
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            Only tradeable
          </div>
          {/* Toggle pill */}
          <div
            className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
              filters.onlyTradeable ? 'bg-safe-500' : 'bg-surface-700'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow
                          transition-transform duration-200 ${
                            filters.onlyTradeable ? 'translate-x-4' : 'translate-x-0'
                          }`}
            />
          </div>
        </button>
      </div>

      {/* Legend */}
      <div className="card p-4 flex flex-col gap-2">
        <SectionLabel>Risk tiers</SectionLabel>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-extreme-400 shrink-0" />
          <span>
            <strong className="text-extreme-400">Extreme</strong> — ≥98% or ≤2%
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-safe-400 shrink-0" />
          <span>
            <strong className="text-safe-400">Safe</strong> — ≥96% or ≤4%
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-slate-500 shrink-0" />
          <span>Moderate — other</span>
        </div>
      </div>
    </aside>
  )
}
