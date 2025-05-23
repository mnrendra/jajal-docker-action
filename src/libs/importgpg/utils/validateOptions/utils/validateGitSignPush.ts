import type { GitPushGpgsign } from '../../../steps'

const validateGitSignPush = (
  gitSignPush: GitPushGpgsign = false
): GitPushGpgsign => {
  if (
    typeof gitSignPush !== 'boolean' &&
    (typeof gitSignPush !== 'string' || gitSignPush !== 'if-asked')
  ) {
    throw new Error('Invalid gitSignPush value', { cause: gitSignPush })
  }

  return gitSignPush
}

export default validateGitSignPush
