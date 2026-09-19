import { useStepper } from '../hooks/useStepper';
import type { SeqStep } from '../types';
import { StepControls } from './controls';
import { StepTrack } from './StepTrack';

interface Props {
  steps: SeqStep[];
  resetKey: string;
  playLabel?: string;
}

/** A sequence of steps with a travelling marker, autoplay and a detail card. */
export function StepFlow({ steps, resetKey, playLabel = 'Play' }: Props) {
  const { idx, playing, toggle, go } = useStepper(steps.length, resetKey);
  const s = steps[idx];
  return (
    <div className="card flat">
      <div className="jhead">
        <span className="muted small">
          Step {idx + 1} of {steps.length}
        </span>
        <StepControls idx={idx} length={steps.length} playing={playing} toggle={toggle} go={go} playLabel={playLabel} />
      </div>
      <StepTrack steps={steps.map((x) => ({ id: x.id, label: x.label }))} idx={idx} go={go} />
      <div className="swap" key={`${resetKey}${s.id}`} style={{ marginTop: 8 }}>
        {s.tag && <span className="chip">{s.tag}</span>}
        <h3 style={{ margin: '8px 0 4px' }}>{s.title}</h3>
        <p style={{ marginBottom: 0 }}>{s.text}</p>
        {s.points && (
          <ul className="plist">
            {s.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
