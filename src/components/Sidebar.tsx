import { useEffect, useRef, type CSSProperties } from 'react';
import { TABS } from '../data/tabs';
import type { TabId } from '../types';
import { Logo } from './Logo';

const HINTS: Record<TabId, string> = {
  overview: 'Channels, Digital and EE Shop',
  acq: 'How a new customer buys',
  upg: 'Existing customers, eligibility checker',
  products: 'Bundles, plan extras, Elevate',
  sys: 'Animated order flows',
  eng: 'SPA, repo, CI/CD, environments',
  teams: 'BT org structure and owners',
  terms: 'Searchable glossary',
};

interface Props {
  open: boolean;
  tab: TabId;
  onClose: () => void;
  onSelect: (id: TabId) => void;
}

/**
 * Slide-in section menu. It stays mounted so it can animate out, and uses
 * visibility to keep it out of the tab order while closed.
 */
export function Sidebar({ open, tab, onClose, onSelect }: Props) {
  const panel = useRef<HTMLElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = panel.current?.querySelectorAll<HTMLElement>('button');
      if (!items || items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <>
      <div className={`sb-scrim ${open ? 'open' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside
        id="sidebar"
        ref={panel}
        className={`sb ${open ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Sections"
        aria-hidden={!open}
      >
        <div className="sb-head">
          <Logo />
          <strong>Sections</strong>
          <button ref={closeBtn} className="sb-close" aria-label="Close menu" onClick={onClose}>
            ✕
          </button>
        </div>
        <nav className="sb-nav" aria-label="Sections">
          <ol className="sb-list">
            {TABS.map((t, i) => (
              <li key={t.id}>
                <button
                  className={`sb-item ${t.id === tab ? 'on' : ''}`}
                  style={{ '--i': i } as CSSProperties}
                  aria-current={t.id === tab ? 'page' : undefined}
                  onClick={() => onSelect(t.id)}
                >
                  <span className="sb-n">{t.n}</span>
                  <span className="sb-t">
                    <b>{t.label}</b>
                    <small>{HINTS[t.id]}</small>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
        <div className="sb-foot">Digital, CRM and Insight, CDS&amp;M, eCommerce</div>
      </aside>
    </>
  );
}
