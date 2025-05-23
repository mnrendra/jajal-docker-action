import type { TrustLevel } from '../../libs'
import type { GitConfigParams } from '../../steps'

import { store, setStore } from '../../store'

import info from '../info'

import {
  validateFingerprint,
  validateGitScope,
  validateGitSignCommit,
  validateGitSignPush,
  validateGitSignTag,
  validateGitSignUser,
  validatePassphrase,
  validateTrustLevel,
  validateVerbose,
  validateWorkdir
} from './utils'

type GitConfigOptions = {
  [K in keyof GitConfigParams as `git${Capitalize<K>}`]?: GitConfigParams[K]
}

export interface Options extends GitConfigOptions {
  workdir?: string
  passphrase?: string
  fingerprint?: string
  trustLevel?: TrustLevel
  verbose?: boolean
}

interface ValidOptions extends
  Omit<Options, keyof GitConfigOptions>,
  Required<GitConfigOptions> {
  workdir: string
  verbose: boolean
}

const validateOptions = (
  opt: Options
): ValidOptions => {
  if (typeof opt !== 'object' || opt === null || Array.isArray(opt)) {
    throw new Error('Invalid options value', { cause: opt })
  }

  const workdir = validateWorkdir(opt.workdir)
  const passphrase = validatePassphrase(opt.passphrase)
  const fingerprint = validateFingerprint(opt.fingerprint)
  const trustLevel = validateTrustLevel(opt.trustLevel)
  const gitScope = validateGitScope(opt.gitScope)
  const gitSignUser = validateGitSignUser(opt.gitSignUser)
  const gitSignCommit = validateGitSignCommit(opt.gitSignCommit)
  const gitSignTag = validateGitSignTag(opt.gitSignTag)
  const gitSignPush = validateGitSignPush(opt.gitSignPush)
  const verbose = validateVerbose(opt.verbose)

  setStore({ ...store, verbose })

  info('---------------- importGPG\'s options to use -------------:')
  info(`workdir         : ${workdir}`)
  info(`passphrase      : ${passphrase}`)
  info(`fingerprint     : ${fingerprint}`)
  info(`trustLevel      : ${trustLevel}`)
  info(`gitScope        : ${gitScope}`)
  info(`gitSignUser     : ${gitSignUser}`)
  info(`gitSignCommit   : ${gitSignCommit}`)
  info(`gitSignTag      : ${gitSignTag}`)
  info(`gitSignPush     : ${gitSignPush}`)
  info(`verbose         : ${verbose}`)

  return {
    workdir,
    passphrase,
    fingerprint,
    trustLevel,
    gitScope,
    gitSignUser,
    gitSignCommit,
    gitSignTag,
    gitSignPush,
    verbose
  }
}

export default validateOptions
