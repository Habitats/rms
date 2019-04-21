#!/usr/bin/env bash
kubectl delete -f kube/volumes/deployment.yaml
kubectl delete -f kube/app/volume.yaml
kubectl delete -f kube/app/deployment.yaml
#kubectl delete -f kube/db/dropbox-cfg-pv.yaml

kubectl create -f kube/volumes/deployment.yaml
kubectl create -f kube/app/volume.yaml
kubectl create -f kube/app/deployment.yaml
#kubectl create -f kube/db/dropbox-cfg-pv.yaml
