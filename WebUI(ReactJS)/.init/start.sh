#!/usr/bin/env bash
set -euo pipefail
WORKSPACE="/home/kavia/workspace/code-generation/mapper-619-91/WebUI(ReactJS)"
ART="$WORKSPACE/.artifacts/react"; mkdir -p "$ART"
cd "$WORKSPACE"
# select server binary (prefer local node_modules/.bin)
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
# start server in background
set -o monitor
"$SERVER" "${SERVER_ARGS[@]}" "$PORT" >"$LOG" 2>&1 &
SERVER_PID=$!
# write PID for stop script
echo "$SERVER_PID" > "$ART/react_server.pid"
# wait for server to become responsive (max 20s)
if ! command -v curl >/dev/null 2>&1; then echo "curl not available for verification" >&2; kill "$SERVER_PID" >/dev/null 2>&1 || true; wait "$SERVER_PID" 2>/dev/null || true; exit 19; fi
TRIES=0
until curl -sS -o /dev/null "http://127.0.0.1:$PORT/" || [ $TRIES -ge 20 ]; do TRIES=$((TRIES+1)); sleep 1; done
if ! curl -sS -o /dev/null "http://127.0.0.1:$PORT/"; then echo "server did not respond - see $LOG" >&2; kill "$SERVER_PID" >/dev/null 2>&1 || true; wait "$SERVER_PID" 2>/dev/null || true; exit 20; fi
# save runtime metadata
echo "$PORT" > "$ART/react_server.port"
curl -sS -I "http://127.0.0.1:$PORT/" | head -n 40 > "$ART/http_head.txt" || true
# keep PID printed so orchestrator can see it
echo "$SERVER_PID"
