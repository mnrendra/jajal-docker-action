import { argv } from 'node:process'

import { execCmd } from '../utils'

const main = async (): Promise<string> => {
  const [version, notes, branch] = argv.slice(2)

  const tag = `v${version}`

  await execCmd(`git tag -d ${tag}`)

  await execCmd(`git push origin -d tag ${tag}`)

  const message = `release: ${tag}`

  await execCmd(`git tag -s ${tag} -m "${message}\n\n${notes}"`)

  await execCmd(`git push origin ${tag}`)

  return branch
}

export default main
