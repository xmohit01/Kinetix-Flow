import React, { useState } from 'react';
import { Calendar, Target, TrendingUp, ChevronLeft, Share2, Flame, Clock, Activity, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../../components/fitness-tracker/BottomNav';
import { triggerHaptic } from '../../utils/premiumEffects';

export default function StatsScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'activity' | 'progress'>('activity');

  const handleTabSwitch = (tab: 'activity' | 'progress') => {
    triggerHaptic('light');
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-28">
      <div className="max-w-md mx-auto px-5 py-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => {
              triggerHaptic('light');
              navigate(-1);
            }}
            className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-border"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <h1 className="text-base font-serif font-bold">My fitness journey</h1>
          <button className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-border">
            <Share2 className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Toggle Bar */}
        <div className="bg-card rounded-full p-1 flex mb-8 border border-border">
          <button 
            onClick={() => handleTabSwitch('activity')}
            className={`flex-1 py-3 rounded-full font-medium text-sm flex justify-center items-center gap-2 transition-all ${
              activeTab === 'activity' ? 'bg-secondary text-white shadow-md' : 'text-muted-foreground'
            }`}
          >
            <Activity className="w-4 h-4" /> Activity
          </button>
          <button 
            onClick={() => handleTabSwitch('progress')}
            className={`flex-1 py-3 rounded-full font-medium text-sm flex justify-center items-center gap-2 transition-all ${
              activeTab === 'progress' ? 'bg-secondary text-white shadow-md' : 'text-muted-foreground'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Progress
          </button>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-2 mb-6 text-muted-foreground text-sm font-medium">
          <Calendar className="w-4 h-4" />
          <span>Tue, December 12, 2025</span>
        </div>

        {activeTab === 'activity' ? (
          <>
            {/* Main Chart Card */}
            <div className="bg-card rounded-3xl p-6 border border-border shadow-sm mb-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex justify-between items-start mb-6">
                <h2 className="font-serif text-lg font-bold">Steps: <span className="text-foreground">5,348</span></h2>
                <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center">
                  <Activity className="w-3 h-3 text-secondary" />
                </div>
              </div>
              
              {/* Mock Graph */}
              <div className="h-32 flex items-end justify-between gap-1 relative">
                 <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-muted-foreground pr-2 font-medium">
                   <span>3k</span>
                   <span>2k</span>
                   <span>1k</span>
                   <span>0</span>
                 </div>
                 <div className="pl-6 w-full flex justify-between items-end h-full">
                   {[20, 30, 45, 80, 60, 40, 50, 70, 90, 40].map((h, i) => (
                     <div key={i} className="w-3 relative group">
                        <div 
                          className={`absolute bottom-0 w-full rounded-full transition-all ${i === 3 || i === 4 || i===7 || i===8 ? 'bg-primary' : 'bg-muted'}`}
                          style={{ height: `${h}%` }}
                        />
                     </div>
                   ))}
                 </div>
              </div>
            </div>

            {/* Dual Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-300 delay-100">
              <div className="bg-card rounded-3xl p-5 border border-border flex flex-col justify-between h-40">
                <div className="flex justify-between items-start">
                  <span className="font-medium text-sm text-muted-foreground">Calories</span>
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <Flame className="w-3 h-3 text-primary" />
                  </div>
                </div>
                <div className="relative h-16 w-full">
                   <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle cx="50%" cy="50%" r="24" stroke="var(--border)" strokeWidth="4" fill="none" />
                      <circle cx="50%" cy="50%" r="24" stroke="var(--primary)" strokeWidth="4" fill="none" strokeDasharray="150" strokeDashoffset="40" strokeLinecap="round" />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-bold text-lg leading-tight">273</span>
                      <span className="text-[9px] text-muted-foreground font-medium uppercase">kcal</span>
                   </div>
                </div>
              </div>

              <div className="bg-card rounded-3xl p-5 border border-border flex flex-col justify-between h-40">
                <div className="flex justify-between items-start">
                  <span className="font-medium text-sm text-muted-foreground">Workout:</span>
                  <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Clock className="w-3 h-3 text-secondary" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <span className="text-xl font-bold mb-2">1h 5m</span>
                  {/* Simple Area Chart Mock */}
                  <div className="h-10 w-full bg-primary/20 rounded-b-lg overflow-hidden relative">
                    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
                       <path d="M0,30 L0,15 Q10,25 20,10 T40,20 T60,5 T80,15 L100,0 L100,30 Z" fill="var(--primary)" opacity="0.8" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Goals Section */}
            <div className="mb-4 flex items-center justify-between animate-in fade-in slide-in-from-bottom-4 duration-300 delay-150">
              <h3 className="font-serif text-xl font-bold">My goals</h3>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center">
                + Add goals
              </button>
            </div>

            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-300 delay-200">
              <div className="bg-card rounded-2xl p-4 border border-border flex justify-between items-center">
                <div>
                  <p className="font-bold text-sm mb-2">Feel more balanced with yoga</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> 3x per week</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> Jan 26</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-secondary flex items-center justify-center text-sm font-bold text-secondary">
                  2/3
                </div>
              </div>

              <div className="bg-card rounded-2xl p-4 border border-border flex justify-between items-center">
                <div>
                  <p className="font-bold text-sm mb-2">5,000 steps per day</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> Every day</span>
                    <span className="flex items-center gap-1"><Target className="w-3 h-3"/> Never</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">
                  2,971
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Progress Tab Content */}
            <div className="bg-card rounded-3xl p-6 border border-border shadow-sm mb-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="font-serif text-lg font-bold">Weekly Streak: <span className="text-foreground">5 Days</span></h2>
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <Flame className="w-3 h-3 text-primary" />
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                 {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                   <div key={i} className="flex flex-col items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i < 5 ? 'bg-primary text-white shadow-md shadow-primary/30' : 'bg-muted text-muted-foreground'}`}>
                         <span className="text-xs font-bold">{d}</span>
                      </div>
                   </div>
                 ))}
              </div>
            </div>

            <h3 className="font-serif text-xl font-bold mb-4">Milestones</h3>
            <div className="space-y-4">
               <div className="bg-card border border-border rounded-2xl p-4 flex gap-4 items-center">
                 <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Award className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="font-bold">100 Squats Club</h4>
                    <p className="text-sm text-muted-foreground">Completed in a single session</p>
                 </div>
               </div>
               
               <div className="bg-card border border-border rounded-2xl p-4 flex gap-4 items-center opacity-60">
                 <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                    <Target className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="font-bold">Iron Core</h4>
                    <p className="text-sm text-muted-foreground">Hold a plank for 5 minutes</p>
                 </div>
               </div>
            </div>
          </div>
        )}

      </div>

      <BottomNav />
    </div>
  );
}
