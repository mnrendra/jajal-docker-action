import type { Result } from 'semantic-release'

import { chdir } from 'node:process'

import semanticRelease from 'semantic-release'

import { WORKSPACE_DIR } from './consts'

import config from './config'

import { execCmd, normalizeModule, validateEnvs } from './utils'

const main = async (
  //
): Promise<Result> => {
  chdir(WORKSPACE_DIR)

  await execCmd(`git config --global --add safe.directory ${WORKSPACE_DIR}`)

  const release = normalizeModule(semanticRelease)

  const env = validateEnvs(process.env)

  const result = await release(config, { env })

  return result
}

export default main
