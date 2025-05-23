import spawnGpg from './spawnGpg'

export type TrustLevel =
| 1
| 2
| 3
| 4
| 5

const setTrustLevel = async (
  keyid: string,
  trust: TrustLevel
): Promise<void> => {
  const args = [
    '--batch',
    '--no-tty',
    '--command-fd',
    '0',
    '--edit-key',
    keyid
  ]

  const input = Buffer.from(`trust\n${trust}\ny\nquit\n`)

  await spawnGpg(args, { input })
}

export default setTrustLevel
