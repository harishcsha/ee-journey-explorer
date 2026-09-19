import type { FlowNode } from '../types';

/** Line between two ellipses, trimmed to their outlines so arrowheads stay visible. */
export function trimEdge(a: FlowNode, b: FlowNode): [number, number, number, number] {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const ta = (1 / Math.sqrt((dx / a.rx) ** 2 + (dy / a.ry) ** 2)) * 1.04;
  const tb = (1 / Math.sqrt((dx / b.rx) ** 2 + (dy / b.ry) ** 2)) * 1.1;
  return [a.x + dx * ta, a.y + dy * ta, b.x - dx * tb, b.y - dy * tb];
}
