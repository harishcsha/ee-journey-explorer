import { SYSTEMS } from '../data/systems';
import type { FlowKey, Goto, SysId } from '../types';

interface Props {
  id: SysId;
  goto: Goto;
  flow: FlowKey;
}

export function SysChip({ id, goto, flow }: Props) {
  const s = SYSTEMS[id];
  return (
    <button className="chip" title={`Open ${s.name} in Systems`} onClick={() => goto('sys', { flow, sel: id })}>
      {s.name}
    </button>
  );
}
