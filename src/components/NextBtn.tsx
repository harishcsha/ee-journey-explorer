import { TABS } from '../data/tabs';
import type { Goto, TabId } from '../types';

export function NextBtn({ cur, goto }: { cur: TabId; goto: Goto }) {
  const i = TABS.findIndex((t) => t.id === cur);
  const next = TABS[i + 1];
  if (!next) return null;
  return (
    <div className="next">
      <button className="btn" onClick={() => goto(next.id)}>
        Next: {next.label}
      </button>
    </div>
  );
}
