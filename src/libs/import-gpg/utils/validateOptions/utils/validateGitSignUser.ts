const validateGitSignUser = (
  gitSignUser: boolean = true
): boolean => {
  if (typeof gitSignUser !== 'boolean') {
    throw new Error('Invalid gitSignUser value', { cause: gitSignUser })
  }

  return gitSignUser
}

export default validateGitSignUser
