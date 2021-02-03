#!/bin/bash
echo "Deploying  testRepo"

cd ~//prodsite \
&& git checkout main \
&& git pull \
&& echo "ajoe deployed successfully"