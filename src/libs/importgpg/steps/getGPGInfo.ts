import {
  type Dirs,
  type Version,
  getDirs,
  getVersion
} from '../libs'

import { info } from '../utils'

export interface GPGInfo extends Dirs, Version {
  version: string
}

const getGPGInfo = async (): Promise<GPGInfo> => {
  const gpgVerion = await getVersion()

  const dirs = await getDirs()
  const gpgInfo = { ...gpgVerion, ...dirs }

  Object.keys(gpgInfo).forEach((key) => {
    const val = gpgInfo[key as keyof typeof gpgInfo]
    if (typeof val !== 'string' && val === '') {
      throw new Error(`Invalid GPG ${key} value`, { cause: val })
    }
  })

  const version = `${gpgInfo.gnupg} (libgcrypt ${gpgInfo.libgcrypt})`

  info('---------------- GnuPG info --------------------------------------')
  info(`Version         : ${version}`)
  info(`Libdir          : ${gpgInfo.libdir}`)
  info(`Libexecdir      : ${gpgInfo.libexecdir}`)
  info(`Datadir         : ${gpgInfo.datadir}`)
  info(`Homedir         : ${gpgInfo.homedir}`)

  return {
    ...gpgInfo,
    version
  }
}

export default getGPGInfo
