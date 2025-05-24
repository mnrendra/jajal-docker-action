import execGit from './execGit'

const setConfig = async (
  key: string,
  value: string,
  isGlobal: boolean = false
): Promise<void> => {
  const args = ['config']

  if (isGlobal) {
    args.push('--global')
  }

  args.push(key, value)

  await execGit(args)
}

export default setConfig
