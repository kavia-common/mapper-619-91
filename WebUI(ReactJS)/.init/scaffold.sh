#!/usr/bin/env bash
set -euo pipefail
# scaffold: create minimal CRA only when no indicators present
WORKSPACE="/home/kavia/workspace/code-generation/mapper-619-91/WebUI(ReactJS)"
mkdir -p "$WORKSPACE" && cd "$WORKSPACE"
# detect existing project indicators (package.json, yarn.lock, pnpm-lock.yaml, src/, public/ or scripts.start/scripts.build)
if [ -f package.json ] || [ -f yarn.lock ] || [ -f pnpm-lock.yaml ] || [ -d src ] || [ -d public ]; then
  echo "project indicators found - skipping scaffold"
  exit 0
fi
# prefer local create-react-app but validate it's callable
USE_CRAC=0
if command -v create-react-app >/dev/null 2>&1; then
  CRA_VER=$(create-react-app --version 2>/dev/null || true)
  if [ -n "${CRA_VER:-}" ]; then USE_CRAC=1; fi
fi
if [ "$USE_CRAC" -eq 1 ]; then
  create-react-app . --use-npm --silent || { echo "create-react-app failed" >&2; exit 7; }
else
  # try npx without remote install first (fail fast if not cached)
  if command -v npx >/dev/null 2>&1 && npx --no-install create-react-app@latest >/dev/null 2>&1; then
    npx --no-install create-react-app@latest . --use-npm || { echo "npx (no-install) create-react-app failed" >&2; exit 8; }
  else
    # final fallback: attempt remote npx but non-interactive; this may fail if network disabled
    if command -v npx >/dev/null 2>&1; then
      npx create-react-app@latest . --use-npm --silent --yes || { echo "npx create-react-app (remote) failed or network disabled" >&2; exit 9; }
    else
      echo "npx not available and no local create-react-app; cannot scaffold" >&2
      exit 6
    fi
  fi
fi
# If package.json exists now, back it up and ensure minimal scripts
if [ -f package.json ]; then
  cp -n package.json package.json.bak 2>/dev/null || true
  node -e "try{let p=require('./package.json'); p.scripts=p.scripts||{}; if(!p.scripts.start) p.scripts.start='react-scripts start'; if(!p.scripts.build) p.scripts.build='react-scripts build'; require('fs').writeFileSync('package.json', JSON.stringify(p,null,2)); console.log('ok')}catch(e){console.error('json-error',e); process.exit(1)}" || { echo "failed to ensure package.json scripts" >&2; exit 10; }
fi
# report success
echo "scaffold step completed"
