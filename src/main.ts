import { env } from 'node:process'

// import type { Result } from 'semantic-release'

// import { chdir } from 'node:process'

// import semanticRelease from 'semantic-release'

// import { WORKSPACE_DIR } from './consts'

// import config from './config'

// import {
//   execCmd,
//   normalizeModule,
//   validateEnvs
// } from './utils'

import { importGPG } from './libs'

import { getInputs } from './utils'

const main = async (): Promise<void> => {
  console.log('-------main-bagong-------')

  // chdir(WORKSPACE_DIR)

  // await execCmd(`git config --global --add safe.directory ${WORKSPACE_DIR}`)

  // const release = normalizeModule(semanticRelease)

  // const env = validateEnvs(process.env)

  // const result = await release(config, { env })

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

    console.log('outputs:', outputs)
  }

  console.log('workdir:', workdir, '|', typeof workdir, '|', env.INPUT_WORKDIR)
  console.log('privateKey:', privateKey, '|', typeof privateKey, '|', env['INPUT_GPG-PRIVATE-KEY'])
  console.log('passphrase:', passphrase, '|', typeof passphrase, '|', env['INPUT_GPG-PASSPHRASE'])
  console.log('fingerprint:', fingerprint, '|', typeof fingerprint, '|', env['INPUT_GPG-FINGERPRINT'])
  console.log('trustLevel:', trustLevel, '|', typeof trustLevel, '|', env['INPUT_GPG-TRUST-LEVEL'])
  console.log('gitScope:', gitScope, '|', typeof gitScope, '|', env['INPUT_GIT-SCOPE'])
  console.log('gitSignUser:', gitSignUser, '|', typeof gitSignUser, '|', env['INPUT_GIT-SIGN-USER'])
  console.log('gitSignCommit:', gitSignCommit, '|', typeof gitSignCommit, '|', env['INPUT_GIT-SIGN-COMMIT'])
  console.log('gitSignTag:', gitSignTag, '|', typeof gitSignTag, '|', env['INPUT_GIT-SIGN-TAG'])
  console.log('gitSignPush:', gitSignPush, '|', typeof gitSignPush, '|', env['INPUT_GIT-SIGN-PUSH'])
  console.log('token:', token, '|', typeof token, '|', env.INPUT_TOKEN, env.INPUT_TOKEN === env.GITHUB_TOKEN)
}

export default main
