import { type Result, execa } from 'execa'

const execGpgconf = async (
  args: string[] = []
): Promise<Result<Record<any, unknown>>> => {
  return await execa('gpgconf', args)
}

export default execGpgconf
