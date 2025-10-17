Deployment (Docker)

This project includes Dockerfiles for the frontend (build + nginx) and backend (node). The included `docker-compose.yml` builds both services and runs them locally.

Prerequisites
- Docker
- Docker Compose

Quick start
1. Copy `.env.example` to `.env` and fill in database credentials (or provide `backend/.env`).

2. Build and start the services:

```bash
# from project root
docker-compose up --build
```

3. Access the frontend at http://localhost:8080 and the backend at http://localhost:3002 (health: /api/health)

Notes
- The frontend image serves on container port 81 (nginx), mapped to host 8080 by compose.
- The compose file sets `VITE_API_BASE_URL` to point to the backend service name `backend` so the frontend talks to the backend inside the Docker network.
- For production, use a proper secrets store (do not commit `.env` with credentials).

Deploying the backend to Render
1. Create a new Web Service on Render.
	- Connect your GitHub repo and select the `main` branch.
	- Choose "Docker" as the environment and set the Dockerfile path to `backend/Dockerfile`.
	- Set the start command to the default (Render will run the image command).

2. Add environment variables in the Render dashboard (Settings → Environment):
	- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_SSL` (true/false), `CORS_ORIGIN`, `PORT=3002`.
	- Do NOT store sensitive values in this repo — add them in Render's dashboard.

3. Optionally add the `render.yaml` manifest to the repo (already included) and Render will use it for automatic service creation when you connect the repo.

4. After deploy completes, the backend health endpoint will be available at:
	`https://<your-render-service>.onrender.com/api/health`

Notes about DB connectivity
- If your Postgres instance is in a private VPC, ensure Render has network access (use a managed DB with public access or set up a secure network bridge).
- For local testing on Render, you may temporarily set `DB_SSL=false` if your DB doesn't require SSL.
