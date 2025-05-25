import type {
  Command,
  Result
} from './git'

import type {
  GitConfig,
  GitConfigKey,
  GitConfigScope,
  GitConfigValue
} from './config'

import commit from './commit'
import config from './config'
import git from './git'
import push from './push'
import tag from './tag'

import getConfig from './getConfig'
import setConfig from './setConfig'

export type {
  Command,
  GitConfig,
  GitConfigKey,
  GitConfigScope,
  GitConfigValue,
  Result
}

export {
  commit,
  config,
  git,
  push,
  tag,

  getConfig,
  setConfig
}
