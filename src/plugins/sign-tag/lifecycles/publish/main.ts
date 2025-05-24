import type { Options as SROptions, PublishContext } from 'semantic-release'

import { execa } from 'execa'

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

  console.log('-------------- dari plugin using exaca: delete local tag ----------')
  const a = await execa('git', ['tag', '-d', tag])
  console.log('stderr:', a.stderr)
  console.log('stdout:', a.stdout)

  console.log('-------------- dari plugin using exaca: delete remote tag ---------')
  const b = await execa('git', ['push', 'origin', '-d', 'tag', tag])
  console.log('stderr:', b.stderr)
  console.log('stdout:', b.stdout)

  const message = `release: ${tag}`

  console.log('-------------- dari plugin using exaca: commit release ------------')
  const c = await execa('git', ['commit', '-S', '--allow-empty', '-m', `"${message}\n\n${notes}"`])
  console.log('stderr:', c.stderr)
  console.log('stdout:', c.stdout)

  console.log('-------------- dari plugin using exaca: tag release ---------------')
  const d = await execa('git', ['tag', '-s', tag, '-m', `"${message}\n\n${notes}"`])
  console.log('stderr:', d.stderr)
  console.log('stdout:', d.stdout)

  console.log('-------------- dari plugin using exaca: push commit release --------------')
  const e = await execa('git', ['push', 'origin', branch])
  console.log('stderr:', e.stderr)
  console.log('stdout:', e.stdout)

  console.log('-------------- dari plugin using exaca: push tag release --------------')
  const f = await execa('git', ['push', 'origin', tag])
  console.log('stderr:', f.stderr)
  console.log('stdout:', f.stdout)
}

export default main
