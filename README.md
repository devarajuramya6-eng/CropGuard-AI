# AgriGuard AI
AI Crop Health, Disease Detection, Smart Farm Management & Voice AI Agriculture Assistant Platform.

## Overview
AgriGuard AI is a comprehensive platform helping farmers manage farms, track crop health, detect diseases via AI, and interact through a Voice AI Agriculture Assistant.

## Installation
1. Clone the repository.
2. Install frontend dependencies: `cd apps/web && npm install`
3. Set up Python backend: `cd services/api && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt`

## Build
To build the frontend application for production:
`cd apps/web && npm run build`

## Run
To run the backend server:
`cd services/api && uvicorn main:app --reload`

To run the frontend server:
`cd apps/web && npm run dev`

## Dependencies
- Next.js, React, Tailwind CSS
- FastAPI, SQLite, Uvicorn, Passlib

## Usage
Navigate to `http://localhost:3000` to view the application. Register for an account or log in to view the dashboard, insights, expert portal, and yield AI.
