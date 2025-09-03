#!/usr/bin/env bash
set -euo pipefail
WORKSPACE="/home/kavia/workspace/code-generation/mapper-619-91/WebUI(ReactJS)"
ART="$WORKSPACE/.artifacts/react"; mkdir -p "$ART"
cd "$WORKSPACE"
# run tests only if configured
if npm run -s test --silent --version >/dev/null 2>&1; then
  npm run test --silent >"$ART/test.log" 2>&1 || true
else
  echo "no tests configured" >"$ART/test.log"
fi
