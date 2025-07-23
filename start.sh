#!/bin/bash

set -e

install_if_needed() {
  dir=$1
  echo "🚀 Instalando dependencias en $dir..."
  cd "$dir" || { echo "No existe $dir"; exit 1; }
  if [ ! -d "node_modules" ]; then
    npm install
  else
    echo "Dependencias ya instaladas en $dir"
  fi
  cd - > /dev/null
}

install_if_needed backend
install_if_needed frontend

echo "⚡️ Levantando backend (npm run dev) y frontend (npm start)..."

cd backend
npm run dev &
BACKEND_PID=$!

cd ../frontend
npm start &
FRONTEND_PID=$!

echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"

wait $BACKEND_PID
wait $FRONTEND_PID
