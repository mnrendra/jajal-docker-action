#!/bin/bash
set -euo pipefail
IFS=$'\n\t'
echo "$GPG_PRIVATE_KEY" > private.key
if [ -n "$GPG_PASSPHRASE" ]; then
  echo "$GPG_PASSPHRASE" | gpg --batch --yes --passphrase-fd 0 --import private.key
else
  gpg --batch --yes --import private.key
fi
rm -f private.key
KEY_ID=$(gpg --list-keys --with-colons | grep '^pub' | cut -d: -f5 | head -n1)
echo -e "5\ny\n" | gpg --command-fd 0 --edit-key "$KEY_ID" trust quit

DEFAULT_GIT_AUTHOR_NAME="GitOps Release"
DEFAULT_GIT_AUTHOR_EMAIL="gitops-release@users.noreply.github.com"

git config --global user.name "${GIT_AUTHOR_NAME:-$DEFAULT_GIT_AUTHOR_NAME}"
git config --global user.email "${GIT_AUTHOR_EMAIL:-$DEFAULT_GIT_AUTHOR_EMAIL}"
git config --global user.signingkey "$KEY_ID"
git config --global gpg.program gpg
