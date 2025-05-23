import type { PublishContext } from 'semantic-release'

import { parseContext } from './utils'

interface Options {
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
}

export default main
