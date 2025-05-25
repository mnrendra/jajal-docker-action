import type { GitConfigKey, GitConfigScope, GitConfigValue } from '../../../libs/git'

import git from '../../../libs/git'

const setGitConfig = async <K extends GitConfigKey>(
  gitConfigKey: K,
  gitConfigValue: GitConfigValue<K>,
  gitConfigScope: GitConfigScope = 'local'
): Promise<GitConfigValue<K>> => {
  const { stdout } = await git.config(gitConfigKey, {
    scope: gitConfigScope,
    value: gitConfigValue
  })

  if (stdout === 'false') return false as GitConfigValue<K>
  if (stdout === 'true') return true as GitConfigValue<K>

  return stdout as GitConfigValue<K>
}

export default setGitConfig
