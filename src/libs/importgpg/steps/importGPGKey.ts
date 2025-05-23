import { importKey } from '../libs'
import { info } from '../utils'

const importGPGKey = async (
  gpgPrivateKey: string,
  verbose?: boolean
): Promise<string> => {
  info('---------------- Importing GPG private key ---------------:')

  const log = await importKey(gpgPrivateKey)
  info(log)

  return log
}

export default importGPGKey
