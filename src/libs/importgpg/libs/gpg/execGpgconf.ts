import { execCmd } from '../../utils'

const execGpgconf = async (
  args: string[] = []
): ReturnType<typeof execCmd> => {
  return await execCmd('gpgconf', args)
}

export default execGpgconf
