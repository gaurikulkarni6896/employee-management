# Employee Management - Angular + FastAPI + PostgreSQL

## Backend
PowerShell:

    cd employee-management1\backend
    py -m venv .venv
    .\.venv\Scripts\Activate.ps1
    python -m pip install --upgrade pip
    python -m pip install -r requirement.txt

Set PostgreSQL connection if needed:

    $env:DATABASE_URL="postgresql+psycopg2://postgres:YOUR_PASSWORD@localhost:5432/employee_db"

Then:

    python -m uvicorn app.main:app --reload --port 8000

API: http://localhost:8000
Swagger: http://localhost:8000/docs

## Database
Create the database `employee_db` in PostgreSQL, then run `backend/setup.sql` against it.
The demo admin is:

Email: admin@example.com
Password: admin123

This plain-text password is only for local/demo use.

## Frontend
In a second PowerShell:

    cd employee-management1\frontend
    npm install
    npm start

Open http://localhost:4200

## Features
- Login/logout
- Admin route guard
- Employee list from FastAPI
- Add employee
- Employee details dialog
- Department-wise shared Chart.js component
- Column-specific search
- Reset filters
- Employee and department statistics
