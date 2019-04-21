#!/usr/bin/env bash
echo "Starting container ..."
docker kill rms
docker run -d --name rms-app --rm -p 80:8081 \
  --mount type=bind,source=/home/habitats/Dropbox/rms/img,target=/opt/rms/img \
  --mount type=bind,source=/home/habitats/Dropbox/rms/db,target=/opt/rms/db \
    rms-app
