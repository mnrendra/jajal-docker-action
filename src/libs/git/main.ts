import {
  commit,
  config,
  git,
  push,
  tag,
  getConfig,
  setConfig
} from './libs'

import { defineProperties } from './utils'

defineProperties(git, {
  commit,
  config,
  tag,
  push,
  getConfig,
  setConfig
})

type GitFn = typeof git

export interface Git extends GitFn {
  commit: typeof commit
  config: typeof config
  tag: typeof tag
  push: typeof push
  getConfig: typeof getConfig
  setConfig: typeof setConfig
}

export default git as Git
