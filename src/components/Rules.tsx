import { useState } from 'react';

type ProductKey = 'phone' | 'simov' | 'simod' | 'tablet' | 'mbb';

const PRODUCTS: Record<ProductKey, { label: string; kind: 'voice' | 'data' }> = {
  phone: { label: 'Phone / device', kind: 'voice' },
  simov: { label: 'SIMO (voice)', kind: 'voice' },
  simod: { label: 'SIMO (data)', kind: 'data' },
  tablet: { label: 'Tablet', kind: 'data' },
  mbb: { label: 'MBB', kind: 'data' },
};

/** Slide 15: voice products cannot upgrade to data products, and vice versa. */
export function Rules() {
  const [cur, setCur] = useState<ProductKey>('phone');
  const kind = PRODUCTS[cur].kind;

  return (
    <div className="card">
      <p className="muted" style={{ marginBottom: 10 }}>
        Rule from the deck: a customer cannot upgrade from a voice-type product to a data-type product, or the other
        way round. Pick what the customer has today.
      </p>
      <div className="chips">
        {(Object.keys(PRODUCTS) as ProductKey[]).map((k) => (
          <button key={k} className={`chip ${cur === k ? 'hl' : ''}`} onClick={() => setCur(k)}>
            {PRODUCTS[k].label}
          </button>
        ))}
      </div>
      <div className="pr">
        <div className={kind === 'voice' ? 'yes' : 'no'} key={`${cur}v`}>
          {kind === 'voice' ? 'Allowed' : 'Not allowed'}
          <div className="small muted" style={{ fontWeight: 400 }}>
            Upgrade to Voice (Device / SIMO)
          </div>
        </div>
        <div className={kind === 'data' ? 'yes' : 'no'} key={`${cur}d`}>
          {kind === 'data' ? 'Allowed' : 'Not allowed'}
          <div className="small muted" style={{ fontWeight: 400 }}>
            Upgrade to Data (SIMO, Tablet, MBB)
          </div>
        </div>
      </div>
      <p className="small muted" style={{ margin: '12px 0 0' }}>
        The deck lists SIMO under both Voice and Data, so this page splits it into two entries. Worth confirming which
        applies to a given plan.
      </p>
    </div>
  );
}
