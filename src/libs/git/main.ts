import {
  commit,
  config,
  git,
  push,
  tag
} from './libs'

import { defineProperties } from './utils'

defineProperties(git, {
  commit,
  config,
  tag,
  push
})

type GitFn = typeof git

export interface Git extends GitFn {
  commit: typeof commit
  config: typeof config
  tag: typeof tag
  push: typeof push
}

export default git as Git
