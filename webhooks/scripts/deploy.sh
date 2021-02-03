#!/bin/bash
echo "Deploying  ajoe"

cd ~//prodsite \
&& git checkout main \
&& git pull \
&& docker-compose up \
&& echo "ajoe deployed successfully"