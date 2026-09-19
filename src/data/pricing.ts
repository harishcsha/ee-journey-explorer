import type { InfoItem, Plan, SeqStep } from '../types';

export const PLANS: Plan[] = [
  {
    id: 'payg',
    name: 'PAYG',
    full: 'Pay-As-You-Go',
    tagline: 'The customer pays for what they consume',
    facts: [['How it is charged', 'Based on how much the customer consumes']],
    bars: [],
  },
  {
    id: 'subsidy',
    name: 'PAYM Subsidy',
    full: 'Pay monthly, subsidy',
    tagline: 'Device and plan sold as one product',
    facts: [
      ['How it is sold', 'Device and price plan together, as a single product'],
      ['Contract length', '12 to 24 months'],
      ['Device loan', 'None. No EMI on the device'],
      ['Availability', 'No longer available to new users'],
    ],
    bars: [{ label: 'Device and plan', from: 12, to: 24 }],
  },
  {
    id: 'flex',
    name: 'PAYM Flex pay',
    full: 'Pay monthly, flex pay',
    tagline: 'Device and plan sold separately',
    facts: [
      ['How it is sold', 'Device and price plan sold individually'],
      ['Device contract', '24 to 36 months'],
      ['Plan contract', '24 months'],
      ['Device loan', 'Yes. The device can be sold as a loan (EMI)'],
      ['Charging', 'Monthly device cost (a fixed-sum loan agreement) and the service plan agreement can be charged separately'],
    ],
    bars: [
      { label: 'Device', from: 24, to: 36 },
      { label: 'Price plan', from: 24, to: 24 },
    ],
  },
];

export const A2P =
  'Add to Plan (A2P, written ATP in the terminology slides) sells an additional accessory or device that is recommended to the customer, so that they avoid an extra credit checkout.';

export const SERVICES: InfoItem[] = [
  {
    id: 'discounts',
    title: 'Discounts',
    tag: 'Hybris Promotion Engine',
    text: 'Discounts are either a product discount or a monthly discount. Hybris holds all the discounts and the promotion rules for devices.',
    points: ['Marketing enables a discount and communicates it to the customer'],
  },
  {
    id: 'addons',
    title: 'Add-ons and benefits',
    tag: 'Benefits and add-on rules',
    text: 'After the customer picks a plan (the doc uses "All Rounder Plan" as its example), they see which benefits they can add for free.',
    points: [
      'Examples: Netflix, music',
      'For upgrades the logic is more complex, because it depends on the current plan and current contract',
      'This is managed through a Hybris-based API that fetches details from Excalibur',
    ],
  },
  {
    id: 'insurance',
    title: 'Insurance',
    tag: 'Plan add-ons',
    text: 'Insurance is offered as a plan add-on. In the onboarding doc it is its own step in the acquisition journey, after the benefits step.',
  },
];

export const PEGA_STEPS: SeqStep[] = [
  {
    id: 'pick',
    label: 'Pick current device',
    title: 'The customer picks the device they have',
    text: 'While looking for an upgrade, the customer is asked to select their existing device.',
  },
  {
    id: 'pega',
    label: 'PEGA recommends',
    title: 'PEGA recommends another device',
    text: "PEGA suggests a device based on the customer's price plan and their usage.",
    tag: 'Upgrade only',
  },
  {
    id: 'promo',
    label: 'Promotions apply',
    title: 'The Hybris Promotion Engine adds discounts',
    text: 'Product or monthly discounts are held as rules per device in Hybris. Marketing enables them and communicates with the customer.',
  },
  {
    id: 'benefits',
    label: 'Benefits shown',
    title: 'Add-on benefits are worked out',
    text: 'For upgrades this depends on the current plan and current contract. Hybris calls Excalibur through an API to fetch the details.',
  },
];

export const ELEVATE_STEPS: SeqStep[] = [
  {
    id: 'change',
    label: 'Contract change',
    title: 'A mobile contract changes',
    text: 'Elevate is a microservice. It applies whenever a mobile contract changes: a new contract, a renewal, or a cancellation.',
  },
  {
    id: 'activate',
    label: 'Contract activates',
    title: 'The new mobile contract is activated',
    text: 'When a new mobile contract is placed and gets activated, it goes for a check.',
  },
  {
    id: 'check',
    label: 'Identity and broadband check',
    title: 'Does the customer have an identity and active broadband?',
    text: 'The check confirms the customer has now bought a mobile, has an identity (SAF lets customers create their own), and holds an active broadband account.',
  },
  {
    id: 'discount',
    label: 'Discounts applied',
    title: 'The respective discounts are applied',
    text: 'Hybris then promotes the discount to the customer, based on these external details.',
  },
];
