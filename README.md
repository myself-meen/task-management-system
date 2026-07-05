# Task Management System

A modern task and employee management application built with React on the frontend and Flask on the backend. The project is designed to help teams manage tasks, employees, departments, and roles in a clean and responsive interface.

## Features

- Dashboard with task statistics and recent activity
- Task management with filters, search, and CRUD actions
- Employee directory with search, filters, and employee management
- Department and role-based organization structure
- Responsive UI for desktop and mobile experiences
- Backend API built with Flask and MySQL stored procedures

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- React Icons

### Backend
- Flask
- Flask-Cors
- PyMySQL
- MySQL

## Project Structure

```text
backend/
  flask/
    app.py
    controllers/
    models/
    routes/
    tests/
  database/
    procedures/
    tables/
  requirements.txt
  .env.example

frontend/
  src/
    components/
    pages/
    services/
    routes/
```

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3.10+
- MySQL server

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd task-management-system
```

### 2. Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create your environment file:

```bash
cp .env.example .env
```

Update the database credentials in the `.env` file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=taskflow
```

Create the database and load the schema:

```bash
mysql -u <username> -p < database/setup.sql
```

Optionally seed sample data:

```bash
mysql -u <username> -p < database/seed.sql
```

Start the backend:

```bash
cd flask
python app.py
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## Deployment

This project can be deployed with:

- Frontend: Vercel or Netlify
- Backend: Render or Railway
- Optional container support via Docker

See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guidance.

## Screenshots

Add screenshots here to make the repository more visually appealing.

## Contributing

Contributions are welcome. If you want to improve the project:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## License

This project is open source and available under the MIT License.
