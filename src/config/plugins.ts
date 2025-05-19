import type { PluginSpec } from 'semantic-release'

import { COMMIT_TYPES } from '../consts'

const releaseRules = COMMIT_TYPES.map((type) => ({
  type,
  release: 'patch'
} as const))

const plugins: ReadonlyArray<PluginSpec<any>> = [
  ['@semantic-release/commit-analyzer', { releaseRules }],
  '@semantic-release/release-notes-generator',
  ['@semantic-release/npm', { npmPublish: false }],
  ['@semantic-release/exec', {
    /* eslint-disable-next-line no-template-curly-in-string */
    publishCmd: './bin/script.js "${nextRelease.version}" "${nextRelease.notes}" "${branch.name}"'
  }],
  '@semantic-release/github'
]

export default plugins
