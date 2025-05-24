import gpgConnectAgent from './gpgConnectAgent'

const presetPassphrase = async (
  keygrip: string,
  passphrase: string
): Promise<string> => {
  const hexPassphrase = Buffer.from(passphrase, 'utf8').toString('hex').toUpperCase()

  const presetPassphrase = await gpgConnectAgent(`PRESET_PASSPHRASE ${keygrip} -1 ${hexPassphrase}`)
  console.log('susu----------presetPassphrase:', presetPassphrase)

  const keyinfo = await gpgConnectAgent(`KEYINFO ${keygrip}`)
  console.log('susu----------keyinfo:', keyinfo)

  return keyinfo
}

export default presetPassphrase
