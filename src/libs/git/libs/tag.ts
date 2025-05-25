import git, { type Result } from './git'

interface Options {
  commit?: string
  delete?: boolean
  message?: string
  sign?: boolean
}

const getArgs = (
  name: string,
  {
    commit,
    delete: del = false,
    message = '',
    sign = false
  }: Options = {}
): string[] => {
  if (del) return ['-d', name]

  const args: string[] = []

  if (sign) args.push('-s')

  args.push(name)

  if (commit !== undefined) args.push(commit)

  return [...args, '-m', `"${message}"`]
}

const tag = async (
  name: string,
  options: Options = {}
): Promise<Result> => {
  const args = getArgs(name, options)

  const result = await git('tag', args)

  return result
}

export default tag
