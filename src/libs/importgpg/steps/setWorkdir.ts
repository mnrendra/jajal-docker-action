import { chdir, cwd } from 'node:process'

import { info } from '../utils'

const setWorkdir = (
  workdir: string,
  verbose?: boolean
): void => {
  console.log('import-gpg-workdir:', cwd())

  if (workdir !== '.') {
    info('---------------- Change working directory ----------------:')

    chdir(workdir)
    info(`Using ${workdir} as working directory...`)
  }
}

export default setWorkdir
