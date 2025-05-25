import type { Options as SROptions, PublishContext } from 'semantic-release'

import git from '../../../libs/git'

import { parsePublishContext } from '../utils'

interface Options extends SROptions {
  signCommit?: boolean
  signTag?: boolean
}

const publish = async (
  {
    signCommit,
    signTag
  }: Options = {},
  context: PublishContext
): Promise<void> => {
  const { branch, version, tag, notes } = parsePublishContext(context)

  const message = `release: v${version}`

  await git.commit(`${message}\n\n${notes}`, { sign: signCommit, allowEmpty: true })
  await git.push(branch)

  await git.tag(tag, { delete: true })
  await git.tag(tag, { sign: signTag, message: `${message}\n\n${notes}` })
  await git.push(tag, { delete: true })
  await git.push(tag)
}

export default publish
