import { GIT_COMMITTER_NAME, GIT_COMMITTER_EMAIL } from '../consts'

import validateEnv from './validateEnv'

interface ValidEnvs extends NodeJS.ProcessEnv {
  GIT_AUTHOR_NAME: string
  GIT_AUTHOR_EMAIL: string
  GIT_COMMITTER_NAME: string
  GIT_COMMITTER_EMAIL: string
  GITHUB_TOKEN: string
}

const validateEnvs = (
  env: NodeJS.ProcessEnv = {}
): ValidEnvs => {
  if (!validateEnv(env.GITHUB_TOKEN)) {
    throw new Error('github-token is not provided')
  }

  if (!validateEnv(env.GIT_COMMITTER_NAME)) {
    env.GIT_COMMITTER_NAME = GIT_COMMITTER_NAME
  }

  if (!validateEnv(env.GIT_COMMITTER_EMAIL)) {
    env.GIT_COMMITTER_EMAIL = GIT_COMMITTER_EMAIL
  }

  if (!validateEnv(env.GIT_AUTHOR_NAME)) {
    env.GIT_AUTHOR_NAME = GIT_COMMITTER_NAME
  }

  if (!validateEnv(env.GIT_AUTHOR_EMAIL)) {
    env.GIT_AUTHOR_EMAIL = GIT_COMMITTER_EMAIL
  }

  return env as ValidEnvs
}

export default validateEnvs
