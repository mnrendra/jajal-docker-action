import { type TrustLevel, setTrust } from '../libs'

import { info } from '../utils'

const setTrustLevel = async (
  keyid: string,
  trustLevel?: TrustLevel
): Promise<string> => {
  if (trustLevel === undefined) return ''

  const level = Number(trustLevel)

  if (Number.isNaN(level) || level < 1 || level > 5) {
    throw new Error('Invalid GPG Trust Level value', { cause: trustLevel })
  }

  info('---------------- Setting key\'s trust level ----------------------')
  await setTrust(keyid, trustLevel)
  info(`Trust level set to ${trustLevel} for ${keyid}`)

  return `Trust level set to ${trustLevel} for ${keyid}`
}

export default setTrustLevel
