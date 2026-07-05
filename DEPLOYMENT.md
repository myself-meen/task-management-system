# Deployment guide

This project has a React frontend and a Flask backend. A simple way to deploy it is:

- Frontend: Netlify or Vercel
- Backend: Render or Railway
- Fastest option for a first deployment: Docker

## 1. Recommended approach

### Option A: Deploy frontend to Vercel or Netlify

1. Open your frontend folder in the hosting provider.
2. Set the build command to:
   - `npm run build`
3. Set the output folder to:
   - `dist`
4. Add this environment variable:
   - `VITE_API_BASE_URL=https://your-backend-url/v1`

### Option B: Deploy backend to Render or Railway

1. Connect your backend folder to the hosting provider.
2. Set the runtime to Python.
3. Install dependencies from [backend/requirements.txt](backend/requirements.txt).
4. Set these environment variables:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`

Your backend should start with:

```bash
python app.py
```

If the host expects a different command, use:

```bash
gunicorn app:app
```

## 2. Simple Docker setup

This is the easiest option if you want to run everything locally first.

### Backend Dockerfile

Create a file named [backend/Dockerfile](backend/Dockerfile) with:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY flask ./flask
WORKDIR /app/flask

ENV PYTHONUNBUFFERED=1
EXPOSE 5000

CMD ["python", "app.py"]
```

### Docker Compose

Create a file named [docker-compose.yml](docker-compose.yml) with:

```yaml
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      DB_HOST: localhost
      DB_USER: root
      DB_PASSWORD: ""
      DB_NAME: taskflow
```

Run it with:

```bash
docker compose up --build
```

## 3. Required environment variables

### Frontend

- `VITE_API_BASE_URL`

Example:

```env
VITE_API_BASE_URL=http://127.0.0.1:5000/v1
```

### Backend

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

Example:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=taskflow
```

## 4. What to do first if you are new to deployment

If you want the easiest learning path:

1. Run the app locally first.
2. Make sure the frontend and backend both work.
3. Deploy the backend first.
4. Copy the backend URL into the frontend environment variable.
5. Deploy the frontend.

## 5. Beginner-friendly deployment order

1. Backend on Render or Railway
2. Frontend on Vercel or Netlify
3. Connect the frontend to the backend URL
4. Test the full app

## 6. Important note

If the frontend calls the backend, the backend URL must be reachable from the browser. That means you should use the public deployed backend URL in `VITE_API_BASE_URL`, not `localhost`.
