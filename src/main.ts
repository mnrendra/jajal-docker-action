import { cwd } from 'node:process'

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

import { importGPG, cleanupGPG } from './libs'

import { execCmd, getInputs } from './utils'

const main = async (): Promise<void> => {
  // chdir(WORKSPACE_DIR)

  await execCmd(`git config --global --add safe.directory ${cwd()}`)

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
    gitSignPush
  } = getInputs()

  // console.log('workdir:', workdir, '|', typeof workdir, '|', `"${env.INPUT_WORKDIR}"`, '|', typeof env.INPUT_WORKDIR)
  // console.log('privateKey:', privateKey, '|', typeof privateKey, '|', `"${env['INPUT_GPG-PRIVATE-KEY']}"`, '|', typeof env['INPUT_GPG-PRIVATE-KEY'])
  // console.log('passphrase:', passphrase, '|', typeof passphrase, '|', `"${env['INPUT_GPG-PASSPHRASE']}"`, '|', typeof env['INPUT_GPG-PASSPHRASE'])
  // console.log('fingerprint:', fingerprint, '|', typeof fingerprint, '|', `"${env['INPUT_GPG-FINGERPRINT']}"`, '|', typeof env['INPUT_GPG-FINGERPRINT'])
  // console.log('trustLevel:', trustLevel, '|', typeof trustLevel, '|', `"${env['INPUT_GPG-TRUST-LEVEL']}"`, '|', typeof env['INPUT_GPG-TRUST-LEVEL'])
  // console.log('gitScope:', gitScope, '|', typeof gitScope, '|', `"${env['INPUT_GIT-SCOPE']}"`, '|', typeof env['INPUT_GIT-SCOPE'])
  // console.log('gitSignUser:', gitSignUser, '|', typeof gitSignUser, '|', `"${env['INPUT_GIT-SIGN-USER']}"`, '|', typeof env['INPUT_GIT-SIGN-USER'])
  // console.log('gitSignCommit:', gitSignCommit, '|', typeof gitSignCommit, '|', `"${env['INPUT_GIT-SIGN-COMMIT']}"`, '|', typeof env['INPUT_GIT-SIGN-COMMIT'])
  // console.log('gitSignTag:', gitSignTag, '|', typeof gitSignTag, '|', `"${env['INPUT_GIT-SIGN-TAG']}"`, '|', typeof env['INPUT_GIT-SIGN-TAG'])
  // console.log('gitSignPush:', gitSignPush, '|', typeof gitSignPush, '|', `"${env['INPUT_GIT-SIGN-PUSH']}"`, '|', typeof env['INPUT_GIT-SIGN-PUSH'])
  // console.log('token:', token, '|', typeof token, '|', `"${env.INPUT_TOKEN}"`, '|', typeof env.INPUT_TOKEN)

  // console.log(cwd())
  // const ls = await execCmd('ls -laihs')
  // console.log('stderr:', ls.stderr)
  // console.log('stdout:', ls.stdout)

  let digest = ''

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

    console.log('outputs:', outputs)
  }

  await execCmd('echo "tes" >> tes.txt')
  await execCmd('git add .')
  await execCmd('git commit -S -m "chore: add tes file"')
  await execCmd('git tag -s v4.4.0-tes -m "release: v4.4.0-tes"')
  await execCmd('git push --follow-tags')

  await cleanupGPG(digest)
}

export default main
