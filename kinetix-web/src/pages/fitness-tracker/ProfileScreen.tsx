import { useNavigate } from 'react-router-dom';
import { User, Bell, Shield, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { BottomNav } from '../../components/fitness-tracker/BottomNav';

export default function ProfileScreen() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0f1420] to-[#0a0e1a] text-white">
      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Profile</h1>
          <p className="text-sm text-gray-400">Manage your account settings</p>
        </div>

        {/* Profile Card */}
        <div className="mb-6 bg-gradient-to-br from-[#1a1f35] to-[#141826] rounded-3xl p-6 border border-gray-800/50 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl mb-1">Alex Rivera</h2>
              <p className="text-sm text-gray-400">alex@example.com</p>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-gray-800/50">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl mb-1">47</p>
                <p className="text-xs text-gray-400">Workouts</p>
              </div>
              <div>
                <p className="text-2xl mb-1">86</p>
                <p className="text-xs text-gray-400">Avg Score</p>
              </div>
              <div>
                <p className="text-2xl mb-1">12</p>
                <p className="text-xs text-gray-400">Best Streak</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="mb-6 bg-gradient-to-br from-[#1a1f35] to-[#141826] rounded-2xl p-1 border border-gray-800/50 overflow-hidden">
          {[
            { icon: Bell, label: 'Notifications', color: 'text-blue-400' },
            { icon: Shield, label: 'Privacy & Security', color: 'text-emerald-400' },
            { icon: HelpCircle, label: 'Help & Support', color: 'text-purple-400' },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`w-full flex items-center justify-between p-4 hover:bg-[#1f2540] transition-colors ${
                  index !== 2 ? 'border-b border-gray-800/50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-sm">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </button>
            );
          })}
        </div>

        {/* Body Stats */}
        <div className="mb-6 bg-gradient-to-br from-[#1a1f35] to-[#141826] rounded-2xl p-5 border border-gray-800/50">
          <h3 className="text-base mb-4">Body Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Height</span>
              <span className="text-base">5'9"</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Weight</span>
              <span className="text-base">165 lbs</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">BMI</span>
              <span className="text-base">22.4</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Age</span>
              <span className="text-base">28</span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 rounded-2xl py-4 transition-all duration-200"
        >
          <LogOut className="w-5 h-5 text-red-400" />
          <span className="text-base text-red-400">Log Out</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
