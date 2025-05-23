import type { SpawnCmdOptions } from '../../utils'

import { spawnCmd } from '../../utils'

const spawnGpg = async (
  args: string[] = [],
  options: SpawnCmdOptions = {}
): ReturnType<typeof spawnCmd> => {
  return await spawnCmd('gpg', args, options)
}

export default spawnGpg
