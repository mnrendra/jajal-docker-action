import type { Result } from 'semantic-release'

import { chdir } from 'node:process'

import { getInput } from '@actions/core'

import semanticRelease from 'semantic-release'

import { WORKSPACE_DIR } from './consts'

import config from './config'

import { execCmd, normalizeModule, validateEnvs } from './utils'

const main = async (
  //
): Promise<Result> => {
  chdir(WORKSPACE_DIR)

  const gitAuthorName = getInput('git-author-name')
  const gitAuthorEmail = getInput('git-author-email')

  const gitCommitterName = getInput('git-committer-name')
  const gitCommitterEmail = getInput('git-committer-email')

  const gpgPassphrase = getInput('gpg-passphrase')

  console.log('gitAuthorName:', gitAuthorName, 'env:', process.env['INPUT_GIT-AUTHOR-NAME'])
  console.log('gitAuthorEmail:', gitAuthorEmail, 'env:', process.env['INPUT_GIT-AUTHOR-EMAIL'])

  console.log('gitCommitterName:', gitCommitterName, 'env:', process.env['INPUT_GIT-COMMITTER-NAME'])
  console.log('gitCommitterEmail:', gitCommitterEmail, 'env:', process.env['INPUT_GIT-COMMITTER-NAME'])

  console.log('gpgPassphrase:', gpgPassphrase, 'env:', process.env['INPUT_GIT-PASSPHRASE'])

  await execCmd(`git config --global --add safe.directory ${WORKSPACE_DIR}`)

  const release = normalizeModule(semanticRelease)

  const env = validateEnvs(process.env)

  const result = await release(config, { env })

  return result
}

export default main
