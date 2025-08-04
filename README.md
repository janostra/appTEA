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

----------COMO CONSUMIR EL BACK DESDE EL FRONT------------------

1- http://localhost:3000/api/rutinas/rutinas //CREAR RUTINA

{
  "userId": 1,
  "nombre": "Rutina diaria de la tarde",
  "imagen": "https://miapp.com/img/rutina_tarde.jpg",

  "pasos": [
    {
      "orden": 1,
      "descripcion": "Preparar materiales",
      "estadoID": 1,
      "imagen": "https://miapp.com/img/paso1.jpg",
      "audio": "https://miapp.com/audio/paso1.mp3"
    },
    {
      "orden": 2,
      "descripcion": "Realizar actividad principal",
      "estadoID": 2,
      "imagen": "https://miapp.com/img/paso2.jpg",
      "audio": "https://miapp.com/audio/paso2.mp3"
    }
  ],

  "activaciones": [
    {
      "diaSemana": "Lunes",
      "horaActivacion": "2025-08-03T14:30:00"
    },
    {
      "diaSemana": "Miércoles",
      "horaActivacion": "2025-08-03T14:30:00"
    }
  ],

  "motivacion": {
    "icono": "https://miapp.com/icons/estrella.png",
    "descripcion": "¡Bien hecho! Seguí así.",
    "fechaObtencion": "2025-08-03T15:00:00Z"
  }
}

2- http://localhost:3000/api/rutinas/rutinas?userId=1 //OBTENER RUTINA POR USUARIO

3- http://localhost:3000/api/rutinas/rutinas/8 // EDITAR RUTINA

{
  "userId": 1,
  "nombre": "Rutina de la mañana",
  "imagen": "https://miapp.com/imagenes/rutina-mañana.jpg",
  "motivacion": {
    "icono": "https://miapp.com/icons/estrella.png",
    "descripcion": "¡No te rindas!",
    "fechaObtencion": "2025-08-04T09:00:00.000Z"
  },
  "pasos": [
    {
      "orden": 1,
      "descripcion": "Despertarse",
      "estadoID": 1,
      "imagen": "https://miapp.com/img/paso1.jpg",
      "audio": "https://miapp.com/audio/paso1.mp3"
    },
    {
      "orden": 2,
      "descripcion": "Hacer estiramientos",
      "estadoID": 1,
      "imagen": "https://miapp.com/img/paso2.jpg",
      "audio": "https://miapp.com/audio/paso2.mp3"
    }
  ],
  "activaciones": [
    {
      "diaSemana": "Lunes",
      "horaActivacion": "2025-08-04T07:00:00.000Z"
    },
    {
      "diaSemana": "Miércoles",
      "horaActivacion": "2025-08-06T07:00:00.000Z"
    }
  ]
}

4- http://localhost:3000/api/rutinas/8/ocultar // OCULTAR RUTINA

{
  "userId": 1
}

5- http://localhost:3000/api/rutinas/pasos/11/ocultar // OCULTAR PASOS

6- http://localhost:3000/api/usuarios/usuarios // CREAR USUARIO

{
  "pin": "1364"
}

7- http://localhost:3000/api/usuarios/usuarios/cambiar-rol // CAMBIAR ROL USUARIO

{
  "userId": 4,
  "pin": "1234"
}

8- http://localhost:3000/api/usuarios/usuarios/cambiar-pin //CAMBIAR PIN USUARIO

{
  "UsuarioID": 3,
  "nuevoPin": "12345"
}

9- http://localhost:3000/api/cancelaciones/cancelaciones // CREAR CANCELACIONES

{
  "fechaHora": "2025-08-03T17:30:00.000Z",
  "rutinaID": 8
}

10- http://localhost:3000/api/cancelaciones/cancelaciones?userId=1 // OBTENER CANCELACIONES POR USUARIO

11- http://localhost:3000/api/recordatorios/recordatorios // CREAR RECORDATORIO

{
  "descripcion": "Tomar medicación",
  "frecuenciaID": 2,
  "hora": "2025-08-04T08:00:00.000Z",
  "diaSemana": "Lunes",
  "sonido": "alarma1.mp3",
  "color": "#FF5733",
  "rutinaID": 8
}

12- http://localhost:3000/api/recordatorios/recordatorios/1 // EDITAR RECORDATORIO

{
  "descripcion": "Tomar vitamina D",
  "frecuenciaID": 2,
  "hora": "2025-04-04T08:00:00.000Z",
  "diaSemana": "viernes",
  "sonido": "alarma1.mp3",
  "color": "#FF9900"
}
