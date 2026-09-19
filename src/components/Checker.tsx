import { useState } from 'react';
import { SCEN } from '../data/scenarios';
import { evaluate, INITIAL_CHECKER, type CheckerState } from '../lib/eligibility';
import type { JourneyKey } from '../types';
import { Seg, Sw } from './controls';

export function Checker({ setJk }: { setJk: (k: JourneyKey) => void }) {
  const [s, setS] = useState<CheckerState>(INITIAL_CHECKER);

  function set<K extends keyof CheckerState>(key: K, value: CheckerState[K]) {
    setS((old) => {
      const next = { ...old, [key]: value };
      if (next.m > next.len) next.m = next.len;
      return next;
    });
  }

  const r = evaluate(s);
  const pct = (v: number) => (v / s.len) * 100;
  const stdStart = s.len - 1.5;
  const lib = SCEN.find((x) => x[0] === r.label);

  return (
    <div className="two">
      <div className="card">
        <h4 style={{ marginBottom: 8 }}>The customer's line</h4>
        <div className="small muted" style={{ marginBottom: 4 }}>
          Contract length (for illustration)
        </div>
        <Seg
          opts={[
            [12, '12 months'],
            [24, '24 months'],
            [36, '36 months'],
          ]}
          val={s.len}
          on={(v) => set('len', v)}
        />
        <div className="small muted" style={{ marginTop: 6 }}>
          Subsidy plans run 12 to 24 months. Flex pay devices run 24 to 36.
        </div>
        <div style={{ margin: '14px 0 2px', fontWeight: 700 }}>Months since contract start: {s.m}</div>
        <input
          type="range"
          min={0}
          max={s.len}
          step={0.5}
          value={s.m}
          aria-label="Months since contract start"
          onChange={(e) => set('m', parseFloat(e.target.value))}
        />
        <div className="tl" aria-hidden="true">
          <div className="f" style={{ width: `${pct(6)}%` }}>
            Future
          </div>
          <div className="e" style={{ width: `${pct(stdStart - 6)}%` }}>
            Early
          </div>
          <div className="s" style={{ width: `${pct(1.5)}%` }} />
          {s.len > 12 && (
            <div className="tick12" style={{ left: `${pct(12)}%` }}>
              <span>12 months</span>
            </div>
          )}
          <div className="pin" style={{ left: `${pct(s.m)}%` }}>
            <span>{s.m} mo</span>
          </div>
        </div>
        <div className="legend">
          <span>
            <b style={{ background: 'var(--surface2)', border: '1px solid var(--line)' }} />
            Future: 0 to under 6 months
          </span>
          <span>
            <b style={{ background: 'var(--teal-l)' }} />
            Early: over 6 months to 45 days before end
          </span>
          <span>
            <b style={{ background: 'var(--teal)' }} />
            Standard: last 45 days (about 1.5 months)
          </span>
        </div>

        <h4 style={{ margin: '20px 0 6px' }}>The customer's account</h4>
        <div className="small muted" style={{ marginBottom: 6 }}>
          Credit class
        </div>
        <Seg
          opts={[
            ['high', 'High'],
            ['low', 'Low'],
          ]}
          val={s.credit}
          on={(v) => set('credit', v)}
        />
        <div style={{ marginTop: 8 }}>
          <Sw label="Consumer account type" val={s.consumer} on={(v) => set('consumer', v)} />
          <Sw label="Account is in collections" val={s.collections} on={(v) => set('collections', v)} />
          <Sw label="Account is older than 3 months" val={s.acctOld} on={(v) => set('acctOld', v)} />
          <Sw
            label="Plan allows early upgrade"
            hint="Assumed on. Turn off to see annual-only cases."
            val={s.earlyOk}
            on={(v) => set('earlyOk', v)}
          />
          <Sw
            label="Device/plan allows annual upgrade"
            hint="Only on certain devices and plans, from 12 months"
            val={s.annualOk}
            on={(v) => set('annualOk', v)}
          />
        </div>
      </div>

      <div>
        <div className="result" key={r.label}>
          <span className="chip hl">Login scenario</span>
          <h3 style={{ margin: '10px 0 6px' }}>{r.label}</h3>
          <p>{lib ? lib[1] : ''}</p>
          <div className="chips" style={{ marginBottom: 12 }}>
            <span className={`chip ${r.up ? '' : 'warn'}`}>{r.up ? 'Can upgrade now' : 'No upgrade yet'}</span>
            <span className={`chip ${r.add ? '' : 'warn'}`}>{r.add ? 'Can add a line' : 'No add line'}</span>
            {r.window === 'standard' && <span className="chip">No extra charges</span>}
            {r.window === 'early' && <span className="chip warn">Extra charges apply</span>}
          </div>
          <p className="small muted">
            The onboarding doc words Early Upgrade as "contract end date less than 6 months and more than 45 days away".
            The slide says "more than 6 months after contract start". This checker follows the slide.
          </p>
          <div className="ctrls">
            {r.up && (
              <button className="btn small" onClick={() => setJk('upgrade')}>
                Show Upgrade journey
              </button>
            )}
            {r.add && (
              <button className="btn small" onClick={() => setJk('addline')}>
                Show Add Line journey
              </button>
            )}
          </div>
        </div>
        <div className="card flat lib" style={{ marginTop: 16 }}>
          <h4 style={{ marginBottom: 4 }}>All login scenarios in the deck</h4>
          {SCEN.map((x) => (
            <details key={x[0]} className={x[0] === r.label ? 'hit' : ''}>
              <summary>{x[0]}</summary>
              <p className="muted small" style={{ margin: '6px 0 2px' }}>
                {x[1]}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
