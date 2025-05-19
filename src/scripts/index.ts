#!/usr/bin/env node

import { argv } from 'node:process'

const [version, notes, branch] = argv.slice(2)

console.log('----------version--------------:\n', version)
console.log('----------notes----------------:\n', notes)
console.log('----------branch---------------:\n', branch)
