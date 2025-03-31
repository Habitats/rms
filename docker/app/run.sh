#!/usr/bin/env bash

java \
      -Xms2g \
      -Xmx2g \
      -server \
      -XX:+UseConcMarkSweepGC \
      -XX:MaxMetaspaceSize=512m \
      -XX:+CMSParallelRemarkEnabled \
      -XX:+UseCMSInitiatingOccupancyOnly \
      -XX:CMSInitiatingOccupancyFraction=70 \
      -XX:+ScavengeBeforeFullGC \
      -XX:+CMSScavengeBeforeRemark \
      -jar backend/build/libs/backend.jar

