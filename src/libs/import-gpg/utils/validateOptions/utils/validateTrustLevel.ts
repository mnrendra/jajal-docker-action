import type { TrustLevel } from '../../../libs'

const validateTrustLevel = (
  trustLevel?: TrustLevel
): TrustLevel | undefined => {
  if (trustLevel === undefined) return

  const level = Number(trustLevel)

  if ((Number.isNaN(level) || level < 1 || level > 5)) {
    throw new Error('Invalid trustLevel value', { cause: trustLevel })
  }

  return trustLevel
}

export default validateTrustLevel
