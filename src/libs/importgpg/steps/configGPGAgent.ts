import {
  GPG_AGENT_CONF,
  configureAgent,
  getHome,
  getKeygrip,
  getKeygrips,
  presetPassphrase
} from '../libs'

import { info } from '../utils'

export interface KeygripPair {
  keygrip: string
  keyinfo: string
}

interface GPGAgentInfo {
  gpgHome: string
  keygripPairs: KeygripPair[]
}

const configGPGAgent = async (
  digest: string,
  fingerprint?: string,
  passphrase?: string
): Promise<GPGAgentInfo> => {
  const gpgAgentInfo: GPGAgentInfo = { gpgHome: '', keygripPairs: [] }

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

    gpgAgentInfo.keygripPairs = [{ keygrip, keyinfo }]
  } else {
    info('---------------- Getting keygrips ------------------------:')

    const keygrips = await getKeygrips(digest)

    const keygripPairs = []
    for (const keygrip of keygrips) {
      info(`Presetting passphrase for ${keygrip}`)
      const keyinfo = await presetPassphrase(keygrip, passphrase)
      keygripPairs.push({ keygrip, keyinfo })
    }

    gpgAgentInfo.keygripPairs = keygripPairs
  }

  return gpgAgentInfo
}

export default configGPGAgent
