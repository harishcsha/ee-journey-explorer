import type { ReactNode } from 'react';
import type { WireType } from '../types';

function Bar({ w, h = 10, d = 0 }: { w: string; h?: number; d?: number }) {
  return <i className="sk" style={{ width: w, height: h, animationDelay: `${d}s` }} />;
}

const views: Record<WireType, () => ReactNode> = {
  login0: () => (
    <>
      <div className="w-top">
        <span className="w-logo">EE</span>
        <span className="w-menu">
          <span>Phones</span>
          <span>SIM only</span>
        </span>
        <span style={{ flex: 1 }} />
        <span className="w-pill dim">Log in</span>
      </div>
      <div className="w-hero">Browsing as a guest</div>
      <div className="row">
        <span className="w-pill hl">L0</span>
        <span className="small muted">Not logged into the Shop site</span>
      </div>
      <Bar w="80%" h={12} />
      <Bar w="55%" d={0.2} />
    </>
  ),
  login2: () => (
    <>
      <div className="w-top">
        <span className="w-logo">EE</span>
        <span style={{ flex: 1 }} />
        <span className="w-pill">Logged in</span>
      </div>
      <div className="w-row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <b className="small">Sign in</b>
        <Bar w="100%" h={24} />
        <Bar w="100%" h={24} d={0.1} />
        <span className="w-btn">Log in</span>
      </div>
      <div className="row">
        <span className="w-pill hl">L2</span>
        <span className="small muted">Identity confirmed by CPCI</span>
      </div>
      <div className="w-row">
        <span className="w-box on">✓</span>
        <span className="small">Account details loaded from Excalibur</span>
      </div>
    </>
  ),
  nav: () => (
    <>
      <div className="w-top">
        <span className="w-logo">EE</span>
        <span className="w-menu">
          <span className="on">Phones</span>
          <span>SIM only</span>
          <span>Tablets</span>
          <span>MBB</span>
          <span>Apple Watch</span>
        </span>
      </div>
      <div className="w-mega">
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <Bar w="70%" h={12} d={i * 0.1} />
            <Bar w="90%" h={9} d={i * 0.1 + 0.05} />
            <Bar w="60%" h={9} d={i * 0.1 + 0.1} />
            <Bar w="80%" h={9} d={i * 0.1 + 0.15} />
          </div>
        ))}
      </div>
      <div className="w-hero" style={{ height: 70 }}>
        Content served through AEM
      </div>
    </>
  ),
  home: () => (
    <>
      <div className="w-top">
        <span className="w-logo">EE</span>
        <span className="w-menu">
          <span className="on">Mobile</span>
          <span>Broadband</span>
        </span>
      </div>
      <div className="w-hero">Shop mobile</div>
      <div className="w-grid">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-tile" style={{ animationDelay: `${i * 0.12}s` }}>
            <div className="w-img">▣</div>
            <Bar w="80%" />
            <Bar w="50%" h={8} />
          </div>
        ))}
      </div>
    </>
  ),
  recs: () => (
    <>
      <div className="w-top">
        <span className="w-logo">EE</span>
        <b>Recommended for you</b>
      </div>
      <div className="w-grid">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-tile" style={{ animationDelay: `${i * 0.18}s` }}>
            <span className="compass">Compass pick</span>
            <div className="w-img">▣</div>
            <Bar w="85%" />
            <Bar w="55%" h={8} />
            <span className="w-pill">Upgrade</span>
          </div>
        ))}
      </div>
      <div className="small muted">Received from Compass when the customer logs in.</div>
    </>
  ),
  gallery: () => (
    <>
      <div className="w-top">
        <span className="w-menu">
          <span className="on">Pay monthly</span>
          <span>SIM only</span>
        </span>
      </div>
      <div className="w-grid">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-tile" style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="w-img">▣</div>
            <Bar w="80%" h={9} />
            <Bar w="45%" h={8} />
          </div>
        ))}
      </div>
    </>
  ),
  pdp: () => (
    <div className="w-two">
      <div className="w-img" style={{ height: 170, fontSize: '2.4rem' }}>
        ▣
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <b>Samsung Galaxy S23 5G</b>
        <div>
          <div className="small muted">Colour</div>
          <div className="sw-dots">
            <b className="on" style={{ background: '#eee6d0' }} />
            <b style={{ background: '#2b2b2b' }} />
            <b style={{ background: '#7a9a7d' }} />
          </div>
        </div>
        <div>
          <div className="small muted">Capacity</div>
          <div className="row">
            <span className="w-opt">128GB</span>
            <span className="w-opt on">256GB</span>
          </div>
        </div>
        <Bar w="60%" h={14} />
        <span className="w-btn">Add to basket</span>
      </div>
    </div>
  ),
  extras: () => (
    <>
      <b>Choose your extras</b>
      {[0, 1, 2, 3].map((i) => {
        const checked = i === 1 || i === 2;
        return (
          <div key={i} className="w-row" style={{ animationDelay: `${i * 0.1}s` }}>
            <span className={`w-box ${checked ? 'on' : ''}`} style={{ animationDelay: `${0.4 + i * 0.2}s` }}>
              {checked ? '✓' : ''}
            </span>
            <Bar w={`${60 - i * 6}%`} />
            <span style={{ flex: 1 }} />
            <Bar w="14%" />
          </div>
        );
      })}
    </>
  ),
  delivery: () => (
    <>
      <b>How should we deliver it?</b>
      {[0, 1].map((i) => (
        <div key={i} className="w-row" style={{ animationDelay: `${i * 0.12}s` }}>
          <span className={`w-radio ${i === 0 ? 'on' : ''}`} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Bar w="50%" h={11} />
            <Bar w="70%" h={8} />
          </div>
        </div>
      ))}
      <div className="row">
        <span className="w-pill hl">POID</span>
        <span className="small muted">Proof of identity on delivery</span>
      </div>
    </>
  ),
  checkout: () => (
    <>
      <div className="w-steps">
        <span className="on">Personal details</span>
        <span>›</span>
        <span>Address</span>
        <span>›</span>
        <span>Payment</span>
      </div>
      {['First name', 'Last name', 'Email', 'Phone'].map((label, i) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span className="small muted">{label}</span>
          <Bar w="100%" h={24} d={i * 0.1} />
        </div>
      ))}
      <span className="w-btn">Continue</span>
    </>
  ),
  confirm: () => (
    <div className="center" style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
      <div className="w-done">✓</div>
      <b>Thanks, your order is confirmed</b>
      <Bar w="70%" />
      <Bar w="50%" h={9} />
      <span className="w-pill dim">Confirmation email sent</span>
    </div>
  ),
};

interface Props {
  type: WireType;
  url?: string;
  /** Changes when the screen should replay its entrance animation. */
  animKey: string;
}

/** A skeleton browser window that sketches the page a journey step refers to. */
export function Wire({ type, url, animKey }: Props) {
  return (
    <div className="browser">
      <div className="bar">
        <i />
        <i />
        <i />
        <div className="addr" title={url ?? ''}>
          {url ?? 'shop.ee.co.uk'}
        </div>
      </div>
      <div className="screen" key={animKey}>
        {views[type]()}
      </div>
    </div>
  );
}
