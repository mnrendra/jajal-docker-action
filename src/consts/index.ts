export const WORKSPACE_DIR = '/github/workspace'

export const GIT_COMMITTER_NAME = 'GitOps Releas'

export const GIT_COMMITTER_EMAIL = 'gitops-release@users.noreply.github.com'

export const PRERELEASE_BRANCHES = [
  'alpha',
  'beta',
  'rc'
] as const

export const COMMIT_TYPES = [
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
