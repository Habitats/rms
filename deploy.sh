#!/usr/bin/env bash
echo "Deploying  ..."
kubectl replace --force -f kube_service.yaml
kubectl replace --force -f kube_deployment.yaml

