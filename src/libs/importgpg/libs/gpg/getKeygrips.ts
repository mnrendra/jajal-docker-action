import execGpg from './execGpg'

import { splitLines } from '../../utils'

const getKeygrips = async (
  fingerprint: string
): Promise<string[]> => {
  const args = [
    '--batch',
    '--with-colons',
    '--with-keygrip',
    '--list-secret-keys',
    fingerprint
  ]

  const { stdout } = await execGpg(args)

  const lines = splitLines(stdout, true)

  const keygrips: string[] = []

  lines.forEach((line) => {
    if (line.startsWith('grp')) {
      keygrips.push(line.replace(/(grp|:)/g, '').trim())
    }
  })

  return keygrips
}

export default getKeygrips
