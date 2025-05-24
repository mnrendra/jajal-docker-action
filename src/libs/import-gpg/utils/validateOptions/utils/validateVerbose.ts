const validateVerbose = (
  verbose: boolean = false
): boolean => {
  if (typeof verbose !== 'boolean') {
    throw new Error('Invalid verbose value', { cause: verbose })
  }

  return verbose
}

export default validateVerbose
