#!/bin/bash

# Exit on any error
set -e

echo "Installing dependencies..."
npm install

echo "Building frontend..."
npm run build 