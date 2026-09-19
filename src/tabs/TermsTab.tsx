import { useState } from 'react';
import { TERM_CATS, TERMS } from '../data/terms';

export function TermsTab() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');

  const s = q.trim().toLowerCase();
  const list = TERMS.filter(
    (t) => (cat === 'All' || t[2] === cat) && (!s || t[0].toLowerCase().includes(s) || t[1].toLowerCase().includes(s)),
  );

  return (
    <div>
      <h2>Terminology</h2>
      <p className="lead">
        Every term from the five terminology slides, plus a few the deck uses without defining. Search, or filter by
        topic.
      </p>
      <input
        className="search"
        type="search"
        placeholder="Search terms, e.g. CTN or upgrade"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search terms"
      />
      <div className="chips" style={{ marginTop: 12 }}>
        {TERM_CATS.map((c) => (
          <button key={c} className={`chip ${cat === c ? 'hl' : ''}`} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="gl">
        {list.map((t, i) => (
          <div className="t" key={t[0]} style={{ animationDelay: `${Math.min(i, 10) * 0.02}s` }}>
            <b>{t[0]}</b>
            <div>{t[1]}</div>
            <div className="cat">{t[2]}</div>
          </div>
        ))}
      </div>
      {list.length === 0 && (
        <p className="muted" style={{ marginTop: 20 }}>
          No term matches "{q}". Try a shorter word or pick All.
        </p>
      )}
    </div>
  );
}
