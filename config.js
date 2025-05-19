const branches = [
  '+([0-9])?(.{+([0-9]),x}).x',
  'main',
  'next',
  { name: 'rc', prerelease: true },
  { name: 'beta', prerelease: true },
  { name: 'alpha', prerelease: true }
]

const plugins = [
  ['@semantic-release/commit-analyzer', {
    releaseRules: [
      { type: 'docs', release: 'patch' },
      { type: 'style', release: 'patch' },
      { type: 'refactor', release: 'patch' },
      { type: 'perf', release: 'patch' },
      { type: 'test', release: 'patch' },
      { type: 'build', release: 'patch' },
      { type: 'ci', release: 'patch' },
      { type: 'chore', release: 'patch' },
      { type: 'revert', release: 'patch' }
    ]
  }],
  '@semantic-release/release-notes-generator',
  ['@semantic-release/npm', {
    npmPublish: false
  }],
  ['@semantic-release/exec', {
    publishCmd: 'echo \n"$GIT_AUTHOR_NAME" && echo \n"$GIT_AUTHOR_EMAIL" && echo \n"$GIT_COMMITTER_NAME" && echo \n"$GIT_COMMITTER_EMAIL" && git config --list'
  }]
]

const config = {
  branches,
  plugins,
  dryRun: false,
  ci: true
}

module.exports = config
