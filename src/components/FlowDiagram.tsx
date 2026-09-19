import { trimEdge } from '../lib/geometry';
import type { Basket, Flow, FlowNode, FlowStep } from '../types';

interface Props {
  flow: Flow;
  basket: Basket;
  steps: FlowStep[];
  idx: number;
  flowKey: string;
  sel: string | null;
  onSelect: (key: string) => void;
}

const MARKERS: [string, string][] = [
  ['a0', 'var(--line)'],
  ['a1', 'var(--teal)'],
  ['a2', 'var(--teal-d)'],
];

/**
 * SVG order-flow diagram. Nodes and edges are lit for the current step, tinted
 * once already used, and faint otherwise. Packets travel along active edges.
 */
export function FlowDiagram({ flow, basket, steps, idx, flowKey, sel, onSelect }: Props) {
  const cur = steps[idx];
  const map: Record<string, FlowNode> = {};
  flow.nodes.forEach((n) => (map[n.id] = n));

  const seenN = new Set<string>();
  const seenE = new Set<string>();
  for (let k = 0; k < idx; k++) {
    steps[k].nodes.forEach((x) => seenN.add(x));
    steps[k].edges.forEach((x) => seenE.add(x));
  }
  const onN = new Set(cur.nodes);
  const onE = new Set(cur.edges);
  const level = (id: string) => (onE.has(id) ? 2 : seenE.has(id) ? 1 : 0);

  return (
    <>
    <div className="flowbox">
      <svg viewBox="0 0 1000 520" role="img" aria-label={flow.title}>
        <defs>
          {MARKERS.map(([id, fill]) => (
            <marker key={id} id={id} markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0 0L10 5L0 10z" style={{ fill }} />
            </marker>
          ))}
        </defs>

        {flow.box && (
          <>
            <rect className="hgroup" x={flow.box.x} y={flow.box.y} width={flow.box.w} height={flow.box.h} rx="34" />
            <text className="glabel" x={flow.box.lx} y={flow.box.ly}>
              {flow.box.label}
            </text>
          </>
        )}

        {flow.edges.map((e) => {
          const t = trimEdge(map[e.a], map[e.b]);
          const d = `M${t[0].toFixed(1)} ${t[1].toFixed(1)}L${t[2].toFixed(1)} ${t[3].toFixed(1)}`;
          const L = level(e.id);
          const off = e.basket && e.basket !== basket;
          return (
            <g key={e.id} style={{ opacity: off ? 0.25 : 1, transition: 'opacity .3s' }}>
              <path
                className={`edge ${e.dashed ? 'dashed ' : ''}${L === 2 ? 'on' : L === 1 ? 'seen' : ''}`}
                d={d}
                markerEnd={`url(#a${L})`}
              />
              {e.label && (
                <text
                  className={`elabel ${L === 2 ? 'on' : ''}`}
                  x={(t[0] + t[2]) / 2}
                  y={(t[1] + t[3]) / 2 - 8}
                  textAnchor="middle"
                >
                  {e.label}
                </text>
              )}
              {L === 2 &&
                [0, 0.6, 1.2].map((delay) => (
                  <circle key={`${e.id}-${delay}-${idx}-${flowKey}-${basket}`} className="pkt" r="5">
                    <animateMotion dur="1.8s" begin={`${delay}s`} repeatCount="indefinite" path={d} />
                  </circle>
                ))}
            </g>
          );
        })}

        {flow.nodes.map((n) => {
          const key = n.sys ?? n.id;
          const cls = [
            'node',
            n.kind ?? 'sys',
            onN.has(n.id) ? 'on' : seenN.has(n.id) ? 'seen' : '',
            n.basket && n.basket !== basket ? 'branchdim' : '',
            sel === key ? 'sel' : '',
          ]
            .filter(Boolean)
            .join(' ');
          return (
            <g
              key={n.id}
              className={cls}
              role="button"
              tabIndex={0}
              aria-label={n.l.join(' ')}
              onClick={() => onSelect(key)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(key);
                }
              }}
            >
              {n.kind === 'doc' ? (
                <rect className="shape" x={n.x - n.rx} y={n.y - n.ry} width={n.rx * 2} height={n.ry * 2} rx="8" />
              ) : (
                <ellipse className="shape" cx={n.x} cy={n.y} rx={n.rx} ry={n.ry} />
              )}
              {n.l.map((line, i) => (
                <text
                  key={line}
                  x={n.x}
                  y={n.y + (i - (n.l.length - 1) / 2) * 17}
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
    <p className="swipe">Swipe sideways to see the whole diagram.</p>
    </>
  );
}
