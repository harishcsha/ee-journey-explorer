import { useEffect, useState } from 'react';
import { Logo } from './components/Logo';
import { TABS } from './data/tabs';
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
  };

  const flipTheme = () => {
    const dark = theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(dark ? 'light' : 'dark');
  };

  return (
    <div>
      <header className="top">
        <div className="top-in">
          <Logo />
          <div>
            <h1>EE Shop Journey Explorer</h1>
            <div className="crumb">Digital, CRM and Insight, CDS&amp;M, eCommerce</div>
          </div>
          <span className="spacer" />
          <button className="theme" onClick={flipTheme}>
            Switch light / dark
          </button>
        </div>
      </header>

      <nav className="nav" aria-label="Sections">
        <div className="nav-in">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab ${tab === t.id ? 'on' : ''}`}
              aria-current={tab === t.id ? 'page' : undefined}
              onClick={() => goto(t.id)}
            >
              <span className="n">{t.n}</span>
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="main">
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
        <p className="foot">
          Built from the deck slides 2 to 26 and the OMNI Shop front-end onboarding doc. Page names, URLs, scenario rules,
          systems, owners, pricing and engineering details follow those sources. Short explanations of what each step does, and the eligibility checker's slider logic, are written to
          make the flow readable, so check them with your product owner before treating them as policy.
        </p>
      </main>
    </div>
  );
}
