#!/bin/zsh
# Commit and push everything as lightbryan26. Usage: tools/push.sh "message"
cd ~/colonial-electric || exit 1
T=$(gh auth token -u lightbryan26)
git add -A && git commit -qm "${1:-Progress update}" 2>/dev/null
git -c credential.helper= -c "http.https://github.com/.extraheader=AUTHORIZATION: basic $(printf 'x-access-token:%s' "$T" | base64)" push -q origin main 2>&1 | grep -v '^$'
