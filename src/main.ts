import { cwd, env } from 'node:process'

import semanticRelease from 'semantic-release'

import config from './config'

import { importGPG, cleanupGPG } from './libs'

import { execCmd, getInputs, normalizeModule } from './utils'

const main = async (): Promise<void> => {
  await execCmd(`git config --global --add safe.directory ${cwd()}`)

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
  }

  const release = normalizeModule(semanticRelease)

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
}

export default main
