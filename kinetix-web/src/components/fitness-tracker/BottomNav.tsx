import { Home, Dumbbell, LayoutGrid, Calendar, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { triggerHaptic } from '../../utils/premiumEffects';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/workout-select', icon: Dumbbell, label: 'Workout' },
    { path: '/stats', icon: LayoutGrid, label: 'Stats' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const handleNav = (path: string) => {
    triggerHaptic('light');
    navigate(path);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
      <div className="bg-[#2C2C2E]/90 backdrop-blur-xl border border-white/5 rounded-[2rem] px-2 py-2 shadow-2xl flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/dashboard');

          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`relative p-3 rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive ? 'bg-primary shadow-lg shadow-primary/30 text-white' : 'text-[#8E8E93] hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
