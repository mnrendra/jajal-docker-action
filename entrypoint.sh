#!/bin/sh -l

echo "Hello $1"
time=$(date)
echo "time=$time" >> $GITHUB_OUTPUT

ls -laihs
cat entrypoint.sh

git config --global --add safe.directory /github/workspace
git config --list
git log
