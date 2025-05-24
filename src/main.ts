import { cwd, env } from 'node:process'

import { execa } from 'execa'

import semanticRelease from 'semantic-release'

import { WORKDIR } from './consts'

import config from './config'

import defaultModule from './libs/default-module'
import { importGPG, cleanupGPG } from './libs/import-gpg'

import { getInputs } from './utils'

const main = async (): Promise<string> => {
  await execa('git', ['config', '--global', '--add', 'safe.directory', WORKDIR])

  const {
    workdir,
    privateKey,
    passphrase,
    fingerprint,
    trustLevel,
    gitScope,
    gitSignUser,
    gitSignCommit,
    gitSignTag,
    gitSignPush,
    token
  } = getInputs()

  let digest = ''
  let name = 'GitOps Release'
  let email = 'gitops-release@users.noreply.github.com'
  let currentWorkdir = cwd()

  if (privateKey !== undefined) {
    const outputs = await importGPG(privateKey, {
      workdir,
      passphrase,
      fingerprint,
      trustLevel,
      gitScope,
      gitSignUser,
      gitSignCommit,
      gitSignTag,
      gitSignPush,
      verbose: true
    })

    digest = outputs.digest
    name = outputs.name
    email = outputs.email
    currentWorkdir = outputs.workdir
  }

  const release = defaultModule(semanticRelease)

  const result = await release(config, {
    env: {
      ...env,
      GIT_AUTHOR_NAME: name,
      GIT_AUTHOR_EMAIL: email,
      GIT_COMMITTER_NAME: name,
      GIT_COMMITTER_EMAIL: email,
      GITHUB_TOKEN: token
    }
  })

  if (result !== false) {
    console.log('release:', result.nextRelease.version)
  } else {
    console.warn('failed to release!')
  }

  await cleanupGPG(digest)

  return currentWorkdir
}

export default main
