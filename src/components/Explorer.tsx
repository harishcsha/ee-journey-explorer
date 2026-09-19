import { useMemo, useState } from 'react';
import type { InfoItem } from '../types';

interface Props {
  items: InfoItem[];
  /** Show tag filter chips above the list. */
  filter?: boolean;
}

/** A list of selectable items with a detail card that updates in place. */
export function Explorer({ items, filter = false }: Props) {
  const tags = useMemo(
    () => ['All', ...Array.from(new Set(items.map((i) => i.tag).filter((t): t is string => Boolean(t))))],
    [items],
  );
  const [tag, setTag] = useState('All');
  const [sel, setSel] = useState(items[0].id);

  const shown = items.filter((i) => tag === 'All' || i.tag === tag);
  const cur = shown.find((i) => i.id === sel) ?? shown[0];

  return (
    <div>
      {filter && (
        <div className="chips xp-tags">
          {tags.map((t) => (
            <button key={t} className={`chip ${tag === t ? 'hl' : ''}`} onClick={() => setTag(t)}>
              {t}
            </button>
          ))}
        </div>
      )}
      <div className="xp">
        <div className="xp-list">
          {shown.map((i) => (
            <button key={i.id} className={`xp-item ${i.id === cur.id ? 'on' : ''}`} onClick={() => setSel(i.id)}>
              <b>{i.title}</b>
              {i.tag && <small>{i.tag}</small>}
            </button>
          ))}
        </div>
        <div className="card">
          <div className="swap" key={cur.id}>
            {cur.tag && <span className="chip">{cur.tag}</span>}
            <h3 style={{ margin: '8px 0 6px' }}>{cur.title}</h3>
            {cur.path && <div className="pth">{cur.path}</div>}
            <p style={{ marginBottom: 0 }}>{cur.text}</p>
            {cur.points && (
              <ul className="plist">
                {cur.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
