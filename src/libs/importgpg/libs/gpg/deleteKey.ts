import execGpg from './execGpg'

const deleteKey = async (
  fingerprint: string
): Promise<void> => {
  // const args = [
  //   '--batch',
  //   '--yes',
  //   fingerprint
  // ]

  // const setArgs = (
  //   arg: string
  // ): string[] => {
  //   return args.splice(args.length - 1, 0, arg)
  // }

  const a = await execGpg(['--batch', '--yes', '--delete-secret-keys', fingerprint])
  console.log('stderr:', a.stderr)
  console.log('stdout:', a.stdout)

  const b = await execGpg(['--batch', '--yes', '--delete-keys', fingerprint])
  console.log('stderr:', b.stderr)
  console.log('stdout:', b.stdout)
}

export default deleteKey
