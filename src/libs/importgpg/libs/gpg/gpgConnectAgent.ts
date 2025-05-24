import { execa } from 'execa'

type ConnectAgentCommand =
| 'RELOADAGENT'
| `PRESET_PASSPHRASE ${string} -1 ${string}`
| `KEYINFO ${string}`
| 'KILLAGENT'

const gpgConnectAgent = async (
  command: ConnectAgentCommand
): Promise<string> => {
  const { stdout } = await execa('gpg-connect-agent', [`"${command}"`, '/bye'])
  return stdout
}

export default gpgConnectAgent
