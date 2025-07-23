#!/bin/bash

# Salir si hay errores
set -e

# Colores para logs
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}Iniciando backend...${NC}"
cd backend
npm install
npm run dev &  # Levanta el backend en segundo plano (por ejemplo con nodemon)

echo -e "${GREEN}Iniciando frontend...${NC}"
cd ../frontend
npm install
npx expo start

