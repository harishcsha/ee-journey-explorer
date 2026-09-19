# EE Shop Journey Explorer

An interactive, animated walkthrough of the EE Shop customer journeys, built from the internal
"Digital, CRM & Insight > CDS&M > eCommerce" deck. React 18, TypeScript and Vite. No runtime
dependencies beyond React.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typechecks, then builds to dist/
npm run preview    # serve the production build
```

## What is in it

| Tab | What it shows |
| --- | --- |
| 1. EE Overview | Trading channels, Digital, EE Shop, mobile products and journeys. Click through columns or play the tour. |
| 2. Acquisition Journey | Animated L0 journey from login to confirmation, plus the authenticated acquisition variant. |
| 3. Upgrade / Add Line | L2 journeys, an eligibility checker for the 12 login scenarios, and the voice/data upgrade rule. |
| 4. Products and Pricing | PAYG, PAYM Subsidy and Flex pay with contract-length bars, plan extras, PEGA recommendations, the Elevate programme. |
| 5. Systems and Shop Process | Animated order flows (single and multi basket) across Hybris, Excalibur, Compass, SAP. |
| 6. Front-end Engineering | SPA architecture, repo structure, dependencies and integrations, feature toggles, testing, branching and CI, environments and releases, tools and links. |
| 7. Teams and Organisation | BT Group org tree down to the Mobile Shop Tribe, system owners, and the supporting teams. |
| 8. Terminology | Searchable glossary from the deck and the onboarding doc. |

## Project layout

```
src/
  App.tsx                 shell, header, tab navigation, theme toggle, cross-tab navigation (goto)
  types.ts                shared types
  data/                   all content, kept out of components
    overview.ts           trading-channel tree + guided tour path
    journeys.ts           acquisition / upgrade / add line steps, URLs, notes, systems per step
    flows.ts              order-flow diagrams (acquisition, upgrade / add line)
    systems.ts            systems table and owning teams
    scenarios.ts          the 12 login scenarios and their reasons
    pricing.ts            bundles, plan extras, PEGA and Elevate steps
    engineering.ts        SPA and branching diagrams, repo folders, dependencies, tests, pipelines, environments
    org.ts                BT Group org tree and supporting teams
    links.ts              internal links and Slack channels
    terms.ts              glossary
    tabs.ts               tab list
  lib/
    eligibility.ts        evaluate(): contract position + account status -> login scenario
    geometry.ts           trims flow edges to node outlines
  hooks/useStepper.ts     step index + autoplay shared by every stepped view
  components/
    StepTrack.tsx         travelling-marker track (journeys, pipelines, environments)
    StepFlow.tsx          track + step detail for any list of SeqSteps
    FlowDiagram.tsx       SVG diagram with lit / used / faint states and moving packets
    FlowStepper.tsx       FlowDiagram + controls + node info for any Flow
    Explorer.tsx          selectable list with a detail card and optional tag filter
    OrgExplorer.tsx       drill-down org tree
    Journey, Wire, Checker, Rules, controls, ...
  tabs/                   one component per tab
  index.css               design tokens (light and dark), responsive rules and all styles
```

## Motion and responsiveness

- Animations use `transform` and `opacity` only (the track fill is a scaled bar, the skeleton shimmer is a moving pseudo-element), and `prefers-reduced-motion` switches them off.
- Layout breakpoints: two columns collapse at 900px (tablet), and at 700px (phone) the overview columns stack with indentation, touch targets grow to 44px, and wide diagrams scroll sideways with a hint.

## Changing content

Almost everything you will want to edit is data:

- Add or reword a journey step: `src/data/journeys.ts`. `wire` picks the page sketch, `sys` lists the systems shown as chips.
- Change a diagram: `src/data/flows.ts`. Nodes have x/y/rx/ry on a 1000 x 520 canvas. Steps list which nodes and edges light up.
- Add a system or team: `src/data/systems.ts` (also extend `SysId` in `types.ts`).
- Add an engineering card, pipeline step or environment: `src/data/engineering.ts`. Org and support teams are in `org.ts`, pricing in `pricing.ts`.
- Adjust eligibility rules: `src/lib/eligibility.ts`.

## Notes on accuracy

Page names, URLs, rules, systems, owners and terms follow the deck. The one-line explanations of what
each step does, and the slider logic in the eligibility checker, were written to make the flow readable.
Confirm them with your product owner before treating them as policy. The checker assumes a 24-month
contract by default. Two source points are flagged in the UI: the onboarding doc words Early Upgrade differently from
the slide, and it names PEGA where the process slides name Compass as the recommendations system.

Fonts (Baloo 2, Nunito Sans) load from Google Fonts in `index.html`, with system fallbacks.
