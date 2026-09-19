import { JOURNEYS } from '../data/journeys';
import { useStepper } from '../hooks/useStepper';
import type { Goto, JourneyKey } from '../types';
import { StepControls } from './controls';
import { StepTrack } from './StepTrack';
import { SysChip } from './SysChip';
import { Wire } from './Wire';

interface Props {
  jk: JourneyKey;
  goto: Goto;
}

export function Journey({ jk, goto }: Props) {
  const J = JOURNEYS[jk];
  const n = J.steps.length;
  const { idx, playing, toggle, go } = useStepper(n, jk);
  const s = J.steps[idx];
  const flow = jk === 'acq' ? 'acq' : 'upg';

  return (
    <div>
      <div className="jhead">
        <div>
          <h3>{J.title}</h3>
          <div className="small muted">
            {J.who}, {J.login}
          </div>
        </div>
        <StepControls idx={idx} length={n} playing={playing} toggle={toggle} go={go} playLabel="Play journey" />
      </div>

      <StepTrack
        steps={J.steps.map((x) => ({ id: x.id, label: x.short, tag: x.kind === 'gate' ? x.tag : undefined }))}
        idx={idx}
        go={go}
      />

      <div className="jbody">
        <Wire type={s.wire} url={s.url} animKey={jk + s.id} />
        <div className="card flat swap" key={jk + s.id}>
          <span className={`chip ${s.kind === 'gate' ? 'hl' : ''}`}>
            {s.kind === 'gate' ? `Entry state (${s.tag})` : 'Site page'}
          </span>
          <h3 style={{ margin: '10px 0 4px' }}>{s.title}</h3>
          {s.url && (
            <div className="url mono">
              <span className="u" title={s.url}>
                {s.url}
              </span>
            </div>
          )}
          <p>{s.text}</p>
          {s.na && <div className="callout">{s.na}. SIM-only customers go from the SIMO gallery straight to extras.</div>}
          {s.only && <div className="callout">This page only exists in the Upgrade journey. Add Line skips it.</div>}
          {s.notes.length > 0 && (
            <div className="kv">
              <h4>Worth knowing</h4>
              <ul>
                {s.notes.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="kv">
            <h4>Systems behind this step</h4>
            <div className="chips">
              {s.sys.map((id) => (
                <SysChip key={id} id={id} goto={goto} flow={flow} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
