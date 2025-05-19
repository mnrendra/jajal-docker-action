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

  let std

  std = await execCmd('echo $INPUT_GITHUB-TOKEN')
  console.log('INPUT_GITHUB:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $CI')
  console.log('CI:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_ACTIONS')
  console.log('GITHUB_ACTIONS:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_TOKEN')
  console.log('GITHUB_TOKEN:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $HOME')
  console.log('HOME:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_JOB')
  console.log('GITHUB_JOB:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_REF')
  console.log('GITHUB_REF:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_SHA')
  console.log('GITHUB_SHA:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_REPOSITORY')
  console.log('GITHUB_REPOSITORY:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_REPOSITORY_OWNER')
  console.log('GITHUB_REPOSITORY_OWNER:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_REPOSITORY_OWNER_ID')
  console.log('GITHUB_REPOSITORY_OWNER_ID:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_RUN_ID')
  console.log('GITHUB_RUN_ID:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_RUN_NUMBER')
  console.log('GITHUB_RUN_NUMBER:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_RETENTION_DAYS')
  console.log('GITHUB_RETENTION_DAYS:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_RUN_ATTEMPT')
  console.log('GITHUB_RUN_ATTEMPT:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_ACTOR_ID')
  console.log('GITHUB_ACTOR_ID:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_ACTOR')
  console.log('GITHUB_ACTOR:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_WORKFLOW')
  console.log('GITHUB_WORKFLOW:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_HEAD_REF')
  console.log('GITHUB_HEAD_REF:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_BASE_REF')
  console.log('GITHUB_BASE_REF:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_EVENT_NAME')
  console.log('GITHUB_EVENT_NAME:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_SERVER_URL')
  console.log('GITHUB_SERVER_URL:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_API_URL')
  console.log('GITHUB_API_URL:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_GRAPHQL_URL')
  console.log('GITHUB_GRAPHQL_URL:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_REF_NAME')
  console.log('GITHUB_REF_NAME:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_REF_PROTECTED')
  console.log('GITHUB_REF_PROTECTED:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_REF_TYPE')
  console.log('GITHUB_REF_TYPE:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_WORKFLOW_REF')
  console.log('GITHUB_WORKFLOW_REF:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_WORKFLOW_SHA')
  console.log('GITHUB_WORKFLOW_SHA:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_REPOSITORY_ID')
  console.log('GITHUB_REPOSITORY_ID:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_TRIGGERING_ACTOR')
  console.log('GITHUB_TRIGGERING_ACTOR:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_WORKSPACE')
  console.log('GITHUB_WORKSPACE:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_ACTION')
  console.log('GITHUB_ACTION:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_EVENT_PATH')
  console.log('GITHUB_EVENT_PATH:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_ACTION_REPOSITORY')
  console.log('GITHUB_ACTION_REPOSITORY:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_ACTION_REF')
  console.log('GITHUB_ACTION_REF:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_PATH')
  console.log('GITHUB_PATH:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_ENV')
  console.log('GITHUB_ENV:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_STEP_SUMMARY')
  console.log('GITHUB_STEP_SUMMARY:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_STATE')
  console.log('GITHUB_STATE:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $GITHUB_OUTPUT')
  console.log('GITHUB_OUTPUT:\n', std.stdout, '\n', std.stderr)
  std = await execCmd('echo $RUNNER')
  console.log('RUNNER:\n', std.stdout, '\n', std.stderr)

  // await execCmd('npx semantic-release -e ./config.js')

  console.log('----------------process.env-------------------\n', env)

  const release = normalizeModule(semanticRelease)

  const result = await release(config, {
    env: {
      GIT_AUTHOR_NAME: 'GitOps Release',
      GIT_AUTHOR_EMAIL: 'gitops-release@users.noreply.github.com',
      GIT_COMMITTER_NAME: 'GitOps Release',
      GIT_COMMITTER_EMAIL: 'gitops-release@users.noreply.github.com',
      CI: env.CI ?? true,
      GITHUB_ACTIONS: env.GITHUB_ACTIONS ?? true,
      GITHUB_TOKEN: env.GITHUB_TOKEN,
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
