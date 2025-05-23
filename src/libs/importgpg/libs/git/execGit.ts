import { execCmd } from '../../utils'

const execGit = async (
  args: string[] = []
): ReturnType<typeof execCmd> => {
  return await execCmd('git', args)
}

export default execGit
