import {
  GPG_AGENT_CONF,
  configureAgent,
  getHome,
  getKeygrip,
  getKeygrips,
  presetPassphrase
} from '../libs'

import { debug, info } from '../utils'

interface GPGAgentInfo {
  gpgHome: string
  keygrips: string[]
}

const configGPGAgent = async (
  digest: string,
  fingerprint?: string,
  passphrase?: string
): Promise<GPGAgentInfo> => {
  const gpgAgentInfo: GPGAgentInfo = { gpgHome: '', keygrips: [] }

  if (passphrase === undefined) return gpgAgentInfo

  const gpgHome = await getHome()
  await configureAgent(gpgHome, GPG_AGENT_CONF)
  gpgAgentInfo.gpgHome = gpgHome

  info('---------------- Configured GnuPG agent ------------------:')
  info(`GnuPG home      : ${gpgHome}`)

  if (fingerprint !== undefined) {
    info('---------------- Getting keygrip for fingerprint ---------:')

    const keygrip = await getKeygrip(fingerprint)

    info(`Presetting passphrase for key ${fingerprint} with keygrip ${keygrip}`)
    const keyinfo = await presetPassphrase(keygrip, passphrase)
    debug(keyinfo)

    gpgAgentInfo.keygrips = [keygrip]
  } else {
    info('---------------- Getting keygrips ------------------------:')

    const keygrips = await getKeygrips(digest)

    for (const keygrip of keygrips) {
      info(`Presetting passphrase for ${keygrip}`)
      const keyinfo = await presetPassphrase(keygrip, passphrase)
      debug(keyinfo)
    }

    gpgAgentInfo.keygrips = keygrips
  }

  return gpgAgentInfo
}

export default configGPGAgent
