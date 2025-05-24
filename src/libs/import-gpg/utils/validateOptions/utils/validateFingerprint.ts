const validateFingerprint = (
  fingerprint?: string
): string | undefined => {
  if (fingerprint === undefined) return

  if (typeof fingerprint !== 'string' || fingerprint === '') {
    throw new Error('Invalid fingerprint value', { cause: fingerprint })
  }

  return fingerprint
}

export default validateFingerprint
