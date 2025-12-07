# Knex ORM Example

This project demonstrates a basic Node.js CRUD API using Express, Knex.js, and SQLite.

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Run migrations:
   ```sh
   npx knex migrate:latest
   ```
3. Start the server:
   ```sh
   node index.js
   ```

## API Endpoints

- `POST /users` — Create a user
- `GET /users` — List all users
- `GET /users/:id` — Get a users
- `PUT /users/:id` — Update a user
- `DELETE /users/:id` — Delete a user

## Swagger Docs

After setup, Swagger UI will be available at `/api-docs` (see below for implementation).
