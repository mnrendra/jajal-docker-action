// import { execa } from 'execa'

import { execCmd } from '../../utils'

type Command =
| 'RELOADAGENT'
| `PRESET_PASSPHRASE ${string} ${number} ${string}`
| `KEYINFO ${string}`
| 'KILLAGENT'

const gpgConnectAgent = async (
  command: Command
): Promise<string> => {
  // const { stdout } = await execa('gpg-connect-agent', [`"${command}"`, '/bye'])

  console.log('sususu-----', command)

  const { stdout } = await execCmd(`gpg-connect-agent "${command}" /bye`)

  return stdout
}

export default gpgConnectAgent
