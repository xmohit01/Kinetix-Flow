import { Search, ChevronDown, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../../components/fitness-tracker/BottomNav';
import { triggerHaptic } from '../../utils/premiumEffects';

export default function CalendarScreen() {
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    triggerHaptic('light');
    navigate(path);
  };

  const dates = [
    { day: 'Mon', date: '11', active: false },
    { day: 'Tue', date: '12', active: true },
    { day: 'Wed', date: '13', active: false },
    { day: 'Thu', date: '14', active: false },
    { day: 'Fri', date: '15', active: false },
    { day: 'Sat', date: '16', active: false },
    { day: 'Sun', date: '17', active: false },
  ];

  const workouts = [
    {
      time: '07:30 - 08:15',
      title: 'Squats Focus',
      subtitle: 'Lower Body AI',
      icon: 'bg-secondary/20 text-secondary',
      completed: true,
    },
    {
      time: '12:00 - 13:00',
      title: 'Full Body Circuit',
      subtitle: 'High Intensity',
      icon: 'bg-primary/20 text-primary',
      completed: true,
    },
    {
      time: '16:00 - 17:00',
      title: 'Push-up Mastery',
      subtitle: 'Upper Body AI',
      icon: 'bg-secondary/20 text-secondary',
      completed: false,
    },
    {
      time: '18:30 - 19:15',
      title: 'Core Blast',
      subtitle: 'Planks & Crunches',
      icon: 'bg-primary/20 text-primary',
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-28">
      <div className="max-w-md mx-auto px-5 py-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
             onClick={() => handleNav(-1 as any)}
             className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-border"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <h1 className="text-xl font-serif font-bold">Calendar</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Date Scroller */}
        <div className="flex justify-between items-center mb-6">
          {dates.map((d) => (
            <div 
              key={d.date} 
              className={`flex flex-col items-center justify-center w-12 h-16 rounded-full transition-all ${
                d.active ? 'bg-primary shadow-lg shadow-primary/20 text-white' : 'bg-transparent text-muted-foreground'
              }`}
            >
              <span className="text-[10px] uppercase font-bold tracking-widest">{d.day}</span>
              <span className={`text-lg font-bold ${d.active ? 'text-white' : 'text-foreground'}`}>{d.date}</span>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 mb-8 shadow-sm">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search name or training" 
            className="bg-transparent border-none outline-none flex-1 text-sm text-foreground placeholder:text-muted-foreground font-medium"
          />
        </div>

        {/* Workout List */}
        <div>
          <h2 className="font-serif text-lg font-bold mb-4">Tuesday, December 12</h2>
          <div className="space-y-3">
            {workouts.map((w, i) => (
              <div key={i} className="bg-card border border-border rounded-3xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${w.icon}`}>
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{w.time}</p>
                    <p className="text-base font-bold leading-tight">{w.title}</p>
                    <p className="text-sm font-medium text-muted-foreground">{w.subtitle}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleNav('/workout-select')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    w.completed 
                      ? 'bg-transparent border border-border text-muted-foreground' 
                      : 'bg-secondary text-white shadow-md'
                  }`}
                >
                  {w.completed ? 'Done' : 'Join'}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}
