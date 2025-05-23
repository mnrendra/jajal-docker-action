import { argv } from 'node:process'

import { execCmd } from '../utils'

const main = async (): Promise<string> => {
  const [version, notes, branch] = argv.slice(2)

  if (
    typeof version !== 'string' ||
    version === '' ||
    typeof branch !== 'string' ||
    branch === ''
  ) {
    return branch
  }

  const tag = `v${version}`
  const message = `release: ${tag}`

  console.log('-------------- delete local tag ----------')
  const a = await execCmd(`git tag -d ${tag}`)
  console.log('stderr:', a.stderr)
  console.log('stderr:', a.stdout)

  console.log('-------------- delete remote tag ---------')
  const b = await execCmd(`git push origin -d tag ${tag}`)
  console.log('stderr:', b.stderr)
  console.log('stderr:', b.stdout)

  console.log('-------------- commit release ------------')
  const c = await execCmd(`git commit -S -m "${message}\n\n${notes}"`)
  console.log('stderr:', c.stderr)
  console.log('stderr:', c.stdout)

  console.log('-------------- tag release ---------------')
  const d = await execCmd(`git tag -s ${tag} -m "${message}\n\n${notes}"`)
  console.log('stderr:', d.stderr)
  console.log('stderr:', d.stdout)

  console.log('-------------- push release --------------')
  const e = await execCmd('git push origin --follow-tags')
  console.log('stderr:', e.stderr)
  console.log('stderr:', e.stdout)

  return branch
}

export default main
