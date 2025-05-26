import type { Options as SROptions, PublishContext } from 'semantic-release'

import git from '../../../libs/git'

// import { parsePublishContext } from '../utils'

const getNested = <O extends Record<string, any>>(
  object: O,
  path: string
): any => {
  return path.split('.').reduce((acc, key) => acc?.[key as keyof O], object)
}

interface Options extends SROptions {
  allowEmptyCommit?: boolean
  commitMessage?: string
  signCommit?: boolean
  signTag?: boolean
  tagMessage?: string
}

const publish = async (
  {
    allowEmptyCommit,
    commitMessage = '',
    signCommit,
    signTag,
    tagMessage = ''
  }: Options = {},
  context: PublishContext
): Promise<void> => {
  // const { branch, version, tag, notes } = parsePublishContext(context)

  // const message = `release: v${version}`

  const commitMsgVars = [
    ...commitMessage.matchAll(/{(.*?)}/g)
  ].map(m => m[1])

  let parsedCommitMsg = commitMessage ?? ''
  commitMsgVars.forEach((key) => {
    const val = getNested(context, key)
    parsedCommitMsg = parsedCommitMsg.replace(`{${key}}`, `${val}`)
  })

  const tagMsgVars = [
    ...tagMessage.matchAll(/{(.*?)}/g)
  ].map(m => m[1])

  let parsedTagMsg = tagMessage ?? ''
  tagMsgVars.forEach((key) => {
    const val = getNested(context, key)
    parsedTagMsg = parsedTagMsg.replace(`{${key}}`, `${val}`)
  })

  await git.commit(parsedCommitMsg, {
    sign: signCommit,
    allowEmpty: allowEmptyCommit
  })

  await git.push(context.branch.name)

  await git.tag(context.nextRelease.gitTag, { delete: true })

  await git.tag(context.nextRelease.gitTag, {
    sign: signTag,
    message: parsedTagMsg
  })

  await git.push(context.nextRelease.gitTag, { delete: true })

  await git.push(context.nextRelease.gitTag)
}

export default publish
