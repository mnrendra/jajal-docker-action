import type { TrustLevel } from '../../libs'
import type { GitConfigParams } from '../../steps'

import { log } from '../../../logger'

import { store, setStore } from '../../store'

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

  log('---------------- importGPG\'s options to use ---------------------')
  log(`workdir         : ${workdir}`)
  log(`passphrase      : ${passphrase}`)
  log(`fingerprint     : ${fingerprint}`)
  log(`trustLevel      : ${trustLevel}`)
  log(`gitScope        : ${gitScope}`)
  log(`gitSignUser     : ${gitSignUser}`)
  log(`gitSignCommit   : ${gitSignCommit}`)
  log(`gitSignTag      : ${gitSignTag}`)
  log(`gitSignPush     : ${gitSignPush}`)
  log(`verbose         : ${verbose}`)

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
