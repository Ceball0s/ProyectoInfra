# Usamos una imagen base de Maven que ya tiene Java instalado
FROM maven:3.9.0-eclipse-temurin-17 as build

# Definimos el directorio de trabajo
WORKDIR /app

# Copiamos el archivo pom.xml y el código fuente para que Maven lo compile
COPY pom.xml .
COPY src ./src

# Ejecutamos Maven para compilar el proyecto y empaquetarlo en un JAR
RUN mvn clean package -DskipTests

# Usamos una imagen base de OpenJDK para ejecutar la aplicación
FROM openjdk:17-jdk-slim

# Definimos el directorio de trabajo en el contenedor
WORKDIR /app

# Copiamos el archivo JAR generado desde la etapa de construcción
COPY --from=build /app/target/demo-jwt-0.0.1-SNAPSHOT.jar app.jar

# Copiamos la carpeta "uploads" al contenedor
COPY uploads /app/uploads

# Exponemos el puerto 8080
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
