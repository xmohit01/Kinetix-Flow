import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Search, Flame, Zap, Shield, Dumbbell, Activity, ChevronRight, Minus, Plus } from 'lucide-react';
import { triggerHaptic } from '../../utils/premiumEffects';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'chest', name: 'Chest' },
  { id: 'legs', name: 'Legs' },
  { id: 'core', name: 'Core' },
  { id: 'arms', name: 'Arms' },
];

const exercises = [
  { id: 'Squats', name: 'Squats', category: 'legs', icon: Zap, difficulty: 'Beginner', duration: '5 min' },
  { id: 'Push-ups', name: 'Push-ups', category: 'chest', icon: Shield, difficulty: 'Intermediate', duration: '5 min' },
  { id: 'Shoulder Press', name: 'Shoulder Press', category: 'arms', icon: Dumbbell, difficulty: 'Intermediate', duration: '5 min' },
  { id: 'Planks', name: 'Planks', category: 'core', icon: Flame, difficulty: 'Beginner', duration: '2 min' },
  { id: 'Lunges', name: 'Lunges', category: 'legs', icon: Activity, difficulty: 'Beginner', duration: '5 min' },
  { id: 'Bicep Curls', name: 'Bicep Curls', category: 'arms', icon: Dumbbell, difficulty: 'Beginner', duration: '5 min' },
];

export default function WorkoutSelectionScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState((location.state as any)?.category || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Rep Selection State
  const [selectedExercise, setSelectedExercise] = useState<typeof exercises[0] | null>(null);
  const [targetReps, setTargetReps] = useState(10);

  const filteredExercises = exercises.filter(ex => {
    const matchesCategory = activeCategory === 'all' || ex.category === activeCategory;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleExerciseClick = (ex: typeof exercises[0]) => {
    triggerHaptic('light');
    setSelectedExercise(ex);
    setTargetReps(10); // Reset to default
  };

  const handleStartWorkout = () => {
    triggerHaptic('heavy');
    if (selectedExercise) {
      navigate(`/workout-tracking?exercise=${selectedExercise.id}&reps=${targetReps}`);
    }
  };

  const adjustReps = (amount: number) => {
    triggerHaptic('light');
    setTargetReps(prev => Math.max(1, prev + amount));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      {/* Header */}
      <div className="px-4 py-6 sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => { triggerHaptic('light'); navigate(-1); }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-2xl font-bold">Select Workout</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-input/50 border border-border rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Categories Horizontal Scroll */}
      <div className="px-4 py-2">
        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { triggerHaptic('light'); setActiveCategory(cat.id); }}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise List */}
      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto pb-24">
        {filteredExercises.length > 0 ? (
          filteredExercises.map((ex) => (
            <div
              key={ex.id}
              onClick={() => handleExerciseClick(ex)}
              className="group bg-card border border-border rounded-3xl p-4 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <ex.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{ex.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">
                      {ex.difficulty}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {ex.duration}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-muted-foreground flex flex-col items-center">
            <Search className="w-12 h-12 mb-4 opacity-20" />
            <p>No exercises found.</p>
          </div>
        )}
      </div>

      {/* Rep Selection Modal (Bottom Sheet) */}
      {selectedExercise && (
        <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm transition-opacity">
           <div className="bg-card w-full max-w-md rounded-t-[2.5rem] p-6 pb-12 border-t border-border shadow-2xl animate-in slide-in-from-bottom-full duration-300">
              <div className="flex justify-between items-center mb-6">
                 <div>
                    <h2 className="text-2xl font-bold font-serif">{selectedExercise.name}</h2>
                    <p className="text-sm text-muted-foreground">Set your target reps</p>
                 </div>
                 <button 
                   onClick={() => setSelectedExercise(null)}
                   className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground"
                 >
                    ✕
                 </button>
              </div>

              <div className="flex items-center justify-center gap-8 mb-10">
                 <button 
                   onClick={() => adjustReps(-1)}
                   className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-foreground active:scale-90 transition-transform"
                 >
                   <Minus className="w-6 h-6" />
                 </button>
                 <div className="w-24 text-center">
                   <span className="text-6xl font-bold text-primary">{targetReps}</span>
                 </div>
                 <button 
                   onClick={() => adjustReps(1)}
                   className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-foreground active:scale-90 transition-transform"
                 >
                   <Plus className="w-6 h-6" />
                 </button>
              </div>

              <button 
                onClick={handleStartWorkout}
                className="w-full bg-primary text-white font-bold text-lg py-4 rounded-full active:scale-95 transition-transform shadow-lg shadow-primary/30"
              >
                Start Tracking
              </button>
           </div>
        </div>
      )}

    </div>
  );
}
