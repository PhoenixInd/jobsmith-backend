# JobSmith Backend

This is the backend for the JobSmith project, developed with NestJS, Prisma, and Docker for database management.

## Requirements

- Node.js (v17 or higher)
- Docker
- Docker Compose

## Project Setup

Follow these steps to set up and run the project on your local machine.

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/PhoenixInd/jobsmith-backend.git
cd jobsmith-backend
```

### 2. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the project root and add the necessary environment variables. You can base it on the `.env.example` file. Ensure that the DATABASE_URL data matches the parameters in the docker-compose.yml.

```bash
cp .env.example .env
```

### 4. Set Up and Run Docker

Start the Docker containers and set up the database with the following commands:

```bash
npm run setup
```

This command will execute the following steps:
- `docker-compose up -d`: Starts the Docker containers in the background.
- `prisma generate`: Generates the Prisma client.
- `prisma migrate deploy`: Deploys the database migrations.
- `ts-node ./prisma/seed.ts`: Runs the seed script to populate the database.

### 5. Start the Server

Finally, start the server with the following command:

```bash
npm run start
```

The server should be running at http://localhost:3000.

## Available Scripts

- `npm run build`: Compiles the project.
- `npm run format`: Formats the code using Prettier.
- `npm run start`: Starts the server.
- `npm run start:dev`: Starts the server in development mode with watch.
- `npm run start:debug`: Starts the server in debug mode with watch.
- `npm run start:prod`: Starts the server in production mode.
- `npm run lint`: Lints the code using ESLint.
- `npm run test`: Runs the tests.
- `npm run test:watch`: Runs the tests in watch mode.
- `npm run test:cov`: Runs the tests and generates a coverage report.
- `npm run test:debug`: Runs the tests in debug mode.
- `npm run test:e2e`: Runs end-to-end tests.
- `npm run setup`: Sets up and runs Docker, generates Prisma Client, deploys migrations, and runs the seed script.
