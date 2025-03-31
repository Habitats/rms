#!/usr/bin/env bash

# Enable BuildKit
export DOCKER_BUILDKIT=1

# Function to print usage
print_usage() {
    echo "Usage: $0 [--tag=<image-tag>]"
    echo "Example: $0 --tag=eu.gcr.io/romerike-markiseservice-as/rms-app@sha256:0efda30e2e96521b71eff701a1fcca5b7e7c9c0bd29fecfe708146c7755143db"
    echo "If no tag is provided, builds and deploys new images"
}

# Parse command line arguments
IMAGE_TAG=""
while [ "$1" != "" ]; do
    case $1 in
        --tag=*)
            IMAGE_TAG="${1#*=}"
            ;;
        -h | --help)
            print_usage
            exit
            ;;
        *)
            print_usage
            exit 1
    esac
    shift
done

if [ -n "$IMAGE_TAG" ]; then
    echo "Deploying specific image: $IMAGE_TAG"
    # Create a temporary deployment file with the specific image
    TMP_DEPLOYMENT=$(mktemp)
    sed "s|image: eu.gcr.io/romerike-markiseservice-as/rms-app|image: $IMAGE_TAG|" kube/app-deployment.yaml > "$TMP_DEPLOYMENT"
    kubectl replace --force -f "$TMP_DEPLOYMENT"
    rm "$TMP_DEPLOYMENT"
else
    echo "Building container ..."
    # Use buildx with proper platform specification
    docker buildx build \
      --platform linux/amd64 \
      --tag eu.gcr.io/romerike-markiseservice-as/rms-app \
      --push \
      -f docker/app/Dockerfile .

    echo "Building DB ..."
    docker buildx build \
      --platform linux/amd64 \
      --tag eu.gcr.io/romerike-markiseservice-as/rms-db \
      --push \
      -f docker/db/Dockerfile .

    echo "Deploying to Kubernetes ..."
    kubectl replace --force -f kube/app-deployment.yaml
fi
