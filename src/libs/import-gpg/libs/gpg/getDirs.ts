import execGpgconf from './execGpgconf'

import { splitLines } from '../../utils'

export interface Dirs {
  libdir: string
  libexecdir: string
  datadir: string
  homedir: string
}

type Dir = keyof Dirs

const parseLineDir = (
  line: string,
  dir: Dir
): string => {
  return line.slice(dir.length + 1).replace('%3a', ':').trim()
}

const getDirs = async (): Promise<Dirs> => {
  const args = ['--list-dirs']

  const { stdout } = await execGpgconf(args)

  const lines = splitLines(stdout, true)

  const dirs: Dirs = {
    libdir: '',
    libexecdir: '',
    datadir: '',
    homedir: ''
  }

  lines.forEach((line) => {
    Object.keys(dirs).forEach((key) => {
      const dir = key as Dir

      if (line.startsWith(`${dir}:`)) {
        dirs[dir] = parseLineDir(line, dir)
      }
    })
  })

  Object.keys(dirs).forEach((key) => {
    const val = dirs[key as Dir]

    if (typeof val !== 'string' || val === '') {
      throw new Error(`Invalid GPG ${key}`, { cause: val })
    }
  })

  return dirs
}

export default getDirs
