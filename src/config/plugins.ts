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
    publishCmd: 'echo "$GIT_AUTHOR_NAME" && echo "$GIT_AUTHOR_EMAIL" && echo "$GIT_COMMITTER_NAME" && echo "$GIT_COMMITTER_EMAIL" && git config --list'
  }]
]

export default plugins
