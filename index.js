#!/usr/bin/env node

const { exec } = require('node:child_process')
const { chdir, env } = require('node:process')

const semanticRelease = require('semantic-release')

const config = require('./config')

const normalizeModule = (
  module
) => {
  if (typeof module === 'function') {
    return module
  }

  if (typeof module === 'object' && module !== null && !Array.isArray(module) && typeof module.default === 'function') {
    return module.default
  }

  throw new Error('Invalid module')
}

const execCmd = (
  command = '',
  options = {}
) => new Promise((resolve, reject) => {
  try {
    exec(command, options, (error, stdout, stderr) => {
      if (error !== null && error !== undefined) {
        reject(error)
      }

      resolve({
        stdout,
        stderr
      })
    })
  } catch (error) {
    reject(error)
  }
})

const validateEnv = (
  env = ''
) => {
  if (typeof env !== 'string' || env === '') return null
  return env
}

const main = async () => {
  chdir('/github/workspace')

  await execCmd('git config --global --add safe.directory /github/workspace')

  if (!env.GITHUB_TOKEN) {
    throw new Error('github-token is not provided')
  }

  const release = normalizeModule(semanticRelease)

  const gitCommitterName = validateEnv(env.GIT_COMMITTER_NAME) ?? 'GitOps Release'
  const gitCommitterEmail = validateEnv(env.GIT_COMMITTER_EMAIL) ?? 'gitops-release@users.noreply.github.com'

  const gitAuthorName = validateEnv(env.GIT_AUTHOR_NAME) ?? gitCommitterName
  const gitAuthorEmail = validateEnv(env.GIT_AUTHOR_EMAIL) ?? gitCommitterEmail

  console.log('gitAuthorName:', gitAuthorName)
  console.log('gitAuthorEmail:', gitAuthorEmail)

  console.log('gitCommitterName:', gitCommitterName)
  console.log('gitCommitterEmail:', gitCommitterEmail)

  console.log('GIT_AUTHOR_NAME:', env.GIT_AUTHOR_NAME)
  console.log('GIT_AUTHOR_EMAIL:', env.GIT_AUTHOR_EMAIL)

  console.log('GIT_COMMITTER_NAME:', env.GIT_COMMITTER_NAME)
  console.log('GIT_COMMITTER_EMAIL:', env.GIT_COMMITTER_EMAIL)

  const result = await release(config, {
    env: {
      ...env,
      GIT_AUTHOR_NAME: gitAuthorName,
      GIT_AUTHOR_EMAIL: gitAuthorEmail,
      GIT_COMMITTER_NAME: gitCommitterName,
      GIT_COMMITTER_EMAIL: gitCommitterEmail,
    }
  })

  return result
}

main()
  .then((result) => {
    console.log('result:', result)
  })
  .catch((error) => {
    if (error instanceof Error) {
      throw error
    } else {
      throw new Error('Unknown error')
    }
  })
