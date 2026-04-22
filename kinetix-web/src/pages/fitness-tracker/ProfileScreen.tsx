import { useNavigate } from 'react-router-dom';
import { User, Bell, Shield, HelpCircle, LogOut, ChevronRight, Settings } from 'lucide-react';
import { BottomNav } from '../../components/fitness-tracker/BottomNav';
import { triggerHaptic } from '../../utils/premiumEffects';

export default function ProfileScreen() {
  const navigate = useNavigate();

  const handleLogout = () => {
    triggerHaptic('heavy');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-28">
      <div className="max-w-md mx-auto px-5 py-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-serif font-bold">Profile</h1>
          <button className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-border">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="mb-6 bg-card rounded-3xl p-6 border border-border shadow-sm flex items-center gap-5">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-secondary border-2 border-primary/20">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1">Alex Rivera</h2>
            <p className="text-sm text-muted-foreground font-medium mb-2">alex@example.com</p>
            <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full">
              Pro Member
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-card rounded-2xl p-4 border border-border flex flex-col items-center justify-center text-center">
              <p className="text-2xl font-bold mb-1">47</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Workouts</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border flex flex-col items-center justify-center text-center">
              <p className="text-2xl font-bold mb-1">86</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Avg Score</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border flex flex-col items-center justify-center text-center">
              <p className="text-2xl font-bold mb-1">12</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Streak</p>
            </div>
        </div>

        {/* Settings Section */}
        <div className="mb-6">
          <h3 className="font-serif text-lg font-bold mb-4">Settings</h3>
          <div className="bg-card rounded-3xl p-2 border border-border shadow-sm overflow-hidden">
            {[
              { icon: Bell, label: 'Notifications', color: 'text-primary', bg: 'bg-primary/10' },
              { icon: Shield, label: 'Privacy & Security', color: 'text-secondary', bg: 'bg-secondary/10' },
              { icon: HelpCircle, label: 'Help & Support', color: 'text-amber-500', bg: 'bg-amber-500/10' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl hover:bg-muted transition-colors ${
                    index !== 2 ? 'mb-1' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`${item.bg} p-2.5 rounded-xl`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <span className="text-sm font-bold">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-card border border-destructive/20 hover:bg-destructive/10 rounded-2xl py-4 transition-all duration-200"
        >
          <LogOut className="w-5 h-5 text-destructive" />
          <span className="text-base font-bold text-destructive">Log Out</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
