import { argv } from 'node:process'

import { getInput } from '@actions/core'

import { execCmd } from '../utils'

const main = async (): Promise<string> => {
  const [version, notes, branch] = argv.slice(2)

  const tag = `v${version}`

  const gitAuthorName = getInput('git-author-name')
  const gitAuthorEmail = getInput('git-author-email')

  const gitCommitterName = getInput('git-committer-name')
  const gitCommitterEmail = getInput('git-committer-email')

  const gpgPassphrase = getInput('gpg-passphrase')

  console.log('gitAuthorName:', gitAuthorName)
  console.log('gitAuthorEmail:', gitAuthorEmail)

  console.log('gitCommitterName:', gitCommitterName)
  console.log('gitCommitterEmail:', gitCommitterEmail)

  console.log('gpgPassphrase:', gpgPassphrase)

  await execCmd(`git tag -d ${tag}`)

  await execCmd(`git push origin -d tag ${tag}`)

  const message = `release: ${tag}`

  await execCmd(`git tag -s ${tag} -m "${message}\n\n${notes}"`)

  await execCmd(`git push origin ${tag}`)

  return branch
}

export default main
