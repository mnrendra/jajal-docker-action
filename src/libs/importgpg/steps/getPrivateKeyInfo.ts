import { type PrivateKeyInfo, readPrivateKey } from '../libs'

import { info } from '../utils'

const getPrivateKeyInfo = async (
  privateKey: string
): Promise<PrivateKeyInfo> => {
  const {
    digest,
    id,
    name,
    email,
    creationTime
  } = await readPrivateKey(privateKey)

  info('---------------- GPG private key info ----------------------------')
  info(`Fingerprint     : ${digest}`)
  info(`KeyID           : ${id}`)
  info(`Name            : ${name}`)
  info(`Email           : ${email}`)
  info(`CreationTime    : ${creationTime.toUTCString()}`)

  return {
    digest,
    id,
    name,
    email,
    creationTime
  }
}

export default getPrivateKeyInfo
