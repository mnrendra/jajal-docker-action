import { resolve } from 'node:path'
import { chdir, cwd } from 'node:process'

import { store, setStore } from '../store'

import { info } from '../utils'

const setWorkdir = async (
  workdir: string
): Promise<void> => {
  const currentWorkdir = cwd()

  setStore({ ...store, cwd: currentWorkdir })

  const workdirPath = resolve(workdir)

  if (currentWorkdir !== workdirPath) {
    info('---------------- Change working directory ------------------------')

    chdir(workdirPath)
    info(`Using ${workdirPath} as working directory...`)
  }
}

export default setWorkdir
