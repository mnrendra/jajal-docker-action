import type { Result } from './git'
import type { GitConfigKey, GitConfigScope, GitConfigValue } from './config'

import config from './config'

const setConfig = async <K extends GitConfigKey>(
  gitConfigKey: K,
  gitConfigValue: GitConfigValue<K>,
  gitConfigScope: GitConfigScope = 'local'
): Promise<Result> => {
  const result = await config(gitConfigKey, {
    scope: gitConfigScope,
    value: gitConfigValue
  })

  return result
}

export default setConfig
