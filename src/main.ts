import { cwd, env } from 'node:process'

// import type { Result } from 'semantic-release'

// import { chdir } from 'node:process'

import semanticRelease from 'semantic-release'

// import { WORKSPACE_DIR } from './consts'

import config from './config'

// import {
//   execCmd,
//   normalizeModule,
//   validateEnvs
// } from './utils'

import { importGPG, cleanupGPG } from './libs'

import { execCmd, getInputs, normalizeModule } from './utils'

const main = async (): Promise<void> => {
  // chdir(WORKSPACE_DIR)

  await execCmd(`git config --global --add safe.directory ${cwd()}`)

  // const env = validateEnvs(process.env)

  // return result

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

  // console.log(cwd())
  // const ls = await execCmd('ls -laihs')
  // console.log('stderr:', ls.stderr)
  // console.log('stdout:', ls.stdout)

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

    // console.log('outputs:', outputs)
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

  console.log('release:', result)

  await cleanupGPG(digest)
}

export default main
