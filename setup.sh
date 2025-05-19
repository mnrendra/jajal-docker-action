#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

apt-get update -qq >/dev/null
apt-get upgrade -y -qq >/dev/null
apt-get install -y --no-install-recommends git gnupg ca-certificates -qq >/dev/null

npm ci >/dev/null

rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* >/dev/null

chmod +x /index.js >/dev/null
