import commit from './commit'
import config, { getConfig, setConfig } from './config'
import git from './git'
import push from './push'
import tag from './tag'

export type {
  Command,
  Result
} from './git'

export type {
  GitConfig,
  GitConfigKey,
  GitConfigScope,
  GitConfigValue
} from './config'

export {
  commit,
  config,
  getConfig,
  setConfig,
  git,
  push,
  tag
}
