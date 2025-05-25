import type { GitConfigKey, GitConfigScope, GitConfigValue } from './config'

import config from './config'

const getConfig = async <K extends GitConfigKey>(
  gitConfigKey: K,
  gitConfigScope: GitConfigScope = 'local'
): Promise<GitConfigValue<K>> => {
  const { stdout } = await config(gitConfigKey, {
    get: true,
    scope: gitConfigScope
  })

  if (stdout === 'false') return false as GitConfigValue<K>
  if (stdout === 'true') return true as GitConfigValue<K>

  const num = Number(stdout)
  if (!Number.isNaN(num)) return num as GitConfigValue<K>

  return stdout as GitConfigValue<K>
}

export default getConfig
