import { useEffect, useState } from 'react';
import { Seg } from '../components/controls';
import { Explorer } from '../components/Explorer';
import { FlowStepper } from '../components/FlowStepper';
import { NextBtn } from '../components/NextBtn';
import { StepFlow } from '../components/StepFlow';
import {
  DEPLOY_HEADLESS,
  DEPS,
  ENV_PATH,
  GIT_FLOW,
  KEY_FILES,
  MR_PIPELINE,
  RELEASE_FLOW,
  REPO_FOLDERS,
  SPA_BENEFITS,
  SPA_FLOW,
  TESTS,
  TOOLS,
} from '../data/engineering';
import { LINK_GROUPS, SLACK_CHANNELS } from '../data/links';
import type { Goto } from '../types';

type Sec = 'arch' | 'repo' | 'deps' | 'ft' | 'test' | 'git' | 'env' | 'tools';

const SECS: [Sec, string][] = [
  ['arch', 'SPA architecture'],
  ['repo', 'Repo and structure'],
  ['deps', 'Dependencies and integrations'],
  ['ft', 'Feature toggles'],
  ['test', 'Testing'],
  ['git', 'Branching and CI'],
  ['env', 'Environments and releases'],
  ['tools', 'Tools and links'],
];

const PAGES = [
  { id: 'mobile', label: 'Mobile page (ee.co.uk/mobile)', spa: true, note: 'The Shop SPA starts from the Mobile page.' },
  { id: 'pdp', label: 'Product Details Page', spa: true, note: 'The PDP is fully handled by the SPA.' },
  { id: 'payg', label: 'Pay As You Go page', spa: false, note: 'Still a Hybris page. Not every page has been migrated to the SPA.' },
];

/** A mock browser console for the spaStack check. */
function SpaCheck() {
  const [id, setId] = useState(PAGES[0].id);
  const [ran, setRan] = useState(false);
  const page = PAGES.find((p) => p.id === id)!;

  useEffect(() => setRan(false), [id]);

  return (
    <div className="card">
      <h4 style={{ marginBottom: 6 }}>Is this page SPA or legacy?</h4>
      <p className="muted small" style={{ margin: '0 0 10px' }}>
        Open dev tools, go to the Console tab, type spaStack (a global variable) and press Enter. Try it on a page:
      </p>
      <div className="chips" style={{ marginBottom: 12 }}>
        {PAGES.map((p) => (
          <button key={p.id} className={`chip ${p.id === id ? 'hl' : ''}`} onClick={() => setId(p.id)}>
            {p.label}
          </button>
        ))}
      </div>
      <div className="console" aria-live="polite">
        <div>
          <span className="p">&gt; </span>spaStack
        </div>
        {ran ? (
          <div className="out swap" key={id}>
            {page.spa ? '"primary"' : 'no "primary" response'}
          </div>
        ) : (
          <div className="out" style={{ opacity: 0.5 }}>
            waiting for Enter
          </div>
        )}
      </div>
      <div className="row" style={{ marginTop: 10 }}>
        <button className="btn small" onClick={() => setRan(true)}>
          Press Enter
        </button>
        {ran && (
          <span className={`chip ${page.spa ? '' : 'warn'}`}>
            {page.spa ? 'SPA (headless) page' : 'Legacy (headed) page'}
          </span>
        )}
      </div>
      {ran && <p className="small muted" style={{ margin: '10px 0 0' }}>{page.note}</p>}
    </div>
  );
}

function FeatureToggles() {
  const [cookies, setCookies] = useState<'yes' | 'no'>('yes');
  const adobe = cookies === 'yes';
  return (
    <div className="card">
      <p className="muted" style={{ marginBottom: 10 }}>
        A feature toggle makes certain pages or features available to a certain number of users or environments. Which
        kind applies depends on whether the customer accepted cookies.
      </p>
      <div className="small muted" style={{ marginBottom: 6 }}>
        Did the customer accept the GDPR / cookie guidelines?
      </div>
      <Seg
        opts={[
          ['yes', 'Accepted'],
          ['no', 'Rejected'],
        ]}
        val={cookies}
        on={setCookies}
      />
      <div className="result swap" key={cookies} style={{ marginTop: 14 }}>
        <span className="chip hl">{adobe ? 'Adobe FT' : 'Normal FT'}</span>
        <h3 style={{ margin: '8px 0 4px' }}>{adobe ? 'Set at runtime with Adobe Target' : 'Read from a file at build time'}</h3>
        <p style={{ marginBottom: 0 }}>
          {adobe
            ? 'Adobe Target sets the toggle and tracks user activity while the app runs.'
            : 'When a user rejects cookies, Adobe cannot track their activity or origin, so the file-based toggle is used instead.'}
        </p>
      </div>
      <h4 style={{ margin: '18px 0 6px' }}>Where the toggles live</h4>
      <table>
        <tbody>
          <tr>
            <td style={{ fontWeight: 700, width: '30%' }}>Production and other environments</td>
            <td>
              <span className="mono">shop-spa/charts/shop/shop-spa</span>, in the matching environment yaml file
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: 700 }}>Local</td>
            <td>
              <span className="mono">shop-spa/apps/mobile-spa/.env.development</span>
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: 700 }}>Headless integration deploy</td>
            <td>Set FEATURE_TOGGLES to overwrite codebase values, for example globalBasket=false</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function EngineeringTab({ goto }: { goto: Goto }) {
  const [sec, setSec] = useState<Sec>('arch');

  return (
    <div>
      <h2>Front-end engineering</h2>
      <p className="lead">
        How the Shop SPA is built, tested and shipped. This comes from the OMNI Shop front-end onboarding doc, and it
        is aimed at people who will work in the shop-spa repository.
      </p>
      <div className="secnav" role="tablist">
        {SECS.map(([id, label]) => (
          <button key={id} role="tab" aria-selected={sec === id} className={`chip ${sec === id ? 'hl' : ''}`} onClick={() => setSec(id)}>
            {label}
          </button>
        ))}
      </div>

      <div className="swap" key={sec}>
        {sec === 'arch' && (
          <>
            <h3>SPA architecture</h3>
            <p className="muted" style={{ margin: '4px 0 14px', maxWidth: '72ch' }}>
              SPA stands for Single Page Application, built with React JS and Next JS. A few years ago there was no SPA
              and the whole shop was Hybris, a Java solution using JSP. Now Hybris is the real backend and the Façade,
              a GraphQL server, is the backend for the SPA. Not all pages have been migrated yet.
            </p>
            <FlowStepper flow={SPA_FLOW} />
            <div className="chips" style={{ margin: '16px 0' }}>
              {SPA_BENEFITS.map((b) => (
                <span key={b} className="chip">
                  {b}
                </span>
              ))}
            </div>
            <SpaCheck />
          </>
        )}

        {sec === 'repo' && (
          <>
            <h3>Repo and structure</h3>
            <p className="muted" style={{ margin: '4px 0 14px', maxWidth: '72ch' }}>
              shop-spa is a monorepo, so it holds many projects. Pick a folder to see what it is for and who looks
              after it. CI runs on Jenkins jobs rather than GitLab CI.
            </p>
            <Explorer items={REPO_FOLDERS} filter />
            <h3 style={{ margin: '28px 0 10px' }}>Files worth knowing</h3>
            <Explorer items={KEY_FILES} />
          </>
        )}

        {sec === 'deps' && (
          <>
            <h3>Dependencies and integrations</h3>
            <p className="muted" style={{ margin: '4px 0 14px', maxWidth: '72ch' }}>
              Everything the Shop SPA leans on or talks to. Filter by kind, or pick one to read about it.
            </p>
            <Explorer items={DEPS} filter />
          </>
        )}

        {sec === 'ft' && (
          <>
            <h3>Feature toggles</h3>
            <div style={{ marginTop: 12 }}>
              <FeatureToggles />
            </div>
          </>
        )}

        {sec === 'test' && (
          <>
            <h3>Testing</h3>
            <p className="muted" style={{ margin: '4px 0 14px' }}>
              Four kinds of test, each with its own owner.
            </p>
            <Explorer items={TESTS} />
          </>
        )}

        {sec === 'git' && (
          <>
            <h3>Branching model</h3>
            <p className="muted" style={{ margin: '4px 0 14px' }}>
              Step through how code moves between branches.
            </p>
            <FlowStepper flow={GIT_FLOW} />
            <h3 style={{ margin: '32px 0 6px' }}>A merge request through CI</h3>
            <p className="muted" style={{ margin: '0 0 14px' }}>
              Husky checks your commit locally first. ESLint rules come from one shared config file.
            </p>
            <StepFlow steps={MR_PIPELINE} resetKey="mr" playLabel="Play the pipeline" />
          </>
        )}

        {sec === 'env' && (
          <>
            <h3>Environments</h3>
            <p className="muted" style={{ margin: '4px 0 14px' }}>
              The environments in the order the doc lists them.
            </p>
            <StepFlow steps={ENV_PATH} resetKey="env" playLabel="Tour the environments" />
            <h3 style={{ margin: '32px 0 6px' }}>Deploying to integration-headless</h3>
            <p className="muted" style={{ margin: '0 0 14px' }}>
              Use this to try a build against mock data.
            </p>
            <StepFlow steps={DEPLOY_HEADLESS} resetKey="deploy" playLabel="Play the deployment" />
            <h3 style={{ margin: '32px 0 6px' }}>The weekly release</h3>
            <p className="muted" style={{ margin: '0 0 14px' }}>
              Hot-fix releases are covered under Branching and CI.
            </p>
            <StepFlow steps={RELEASE_FLOW} resetKey="release" playLabel="Play the release" />
          </>
        )}

        {sec === 'tools' && (
          <>
            <h3>Additional tools</h3>
            <div style={{ marginTop: 12 }}>
              <Explorer items={TOOLS} />
            </div>
            <h3 style={{ margin: '32px 0 6px' }}>Links</h3>
            <p className="muted small" style={{ margin: '0 0 8px' }}>
              These are internal BT links from the onboarding doc, so they only open on the company network.
            </p>
            <div className="grid2">
              {LINK_GROUPS.map((g) => (
                <div className="card flat" key={g.title}>
                  <h4>{g.title}</h4>
                  <div className="lk">
                    {g.links.map(([label, url]) => (
                      <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              <div className="card flat">
                <h4>Slack channels</h4>
                <div className="lk">
                  {SLACK_CHANNELS.map(([ch, what]) => (
                    <div key={ch} style={{ padding: '6px 0', borderBottom: '1px solid var(--line)' }}>
                      <span className="mono">{ch}</span>
                      <div className="small muted">{what}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <NextBtn cur="eng" goto={goto} />
    </div>
  );
}
