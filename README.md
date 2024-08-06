# JobSmith Backend

Este es el backend del proyecto JobSmith, desarrollado con NestJS, Prisma y Docker para la gestión de la base de datos.

## Requisitos

- Node.js (v14 o superior)
- Docker
- Docker Compose

## Configuración del Proyecto

Sigue los siguientes pasos para configurar y ejecutar el proyecto en tu máquina local.

### 1. Clonar el Repositorio

Primero, clona el repositorio a tu máquina local:

```bash
git clone https://github.com/tu-usuario/jobsmith-backend.git
cd jobsmith-backend
```

### 2. Instalar Dependencias

Instala las dependencias del proyecto usando npm:

```bash
npm install
```

### 3. Configuración de Entorno

Crea un archivo `.env` en la raíz del proyecto y añade las variables de entorno necesarias. Puedes basarte en el archivo `.env.example`. Asegurate que los datos del DATABASE_URL coinciden con los parámetros del docker-compose.yml

```bash
cp .env.example .env
```

### 4. Configurar y Ejecutar Docker

Inicia los contenedores de Docker y configura la base de datos con los siguientes comandos:

```bash
npm run setup
```

Este comando ejecutará los siguientes pasos:
- `docker-compose up -d`: Levanta los contenedores de Docker en segundo plano.
- `prisma generate`: Genera el cliente de Prisma.
- `prisma migrate deploy`: Despliega las migraciones de la base de datos.
- `ts-node ./prisma/seed.ts`: Ejecuta el script de seed para poblar la base de datos.

### 5. Iniciar el Servidor

Finalmente, inicia el servidor con el siguiente comando:

```bash
npm run start
```

El servidor debería estar corriendo en `http://localhost:3000`.

## Scripts Disponibles

- `npm run build`: Compila el proyecto.
- `npm run format`: Formatea el código usando Prettier.
- `npm run start`: Inicia el servidor.
- `npm run start:dev`: Inicia el servidor en modo de desarrollo con watch.
- `npm run start:debug`: Inicia el servidor en modo de depuración con watch.
- `npm run start:prod`: Inicia el servidor en modo de producción.
- `npm run lint`: Lint del código usando ESLint.
- `npm run test`: Ejecuta las pruebas.
- `npm run test:watch`: Ejecuta las pruebas en modo watch.
- `npm run test:cov`: Ejecuta las pruebas y genera un reporte de cobertura.
- `npm run test:debug`: Ejecuta las pruebas en modo de depuración.
- `npm run test:e2e`: Ejecuta las pruebas end-to-end.
- `npm run setup`: Configura y ejecuta Docker, genera Prisma Client, despliega migraciones y ejecuta el seed.
