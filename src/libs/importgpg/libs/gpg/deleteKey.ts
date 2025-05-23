import execGpg from './execGpg'

const deleteKey = async (
  fingerprint: string
): Promise<void> => {
  const args = [
    '--batch',
    '--yes',
    fingerprint
  ]

  const setArgs = (
    arg: string
  ): string[] => {
    return args.splice(args.length - 1, 0, arg)
  }

  await execGpg(setArgs('--delete-secret-keys'))
  await execGpg(setArgs('--delete-keys'))
}

export default deleteKey
