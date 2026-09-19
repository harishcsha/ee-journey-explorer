export type TabId = 'overview' | 'acq' | 'upg' | 'products' | 'sys' | 'eng' | 'teams' | 'terms';
export type JourneyKey = 'acq' | 'upgrade' | 'addline';
export type FlowKey = 'acq' | 'upg';
export type Basket = 'single' | 'multi';

export type SysId =
  | 'excal'
  | 'compass'
  | 'myeeweb'
  | 'myeeapp'
  | 'shop'
  | 'aem'
  | 'om'
  | 'sap'
  | 'cpci';

export interface SystemInfo {
  name: string;
  purpose: string;
  used: string[];
  note?: string;
  team: string | null;
}

export interface Team {
  id: string;
  name: string;
  sys: SysId[];
}

export interface OverviewNode {
  label: string;
  sub: string;
  tag: string;
  focus?: boolean;
  kids: string[];
  text: string;
  pts: string[];
  jump?: { tab: TabId; jk?: JourneyKey; label: string };
}

export type WireType =
  | 'login0'
  | 'login2'
  | 'nav'
  | 'home'
  | 'recs'
  | 'gallery'
  | 'pdp'
  | 'extras'
  | 'delivery'
  | 'checkout'
  | 'confirm';

export interface Step {
  id: string;
  kind: 'gate' | 'page';
  tag?: string;
  short: string;
  title: string;
  wire: WireType;
  url?: string;
  text: string;
  notes: string[];
  sys: SysId[];
  na?: string;
  only?: boolean;
}

export interface Journey {
  title: string;
  who: string;
  login: string;
  steps: Step[];
}

export interface FlowNode {
  id: string;
  sys?: SysId;
  kind?: 'doc' | 'plain' | 'cust' | 'actor' | 'entry' | 'api';
  x: number;
  y: number;
  rx: number;
  ry: number;
  l: string[];
  info?: string;
  basket?: Basket;
}

export interface FlowEdge {
  id: string;
  a: string;
  b: string;
  label?: string;
  dashed?: boolean;
  basket?: Basket;
}

export interface FlowStep {
  title: string;
  text: string;
  nodes: string[];
  edges: string[];
  basket?: Basket;
}

export interface Flow {
  title: string;
  box?: { x: number; y: number; w: number; h: number; label: string; lx: number; ly: number };
  nodes: FlowNode[];
  edges: FlowEdge[];
  steps: FlowStep[];
}

export interface GoOpts {
  jk?: JourneyKey;
  flow?: FlowKey;
  sel?: string | null;
}

export type Goto = (tab: TabId, opts?: GoOpts) => void;

export interface SysFocus {
  flow: FlowKey;
  sel: string | null;
  n: number;
}

/** One step in a simple left-to-right sequence (release flow, Elevate check, and so on). */
export interface SeqStep {
  id: string;
  label: string;
  title: string;
  text: string;
  tag?: string;
  points?: string[];
}

/** A selectable card with a title, optional tag and path, body text and bullet points. */
export interface InfoItem {
  id: string;
  title: string;
  tag?: string;
  path?: string;
  text: string;
  points?: string[];
}

export interface OrgNode {
  label: string;
  kids: string[];
  text: string;
  pts?: string[];
  here?: boolean;
}

export interface Plan {
  id: string;
  name: string;
  full: string;
  tagline: string;
  facts: [string, string][];
  /** Contract lengths in months. from === to draws a single marker. */
  bars: { label: string; from: number; to: number }[];
}
