import git, { type Result } from './git'

export interface GitConfig {
  'commit.gpgsign': boolean
  'push.gpgsign': boolean | 'if-asked'
  'tag.gpgsign': boolean
  'user.signingkey': string
  'user.name': string
  'user.email': string
}

export type GitConfigKey =
| 'commit.gpgsign'
| 'push.gpgsign'
| 'tag.gpgsign'
| 'user.signingkey'
| 'user.name'
| 'user.email'

export type GitConfigValue<K extends GitConfigKey> =
| K extends 'commit.gpgsign' ? GitConfig['commit.gpgsign'] : never
| K extends 'push.gpgsign' ? GitConfig['push.gpgsign'] : never
| K extends 'tag.gpgsign' ? GitConfig['tag.gpgsign'] : never /* eslint-disable-line @typescript-eslint/indent */
| K extends 'user.signingkey' ? GitConfig['user.signingkey'] : never /* eslint-disable-line @typescript-eslint/indent */
| K extends 'user.name' ? GitConfig['user.name'] : never /* eslint-disable-line @typescript-eslint/indent */
| K extends 'user.email' ? GitConfig['user.email'] : never /* eslint-disable-line @typescript-eslint/indent */

export type GitConfigScope =
| 'global'
| 'local'
| 'system'
| 'worktree'

interface Options<K extends GitConfigKey> {
  get?: boolean
  list?: boolean
  scope?: GitConfigScope
  unset?: boolean
  value?: GitConfigValue<K>
}

const getArgs = <K extends GitConfigKey>(
  configKey: K,
  {
    get = false,
    list = false,
    unset = false,
    scope = 'local',
    value
  }: Options<K> = {}
): string[] => {
  const args: string[] = [`--${scope}`]

  if (value !== undefined && value !== null) {
    args.push(`"${configKey}"`, `"${value.toString()}"`)
  } else if (get) {
    args.push('--get', `"${configKey}"`)
  } else if (unset) {
    args.push('--unset', `"${configKey}"`)
  } else if (list) {
    args.push('--list')
  }

  return args
}

const config = async <K extends GitConfigKey>(
  configKey: K,
  options: Options<K> = {}
): Promise<Result> => {
  const args = getArgs<K>(configKey, options)

  const result = await git('config', args)

  return result
}

export default config
