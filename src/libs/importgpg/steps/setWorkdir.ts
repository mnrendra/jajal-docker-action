import { chdir, cwd } from 'node:process'

import { info, execCmd } from '../utils'

const setWorkdir = async (
  workdir: string,
  verbose?: boolean
): Promise<void> => {
  console.log('import-gpg-workdir:', cwd())
  const { stderr, stdout } = await execCmd('ls -laihs')
  console.log('import-gpg-workdir-stderr:', stderr)
  console.log('import-gpg-workdir-stdout:', stdout)

  if (workdir !== '.') {
    info('---------------- Change working directory ----------------:')

    chdir(workdir)
    info(`Using ${workdir} as working directory...`)
  }
}

export default setWorkdir
