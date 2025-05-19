#!/bin/bash
set -euo pipefail
IFS=$'\n\t'
echo "$INPUT_GPG_PRIVATE_KEY" > private.key
if [ -n "$INPUT_GPG_PASSPHRASE" ]; then
  echo "$INPUT_GPG_PASSPHRASE" | gpg --batch --yes --passphrase-fd 0 --import private.key
else
  gpg --batch --yes --import private.key
fi
KEY_ID=$(gpg --list-keys --with-colons | grep '^pub' | cut -d: -f5 | head -n1)
echo -e "5\ny\n" | gpg --command-fd 0 --edit-key "$KEY_ID" trust quit
GIT_AUTHOR_NAME="GitOps Release"
GIT_AUTHOR_EMAIL="gitops-release@users.noreply.github.com"
git config --global user.name "${INPUT_GIT_AUTHOR_NAME:-$GIT_AUTHOR_NAME}"
git config --global user.email "${INPUT_GIT_AUTHOR_EMAIL:-$GIT_AUTHOR_EMAIL}"
git config --global user.signingkey "$KEY_ID"
git config --global gpg.program gpg
