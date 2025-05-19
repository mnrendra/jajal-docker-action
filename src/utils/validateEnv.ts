const validateEnv = (
  env?: string
): boolean => typeof env === 'string' && env !== ''

export default validateEnv
