import type { PublishContext } from 'semantic-release'

interface ParsedContext {
  branch: string
  version: string
  tag: string
  notes: string
}

const parseContext = ({
  branch,
  nextRelease
}: PublishContext): ParsedContext => ({
  branch: branch.name,
  version: nextRelease.version,
  tag: nextRelease.gitTag,
  notes: nextRelease.notes ?? ''
})

export default parseContext
