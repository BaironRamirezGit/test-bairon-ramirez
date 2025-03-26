# Usa una imagen de Node.js optimizada
FROM node:20-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de configuración
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el código del backend
COPY . .

# Expone el puerto de NestJS
EXPOSE 3001
