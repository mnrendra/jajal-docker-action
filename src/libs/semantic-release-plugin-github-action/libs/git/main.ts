import { type Result, execa } from 'execa'

export type GitResult = Result<Record<any, unknown>>

const main = async (
  args: string[] = []
): Promise<GitResult> => {
  return await execa('git', args)
}

export default main
