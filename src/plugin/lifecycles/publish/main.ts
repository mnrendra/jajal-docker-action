import type { Options as SROptions, PublishContext } from 'semantic-release'

import { execCmd } from '../../../utils'

import { parseContext } from './utils'

interface Options extends SROptions {
  name?: string
}

const main = async (
  options: Options = {},
  context: PublishContext
): Promise<void> => {
  const { branch, version, tag, notes } = parseContext(context)

  console.log('options:', options)

  console.log('branch:', branch)
  console.log('version:', version)
  console.log('tag:', tag)
  console.log('notes:', notes)

  console.log('-------------- delete local tag ----------')
  const a = await execCmd(`git tag -d ${tag}`)
  console.log('stderr:', a.stderr)
  console.log('stdout:', a.stdout)

  console.log('-------------- delete remote tag ---------')
  const b = await execCmd(`git push origin -d tag ${tag}`)
  console.log('stderr:', b.stderr)
  console.log('stdout:', b.stdout)

  const message = `release: ${tag}`

  console.log('-------------- commit release ------------')
  const c = await execCmd(`git commit -S --allow-empty -m "${message}\n\n${notes}"`)
  console.log('stderr:', c.stderr)
  console.log('stdout:', c.stdout)

  console.log('-------------- tag release ---------------')
  const d = await execCmd(`git tag -s ${tag} -m "${message}\n\n${notes}"`)
  console.log('stderr:', d.stderr)
  console.log('stdout:', d.stdout)

  console.log('-------------- push release --------------')
  const e = await execCmd('git push origin --follow-tags')
  console.log('stderr:', e.stderr)
  console.log('stdout:', e.stdout)
}

export default main
