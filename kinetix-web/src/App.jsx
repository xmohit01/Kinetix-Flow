import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import AuthPage from './pages/AuthPage';
import AdminDashboard from './pages/AdminDashboard';
import HomeScreen from './pages/fitness-tracker/HomeScreen';
import WorkoutSelectionScreen from './pages/fitness-tracker/WorkoutSelectionScreen';
import ActiveWorkoutScreen from './pages/fitness-tracker/ActiveWorkoutScreen';
import WorkoutSummaryScreen from './pages/fitness-tracker/WorkoutSummaryScreen';
import StatsScreen from './pages/fitness-tracker/StatsScreen';
import ProfileScreen from './pages/fitness-tracker/ProfileScreen';
import CalendarScreen from './pages/fitness-tracker/CalendarScreen';
import { useTheme } from './hooks/useTheme';

function App() {
  useTheme(); // Initialize theme

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/dashboard" element={<HomeScreen />} />
        <Route path="/workout-select" element={<WorkoutSelectionScreen />} />
        <Route path="/workout-tracking" element={<ActiveWorkoutScreen />} />
        <Route path="/summary" element={<WorkoutSummaryScreen />} />
        <Route path="/stats" element={<StatsScreen />} />
        <Route path="/calendar" element={<CalendarScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
