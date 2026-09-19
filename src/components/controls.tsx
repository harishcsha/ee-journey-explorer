import type { ReactNode } from 'react';

interface SegProps<T extends string | number> {
  opts: [T, string][];
  val: T;
  on: (v: T) => void;
}

export function Seg<T extends string | number>({ opts, val, on }: SegProps<T>) {
  return (
    <div className="seg" role="group">
      {opts.map(([v, label]) => (
        <button key={v} className={val === v ? 'on' : ''} onClick={() => on(v)}>
          {label}
        </button>
      ))}
    </div>
  );
}

interface SwProps {
  label: string;
  hint?: string;
  val: boolean;
  on: (v: boolean) => void;
}

export function Sw({ label, hint, val, on }: SwProps) {
  return (
    <button className={`sw ${val ? 'on' : ''}`} role="switch" aria-checked={val} onClick={() => on(!val)}>
      <span>
        <span className="t">{label}</span>
        {hint && <span className="h">{hint}</span>}
      </span>
      <i />
    </button>
  );
}

interface StepControlsProps {
  idx: number;
  length: number;
  playing: boolean;
  toggle: () => void;
  go: (i: number) => void;
  playLabel: string;
  extra?: ReactNode;
}

export function StepControls({ idx, length, playing, toggle, go, playLabel, extra }: StepControlsProps) {
  return (
    <div className="ctrls">
      <button className="ic" disabled={idx === 0} aria-label="Previous step" onClick={() => go(idx - 1)}>
        ‹
      </button>
      <button className="ic play" onClick={toggle}>
        {playing ? 'Pause' : playLabel}
      </button>
      <button className="ic" disabled={idx >= length - 1} aria-label="Next step" onClick={() => go(idx + 1)}>
        ›
      </button>
      {extra}
    </div>
  );
}
