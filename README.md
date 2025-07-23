# Net Tool

This repository contains a simple Node.js backend with two Vue 3 frontends. Each part of the project has its own `package.json`.

## Project Structure

- `backend` – Express and Mongoose API server
- `frontend-admin` – Admin dashboard built with Vue 3 and Element Plus
- `frontend-public` – Public facing site built with Vue 3

## Installation

Install dependencies for each package using npm:

```bash
# Backend
cd backend && npm install

# Admin frontend
cd ../frontend-admin && npm install

# Public frontend
cd ../frontend-public && npm install
```

## Development

Run the backend server:

```bash
cd backend
npm start
```

Start the admin frontend:

```bash
cd frontend-admin
npm run dev
```

Start the public frontend:

```bash
cd frontend-public
npm run dev
```

## Building for Production

To create production builds for the frontends, run `npm run build` in their respective directories. The backend does not require a build step; it can be started with `npm start`.
