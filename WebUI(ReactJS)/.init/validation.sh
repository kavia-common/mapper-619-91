#!/usr/bin/env bash
set -euo pipefail
WORKSPACE="/home/kavia/workspace/code-generation/mapper-619-91/WebUI(ReactJS)"
ART="$WORKSPACE/.artifacts/react"; mkdir -p "$ART"
cd "$WORKSPACE"
# build
if ! bash -e "$(pwd)/.init_build_tmp.sh" >/dev/null 2>&1; then
  # call build script inline
  if ! npm run build --silent >"$ART/build.log" 2>&1; then echo "build failed - see $ART/build.log" >&2; exit 15; fi
fi
[ -d build ] || { echo "build directory missing" >&2; exit 16; }
# choose server (no remote installs)
SERVER=""; SERVER_ARGS=()
if [ -x node_modules/.bin/serve ]; then SERVER="node_modules/.bin/serve"; SERVER_ARGS=("-s" "build" "-l");
elif [ -x node_modules/.bin/http-server ]; then SERVER="node_modules/.bin/http-server"; SERVER_ARGS=("build" "-p");
elif command -v serve >/dev/null 2>&1; then SERVER="serve"; SERVER_ARGS=("-s" "build" "-l");
elif command -v http-server >/dev/null 2>&1; then SERVER="http-server"; SERVER_ARGS=("build" "-p");
else
  echo "no serve/http-server binary available locally or globally; refusing remote install" >&2; exit 17
fi
# find free port
PORT=0
if command -v ss >/dev/null 2>&1; then
  for p in {5000..5100}; do
    if ! ss -ltn "sport = :$p" 2>/dev/null | grep -q LISTEN; then PORT=$p; break; fi
  done
elif command -v netstat >/dev/null 2>&1; then
  for p in {5000..5100}; do
    if ! netstat -tln 2>/dev/null | grep -q ":$p\b"; then PORT=$p; break; fi
  done
elif command -v python3 >/dev/null 2>&1; then
  PORT=$(python3 - <<'PY'
import socket
s=socket.socket()
s.bind(('127.0.0.1',0))
addr=s.getsockname()[1]
s.close()
print(addr)
PY
)
  if [ -z "$PORT" ]; then PORT=0; fi
fi
if [ "$PORT" = "0" ]; then echo "no free port found" >&2; exit 18; fi
LOG="$ART/react_serve.log"
# start server
set -o monitor
"$SERVER" "${SERVER_ARGS[@]}" "$PORT" >"$LOG" 2>&1 &
SERVER_PID=$!
# ensure cleanup
cleanup(){
  if kill -0 "$SERVER_PID" 2>/dev/null; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM
# verify curl
if ! command -v curl >/dev/null 2>&1; then echo "curl not available for verification" >&2; cleanup; exit 19; fi
TRIES=0
until curl -sS -o /dev/null "http://127.0.0.1:$PORT/" || [ $TRIES -ge 20 ]; do TRIES=$((TRIES+1)); sleep 1; done
if ! curl -sS -o /dev/null "http://127.0.0.1:$PORT/"; then echo "server did not respond - see $LOG" >&2; cleanup; exit 20; fi
# write status and capture headers
echo "BUILD_OK" > "$ART/status.txt"; echo "START_OK" >> "$ART/status.txt"
curl -sS -I "http://127.0.0.1:$PORT/" | head -n 40 > "$ART/http_head.txt" || true
# stop server
cleanup
trap - EXIT
echo "STOP_OK" >> "$ART/status.txt"
# output evidence
printf "%s\n%s\n%s\n" "$ART/status.txt" "$LOG" "$ART/http_head.txt"
