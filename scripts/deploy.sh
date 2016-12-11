#!/usr/bin/env bash
let branch
if [[ $1 == "prod" ]]; then
  branch="master"
else
  branch="stage"
fi
cd /home/habitats/rms && git reset --hard HEAD && git fetch && git pull origin $branch && git checkout $branch
cd /home/habitats/rms/scripts && chmod +x * && cd ..
chmod +x gradlew && ./gradlew stage
if [[ $branch == "stage" ]]; then
  mv /home/habitats/rms/rms_*war /home/habitats/rms/rms-demo.war
  cp -f /home/habitats/rms/rms-demo.war /opt/tomcat/demo/ROOT.war
else
  cp -f /home/habitats/rms/rms_*war /opt/tomcat/prod/ROOT.war
fi
