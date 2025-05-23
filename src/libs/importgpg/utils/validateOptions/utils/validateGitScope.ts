import type { GitScope } from '../../../steps'

const validateGitScope = (
  gitScope: GitScope = 'local'
): GitScope => {
  if (
    typeof gitScope !== 'string' ||
    !['global', 'local'].includes(gitScope)
  ) {
    throw new Error('Invalid gitScope value', { cause: gitScope })
  }

  return gitScope
}

export default validateGitScope
