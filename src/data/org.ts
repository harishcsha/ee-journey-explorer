import type { OrgNode } from '../types';

export const ORG_LEVELS = ['Company', 'Business units', 'Functions', 'Areas', 'Tribes', 'Squads'];

/** The path that ends at the Mobile Shop Tribe, used as the default and by "Show me where we sit". */
export const ORG_HOME = ['btgroup', 'btdigital', 'consdigital', 'omnishop', 'mobiletribe'];

export const ORG: Record<string, OrgNode> = {
  btgroup: {
    label: 'BT Group',
    kids: ['btbusiness', 'openreach', 'btconsumer', 'btdigital', 'btnetworks'],
    text: 'The company. It is split into five business units. EE is one of the brands customers meet, and the EE Shop is built inside BT Digital.',
  },
  btbusiness: { label: 'BT Business', kids: [], text: 'A business unit serving business customers under the BT brand.' },
  openreach: { label: 'Openreach', kids: [], text: 'A business unit with its own Openreach brand.' },
  btconsumer: {
    label: 'BT Consumer',
    kids: [],
    text: 'The business unit that serves consumers under the EE brand. Its vision is to become the most personal, customer-focused technology brand in the UK.',
    pts: ['BT Digital sits alongside it and works to accelerate its growth ambitions'],
  },
  btdigital: {
    label: 'BT Digital',
    kids: ['bizdigital', 'consdigital'],
    text: "Leads BT Group's digital transformation, driving experience innovation and delivering the products and services customers need. Its mission is to accelerate BT Consumer's growth ambitions.",
    pts: [
      'Create and operate digital channels for all customers',
      'Design, build and manage all digital products and platforms for future growth',
      'Build new revenue streams for BT',
      'It cuts across the brands, and only the slice beside BT Consumer is relevant to the Mobile Shop Tribe',
    ],
  },
  btnetworks: { label: 'BT Networks', kids: [], text: 'A business unit that sits beside BT Digital in the group structure.' },
  bizdigital: { label: 'Business Digital', kids: [], text: 'The digital function for the business side of BT Digital.' },
  consdigital: {
    label: 'Consumer Digital',
    kids: ['gtm', 'omnishop', 'omniservice'],
    text: 'The digital function that works on the EE brand. It is split into three areas.',
  },
  gtm: { label: 'Go To Market Area', kids: [], text: 'One of the three Consumer Digital areas.' },
  omniservice: { label: 'Omni-Service Area', kids: [], text: 'One of the three Consumer Digital areas.' },
  omnishop: {
    label: 'Omni-Shop Area',
    kids: ['bbtribe', 'mobiletribe'],
    text: 'Responsible for creating the most personal, customer-focused tech shop in the UK, where anyone can easily buy any product BT chooses to offer.',
  },
  bbtribe: { label: 'Broadband Shop Tribe', kids: [], text: 'The other tribe in the Omni-Shop Area.' },
  mobiletribe: {
    label: 'Mobile Shop Tribe',
    kids: ['mobopt', 'flexpay', 'esim', 'conv', 'appshop', 'hybmig', 'airtime'],
    here: true,
    text: 'Responsible for the design, build, maintenance and optimisation of the Mobile Sales Journeys on EE Shop, on web and app.',
    pts: ['Focuses on the EE Digital Shop mobile products', 'Seven squads, listed below'],
  },
  mobopt: { label: 'Mobile Optimisation Squad', kids: [], text: 'A squad in the Mobile Shop Tribe.' },
  flexpay: { label: 'Flexpay Upgrade Squad', kids: [], text: 'A squad in the Mobile Shop Tribe.' },
  esim: { label: 'eSIM Squad', kids: [], text: 'A squad in the Mobile Shop Tribe.' },
  conv: { label: 'Convergence Squad', kids: [], text: 'A squad in the Mobile Shop Tribe.' },
  appshop: { label: 'App Shop Squad', kids: [], text: 'A squad in the Mobile Shop Tribe.' },
  hybmig: { label: 'Hybris Migration Squad', kids: [], text: 'A squad in the Mobile Shop Tribe.' },
  airtime: {
    label: 'Airtime Squad',
    kids: [],
    text: 'A squad in the Mobile Shop Tribe.',
    pts: ['The onboarding text lists seven squads including Airtime, but the org chart slide draws only six. Worth confirming.'],
  },
};

export const SUPPORT_TEAMS: { name: string; owns: string }[] = [
  { name: 'DevOps teams', owns: 'The charts folder (Kubernetes deployment) and the Development environment. Developers only extend it occasionally, for example to remove a feature toggle from a yaml file.' },
  { name: 'Performance Test team', owns: 'The perf-tests folder and the Performance environment.' },
  { name: 'QA teams', owns: 'The ui-tests folder: automated UI tests.' },
  { name: 'Release team', owns: 'The Stage / Pre-production environment. Developers raise a request to test their changes there.' },
  { name: 'SPA team', owns: 'Contract testing, keeping GraphQL queries in sync with the backend.' },
  { name: 'L2 team', owns: 'Queue-it, the traffic control.' },
  { name: 'Global Basket team', owns: 'The global basket, which it loads dynamically to reduce load time.' },
  { name: 'Marketing team', owns: 'Enabling discounts in the Hybris Promotion Engine and communicating them to customers.' },
];
