#!/usr/bin/env node

import main from './main'

main()
  .then((result) => {
    console.log('berhasil:', result)
  })
  .catch((error) => {
    if (error instanceof Error) throw error
    throw new Error('Unknown error')
  })
