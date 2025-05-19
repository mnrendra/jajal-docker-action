#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

apt-get update -qq
apt-get upgrade -y -qq
apt-get install -y --no-install-recommends git gnupg ca-certificates -qq

npm ci

rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

chmod +x /index.js
