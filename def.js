const { execa } = require('execa')
const { spawnCmd } = require('./src/libs/importgpg/utils')

const main = async () => {
  // const cp = await execa('./input.sh', { input: 'haiaiadsadas' })
  // cp.stdin.end('renraaaaa')
  // console.log(cp.stdout)

  const sp = await spawnCmd(('./input.sh', { input: 'essss peeeee' }))
  console.log(sp.stdout)
}

main()
