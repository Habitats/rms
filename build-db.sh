#!/usr/bin/env bash
echo "Building container ..."
docker build --tag rms-db -f kube/db/Dockerfile .
docker tag rms-db eu.gcr.io/romerike-markiseservice-as/rms-db
docker push eu.gcr.io/romerike-markiseservice-as/rms-db
