#!/bin/bash

# Function to get the most recent image tag
get_latest_image() {
    gcloud container images list-tags eu.gcr.io/romerike-markiseservice-as/rms-app \
        --format="get(digest)" \
        --sort-by="~timestamp" \
        --limit=1
}

# Get the most recent image digest
DEFAULT_IMAGE="eu.gcr.io/romerike-markiseservice-as/rms-app@$(get_latest_image)"

# Function to print usage
print_usage() {
    echo "Usage: $0 [--tag=<image-tag>]"
    echo "Example: $0 --tag=eu.gcr.io/romerike-markiseservice-as/rms-app@sha256:123..."
    echo "If no tag is provided, uses most recent image"
}

# Parse command line arguments
IMAGE=$DEFAULT_IMAGE
while [ "$1" != "" ]; do
    case $1 in
        --tag=*)
            IMAGE="${1#*=}"
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

# Pull the image with platform specification
echo "Pulling image..."
docker pull --platform linux/amd64 $IMAGE

# Run the container with interactive shell directly (instead of using exec)
echo "Starting container..."
docker run --platform linux/amd64 --rm -it --name rms-app-browser $IMAGE /bin/bash