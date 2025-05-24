import execGit from './execGit'

const getConfig = async <T = string>(
  key: string,
  isGlobal: boolean = false
): Promise<T> => {
  const args = ['config', '--get']

  if (isGlobal) {
    args.push('--global')
  }

  args.push(key)

  const { stdout } = await execGit(args)

  if (stdout === 'true') return true as T
  if (stdout === 'false') return false as T

  return stdout as T
}

export default getConfig
