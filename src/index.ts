#!/usr/bin/env node

import main from './main'

console.log(process.cwd())

main()
  .then((result) => {
    console.log('hasil:', result)
  })
  .catch((error) => {
    if (error instanceof Error) throw error
    throw new Error('Unknown error')
  })
