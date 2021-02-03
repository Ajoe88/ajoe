#!/bin/bash
echo "Deploying..."

cd ~//prodsite

if git rev-parse --git-dir > /dev/null 2>&1; then
  echo "git initialized already"
else
  git init && git remote add origin git@github.com:Ajoe88/testRepo.git
fi

git fetch --all && \
git checkout --force "origin/main"

echo "Deployed successfully"