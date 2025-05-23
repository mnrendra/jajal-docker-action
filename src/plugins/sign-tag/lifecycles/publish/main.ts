import type { Options as SROptions, PublishContext } from 'semantic-release'

import { execCmd } from '../../../../utils'

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

  console.log('-------------- dari plugin: delete local tag ----------')
  const a = await execCmd(`git tag -d ${tag}`)
  console.log('stderr:', a.stderr)
  console.log('stdout:', a.stdout)

  console.log('-------------- dari plugin: delete remote tag ---------')
  const b = await execCmd(`git push origin -d tag ${tag}`)
  console.log('stderr:', b.stderr)
  console.log('stdout:', b.stdout)

  const message = `release: ${tag}`

  console.log('-------------- dari plugin: commit release ------------')
  const c = await execCmd(`git commit -S --allow-empty -m "${message}\n\n${notes}"`)
  console.log('stderr:', c.stderr)
  console.log('stdout:', c.stdout)

  console.log('-------------- dari plugin: tag release ---------------')
  const d = await execCmd(`git tag -s ${tag} -m "${message}\n\n${notes}"`)
  console.log('stderr:', d.stderr)
  console.log('stdout:', d.stdout)

  console.log('-------------- dari plugin: push commit release --------------')
  const e = await execCmd(`git push origin ${branch}`)
  console.log('stderr:', e.stderr)
  console.log('stdout:', e.stdout)

  console.log('-------------- dari plugin: push tag release --------------')
  const f = await execCmd(`git push origin ${tag}`)
  console.log('stderr:', f.stderr)
  console.log('stdout:', f.stdout)

  console.log('coba---')
}

export default main
