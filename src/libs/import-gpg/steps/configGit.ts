import { log } from '../../../libs/logger'

import { getGitConfig, setGitConfig } from '../utils'

export type Scope =
| 'global'
| 'local'

export type PushGpgsign =
| boolean
| 'if-asked'

export interface Configs {
  scope: Scope
  userSigningkey: string
  commitGpgsign: boolean
  tagGpgsign: boolean
  pushGpgsign: PushGpgsign
  userName: string
  userEmail: string
}

export interface Params extends Pick<Configs, 'scope'> {
  signUser: boolean
  signCommit: boolean
  signTag: boolean
  signPush: PushGpgsign
}

const USER_SIGNINGKEY = 'user.signingkey'
const USER_NAME = 'user.name'
const USER_EMAIL = 'user.email'
const COMMIT_GPGSIGN = 'commit.gpgsign'
const TAG_GPGSIGN = 'tag.gpgsign'
const PUSH_GPGSIGN = 'push.gpgsign'

const configGit = async (
  keyid: string,
  name: string,
  email: string,
  {
    scope,
    signUser,
    signCommit,
    signTag,
    signPush
  }: Params
): Promise<Configs> => {
  log('---------------- Configuring Git ---------------------------------')

  const gitConfigs: Configs = {
    scope: 'local',
    userSigningkey: '',
    commitGpgsign: false,
    tagGpgsign: false,
    pushGpgsign: false,
    userName: '',
    userEmail: ''
  }

  gitConfigs.scope = scope
  log(`scope           : ${gitConfigs.scope}`)

  if (signUser) {
    await setGitConfig(USER_SIGNINGKEY, keyid, scope)
    gitConfigs.userSigningkey = await getGitConfig(USER_SIGNINGKEY, scope)
    log(`user.signingkey : ${gitConfigs.userSigningkey}`)

    await setGitConfig(USER_NAME, name, scope)
    gitConfigs.userName = await getGitConfig(USER_NAME, scope)
    log(`user.name       : ${gitConfigs.userName}`)

    await setGitConfig(USER_EMAIL, email, scope)
    gitConfigs.userEmail = await getGitConfig(USER_EMAIL, scope)
    log(`user.email      : ${gitConfigs.userEmail}`)
  }

  if (signCommit) {
    await setGitConfig(COMMIT_GPGSIGN, signCommit, scope)
    gitConfigs.commitGpgsign = await getGitConfig(COMMIT_GPGSIGN, scope)
    log(`commit.gpgsign  : ${gitConfigs.commitGpgsign}`)
  }

  if (signTag) {
    await setGitConfig(TAG_GPGSIGN, signTag, scope)
    gitConfigs.tagGpgsign = await getGitConfig(TAG_GPGSIGN, scope)
    log(`tag.gpgsign     : ${gitConfigs.tagGpgsign}`)
  }

  if (signPush !== false) {
    await setGitConfig(PUSH_GPGSIGN, signPush, scope)
    gitConfigs.pushGpgsign = await getGitConfig(PUSH_GPGSIGN, scope)
    log(`push.gpgsign    : ${gitConfigs.pushGpgsign}`)
  }

  return gitConfigs
}

export default configGit
