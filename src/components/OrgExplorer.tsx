import { useEffect, useRef, useState } from 'react';
import { ORG, ORG_HOME, ORG_LEVELS } from '../data/org';

/** BT Group org tree. Pick a box to open the next level down. */
export function OrgExplorer() {
  const [path, setPath] = useState<string[]>(ORG_HOME);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const walk = () => {
    clearTimeout(timer.current);
    let i = 1;
    const tick = () => {
      setPath(ORG_HOME.slice(0, i));
      i++;
      if (i <= ORG_HOME.length) timer.current = setTimeout(tick, 900);
    };
    tick();
  };

  const rows: string[][] = [['btgroup']];
  path.forEach((id) => {
    if (ORG[id].kids.length) rows.push(ORG[id].kids);
  });
  const sel = ORG[path[path.length - 1]];

  return (
    <div>
      <div className="row" style={{ marginBottom: 12 }}>
        <button className="btn small" onClick={walk}>
          Show where the Mobile Shop Tribe sits
        </button>
        <button
          className="btn small ghost"
          onClick={() => {
            clearTimeout(timer.current);
            setPath(['btgroup']);
          }}
        >
          Start from the top
        </button>
      </div>
      <div className="org">
        {rows.map((row, i) => (
          <div className="org-row" key={`${i}:${path[i - 1] ?? 'root'}`}>
            <div className="org-label">{ORG_LEVELS[i]}</div>
            <div className="org-nodes">
              {row.map((id) => {
                const n = ORG[id];
                const on = path[i] === id && i === path.length - 1;
                const inside = path[i] === id && !on;
                const cls = ['mn', n.here && !on ? 'focus' : '', on ? 'on' : '', inside ? 'in' : '']
                  .filter(Boolean)
                  .join(' ');
                return (
                  <button key={id} className={cls} onClick={() => setPath(path.slice(0, i).concat(id))}>
                    {n.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <div className="swap" key={path[path.length - 1]}>
          {sel.here && <span className="chip hl">Where this project sits</span>}
          <h3 style={{ margin: '8px 0 6px' }}>{sel.label}</h3>
          <p style={{ marginBottom: 0 }}>{sel.text}</p>
          {sel.pts && (
            <ul className="plist">
              {sel.pts.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
