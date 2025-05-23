import { importGPG } from './libs'

import { getInputs } from './utils'

const pre = async (): Promise<void> => {
  console.log('-------pre-bagong-------')

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

  console.log('workdir:', workdir)
  console.log('privateKey:', privateKey)
  console.log('passphrase:', passphrase)
  console.log('fingerprint:', fingerprint)
  console.log('trustLevel:', trustLevel)
  console.log('gitScope:', gitScope)
  console.log('gitSignUser:', gitSignUser)
  console.log('gitSignCommit:', gitSignCommit)
  console.log('gitSignTag:', gitSignTag)
  console.log('gitSignPush:', gitSignPush)
}

export default pre
