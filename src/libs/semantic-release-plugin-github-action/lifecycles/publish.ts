import type { Options as SROptions, PublishContext } from 'semantic-release'

import git from '../../../libs/git'

import { parsePublishContext } from '../utils'

interface Options extends SROptions {
  name?: string
}

const publish = async (
  options: Options = {},
  context: PublishContext
): Promise<void> => {
  const { branch, version, tag, notes } = parsePublishContext(context)

  console.log('options:', options)

  console.log('branch:', branch)
  console.log('version:', version)
  console.log('tag:', tag)
  console.log('notes:', notes)

  console.log('-------------- using git. delete local tag ----------')
  const a = await git.tag(tag, { delete: true })
  console.log('stderr:', a.stderr)
  console.log('stdout:', a.stdout)

  console.log('-------------- using git. delete remote tag ---------')
  const b = await git.push(tag, { delete: true })
  console.log('stderr:', b.stderr)
  console.log('stdout:', b.stdout)

  const message = `release: ${tag}`

  console.log('-------------- using git. commit release ------------')
  const c = await git.commit(`${message}\n\n${notes}`, { sign: true, allowEmpty: true })
  console.log('stderr:', c.stderr)
  console.log('stdout:', c.stdout)

  console.log('-------------- using git. tag release ---------------')
  const d = await git.tag(tag, { sign: true, message: `${message}\n\n${notes}` })
  console.log('stderr:', d.stderr)
  console.log('stdout:', d.stdout)

  console.log('-------------- using git. push commit release --------------')
  const e = await git.push(branch)
  console.log('stderr:', e.stderr)
  console.log('stdout:', e.stdout)

  console.log('-------------- using git. push tag release --------------')
  const f = await git.push(tag)
  console.log('stderr:', f.stderr)
  console.log('stdout:', f.stdout)
}

export default publish
