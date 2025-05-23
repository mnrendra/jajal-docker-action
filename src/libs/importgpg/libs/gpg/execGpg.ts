import { execCmd } from '../../utils'

const execGpg = async (
  args: string[] = []
): ReturnType<typeof execCmd> => {
  return await execCmd('gpg', args)
}

export default execGpg
