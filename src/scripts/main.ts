import { argv } from 'node:process'

import { execCmd } from '../utils'

const main = async (): Promise<string> => {
  const [version, notes, branch] = argv.slice(2)

  const tag = `v${version}`

  await execCmd(`git tag -d ${tag}`)

  await execCmd(`git push origin -d tag ${tag}`)

  const message = `release: ${tag}`

  const gitconfig = await execCmd('git config --list')
  console.log('gitconfig:\n', gitconfig.stdout, '\n', gitconfig.stderr)

  const gpgk = await execCmd('gpg -k')
  console.log('gpgk:\n', gpgk.stdout, '\n', gpgk.stderr)

  await execCmd(`git tag -s ${tag} -m "${message}\n\n${notes}"`)

  await execCmd(`git push origin ${tag}`)

  return branch
}

export default main
