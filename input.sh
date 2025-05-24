#!/bin/sh

# Prompt the user
printf "Enter your name: "
read name

# Check if input is empty
if [ -z "$name" ]; then
  echo "No name entered. Exiting."
  exit 1
fi

# Print greeting
echo "Hello, $name!"
