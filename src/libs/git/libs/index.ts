import type { Command, Result } from './git'

import commit from './commit'
import git from './git'
import push from './push'
import tag from './tag'

export type {
  Command,
  Result
}

export {
  commit,
  git,
  push,
  tag
}
