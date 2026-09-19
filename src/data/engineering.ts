import type { Flow, InfoItem, SeqStep } from '../types';

/* ------------------------------------------------------------------ SPA */

export const SPA_FLOW: Flow = {
  title: 'How a Shop page is served',
  nodes: [
    { id: 'user', kind: 'cust', x: 90, y: 260, rx: 66, ry: 40, l: ['Customer', 'browser'], info: 'Someone using EE Shop on the web or in the app.' },
    { id: 'spa', x: 330, y: 170, rx: 90, ry: 44, l: ['Shop SPA', 'Next JS + React'], info: 'The single page application (mobile-spa in the repo). It starts at the Mobile page and fully handles the PDP. Pages served this way are called headless.' },
    { id: 'legacy', x: 330, y: 370, rx: 90, ry: 44, l: ['Legacy pages', 'Hybris JSP'], info: 'Pages not yet migrated to the SPA. Hybris still serves them. These are called headed pages.' },
    { id: 'facade', x: 590, y: 170, rx: 82, ry: 44, l: ['Façade', 'GraphQL server'], info: 'The backend for the SPA. Its schema can be seen in the localSchema file, Schema Voyager and the playground.' },
    { id: 'hybris', x: 860, y: 270, rx: 78, ry: 44, l: ['Hybris', 'real backend'], info: 'E-commerce and product catalogue software. Before the SPA existed it served the whole shop.' },
    { id: 'aem', x: 860, y: 88, rx: 70, ry: 36, l: ['AEM', 'content'], info: 'Images, text and video. Reached through GraphQL either as ready HTML markup or as JSON that React components render.' },
  ],
  edges: [
    { id: 'e1', a: 'user', b: 'spa' },
    { id: 'e2', a: 'user', b: 'legacy' },
    { id: 'e3', a: 'spa', b: 'facade', label: 'GraphQL' },
    { id: 'e4', a: 'facade', b: 'hybris' },
    { id: 'e5', a: 'facade', b: 'aem' },
    { id: 'e6', a: 'legacy', b: 'hybris' },
  ],
  steps: [
    { title: 'A page is requested', text: 'The customer opens a Shop page. Some pages are SPA pages and some are still legacy Hybris pages.', nodes: ['user'], edges: [] },
    { title: 'SPA pages: the Shop SPA answers', text: 'The Shop SPA starts at the Mobile page. The PDP is fully handled by it. Not every page has been migrated yet.', nodes: ['user', 'spa'], edges: ['e1'] },
    { title: 'The SPA asks the Façade', text: 'The SPA never talks to Hybris directly. It sends GraphQL queries to the Façade, which is the backend built for it.', nodes: ['spa', 'facade'], edges: ['e3'] },
    { title: 'The Façade gathers data and content', text: 'Product and order data come from Hybris, the real backend. Page content comes from AEM through GraphQL.', nodes: ['facade', 'hybris', 'aem'], edges: ['e4', 'e5'] },
    { title: 'Legacy pages: Hybris answers directly', text: 'A page that has not been migrated skips the SPA and the Façade. Hybris builds it from JSP, as it did for the whole shop a few years ago.', nodes: ['user', 'legacy', 'hybris'], edges: ['e2', 'e6'] },
  ],
};

export const SPA_BENEFITS = ['Separate deployment', 'Loose coupling', 'Can be released whenever required', 'Simple release process'];

/* ------------------------------------------------------------------ Git */

export const GIT_FLOW: Flow = {
  title: 'Branching model',
  nodes: [
    { id: 'feature', x: 130, y: 110, rx: 100, ry: 40, l: ['feature/', '[jira]-[description]'], info: 'Where a specific feature is developed. Created from develop and merged back into develop.' },
    { id: 'bugfix', x: 130, y: 270, rx: 100, ry: 40, l: ['bugfix/', '[jira]-[description]'], info: 'Where bugs are fixed. Created from develop and merged back into develop.' },
    { id: 'develop', x: 450, y: 190, rx: 80, ry: 42, l: ['develop'], info: 'Where development is going.' },
    { id: 'master', x: 810, y: 190, rx: 80, ry: 42, l: ['master'], info: 'Contains the release versions of the application.' },
    { id: 'chore', x: 630, y: 350, rx: 96, ry: 40, l: ['Chore commit', 'changelog + version'], info: 'Created automatically after each commit on master, with the updated changelog file and application version.' },
    { id: 'hotfix', x: 810, y: 450, rx: 100, ry: 40, l: ['hotfix/', '[jira]-[description]'], info: 'Production bug fixes for master. Created from the latest head of master and merged back into master.' },
  ],
  edges: [
    { id: 'g1', a: 'feature', b: 'develop', label: 'MR' },
    { id: 'g2', a: 'bugfix', b: 'develop', label: 'MR' },
    { id: 'g3', a: 'develop', b: 'master', label: 'release' },
    { id: 'g4', a: 'master', b: 'chore' },
    { id: 'g5', a: 'chore', b: 'develop', label: 'sync', dashed: true },
    { id: 'g6', a: 'hotfix', b: 'master', label: 'hot-fix' },
  ],
  steps: [
    { title: 'Development happens on develop', text: 'Everyday work lands on the develop branch.', nodes: ['develop'], edges: [] },
    { title: 'Features and bug fixes branch from develop', text: 'Branches are named feature/[jira-ticket]-[text-description] or bugfix/[jira-ticket]-[text-description]. Each is created from develop and merged back into develop through a merge request.', nodes: ['feature', 'bugfix', 'develop'], edges: ['g1', 'g2'] },
    { title: 'A release merges develop into master', text: 'When the application is ready to release, develop is merged into master. Master holds the release versions.', nodes: ['develop', 'master'], edges: ['g3'] },
    { title: 'A chore commit keeps develop in sync', text: 'After each commit on master a chore commit is created automatically with the updated changelog and version. Master should then be merged back into develop to synchronise.', nodes: ['master', 'chore', 'develop'], edges: ['g4', 'g5'] },
    { title: 'Hot-fixes go straight to master', text: 'A hotfix branch is created from the latest commit head of master and merged back into master, for production bugs.', nodes: ['hotfix', 'master'], edges: ['g6'] },
  ],
};

/* ------------------------------------------------------------ Sequences */

export const MR_PIPELINE: SeqStep[] = [
  { id: 'mr', label: 'Open the MR', title: 'Open the merge request', text: 'A merge request can have several reviewers, and labels change what happens next: keep_env keeps its environment from being deleted, and no_merge stops it merging into develop.', tag: 'Developer' },
  { id: 'jenkins', label: 'Jenkins runs', title: 'Jenkins takes over', text: 'CI runs as Jenkins jobs, not GitLab CI. If an MR build fails, open the failure and it takes you to the Jenkins pipeline steps. Which gateway runs depends on the branch type (develop or master).', tag: 'CI' },
  { id: 'yarn', label: 'Install deps', title: 'Install yarn dependencies', text: 'The Marketplace step that installs every dependency the build needs.', tag: 'CI step' },
  { id: 'infra', label: 'Infra check', title: 'Infra code verification', text: 'Verifies the branch name and that the commit follows the required pattern. Correct commit messages matter because versions and changelogs come from them.', tag: 'CI step' },
  { id: 'lint', label: 'Lint and types', title: 'Lint and types', text: 'Runs ESLint and checks the types.', tag: 'CI step' },
  { id: 'eph', label: 'Ephemeral env', title: 'Try it in an ephemeral environment', text: 'After the CI deployment, a preview-level environment lets developers test their change. It is created from the environment yaml file that runs on the merge request.', tag: 'Preview' },
  { id: 'merge', label: 'Approve and merge', title: 'Approval and automatic merge', text: 'When every reviewer has approved, the Jenkins script merges the MR automatically.', tag: 'Merge' },
];

export const ENV_PATH: SeqStep[] = [
  { id: 'eph', label: 'Ephemeral', title: 'Ephemeral', text: 'A preview-level environment where developers test their code changes after the CI deployment. Its yaml file runs on each merge request.', tag: 'Developers' },
  { id: 'dev', label: 'Development', title: 'Development', text: 'Used by the DevOps teams.', tag: 'DevOps' },
  { id: 'inth', label: 'Integration-headless', title: 'Integration-headless', text: 'A real integration environment with the real SPA and mock data.', tag: 'Mock data' },
  { id: 'int', label: 'Integration', title: 'Integration', text: 'A real integration environment with the real SPA and real Hybris data.', tag: 'Real data' },
  { id: 'perf', label: 'Performance', title: 'Performance', text: 'Used to test the performance of the application. The Performance team handles it.', tag: 'Performance team' },
  { id: 'stage', label: 'Stage', title: 'Stage / Pre-production', text: 'Handled by the release team. Developers can raise a request to test their changes on stage.', tag: 'Release team' },
  { id: 'prod', label: 'Production', title: 'Production', text: 'The real environment: the real SPA with production data.', tag: 'Live' },
];

export const DEPLOY_HEADLESS: SeqStep[] = [
  { id: 'ft', label: 'Set toggles', title: 'Update FEATURE_TOGGLES', text: 'Overwrite the codebase attribute values you need to change, for example globalBasket=false.' },
  { id: 'image', label: 'Image built', title: 'CI builds a unique Docker image', text: 'Each build generates its own image, which can be used as the reference during deployment.' },
  { id: 'tag', label: 'Pick the tag', title: 'Choose the exact version', text: 'In SHOP-SPA-TAG, select the exact version that was generated after the CI.' },
  { id: 'canary', label: 'Canary / primary', title: 'Deploy as canary or primary', text: 'This creates a second version in the same environment, which saves a lot of time compared with a full re-deployment.' },
  { id: 'check', label: 'Reload and check', title: 'Reload the app', text: 'Once the deployment completes, reload the app on the same environment URL and check the change.' },
];

export const RELEASE_FLOW: SeqStep[] = [
  { id: 'wed', label: 'Wednesday night', title: 'Run the release_spa job', text: 'A special Jenkins job that must run before every release deployment. It prepares the SPA release with the latest green version build name.', tag: 'Jenkins' },
  { id: 'thu', label: 'Thursday', title: 'Weekly SPA release', text: 'SPA releases go out once a week, usually on Thursday.', tag: 'Weekly' },
  { id: 'log', label: 'Changelog and tag', title: 'CHANGELOG.md and git tag', text: 'CHANGELOG.md keeps the history of released versions with the feature changes developers made. Each version has its own git tag, so correct commit messages are very important.', tag: 'History' },
];

/* --------------------------------------------------------------- Repo */

export const REPO_FOLDERS: InfoItem[] = [
  { id: 'apps', title: 'apps', tag: 'Code', path: 'shop-spa/apps', text: 'The SPA applications. shop-spa is a monorepo holding three independent Next JS apps.', points: ['mobile-spa: the Shop SPA', 'marketplace', 'e-sim: not in production, still in development'] },
  { id: 'packages', title: 'packages', tag: 'Code', path: 'shop-spa/packages', text: 'Shared SPA components, hooks, test configuration, and types generated from the GraphQL queries.' },
  { id: 'templates', title: 'templates', tag: 'Code', path: 'shop-spa/templates', text: 'To add a new package, give the package name to the createPackage.js script and it creates the package for you.' },
  { id: 'tools', title: 'tools', tag: 'Code', path: 'shop-spa/tools', text: 'Stub servers and mock APIs.' },
  { id: 'husky', title: 'husky', tag: 'Quality', path: 'shop-spa/.husky', text: 'Validates the pre-commit steps and other checks that must pass before you push to GitLab.' },
  { id: 'turbo', title: '.turbo', tag: 'Tooling', path: 'shop-spa/.turbo', text: 'A tool that helps manage the monorepo.' },
  { id: 'charts', title: 'charts', tag: 'DevOps', path: 'shop-spa/charts', text: 'Handled by the DevOps teams. Kubernetes automates deployment and needs a package manager, and "charts" is the naming convention for it.', points: ['React developers rarely change it', 'Sometimes they extend it, for example to remove a feature toggle in a yaml file'] },
  { id: 'perf', title: 'perf-tests', tag: 'Tests', path: 'shop-spa/perf-tests', text: 'Performance testing, handled by a separate Performance Test team.' },
  { id: 'ui', title: 'ui-tests', tag: 'Tests', path: 'shop-spa/ui-tests', text: 'UI tests written by the separate QA teams.' },
];

export const KEY_FILES: InfoItem[] = [
  { id: 'eslint', title: 'ESLint rules', tag: 'Quality', path: 'packages/config/eslint-common.js', text: 'The shared ESLint file that keeps code quality consistent. A Confluence page describes the code style.' },
  { id: 'env', title: 'Local feature toggles', tag: 'Config', path: 'apps/mobile-spa/.env.development', text: 'Where feature toggles live on a developer machine.' },
  { id: 'yaml', title: 'Environment feature toggles', tag: 'Config', path: 'charts/shop/shop-spa', text: 'Production and the other environments keep their feature toggles in the matching environment yaml file here.' },
  { id: 'routes', title: 'All routes', tag: 'Config', path: 'apps/mobile-spa/server/nyanRoutes/routePaths.ts', text: 'Every route the Shop SPA serves is listed here.' },
  { id: 'doc', title: 'Dependencies entry point', tag: 'Config', path: 'apps/mobile-spa/pages/_document.tsx', text: 'The main file for dependencies. It loads the AEM scripts and other resources injected directly into the app, such as content coming from the CMS.' },
  { id: 'schema', title: 'Façade schema', tag: 'Config', path: 'localSchema', text: 'The local copy of the Façade schema. In the Confluence schema page, green fields are expected in a future release and red fields are deprecated.' },
];

/* -------------------------------------------------- Dependencies etc. */

export const DEPS: InfoItem[] = [
  { id: 'facade', title: 'Façade', tag: 'Backend', text: 'The GraphQL server that is the backend for the SPA. See Schema Voyager, the wiki, the playground and the repo under Tools and links.' },
  { id: 'hybris', title: 'Hybris login token', tag: 'Backend', text: 'When a user logs in, mobile-spa gets a token from Hybris and uses it to authenticate the user for their journey.', points: ['The token has a specific lifetime', 'This approach is expected to change in the near future'] },
  { id: 'aem', title: 'AEM content', tag: 'Content', text: 'AEM is reached through GraphQL, and there are two ways to bring its content in.', points: ['Get ready-made HTML markup from a GraphQL query and inject it, as on the PDP', 'Get the content as JSON, pass it to hooks that return a normalised object, and render it with React components', 'Some AEM scripts are injected directly and need JavaScript services to render correctly'] },
  { id: 'sg', title: 'SG scripts', tag: 'Styling', text: 'SG is the style guide, the legacy design system. Some features still use SG scripts and styles because Loop was not fully functional, and one page can use more than one styling component.' },
  { id: 'loop', title: 'Loop', tag: 'Styling', text: 'A styling library made to ease development. Loop is the single source of truth for the design system.' },
  { id: 'lxp', title: 'LXP', tag: 'Styling', text: 'The Loop Expansion Package: a copy of Loop that developers can contribute to for customisation.' },
  { id: 'jquery', title: 'jQuery', tag: 'Styling', text: 'Present inside mobile-spa but not used directly. The EE Style Guide uses jQuery, so it has to be there.' },
  { id: 'ge', title: 'Global Elements', tag: 'Login', text: 'Global Element (GE) is used for login page configuration and involves some scripts.' },
  { id: 'basket', title: 'Global Basket', tag: 'Commerce', text: 'A runtime capability with its own micro frontend architecture and a dedicated team. It is needed to show all products from marketplace and Shop in one basket.', points: ['The basket page loads dynamically to reduce load time', 'Its JavaScript is rendered dynamically so an error can be solved at run time'] },
  { id: 'address', title: 'Address Finder', tag: 'Commerce', text: 'Finds addresses from a postcode. It runs specific services that return the expected addresses.' },
  { id: 'paypal', title: 'PayPal', tag: 'Payments', text: 'A payment gateway integrated with the Braintree SDK to take payments.' },
  { id: 'buynet', title: 'BuyNet', tag: 'Payments', text: 'BT BuyNet takes payments 24 hours a day. The SPA loads an iframe with the data coming from the Façade, so customers can pay with Google Pay, cards and so on.' },
  { id: 'queueit', title: 'Queue-it', tag: 'Traffic', text: 'Traffic control. It works like switching users to different servers. The L2 team is responsible for it.' },
  { id: 'analytics', title: 'Analytics script', tag: 'Analytics', text: 'The legacy analytics tool. It sends specific events, such as a button click, to Adobe Analytics using the fef-analytics package. What is tracked depends on business requirements.' },
  { id: 'adobe', title: 'Adobe', tag: 'Analytics', text: 'Used to compare two ways of reaching the same journey and see which is used more. Adobe Target also drives the runtime feature toggles.' },
];

/* -------------------------------------------------------------- Tests */

export const TESTS: InfoItem[] = [
  { id: 'unit', title: 'Unit tests', tag: 'Developers', text: 'Written with Jest and React Testing Library, alongside ESLint for code quality.', points: ['Test coverage should be at least 80%'] },
  { id: 'contract', title: 'Contract tests', tag: 'SPA team', text: 'Check that the GraphQL queries stay in sync with the backend. The SPA team is mainly responsible.', points: ['Uses the Pact package through Jest', 'A Pact broker holds the contracts'] },
  { id: 'perf', title: 'Performance tests', tag: 'Performance Test team', text: 'A separate team owns them. About 90% are written in Groovy, and the team is moving them to WebdriverIO. They run against the Performance environment.' },
  { id: 'ui', title: 'UI tests', tag: 'QA teams', text: 'Automated UI tests written by the separate QA teams, kept in the ui-tests folder.' },
];

export const TOOLS: InfoItem[] = [
  { id: 'grafana', title: 'Grafana', tag: 'Metrics', text: 'A multi-platform open-source analytics and interactive visualisation web application. Enter a value such as a merge request name to see how much CPU it uses. It offers charts, graphs and alerts.' },
  { id: 'kibana', title: 'Kibana', tag: 'Logs', text: 'A user interface that turns log data from the ELK stack into visualisations and supports querying logs. It gathers the logs of the SPA, GraphQL and Hybris for every request.' },
];
