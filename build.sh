#!/usr/bin/env bash
echo "Building container ..."
docker build --tag rms .
docker tag rms eu.gcr.io/romerike-markiseservice-as/rms
docker push eu.gcr.io/romerike-markiseservice-as/rms
