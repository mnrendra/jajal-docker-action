import execGit, { type GitResult } from './main'

const tag = async (
  args: string[]
): Promise<GitResult> => {
  return await execGit(['tag', ...args])
}

export default tag
