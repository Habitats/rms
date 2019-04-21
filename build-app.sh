#!/usr/bin/env bash
echo "Building container ..."
docker build --tag rms-app -f kube/app/Dockerfile .
docker tag rms-app eu.gcr.io/romerike-markiseservice-as/rms-app
docker push eu.gcr.io/romerike-markiseservice-as/rms-app
