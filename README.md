# Test-full-stack-blossom

## Rick and Morty Project

Este proyecto consta de dos aplicaciones: una API backend utilizando Node.js, Express, Sequelize, y GraphQL; y una aplicación frontend utilizando React, GraphQL, React Router DOM, y TailwindCSS.

## Requisitos

- Node.js (v14.x o superior)
- PostgreSQL (v12.x o superior)
- Redis (v6.x o superior)

## Configuración de la API Backend

### 1. Clonar el Repositorio

```sh
git clone <URL_DEL_REPOSITORIO>
cd test-full-stack-blossom
```

# 2. Instalar Dependencias en cada proyecto
```sh
cd rick-and-morty-api
npm install

cd rick-and-morty-frontend
npm install
```


## 3. Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

```
DB_NAME=rick_and_morty
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
REDIS_HOST=localhost
REDIS_PORT=6379
```

## 4. Configuración de PostgreSQL
### Crear la Base de Datos
- Asegúrate de que PostgreSQL esté instalado y ejecutándose en tu máquina local. Puedes usar los siguientes comandos para instalar y ejecutar PostgreSQL:

En macOS (usando Homebrew)
```
brew install postgresql
brew services start postgresql
```
En Linux (usando apt)
```
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

En Windows
Puedes descargar el instalador de PostgreSQL desde https://www.postgresql.org/download/ y seguir las instrucciones para tu versión de Windows.

- Abre el cliente de línea de comandos de PostgreSQL:

````
psql
````

- Crea la base de datos y el usuario necesarios para el proyecto:

```
CREATE DATABASE rick_and_morty;
CREATE USER tu_usuario WITH PASSWORD 'tu_contraseña';
GRANT ALL PRIVILEGES ON DATABASE rick_and_morty TO tu_usuario;
```

## 5. Configuración de Redis
Asegúrate de que Redis esté instalado y ejecutándose en tu máquina local. Puedes usar los siguientes comandos para instalar y ejecutar Redis:

#### En macOS (usando Homebrew)
```sh
Copiar código
brew install redis
brew services start redis
```
#### En Linux (usando apt)
```sh
Copiar código
sudo apt update
sudo apt install redis-server
sudo systemctl enable redis-server.service
sudo systemctl start redis-server.service
```
En Windows
Puedes descargar el instalador de Redis desde https://redis.io/download y seguir las instrucciones para tu versión de Windows.




## 6. Configuración de la Base de Datos
Ejecuta las migraciones para crear las tablas necesarias:

```sh
cd rick-and-morty-api
npm run migrate
```

## 7. Ejecutar la Aplicación
Compila el proyecto TypeScript y ejecuta el servidor:

```sh
npm run build
npm start
```
La API estará disponible en http://localhost:3000/graphql.


### Para frontend
```sh
cd rick-and-morty-frontend
npm run dev
```
La aplicación frontend estará disponible en http://localhost:5173.

## 8. Uso de la API
Puedes usar herramientas como Postman o curl para hacer solicitudes a la API.

Ejemplos de Consultas
Obtener Todos los Personajes
```graphql
{
  characters {
    id
    name
    status
    species
    gender
    origin
    location
    image
  }
}

```

Filtrar Personajes por Estado
```
{
  characters(status: "Alive") {
    id
    name
    status
  }
}

```

## Licencia
Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo LICENSE.