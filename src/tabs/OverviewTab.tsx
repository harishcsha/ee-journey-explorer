import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { NextBtn } from '../components/NextBtn';
import { NODES, ROOT, TOUR } from '../data/overview';
import type { Goto } from '../types';

export function OverviewTab({ goto }: { goto: Goto }) {
  const [path, setPath] = useState<string[]>([]);
  const [touring, setTouring] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const scroller = useRef<HTMLDivElement>(null);

  const stop = () => {
    clearTimeout(timer.current);
    setTouring(false);
  };

  const play = () => {
    clearTimeout(timer.current);
    setTouring(true);
    let i = 0;
    const tick = () => {
      setPath(TOUR[i]);
      i++;
      if (i < TOUR.length) timer.current = setTimeout(tick, 3400);
      else setTouring(false);
    };
    tick();
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    scroller.current?.scrollTo({ left: scroller.current.scrollWidth, behavior: 'smooth' });
  }, [path.length]);

  const cols: string[][] = [ROOT];
  path.forEach((id) => {
    if (NODES[id].kids.length) cols.push(NODES[id].kids);
  });
  const sel = path.length ? NODES[path[path.length - 1]] : null;

  const pick = (colIndex: number, id: string) => {
    stop();
    setPath(path.slice(0, colIndex).concat(id));
  };

  return (
    <div>
      <h2>How EE sells, and where the Shop fits</h2>
      <p className="lead">
        EE trades through four channels. This page zooms into Digital, then into EE Shop, then into the three journeys.
        Click any box to open the next level, or let the tour do it for you.
      </p>
      <div className="row" style={{ marginBottom: 6 }}>
        <button className="btn" onClick={touring ? stop : play}>
          {touring ? 'Pause tour' : 'Play the tour'}
        </button>
        <button
          className="btn ghost"
          onClick={() => {
            stop();
            setPath([]);
          }}
        >
          Reset
        </button>
      </div>

      <div className="miller" ref={scroller}>
        {cols.map((col, ci) => (
          <div
            className="mcol"
            key={`${ci}:${ci > 0 ? path[ci - 1] : 'root'}`}
            style={{ '--i': ci } as CSSProperties}
          >
            {col.map((id) => {
              const n = NODES[id];
              const on = path[ci] === id && ci === path.length - 1;
              const inside = path[ci] === id && !on;
              const cls = ['mn', n.focus && !on ? 'focus' : '', on ? 'on' : '', inside ? 'in' : '', n.kids.length ? 'has' : '']
                .filter(Boolean)
                .join(' ');
              return (
                <button key={id} className={cls} onClick={() => pick(ci, id)}>
                  {n.label}
                  {n.sub && <small>{n.sub}</small>}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="card">
        <div className="detail-in" key={path.join('/')}>
        {sel ? (
          <>
            <div className="swap">
              <span className={`chip ${sel.focus ? 'hl' : ''}`}>{sel.tag}</span>
              <h3 style={{ margin: '10px 0 6px' }}>
                {sel.label}
                {sel.sub ? ` (${sel.sub})` : ''}
              </h3>
              <p>{sel.text}</p>
              {sel.jump && (
                <button className="btn" onClick={() => goto(sel.jump!.tab, { jk: sel.jump!.jk })}>
                  {sel.jump.label}
                </button>
              )}
            </div>
            <div className="swap">
              <b>Good to know</b>
              <ul className="pts">
                {(sel.pts.length ? sel.pts : ['Pick a box in the next column to keep going']).map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="swap">
              <h3>Start with the channels</h3>
              <p style={{ marginTop: 8 }}>
                Retail stores, Indirect (third parties), Customer Services and Digital all sell EE products and
                services. This site follows Digital, and inside it the EE Shop.
              </p>
            </div>
            <div className="swap">
              <b>The rest of the deck</b>
              <ul className="pts">
                <li>Acquisition: how a new customer buys</li>
                <li>Upgrade and Add Line: how an existing customer buys</li>
                <li>Systems and teams behind the order</li>
                <li>The vocabulary used along the way</li>
              </ul>
            </div>
          </>
        )}
        </div>
      </div>
      <NextBtn cur="overview" goto={goto} />
    </div>
  );
}
