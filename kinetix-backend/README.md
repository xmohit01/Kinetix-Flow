# Kinetix Backend

Custom Node.js/Express backend for the Kinetix AI Trainer.

## Project Structure
- `/models`: Mongoose schemas (User, WorkoutLog)
- `/routes`: API endpoints
- `server.js`: Main entry point and server configuration

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Create a `.env` file based on the example and add your `MONGO_URI`.

3. **Run the Server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

## API Endpoints
- `GET /`: Test endpoint
- `POST /api/workouts`: Save a workout log (requires `userId`, `exerciseName`, `reps`, `duration`)
