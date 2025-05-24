import { type Result, execa } from 'execa'

const execGit = async (
  args: string[] = []
): Promise<Result<Record<any, unknown>>> => {
  return await execa('git', args)
}

export default execGit
