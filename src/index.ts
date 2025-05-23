#!/usr/bin/env node

import { execCmd } from './utils'

import main from './main'

console.log('dari index.js:', process.cwd())
console.log('dari index.js:', process.env.NODE_PATH)

execCmd('pwd').then(({ stderr, stdout }) => {
  console.log('stderr:', stderr)
  console.log('stdout:', stdout)
})

execCmd('echo $NODE_PATH').then(({ stderr, stdout }) => {
  console.log('stderr:', stderr)
  console.log('stdout:', stdout)
})

execCmd('ls -laihs').then(({ stderr, stdout }) => {
  console.log('stderr:', stderr)
  console.log('stdout:', stdout)
})

main()
  .then((result) => {
    console.log('hasil:', result)
  })
  .catch((error) => {
    if (error instanceof Error) throw error
    throw new Error('Unknown error')
  })
