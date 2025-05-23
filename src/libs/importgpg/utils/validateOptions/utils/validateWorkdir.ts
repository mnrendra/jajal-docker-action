import isDir from '../../isDir'

const validateWorkdir = (
  workdir: string = '.'
): string => {
  if (typeof workdir !== 'string' || workdir === '') {
    throw new Error('Invalid workdir value', { cause: workdir })
  }

  if (!isDir(workdir)) {
    throw new Error(`workdir ${workdir} is doesn't exist`, { cause: workdir })
  }

  return workdir
}

export default validateWorkdir
