import type { PluginSpec } from 'semantic-release'

const CONTAINER_WORKDIR = '/action'

const COMMIT_TYPES = [
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'revert'
] as const

const releaseRules = COMMIT_TYPES.map((type) => ({
  type,
  release: 'patch'
} as const))

const plugins: ReadonlyArray<PluginSpec<any>> = [
  ['@semantic-release/commit-analyzer', { releaseRules }],
  '@semantic-release/release-notes-generator',
  ['@semantic-release/npm', { npmPublish: false }],
  [`${CONTAINER_WORKDIR}/@mnrendra/semantic-release-plugin-github-action`, {
    commit: {
      allowEmpty: true,
      message: 'release: v{nextRelease.version}\n\n{nextRelease.notes}',
      sign: true
    },
    tag: {
      message: 'release: v{nextRelease.version}\n\n{nextRelease.notes}',
      sign: true
    } //,

    // allowEmptyCommit: true,
    // commitMessage: 'release: from plugin v{nextRelease.version}\n\n{nextRelease.notes}',
    // signCommit: true,
    // signTag: true,
    // tagMessage: 'release: from plugin v{nextRelease.version}\n\n{nextRelease.notes}'
  }],
  '@semantic-release/github'
]

export default plugins
