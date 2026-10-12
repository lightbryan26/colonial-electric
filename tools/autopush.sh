#!/bin/zsh
# Background: push progress/site every 120s while the build runs. Stop by creating tools/.stop-autopush
cd ~/colonial-electric
while [ ! -f tools/.stop-autopush ]; do tools/push.sh "Build progress $(date +%H:%M)" >/dev/null 2>&1; sleep 120; done
