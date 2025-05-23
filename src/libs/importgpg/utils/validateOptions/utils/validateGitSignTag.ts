const validateGitSignTag = (
  gitSignTag: boolean = false
): boolean => {
  if (typeof gitSignTag !== 'boolean') {
    throw new Error('Invalid gitSignTag value', { cause: gitSignTag })
  }

  return gitSignTag
}

export default validateGitSignTag
