export const LINK_GROUPS: { title: string; links: [string, string][] }[] = [
  {
    title: 'Code and docs',
    links: [
      ['shop-spa repository', 'https://mobius-gitlab.bt.com/platformservices/epam/lb-development/shop-spa'],
      ['Local environment', 'http://local.ee.co.uk:3001/testLanding'],
      ['Develop branch environment', 'https://shop-spa-develop.shopci.intdigital.ee.co.uk/testLanding'],
    ],
  },
  {
    title: 'Design systems',
    links: [
      ['EE Style Guide wiki', 'https://www.collab.bt.com/confluence/display/DEV9/EE+Style+Guide'],
      ['EE Style Guide demo', 'http://ee-style-guide.s3-website-eu-west-1.amazonaws.com/'],
      ['EE Style Guide repo', 'https://mobius-gitlab.bt.com/platformservices/ui/ee-style-guide'],
      ['Loop site (zeroheight)', 'https://zeroheight.com/49ea32849/v/0/p/95caea-loop-design-system'],
      ['Loop Storybook', 'https://btplc-loop-next-production.ps.intdigital.ee.co.uk/'],
      ['Loop repo', 'https://mobius-gitlab.bt.com/dsl/frontend-framework/loop/loop-next'],
      ['LXP repo', 'https://mobius-gitlab.bt.com/dsl/frontend-framework/loop-expansion-pack/loop-expansion-pack'],
    ],
  },
  {
    title: 'Façade and contract testing',
    links: [
      ['Schema Voyager', 'https://shop-facade-develop.shopci.intdigital.ee.co.uk/voyager'],
      ['Façade schema wiki', 'https://www.collab.bt.com/confluence/display/SHOP27/Shop+Facade-Schema'],
      ['GraphQL playground', 'https://shop-facade-develop.shopci.intdigital.ee.co.uk/graphiql'],
      ['Pact docs', 'https://github.com/pact-foundation/pact-js/'],
      ['Pact broker', 'https://pact-broker.shopci.intdigital.ee.co.uk/'],
      ['Queue-it known-user library', 'https://github.com/queueit/KnownUser.V3.Javascript#readme'],
    ],
  },
  {
    title: 'Environments, pipelines and observability',
    links: [
      ['Integration demo environment', 'https://shop-integration-demo-12049-web.shopci.intdigital.ee.co.uk'],
      ['Headless deploy job (Jenkins)', 'https://jenkins.shopci.intdigital.ee.co.uk/view/headless/job/int_demo_env_deploy/'],
      ['Integration pipeline (Jenkins)', 'https://jenkins-dtp-tooling-eu-west-1.ps.intdigital.ee.co.uk/view/ee-shop/job/ee-shop-integration/'],
      ['Stage launch pipeline (Jenkins)', 'https://jenkins-dtp-tooling-eu-west-1.ps.intdigital.ee.co.uk/view/ee-shop/job/ee-shop-stage/job/ee-shop-launch/'],
      ['AEM integration', 'https://webaem-ssquad6-integration.ps.intdigital.ee.co.uk/'],
      ['AEM stage', 'https://webaem-falcon-stage.ps.intdigital.ee.co.uk/'],
      ['Kibana', 'https://kibana-core-integration.ps.intdigital.ee.co.uk/_plugin/kibana/app/home#/'],
      ['Grafana', 'https://grafana-headless.shopci.intdigital.ee.co.uk/d/oWe9aYxmkxssd/kubernetes-workloads?orgId=1'],
      ['Adobe Target activities', 'https://experience.adobe.com/#/@britishtelecom/target/activities/activityLibrary'],
    ],
  },
];

export const SLACK_CHANNELS: [string, string][] = [
  ['#ee-style-guide', 'EE Style Guide'],
  ['#loop-design-system-community', 'Loop'],
  ['#loop-expansion-pack-discussion', 'LXP'],
  ['#non-prod-env-support and #ps-environment-support', 'DevOps and environments'],
  ['#adobe-target-user-community', 'Adobe Target (request access there)'],
];
