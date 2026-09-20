import { useEffect, useRef, useState } from 'react';
import { Footer } from './components/Footer';
import { NavBar } from './components/NavBar';
import { AcquisitionTab } from './tabs/AcquisitionTab';
import { EngineeringTab } from './tabs/EngineeringTab';
import { ProductsTab } from './tabs/ProductsTab';
import { OverviewTab } from './tabs/OverviewTab';
import { SystemsTab } from './tabs/SystemsTab';
import { TeamsTab } from './tabs/TeamsTab';
import { TermsTab } from './tabs/TermsTab';
import { UpgradeTab } from './tabs/UpgradeTab';
import type { Goto, JourneyKey, SysFocus, TabId } from './types';

export default function App() {
  const [tab, setTab] = useState<TabId>('overview');
  const [jk, setJk] = useState<JourneyKey>('upgrade');
  const [focus, setFocus] = useState<SysFocus | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme) root.setAttribute('data-theme', theme);
    else root.removeAttribute('data-theme');
  }, [theme]);

  const goto: Goto = (id, opts = {}) => {
    if (opts.jk) setJk(opts.jk);
    if (id === 'sys') setFocus({ flow: opts.flow ?? 'acq', sel: opts.sel ?? null, n: Date.now() });
    setTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Move keyboard focus to the new page content (helps after using the sidebar).
    requestAnimationFrame(() => mainRef.current?.focus({ preventScroll: true }));
  };

  const prefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = theme ? theme === 'dark' : prefersDark();
  const flipTheme = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <div>
      <NavBar tab={tab} isDark={isDark} onSelect={(id) => goto(id)} onToggleTheme={flipTheme} />

      <main className="main" id="main" tabIndex={-1} ref={mainRef}>
        <div className="page" key={tab}>
          {tab === 'overview' && <OverviewTab goto={goto} />}
          {tab === 'acq' && <AcquisitionTab goto={goto} />}
          {tab === 'upg' && <UpgradeTab jk={jk} setJk={setJk} goto={goto} />}
          {tab === 'products' && <ProductsTab goto={goto} />}
          {tab === 'sys' && <SystemsTab focus={focus} goto={goto} />}
          {tab === 'eng' && <EngineeringTab goto={goto} />}
          {tab === 'teams' && <TeamsTab goto={goto} />}
          {tab === 'terms' && <TermsTab />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
