#!/usr/bin/env bash

# Enable BuildKit
export DOCKER_BUILDKIT=1

# Function to print usage
print_usage() {
    echo "Usage: $0 [--tag-app=<app-image-tag>] [--tag-db=<db-image-tag>]"
    echo "Example: $0 --tag-app=eu.gcr.io/romerike-markiseservice-as/rms-app@sha256:123... --tag-db=eu.gcr.io/romerike-markiseservice-as/rms-db@sha256:456..."
    echo "If no tags are provided, builds and deploys new images"
}

# Parse command line arguments
APP_TAG=""
DB_TAG=""
while [ "$1" != "" ]; do
    case $1 in
        --tag-app=*)
            APP_TAG="${1#*=}"
            ;;
        --tag-db=*)
            DB_TAG="${1#*=}"
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

if [ -n "$APP_TAG" ] || [ -n "$DB_TAG" ]; then
    echo "Deploying specific images..."
    
    # Create temporary deployment files
    TMP_APP_DEPLOYMENT=$(mktemp)
    TMP_DB_DEPLOYMENT=$(mktemp)
    
    # Handle app deployment
    if [ -n "$APP_TAG" ]; then
        echo "Deploying app image: $APP_TAG"
        sed "s|image: eu.gcr.io/romerike-markiseservice-as/rms-app|image: $APP_TAG|" kube/app-deployment.yaml > "$TMP_APP_DEPLOYMENT"
        kubectl replace --force -f "$TMP_APP_DEPLOYMENT"
    fi
    
    # Handle db deployment
    if [ -n "$DB_TAG" ]; then
        echo "Deploying db image: $DB_TAG"
        sed "s|image: eu.gcr.io/romerike-markiseservice-as/rms-db|image: $DB_TAG|" kube/db-deployment.yaml > "$TMP_DB_DEPLOYMENT"
        kubectl replace --force -f "$TMP_DB_DEPLOYMENT"
    fi
    
    # Cleanup temp files
    rm -f "$TMP_APP_DEPLOYMENT" "$TMP_DB_DEPLOYMENT"
else
    echo "Building container ..."
    # Use buildx with proper platform specification
    docker buildx build \
      --platform linux/amd64 \
      --tag eu.gcr.io/romerike-markiseservice-as/rms-app \
      --push \
      -f docker/app/Dockerfile .

#    echo "Building DB ..."
#    docker buildx build \
#      --platform linux/amd64 \
#      --tag eu.gcr.io/romerike-markiseservice-as/rms-db \
#      --push \
#      -f docker/db/Dockerfile .

    echo "Deploying to Kubernetes ..."
    kubectl replace --force -f kube/app-deployment.yaml
fi
