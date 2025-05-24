const validatePassphrase = (
  passphrase?: string
): string | undefined => {
  if (passphrase === undefined) return

  if (typeof passphrase !== 'string' || passphrase === '') {
    throw new Error('Invalid passphrase value', { cause: passphrase })
  }

  return passphrase
}

export default validatePassphrase
