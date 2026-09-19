import type { TabId } from '../types';

export const TABS: { id: TabId; n: number; label: string }[] = [
  { id: 'overview', n: 1, label: 'EE Overview' },
  { id: 'acq', n: 2, label: 'Acquisition Journey' },
  { id: 'upg', n: 3, label: 'Upgrade / Add Line' },
  { id: 'products', n: 4, label: 'Products and Pricing' },
  { id: 'sys', n: 5, label: 'Systems and Shop Process' },
  { id: 'eng', n: 6, label: 'Front-end Engineering' },
  { id: 'teams', n: 7, label: 'Teams and Organisation' },
  { id: 'terms', n: 8, label: 'Terminology' },
];
