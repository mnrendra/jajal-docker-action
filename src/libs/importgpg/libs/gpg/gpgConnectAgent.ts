import { execa } from 'execa'

type Args =
| ['RELOADAGENT']
| ['PRESET_PASSPHRASE', string, `${number}`, string]
| ['KEYINFO', string]
| ['KILLAGENT']

const gpgConnectAgent = async (
  args: Args
): Promise<string> => {
  const command = args.shift()

  const { stdout } = await execa('gpg-connect-agent', [
    `"${command}"`,
    ...args,
    '/bye'
  ])

  return stdout
}

export default gpgConnectAgent
