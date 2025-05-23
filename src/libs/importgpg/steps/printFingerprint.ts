import { info } from '../utils'

const printFingerprint = (
  digest: string,
  fingerprint?: string
): void => {
  info('---------------- Fingerprint to use ------------------------------')
  info(fingerprint ?? digest)
}

export default printFingerprint
