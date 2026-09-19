export interface CheckerState {
  len: number;
  m: number;
  credit: 'high' | 'low';
  consumer: boolean;
  collections: boolean;
  acctOld: boolean;
  annualOk: boolean;
  earlyOk: boolean;
}

export interface Evaluation {
  label: string;
  up: boolean;
  add: boolean;
  window: 'standard' | 'early' | 'annual' | 'future' | 'none';
}

export const INITIAL_CHECKER: CheckerState = {
  len: 24,
  m: 8,
  credit: 'high',
  consumer: true,
  collections: false,
  acctOld: true,
  annualOk: false,
  earlyOk: true,
};

/**
 * Maps a customer's position in their contract and account status to one of
 * the login scenarios from the deck (slides 13 and 14).
 *
 * Simplified on purpose: "Add Line Only" shares its window with
 * "Standard Upgrade in the future and Add Line", so it is never returned.
 */
export function evaluate(s: CheckerState): Evaluation {
  if (!s.consumer) return { label: 'Not Eligible', up: false, add: false, window: 'none' };

  const add = s.credit === 'high' && !s.collections && s.acctOld;
  const standard = s.len - s.m <= 1.5; // within 45 days of contract end
  if (standard) return { label: add ? 'Upgrade and Add Line' : 'Upgrade Only', up: true, add, window: 'standard' };

  const annual = s.m >= 12 && s.annualOk;
  const early = s.m >= 6 && s.earlyOk;

  if (early && annual) {
    return {
      label: add
        ? 'Early Upgrade and Annual Upgrade and Add Line'
        : 'Early Upgrade and Annual Upgrade',
      up: true,
      add,
      window: 'early',
    };
  }
  if (early) return { label: add ? 'Early Upgrade and Add Line' : 'Early Upgrade only', up: true, add, window: 'early' };
  if (annual) return { label: add ? 'Annual Upgrade and Add Line' : 'Annual Upgrade Only', up: true, add, window: 'annual' };

  return {
    label: add ? 'Standard Upgrade in the future and Add Line' : 'Standard Upgrade in the future',
    up: false,
    add,
    window: 'future',
  };
}
