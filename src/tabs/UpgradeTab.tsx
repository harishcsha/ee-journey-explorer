import { Checker } from '../components/Checker';
import { Seg } from '../components/controls';
import { Journey } from '../components/Journey';
import { NextBtn } from '../components/NextBtn';
import { Rules } from '../components/Rules';
import type { Goto, JourneyKey } from '../types';

interface Props {
  jk: JourneyKey;
  setJk: (k: JourneyKey) => void;
  goto: Goto;
}

export function UpgradeTab({ jk, setJk, goto }: Props) {
  return (
    <div>
      <h2>Upgrade and Add Line journeys</h2>
      <p className="lead">
        Existing customers log in (L2) and the Shop works out what they can do. Which journey they get depends on the
        login scenario, and that in turn depends on how far into the contract they are and on their account.
      </p>
      <div className="row" style={{ marginBottom: 14 }}>
        <Seg
          opts={[
            ['upgrade', 'Upgrade'],
            ['addline', 'Add Line'],
          ]}
          val={jk === 'acq' ? 'upgrade' : jk}
          on={setJk}
        />
      </div>
      <Journey jk={jk} goto={goto} />

      <div className="section">
        <h3>What can this customer do today?</h3>
        <p className="muted" style={{ margin: '4px 0 14px' }}>
          Move the sliders to place a customer on their contract and see which of the deck's twelve login scenarios
          they land in.
        </p>
        <Checker
          setJk={(k) => {
            setJk(k);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>

      <div className="section">
        <h3>Which products can be swapped for which</h3>
        <div style={{ marginTop: 12 }}>
          <Rules />
        </div>
      </div>

      <div className="section card flat">
        <h3>Behind the scenes</h3>
        <p className="muted" style={{ margin: '6px 0 12px' }}>
          Excalibur and Compass feed the Shop when the customer logs in, and orders are fulfilled through SAP.
        </p>
        <button className="btn" onClick={() => goto('sys', { flow: 'upg' })}>
          Watch the upgrade order flow
        </button>
      </div>
      <NextBtn cur="upg" goto={goto} />
    </div>
  );
}
