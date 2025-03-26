# Proyecto con NestJS, Next.js y PostgreSQL en Docker

Este proyecto utiliza **NestJS** para el backend, **Next.js** para el frontend y **PostgreSQL** como base de datos, todos corriendo como servicios dentro de **Docker Compose**.

## 📦 Tecnologías utilizadas
- **Backend:** NestJS
- **Frontend:** Next.js
- **Base de datos:** PostgreSQL
- **Contenedores:** Docker y Docker Compose

## 🚀 Instalación y ejecución
### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/BaironRamirezGit/test-bairon-ramirez.git
cd test-bairon-ramirez
```

### 2️⃣ Levantar los servicios con Docker Compose
Ejecuta el siguiente comando para construir y ejecutar los servicios en segundo plano:
```bash
docker-compose up -d --build --force-recreate
```

## 🔥 Servicios y puertos
| Servicio  | URL |
|-----------|------------------------------------------------|
| Frontend (Next.js) | [http://localhost:3000](http://localhost:3000) |
| Backend (NestJS)   | [http://localhost:3001](http://localhost:3001) |
| Swagger API Docs   | [http://localhost:3001/docs](http://localhost:3001/docs) |
| PostgreSQL         | `localhost:5432` (según configuración en .env) |

## 🛑 Detener los servicios
Si deseas detener los contenedores, ejecuta:
```bash
docker-compose down
```

## 📜 Licencia
Este proyecto está bajo la licencia **MIT**.

---
**By [BAIRON STIVEN RAMIREZ MARÍN](https://github.com/tu-usuario)** 🚀
