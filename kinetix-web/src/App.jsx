import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ActiveWorkoutScreen from './pages/fitness-tracker/ActiveWorkoutScreen';
import { useTheme } from './hooks/useTheme';

function App() {
  useTheme(); // Initialize theme

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [workoutConfig, setWorkoutConfig] = useState({ exerciseType: 'Squats', targetReps: 10 });

  if (!isLoggedIn) {
      return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  if (isWorkoutActive) {
      return (
          <div className="fixed inset-0 z-50 bg-black">
              <ActiveWorkoutScreen 
                  exerciseType={workoutConfig.exerciseType} 
                  targetReps={workoutConfig.targetReps} 
                  onLogout={() => setIsWorkoutActive(false)} 
              />
          </div>
      );
  }

  return <Dashboard onStart={(config) => {
      setWorkoutConfig(config);
      setIsWorkoutActive(true);
  }} />;
}

export default App;
