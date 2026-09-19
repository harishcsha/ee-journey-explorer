import { useEffect, useState } from 'react';
import { Seg, StepControls } from '../components/controls';
import { FlowDiagram } from '../components/FlowDiagram';
import { NextBtn } from '../components/NextBtn';
import { FLOWS } from '../data/flows';
import { SYSTEMS } from '../data/systems';
import { useStepper } from '../hooks/useStepper';
import type { Basket, FlowKey, Goto, SysFocus, SysId } from '../types';

const TABLE_ROWS: SysId[] = ['excal', 'compass', 'myeeweb', 'myeeapp', 'shop', 'aem', 'om', 'sap'];

interface Props {
  focus: SysFocus | null;
  goto: Goto;
}

export function SystemsTab({ focus, goto }: Props) {
  const [flowKey, setFlowKey] = useState<FlowKey>('acq');
  const [basket, setBasket] = useState<Basket>('single');
  const [sel, setSel] = useState<string | null>(null);

  const flow = FLOWS[flowKey];
  const steps = flow.steps.filter((s) => !s.basket || s.basket === basket);
  const { idx, playing, toggle, go } = useStepper(steps.length, `${flowKey}:${basket}`);

  // Deep links from other tabs (for example clicking a system chip on a journey step).
  useEffect(() => {
    if (focus) {
      setFlowKey(focus.flow);
      setSel(focus.sel);
    }
  }, [focus]);

  const cur = steps[idx];
  const isSystem = (k: string): k is SysId => k in SYSTEMS;

  let info: { title: string; sys?: (typeof SYSTEMS)[SysId]; text?: string } | null = null;
  if (sel && isSystem(sel)) {
    info = { title: SYSTEMS[sel].name, sys: SYSTEMS[sel] };
  } else if (sel) {
    const nd = flow.nodes.find((n) => n.id === sel);
    if (nd) info = { title: nd.l.join(' '), text: nd.info };
  }

  return (
    <div>
      <h2>Systems and the shop process</h2>
      <p className="lead">
        Follow one order through the machinery. Highlighted boxes are active in the current step, lighter ones have
        already been used. Click any box or table row to see what the system does and who owns it.
      </p>

      <div className="row" style={{ marginBottom: 12, gap: 16 }}>
        <Seg
          opts={[
            ['acq', 'Acquisition'],
            ['upg', 'Upgrade / Add Line'],
          ]}
          val={flowKey}
          on={setFlowKey}
        />
        {flowKey === 'acq' ? (
          <Seg
            opts={[
              ['single', 'Single basket'],
              ['multi', 'Multi basket'],
            ]}
            val={basket}
            on={setBasket}
          />
        ) : (
          <span className="chip warn">Single basket only for now</span>
        )}
      </div>

      <FlowDiagram flow={flow} basket={basket} steps={steps} idx={idx} flowKey={flowKey} sel={sel} onSelect={setSel} />

      <div style={{ marginTop: 14 }}>
        <StepControls
          idx={idx}
          length={steps.length}
          playing={playing}
          toggle={toggle}
          go={go}
          playLabel="Play the flow"
          extra={
            <span className="muted small">
              Step {idx + 1} of {steps.length}
            </span>
          }
        />
      </div>

      <div className="stepcard">
        <div className="card swap" key={`${flowKey}${basket}${idx}`}>
          <h3 className="big">{cur.title}</h3>
          <p style={{ marginTop: 8 }}>{cur.text}</p>
        </div>
        <div className="card flat swap" key={`i${sel ?? 'none'}`}>
          {info?.sys ? (
            <div>
              <span className="chip">
                {info.sys.team ? `Owned by ${info.sys.team}` : 'No owning team stated'}
              </span>
              <h3 style={{ margin: '8px 0 4px' }}>{info.title}</h3>
              <p>{info.sys.purpose}</p>
              {info.sys.used.length > 0 && (
                <>
                  <div className="small muted">Used by</div>
                  <div className="chips" style={{ marginTop: 4 }}>
                    {info.sys.used.map((u) => (
                      <span key={u} className="chip">
                        {u}
                      </span>
                    ))}
                  </div>
                </>
              )}
              {info.sys.note && (
                <p className="small muted" style={{ marginTop: 10 }}>
                  {info.sys.note}
                </p>
              )}
            </div>
          ) : info ? (
            <div>
              <h3 style={{ marginBottom: 4 }}>{info.title}</h3>
              <p>{info.text}</p>
            </div>
          ) : (
            <div>
              <h3 style={{ marginBottom: 4 }}>Pick a box</h3>
              <p className="muted">
                Click any system in the diagram to see its purpose, who uses it and which team owns it.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="section">
        <h3>Popular systems</h3>
        <div className="tablewrap card flat" style={{ padding: 0, marginTop: 10 }}>
          <table>
            <thead>
              <tr>
                <th>System</th>
                <th>Purpose</th>
                <th>Used by</th>
                <th>Owning team</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((id) => {
                const s = SYSTEMS[id];
                return (
                  <tr
                    key={id}
                    className={`pick ${sel === id ? 'on' : ''}`}
                    tabIndex={0}
                    onClick={() => setSel(id)}
                    onKeyDown={(e) => e.key === 'Enter' && setSel(id)}
                  >
                    <td>
                      <b>{s.name}</b>
                    </td>
                    <td>{s.purpose}</td>
                    <td>{s.used.join(', ')}</td>
                    <td>{s.team}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="callout">
        Front-end pieces such as the Façade, Global Basket, Queue-it and the payment gateways are covered under
        Front-end Engineering.
        <div style={{ marginTop: 8 }}>
          <button className="btn small ghost" onClick={() => goto('eng')}>
            Open Front-end Engineering
          </button>
        </div>
      </div>
      <NextBtn cur="sys" goto={goto} />
    </div>
  );
}
