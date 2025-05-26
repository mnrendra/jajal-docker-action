import { type Result as ExecaResult } from 'execa'

import { execa } from 'execa'

export type Result = ExecaResult<Record<any, unknown>>

export type Command =
| 'commit'
| 'config'
| 'ls-remote'
| 'push'
| 'tag'

const git = async (
  command: Command,
  args: string[] = []
): Promise<Result> => {
  const result = await execa('git', [command, ...args])
  return result
}

export default git
