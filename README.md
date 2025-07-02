# Solución de Examen: Sistema de Gestión de Empleados

Este repositorio contiene la solución práctica para el caso de estudio del puesto de **Coordinador de Desarrollo**. Se ha construido una aplicación Full-Stack que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para la información de empleados.

## ✨ Stack Tecnológico

| Capa          | Tecnología / Herramienta                                  |
|---------------|-----------------------------------------------------------|
| **Frontend**  | React, Vite, React Router, Axios, Bootstrap               |
| **Backend**   | Node.js, Express                                          |
| **Base de Datos** | PostgreSQL (orquestado con Docker Compose)                |
| **Control de Versiones** | Git y GitHub                                           |

---

## 🚀 Guía de Instalación y Ejecución

Para levantar el entorno completo, asegúrese de tener instalados los siguientes **prerrequisitos**:
-   [Node.js](https://nodejs.org/) (v18 o superior)
-   [Docker](https://www.docker.com/products/docker-desktop/) y Docker Compose

### 1. Iniciar Backend y Base de Datos

Primero, es necesario levantar el contenedor de la base de datos y el servidor de la API.

```bash
# 1. Navegue a la carpeta del backend desde la raíz del proyecto
cd backend

# 2. Levante el contenedor de PostgreSQL con Docker Compose
docker-compose up -d

# 3. Instale las dependencias del servidor
npm install

# 4. Inicie el servidor de la API (se ejecutará en http://localhost:3000)
# Las credenciales de la base de datos se leen del archivo .env
npm start
