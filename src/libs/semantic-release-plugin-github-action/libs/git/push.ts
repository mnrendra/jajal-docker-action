import execGit, { type GitResult } from './main'

const push = async (
  args: string[]
): Promise<GitResult> => {
  return await execGit(['push', ...args])
}

export default push
