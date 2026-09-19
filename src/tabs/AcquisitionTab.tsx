import { Journey } from '../components/Journey';
import { NextBtn } from '../components/NextBtn';
import type { Goto } from '../types';

export function AcquisitionTab({ goto }: { goto: Goto }) {
  return (
    <div>
      <h2>Acquisition journey</h2>
      <p className="lead">
        A new customer, not logged in, buys a product with EE. Step through the pages below or press Play to watch the
        customer travel from the first landing to the confirmation email.
      </p>
      <Journey jk="acq" goto={goto} />
      <div className="callout">
        There is an authenticated acquisition journey too. A customer who already has EE broadband and wants to buy a
        phone logs in first, and the Elevate programme can then apply their broadband discounts.
      </div>
      <div className="section card flat">
        <h3>Behind the scenes</h3>
        <p className="muted" style={{ margin: '6px 0 12px' }}>
          When the customer presses order, the system work starts: account creation, order management and
          fulfilment.
        </p>
        <button className="btn" onClick={() => goto('sys', { flow: 'acq' })}>
          Watch the acquisition order flow
        </button>
      </div>
      <NextBtn cur="acq" goto={goto} />
    </div>
  );
}
