#!/usr/bin/env node

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

const main = async () => {
  const release = normalizeModule(semanticRelease)

  const result = await release(config, {
    env: {
      GIT_AUTHOR_NAME: 'GitOps Release',
      GIT_AUTHOR_EMAIL: 'gitops-release@users.noreply.github.com',
      GIT_COMMITTER_NAME: 'GitOps Release',
      GIT_COMMITTER_EMAIL: 'gitops-release@users.noreply.github.com'
    }
  })

  return result
}

main()
  .then((result) => {
    console.log('result:', result)
  })
  .catch((error) => {
    console.error(error)
  })
