import { useState } from 'react';
import { Seg } from '../components/controls';
import { NextBtn } from '../components/NextBtn';
import { StepFlow } from '../components/StepFlow';
import { A2P, ELEVATE_STEPS, PEGA_STEPS, PLANS, SERVICES } from '../data/pricing';
import type { Goto } from '../types';

const MAX_MONTHS = 36;
const pct = (m: number) => `${(m / MAX_MONTHS) * 100}%`;

function Bundles() {
  const [id, setId] = useState(PLANS[1].id);
  const plan = PLANS.find((p) => p.id === id)!;

  return (
    <div className="card">
      <Seg opts={PLANS.map((p): [string, string] => [p.id, p.name])} val={id} on={setId} />
      <div className="swap" key={id} style={{ marginTop: 14 }}>
        <h3>{plan.full}</h3>
        <p className="muted" style={{ margin: '2px 0 10px' }}>
          {plan.tagline}
        </p>
        <table>
          <tbody>
            {plan.facts.map(([k, v]) => (
              <tr key={k}>
                <td style={{ width: '34%', fontWeight: 700 }}>{k}</td>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 style={{ margin: '18px 0 2px' }}>Contract length, in months</h4>
      {plan.bars.length === 0 && <p className="muted small">PAYG has no contract length to show.</p>}
      {plan.bars.map((b) => (
        <div className="bar-row" key={b.label}>
          <span className="small" style={{ fontWeight: 700 }}>
            {b.label}
          </span>
          <div className="bar-track">
            <div
              className={`bar-fill ${b.from === b.to ? 'dot' : ''}`}
              style={{ left: pct(b.from), width: `calc(${pct(b.to)} - ${pct(b.from)})` }}
            >
              {b.from === b.to ? '' : `${b.from} to ${b.to}`}
            </div>
          </div>
        </div>
      ))}
      <div className="axis">
        <span />
        <div className="axis-in">
          {[0, 12, 24, 36].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>
      {plan.id === 'flex' && <p className="small muted">The dot marks the fixed 24 month price plan contract.</p>}
    </div>
  );
}

function ServiceMap() {
  const [id, setId] = useState(SERVICES[1].id);
  const cur = SERVICES.find((s) => s.id === id)!;
  return (
    <div className="card">
      <div className="svc">
        <div className="svc-root">Airtime price plans</div>
        <div className="svc-kids">
          {SERVICES.map((s) => (
            <button key={s.id} className={`mn svc-kid ${s.id === id ? 'on' : ''}`} onClick={() => setId(s.id)}>
              {s.title}
            </button>
          ))}
        </div>
      </div>
      <div className="swap" key={cur.id} style={{ marginTop: 16 }}>
        <span className="chip">{cur.tag}</span>
        <p style={{ margin: '8px 0 0' }}>{cur.text}</p>
        {cur.points && (
          <ul className="plist">
            {cur.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function ProductsTab({ goto }: { goto: Goto }) {
  return (
    <div>
      <h2>Products and pricing</h2>
      <p className="lead">
        What EE Shop sells, how it is priced, and the extras that hang off a plan. The product families themselves
        (Phone, SIMO, Tablet, MBB, Apple Watch) are on the overview page.
      </p>

      <h3>Bundles and pricing</h3>
      <p className="muted" style={{ margin: '4px 0 14px' }}>
        Pick a bundle to see how it is sold and how long the contract runs.
      </p>
      <Bundles />
      <div className="callout">{A2P}</div>

      <div className="section">
        <h3>What comes with a plan</h3>
        <p className="muted" style={{ margin: '4px 0 14px' }}>
          Once a price plan is chosen, three kinds of extras attach to it.
        </p>
        <ServiceMap />
      </div>

      <div className="section">
        <h3>Recommendations and promotions</h3>
        <p className="muted" style={{ margin: '4px 0 14px' }}>
          These only happen in the Upgrade journey.
        </p>
        <StepFlow steps={PEGA_STEPS} resetKey="pega" playLabel="Play upgrade offers" />
        <div className="callout">
          The process slides name Compass as the recommendations system, while the onboarding doc says PEGA recommends
          the device. It is worth confirming how the two relate.
        </div>
      </div>

      <div className="section">
        <h3>The Elevate programme</h3>
        <p className="muted" style={{ margin: '4px 0 14px' }}>
          Elevate is where broadband comes into the picture: a customer with EE broadband gets extra discounts or
          benefits on their mobile subscription.
        </p>
        <StepFlow steps={ELEVATE_STEPS} resetKey="elevate" playLabel="Play the check" />
        <div className="callout">
          A customer who has broadband but no mobile subscription is an Acquisition customer. They can use the
          authenticated acquisition journey to buy a phone.
        </div>
        <div className="row" style={{ marginTop: 14 }}>
          <button className="btn ghost small" onClick={() => goto('acq')}>
            Open the Acquisition journey
          </button>
        </div>
      </div>
      <NextBtn cur="products" goto={goto} />
    </div>
  );
}
