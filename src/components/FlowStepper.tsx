import { useState } from 'react';
import { useStepper } from '../hooks/useStepper';
import type { Flow } from '../types';
import { StepControls } from './controls';
import { FlowDiagram } from './FlowDiagram';

/** Any Flow definition, with step controls, a step card and click-for-info on nodes. */
export function FlowStepper({ flow }: { flow: Flow }) {
  const { idx, playing, toggle, go } = useStepper(flow.steps.length, flow.title);
  const [sel, setSel] = useState<string | null>(null);
  const node = flow.nodes.find((n) => (n.sys ?? n.id) === sel);
  const cur = flow.steps[idx];

  return (
    <div>
      <FlowDiagram flow={flow} basket="single" steps={flow.steps} idx={idx} flowKey={flow.title} sel={sel} onSelect={setSel} />
      <div style={{ marginTop: 14 }}>
        <StepControls
          idx={idx}
          length={flow.steps.length}
          playing={playing}
          toggle={toggle}
          go={go}
          playLabel="Play the flow"
          extra={
            <span className="muted small">
              Step {idx + 1} of {flow.steps.length}
            </span>
          }
        />
      </div>
      <div className="stepcard">
        <div className="card swap" key={`${flow.title}${idx}`}>
          <h3 className="big">{cur.title}</h3>
          <p style={{ marginTop: 8, marginBottom: 0 }}>{cur.text}</p>
        </div>
        <div className="card flat swap" key={`n${sel ?? 'none'}`}>
          {node ? (
            <div>
              <h3 style={{ marginBottom: 4 }}>{node.l.join(' ')}</h3>
              <p style={{ marginBottom: 0 }}>{node.info}</p>
            </div>
          ) : (
            <div>
              <h3 style={{ marginBottom: 4 }}>Pick a box</h3>
              <p className="muted" style={{ marginBottom: 0 }}>
                Click any box in the diagram to see what it is.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
