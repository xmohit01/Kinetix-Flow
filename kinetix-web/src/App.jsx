import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import AdminDashboard from './pages/AdminDashboard';
import HomeScreen from './pages/fitness-tracker/HomeScreen';
import StatsScreen from './pages/fitness-tracker/StatsScreen';
import ProfileScreen from './pages/fitness-tracker/ProfileScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/dashboard" element={<HomeScreen />} />
        <Route path="/workout" element={<Dashboard />} />
        <Route path="/stats" element={<StatsScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
