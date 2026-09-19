import { useState } from 'react';
import { NextBtn } from '../components/NextBtn';
import { OrgExplorer } from '../components/OrgExplorer';
import { JOURNEYS } from '../data/journeys';
import { SUPPORT_TEAMS } from '../data/org';
import { SYSTEMS, TEAMS } from '../data/systems';
import type { Goto, JourneyKey } from '../types';

export function TeamsTab({ goto }: { goto: Goto }) {
  const [tid, setTid] = useState(TEAMS[0].id);
  const team = TEAMS.find((t) => t.id === tid)!;

  const touch = (Object.keys(JOURNEYS) as JourneyKey[])
    .map((k) => ({
      k,
      title: JOURNEYS[k].title,
      names: JOURNEYS[k].steps.filter((s) => s.sys.some((x) => team.sys.includes(x))).map((s) => s.short),
    }))
    .filter((x) => x.names.length > 0);

  return (
    <div>
      <h2>Teams and organisation</h2>
      <p className="lead">
        First, where the Mobile Shop Tribe sits inside BT Group. Then, who owns each system, and which other teams you
        will meet along the way.
      </p>

      <h3>The BT Group structure</h3>
      <p className="muted" style={{ margin: '4px 0 14px' }}>
        Pick a box to open the level below it.
      </p>
      <OrgExplorer />

      <div className="section">
        <h3>Who owns which system</h3>
        <p className="muted" style={{ margin: '4px 0 14px' }}>
          Every system in the systems table has one owning team. If something breaks on a page, this tells you who to
          ask.
        </p>
        <div className="two teams">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {TEAMS.map((t) => (
              <button key={t.id} className={`team ${t.id === tid ? 'on' : ''}`} onClick={() => setTid(t.id)}>
                <b>{t.name}</b>
                <span className="small muted">{t.sys.map((s) => SYSTEMS[s].name).join(', ')}</span>
              </button>
            ))}
          </div>
          <div className="card">
            <div className="swap" key={tid}>
              <h3>{team.name}</h3>
              <div className="kv">
                <h4>Systems owned</h4>
                {team.sys.map((id) => {
                  const s = SYSTEMS[id];
                  return (
                    <div key={id} style={{ marginBottom: 10 }}>
                      <b>{s.name}</b>
                      <div className="muted">{s.purpose}</div>
                      <div className="small muted">Used by {s.used.join(', ')}</div>
                    </div>
                  );
                })}
              </div>
              <div className="kv">
                <h4>Journey steps that rely on it</h4>
                {touch.map((x) => (
                  <div key={x.k} style={{ marginBottom: 10 }}>
                    <button className="chip" onClick={() => (x.k === 'acq' ? goto('acq') : goto('upg', { jk: x.k }))}>
                      {x.title}
                    </button>
                    <div className="small muted" style={{ marginTop: 4 }}>
                      {x.names.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Other teams you will meet</h3>
        <p className="muted" style={{ margin: '4px 0 14px' }}>
          These own parts of the engineering setup rather than a system in the table.
        </p>
        <div className="grid2">
          {SUPPORT_TEAMS.map((t) => (
            <div className="card flat" key={t.name}>
              <h4>{t.name}</h4>
              <p className="muted small" style={{ margin: '4px 0 0' }}>
                {t.owns}
              </p>
            </div>
          ))}
        </div>
      </div>
      <NextBtn cur="teams" goto={goto} />
    </div>
  );
}
