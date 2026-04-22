import { useNavigate } from 'react-router-dom';
import { Bell, Flame, ChevronRight, Activity, Zap, Clock, Dumbbell, Shield, Target } from 'lucide-react';
import { BottomNav } from '../../components/fitness-tracker/BottomNav';
import { triggerHaptic } from '../../utils/premiumEffects';

export default function HomeScreen() {
  const navigate = useNavigate();

  const handleNav = (path: string, state?: any) => {
    triggerHaptic('light');
    navigate(path, { state });
  };

  const handleFindMatch = () => {
    triggerHaptic('heavy');
    const exercises = ['Squats', 'Push-ups', 'Planks', 'Shoulder Press'];
    const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
    navigate(`/workout-tracking?exercise=${randomExercise}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-28">
      <div className="max-w-md mx-auto px-5 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary">
              {/* Placeholder for user avatar */}
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Welcome back</p>
              <h1 className="text-base font-bold">Alex Rivera</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-6 h-6" strokeWidth={1.5} />
            </button>
            <div className="flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 rounded-xl">
              <Flame className="w-4 h-4 text-primary" strokeWidth={2} />
              <span className="text-sm font-bold">21</span>
            </div>
          </div>
        </div>

        {/* Hero Banner (Sage Green) */}
        <div className="bg-[#557A64] rounded-[2rem] p-6 mb-8 relative overflow-hidden text-white shadow-xl">
          <div className="relative z-10 w-[85%]">
            <h2 className="font-serif text-3xl font-bold leading-tight mb-3">
              Not sure <span className="italic font-light">what</span><br/>
              you want to <span className="italic font-light">train</span><br/>
              today?
            </h2>
            <p className="text-sm text-white/80 mb-6 font-medium leading-relaxed">
              Tell us how you feel, we'll recommend workouts matching your energy & mood.
            </p>
            <button 
              onClick={handleFindMatch}
              className="bg-white text-black font-bold py-3.5 px-6 rounded-full w-full active:scale-95 transition-transform"
            >
              Find my match
            </button>
          </div>
          {/* Decorative Element */}
          <div className="absolute top-6 right-4 text-4xl transform rotate-12">
            🌞
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-xl font-bold">Categories</h3>
            <button className="text-sm text-muted-foreground flex items-center gap-1 font-medium hover:text-primary">
              See all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {[
              { id: 'arms', name: 'Upper Body', icon: Dumbbell },
              { id: 'legs', name: 'Lower Body', icon: Zap },
              { id: 'core', name: 'Core', icon: Target },
              { id: 'all', name: 'Full Body', icon: Activity },
            ].map((category) => (
              <button 
                key={category.name}
                onClick={() => handleNav('/workout-select', { category: category.id })}
                className="flex-shrink-0 w-24 h-24 bg-card rounded-2xl flex flex-col items-center justify-center gap-2 border border-border active:scale-95 transition-transform"
              >
                <category.icon className="w-7 h-7 text-muted-foreground" strokeWidth={1.5} />
                <span className="text-xs font-medium text-muted-foreground">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Your Progress */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-xl font-bold">Your progress</h3>
            <button 
              onClick={() => handleNav('/stats')}
              className="text-sm text-muted-foreground flex items-center gap-1 font-medium hover:text-primary"
            >
              See activity <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {/* Steps Card */}
            <div className="flex-shrink-0 w-36 h-36 bg-card rounded-3xl p-4 border border-border flex flex-col justify-between">
              <div className="relative w-10 h-10">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="20" cy="20" r="16" stroke="var(--border)" strokeWidth="3" fill="none" />
                  <circle cx="20" cy="20" r="16" stroke="var(--primary)" strokeWidth="3" fill="none" strokeDasharray="100" strokeDashoffset="25" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div>
                <p className="text-xl font-bold">3,548 <span className="text-xs font-medium text-muted-foreground">steps</span></p>
              </div>
            </div>

            {/* Calories Card */}
            <div className="flex-shrink-0 w-36 h-36 bg-card rounded-3xl p-4 border border-border flex flex-col justify-between">
              <div className="relative w-10 h-10">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="20" cy="20" r="16" stroke="var(--border)" strokeWidth="3" fill="none" />
                  <circle cx="20" cy="20" r="16" stroke="var(--primary)" strokeWidth="3" fill="none" strokeDasharray="100" strokeDashoffset="60" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Flame className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div>
                <p className="text-xl font-bold">273 <span className="text-xs font-medium text-muted-foreground">kcal</span></p>
              </div>
            </div>

            {/* Time Card */}
            <div className="flex-shrink-0 w-36 h-36 bg-card rounded-3xl p-4 border border-border flex flex-col justify-between">
              <div className="relative w-10 h-10">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="20" cy="20" r="16" stroke="var(--border)" strokeWidth="3" fill="none" />
                  <circle cx="20" cy="20" r="16" stroke="var(--primary)" strokeWidth="3" fill="none" strokeDasharray="100" strokeDashoffset="10" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div>
                <p className="text-xl font-bold">1h 5m <span className="text-xs font-medium text-muted-foreground">activity</span></p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}
