# Usamos una imagen base de Node.js
FROM node:18-slim

# Definimos el directorio de trabajo
WORKDIR /app

# Copiamos el archivo package.json y package-lock.json para instalar las dependencias
COPY package.json package-lock.json ./

# Instalamos las dependencias del proyecto
RUN npm install

# Copiamos el código fuente al contenedor
COPY . .

# Exponemos el puerto en el que se ejecutará la aplicación (por defecto, React usa el puerto 3000)
EXPOSE 80

# Comando para ejecutar el servidor de desarrollo de React
CMD ["npm", "run", "dev"]
