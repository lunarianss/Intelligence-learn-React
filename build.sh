#!/bin/bash
APP_API_BASE_URL=http://139.9.44.14:31899 npm run vite-build
nowDate=$(date '+%Y%m%d%H%M%S')
APPDIR="/root/apps/front/builds/learn-front-${nowDate}"
echo $APPDIR
ssh master "mkdir -p ${APPDIR}"
scp -r dist/* master:${APPDIR}
ssh master "sh /root/apps/front/builds/build.sh -f learn-front-${nowDate}"