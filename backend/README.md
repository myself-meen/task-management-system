# Backend setup

## Database setup

This backend expects a MySQL database named taskflow.

### 1. Create the database and load schema

From the MySQL client, run:

```bash
mysql -u <username> -p < backend/database/setup.sql
```

This script will:
- create the taskflow database if it does not exist
- create the required tables
- create the stored procedures used by the Flask API

### 2. Seed sample data (optional)

To add example records for testing:

```bash
mysql -u <username> -p < backend/database/seed.sql
```

### 3. Required tables

The app expects these tables to exist in taskflow:
- organizations
- departments
- roles
- employees
- employee_assignments
- projects
- project_members
- sprints
- tasks

## Environment configuration

Create a local environment file and update values as needed:

```bash
copy backend\.env.example backend\.env
```

Example values:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_local_mysql_password
DB_NAME=taskflow
```

The backend will automatically read the local .env file from the backend folder when you run it.

## Run the backend

From the backend/flask folder:

```bash
python app.py
```

The server will start on http://127.0.0.1:5000 by default.

## Notes

- The Flask app uses the DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME environment variables.
- If your MySQL server is not local, update the values in your .env file accordingly.
