import {
  commit,
  config,
  getConfig,
  setConfig,
  git,
  push,
  tag
} from './libs'

import { defineProperties } from './utils'

defineProperties(git, {
  commit,
  config,
  getConfig,
  setConfig,
  push,
  tag
})

type GitFn = typeof git

export interface Git extends GitFn {
  commit: typeof commit
  config: typeof config
  getConfig: typeof getConfig
  setConfig: typeof setConfig
  push: typeof push
  tag: typeof tag
}

export default git as Git
