# 📱 Proyecto Fullstack: Backend + App Móvil con React Native

Este proyecto es una **aplicación móvil multiplataforma** desarrollada con **React Native y Expo** para el frontend, y **Node.js con Express** para el backend. Está pensada para ejecutarse tanto en Android como en iOS desde un único código base. El backend sirve como API para gestionar la lógica y datos del sistema.

---

## 🚀 Requisitos

Asegurate de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior)
- npm
- [Expo CLI](https://docs.expo.dev/get-started/installation/) → `npm install -g expo-cli`
- Git Bash, Linux, macOS o WSL (para ejecutar el script)
- [Git](https://git-scm.com/) (obviamente)

---

## 🧠 ¿Qué hace el script `start.sh`?

Automatiza el arranque de todo el proyecto:

1. Instala las dependencias del **backend** y lo inicia con `nodemon` (`src/index.js`).
2. Instala las dependencias del **frontend** y levanta el proyecto con Expo (`App.js`).

De esta forma, solo necesitás un comando para dejar todo andando.

---

## ▶️ Cómo ejecutarlo

Primero, asegurate de darle permisos de ejecución:

```bash
chmod +x start.sh
```
Después, desde la raíz del proyecto:

```bash
./start.sh
```

📦 El backend se iniciará en modo desarrollo.
📱 El frontend abrirá el dashboard de Expo en el navegador.

🧱 Estructura del proyecto
/
├── backend/
│   ├── package.json
│   └── src/
│       └── index.js
├── frontend/
│   ├── package.json
│   └── App.js
└── start.sh

🌱 Flujo de trabajo con Git
Este proyecto sigue la metodología de ramas por feature (feature branch workflow).

🔀 Ramas
main: rama principal (estable, en producción)

development: rama de integración para testeo y QA

feature/nombre: para agregar funcionalidades

fix/nombre: para corregir errores

hotfix/nombre: correcciones críticas directamente desde main