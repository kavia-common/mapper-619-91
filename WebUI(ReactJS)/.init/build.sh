#!/usr/bin/env bash
set -euo pipefail
WORKSPACE="/home/kavia/workspace/code-generation/mapper-619-91/WebUI(ReactJS)"
ART="$WORKSPACE/.artifacts/react"; mkdir -p "$ART"
cd "$WORKSPACE"
# ensure env persisted (if present) is safe
if [ -r /etc/profile.d/react_env.sh ]; then
  if bash -n /etc/profile.d/react_env.sh 2>/dev/null; then source /etc/profile.d/react_env.sh || true; else echo "/etc/profile.d/react_env.sh has syntax error - ignoring" >&2; fi
fi
export NODE_ENV=${NODE_ENV:-production}
export CI=true
# run build and capture logs
if ! npm run build --silent >"$ART/build.log" 2>&1; then echo "build failed - see $ART/build.log" >&2; exit 15; fi
[ -d build ] || { echo "build directory missing" >&2; exit 16; }
