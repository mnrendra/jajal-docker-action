import { log } from '../../../libs/logger'

import { importKey } from '../libs'

const importGPGKey = async (
  gpgPrivateKey: string,
  verbose?: boolean
): Promise<string> => {
  log('---------------- Importing GPG private key -----------------------')

  const stdout = await importKey(gpgPrivateKey)
  log(stdout)

  return stdout
}

export default importGPGKey
