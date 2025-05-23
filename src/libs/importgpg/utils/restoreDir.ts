import { chdir, cwd } from 'node:process'

import { store } from '../store'

import info from './info'

const restoreDir = (): void => {
  const currentWorkdir = cwd()

  const storedWorkdir = store.cwd

  if (currentWorkdir !== storedWorkdir) {
    info('---------------- Restore working directory ---------------:')

    chdir(storedWorkdir)
    info(`Restore working directory to ${storedWorkdir}.`)
  }
}

export default restoreDir
