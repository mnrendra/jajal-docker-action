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

const main = async () => {
  chdir('/github/workspace')

  await execCmd('git config --global --add safe.directory /github/workspace')

  if (!env.GITHUB_TOKEN) {
    throw new Error('github-token is not provided')
  }

  const release = normalizeModule(semanticRelease)

  const gitCommitterName = env.GIT_COMMITTER_NAME ?? 'GitOps Release'
  const gitCommitterEmail = env.GIT_COMMITTER_EMAIL ?? 'gitops-release@users.noreply.github.com'

  const gitAuthorName = env.GIT_AUTHOR_NAME ?? gitCommitterName
  const gitAuthorEmail = env.GIT_AUTHOR_EMAIL ?? gitCommitterEmail

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
