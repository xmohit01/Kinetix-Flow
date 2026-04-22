import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, TrendingUp, Zap, Target, Activity } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BottomNav } from '../../components/fitness-tracker/BottomNav';

export default function WorkoutSummaryScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { reps?: number, time?: number, exercise?: string } || {};

  const reps = state.reps || 0;
  const time = state.time || 0;
  const exercise = state.exercise || 'Workout';

  useEffect(() => {
    // Confetti celebration on mount
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-8 pb-24">
        {/* Success Icon */}
        <div className="text-center mb-8 mt-4">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Activity className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Great Workout!</h1>
          <p className="text-muted-foreground">You crushed {exercise.replace('-', ' ')} today.</p>
        </div>

        {/* Score Card */}
        <div className="mb-6 bg-card rounded-3xl p-6 border border-border shadow-sm text-center">
          <p className="text-sm text-muted-foreground mb-2">Session Score</p>
          <div className="flex items-baseline justify-center gap-2 mb-4">
            <h2 className="text-6xl font-bold text-foreground">89</h2>
            <span className="text-2xl text-muted-foreground">/100</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-primary/10 px-4 py-2 rounded-xl inline-flex">
            <TrendingUp className="w-4 h-4 text-primary" />
            <p className="text-sm font-medium text-primary">+7 from last session</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
            <div className="bg-secondary w-10 h-10 rounded-xl flex items-center justify-center mb-3">
              <Target className="w-5 h-5 text-foreground" />
            </div>
            <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Posture</p>
            <p className="text-3xl font-bold">94%</p>
          </div>

          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
            <div className="bg-primary/10 w-10 h-10 rounded-xl flex items-center justify-center mb-3">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Reps</p>
            <p className="text-3xl font-bold">{reps}</p>
          </div>

          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
            <div className="bg-secondary w-10 h-10 rounded-xl flex items-center justify-center mb-3">
              <Zap className="w-5 h-5 text-foreground" />
            </div>
            <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Calories</p>
            <p className="text-3xl font-bold">{Math.round(time * 0.15 + reps * 0.5)}</p>
          </div>

          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
            <div className="bg-secondary w-10 h-10 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5 text-foreground" />
            </div>
            <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Duration</p>
            <p className="text-3xl font-bold">{formatTime(time)}</p>
          </div>
        </div>

        {/* Form Feedback */}
        <div className="mb-6 bg-card rounded-2xl p-5 border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2.5 rounded-xl">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-bold text-lg">Form Feedback</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your depth improved significantly compared to last session.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Try to maintain knee alignment over your toes for even better form.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your consistency is paying off—keep up this momentum!
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/workout-select')}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl py-4 font-bold transition-all shadow-md active:scale-[0.98]"
          >
            Start Another Workout
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-2xl py-4 font-bold transition-all active:scale-[0.98]"
          >
            Back to Home
          </button>
        </div>
      </div>
      
      {/* Include the Bottom Nav to keep app context */}
      <BottomNav />
    </div>
  );
}
