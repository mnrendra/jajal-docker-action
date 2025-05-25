import type { BranchSpec } from 'semantic-release'

import { PRERELEASE_BRANCHES } from './consts'

const prereleaseBranches = PRERELEASE_BRANCHES.map((name) => ({
  name,
  prerelease: true
} as const))

const branches: readonly BranchSpec[] = [
  '+([0-9])?(.{+([0-9]),x}).x',
  'main',
  'next',
  ...prereleaseBranches
]

export default branches
