const validateGitSignCommit = (
  gitSignCommit: boolean = false
): boolean => {
  if (typeof gitSignCommit !== 'boolean') {
    throw new Error('Invalid gitSignCommit value', { cause: gitSignCommit })
  }

  return gitSignCommit
}

export default validateGitSignCommit
