import { useEffect, useRef } from 'react';

export interface TrackStep {
  id: string;
  label: string;
  tag?: string;
}

interface Props {
  steps: TrackStep[];
  idx: number;
  go: (i: number) => void;
}

/**
 * Horizontal track with a marker that travels to the active step. The fill and
 * the marker use transform/left transitions only, and the active step is
 * scrolled into view so it also works on narrow screens.
 */
export function StepTrack({ steps, idx, go }: Props) {
  const n = steps.length;
  const wrap = useRef<HTMLDivElement>(null);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const w = wrap.current;
    const b = btns.current[idx];
    if (w && b) w.scrollTo({ left: b.offsetLeft + b.offsetWidth / 2 - w.clientWidth / 2, behavior: 'smooth' });
  }, [idx]);

  return (
    <div className="trackwrap" ref={wrap}>
      <div className="track" style={{ minWidth: n * 112 }}>
        <div className="rail" style={{ left: `${50 / n}%`, right: `${50 / n}%` }}>
          <div className="railfill" style={{ transform: `scaleX(${n > 1 ? idx / (n - 1) : 0})` }} />
        </div>
        <div className="who" style={{ left: `${((idx + 0.5) / n) * 100}%` }} title="You are here">
          ☺
        </div>
        <div className="tgrid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
          {steps.map((x, k) => (
            <button
              key={x.id}
              ref={(el) => {
                btns.current[k] = el;
              }}
              className={`st ${k === idx ? 'on' : k < idx ? 'seen' : ''}`}
              style={{ paddingTop: 26 }}
              onClick={() => go(k)}
            >
              <span className="c" />
              {x.tag && <span className="g">{x.tag}</span>}
              <span className="l">{x.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
