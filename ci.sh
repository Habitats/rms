#!/usr/bin/env bash
echo "Building container ..."
docker build --tag rms-app -f docker/app/Dockerfile .
docker tag rms-app eu.gcr.io/romerike-markiseservice-as/rms-app
docker push eu.gcr.io/romerike-markiseservice-as/rms-app

echo "Building DB ..."
docker build --tag rms-db -f docker/db/Dockerfile .
docker tag rms-db eu.gcr.io/romerike-markiseservice-as/rms-db
docker push eu.gcr.io/romerike-markiseservice-as/rms-db

echo "Deploying to Kubernetes ..."
kubectl replace --force -f kube/app-deployment.yaml
