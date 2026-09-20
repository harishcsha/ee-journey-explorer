import { useCallback, useRef, useState } from 'react';
import { TABS } from '../data/tabs';
import type { TabId } from '../types';
import { Logo } from './Logo';
import './nav.css';
import { Sidebar } from './Sidebar';

interface Props {
  tab: TabId;
  isDark: boolean;
  onSelect: (id: TabId) => void;
  onToggleTheme: () => void;
}

/** Sticky top bar with a menu button that opens the section sidebar. */
export function NavBar({ tab, isDark, onSelect, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const current = TABS.find((t) => t.id === tab)!;

  const close = useCallback(() => {
    setOpen(false);
    menuBtn.current?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <header className="nb">
        <div className="nb-in">
          <button
            ref={menuBtn}
            className="nb-menu"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="sidebar"
            onClick={() => setOpen(true)}
          >
            <span className="nb-burger" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>

          <div className="nb-brand">
            <Logo />
            <div className="nb-titles">
              <h1>EE Shop Journey Explorer</h1>
              <div className="nb-sub">
                <span className="nb-org">Digital, CRM and Insight, CDS&amp;M, eCommerce</span>
                <span className="nb-sec">
                  Section {current.n}: {current.label}
                </span>
              </div>
            </div>
          </div>

          <span className="nb-spacer" />

          <span className="nb-current" aria-hidden="true">
            <b>{current.n}</b>
            {current.label}
          </span>

          <button className="nb-theme" aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'} onClick={onToggleTheme}>
            <span className="nb-theme-ic" aria-hidden="true">
              {isDark ? '☀' : '☾'}
            </span>
            <span className="nb-theme-t">Light / dark</span>
          </button>
        </div>
      </header>

      <Sidebar
        open={open}
        tab={tab}
        onClose={close}
        onSelect={(id) => {
          setOpen(false);
          onSelect(id);
        }}
      />
    </>
  );
}
