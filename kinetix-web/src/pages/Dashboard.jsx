import React, { useState } from 'react';
import { Home, Clock, User, Play, Flame, Activity as ActivityIcon, ChevronDown } from 'lucide-react';

const Dashboard = ({ onStart }) => {
    // Dynamic Stats
    const [streak, setStreak] = useState(0);
    const [totalReps, setTotalReps] = useState(0);

    // Tab State
    const [activeTab, setActiveTab] = useState('home');

    // Workout Settings State
    const [exerciseType, setExerciseType] = useState('Squats');
    const [targetReps, setTargetReps] = useState(10);
    const [dailyGoal, setDailyGoal] = useState(50);

    // Weekly Plan State
    const [weeklyPlan, setWeeklyPlan] = useState({ 
        Sunday: 'Rest', 
        Monday: 'Chest Day', 
        Tuesday: 'Back & Biceps', 
        Wednesday: 'Leg Day', 
        Thursday: 'Shoulders', 
        Friday: 'Arms', 
        Saturday: 'Cardio/Core' 
    });

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = daysOfWeek[new Date().getDay()];

    const exerciseMap = {
        'Chest Day': ['Push-ups', 'Wide Push-ups'],
        'Leg Day': ['Squats', 'Lunges'],
        'Arms': ['Bicep Curls', 'Tricep Dips'],
        'Cardio/Core': ['Jumping Jacks', 'High Knees', 'Sit-ups'],
        'Full Body': ['Squats', 'Push-ups', 'Jumping Jacks', 'Burpees'],
        'Shoulders': ['Pike Push-ups', 'Arm Circles'],
        'Back & Biceps': ['Pull-ups', 'Bicep Curls'],
        'Active Recovery': ['Stretching', 'Yoga'],
        'Rest': []
    };

    const currentDayGoal = weeklyPlan[currentDay];
    const availableExercises = exerciseMap[currentDayGoal] || ['Squats'];

    const workoutOptions = [
        'Rest', 'Chest Day', 'Back & Biceps', 'Leg Day', 
        'Shoulders', 'Arms', 'Cardio/Core', 'Full Body', 'Active Recovery'
    ];

    const handlePlanChange = (day, newWorkout) => {
        let updatedPlan = { ...weeklyPlan, [day]: newWorkout };

        // Strictly enforce 1 Rest Day
        if (newWorkout === 'Rest') {
            for (const d of daysOfWeek) {
                if (d !== day && updatedPlan[d] === 'Rest') {
                    updatedPlan[d] = 'Active Recovery';
                }
            }
        }
        setWeeklyPlan(updatedPlan);
    };

    const handleStart = () => {
        onStart({ exerciseType, targetReps });
    };

    return (
        <div className="h-screen w-full flex flex-col overflow-hidden bg-slate-900 text-white font-sans selection:bg-cyan-500/30">
            {/* Header Section */}
            <header className="px-6 pt-12 pb-6 bg-slate-900 border-b border-white/5 flex items-center justify-between z-10">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-white mb-1">Hi, Mohit</h1>
                    <p className="text-slate-400 font-medium text-sm">Ready to crush your goals?</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400 p-1 shadow-lg shadow-cyan-400/20">
                    <img 
                        src="https://api.dicebear.com/9.x/micah/svg?seed=Mohit" 
                        alt="Profile" 
                        className="w-full h-full rounded-full bg-slate-900 object-cover"
                    />
                </div>
            </header>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 overflow-y-auto pb-24 px-6 w-full">
                {activeTab === 'home' && (
                    <div className="flex flex-col pt-6">
                        {/* Dynamic Stats Row */}
                        <div className="flex gap-4 mb-6">
                            <div className="flex-1 bg-slate-800/80 border border-white/5 rounded-3xl p-5 flex flex-col items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all"></div>
                                <Flame className="w-8 h-8 text-orange-500 mb-2" />
                                <span className="text-3xl font-black text-white">{streak}</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Day Streak</span>
                            </div>
                            <div className="flex-1 bg-slate-800/80 border border-white/5 rounded-3xl p-5 flex flex-col items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-all"></div>
                                <ActivityIcon className="w-8 h-8 text-cyan-400 mb-2" />
                                <span className="text-3xl font-black text-white">{totalReps}</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Total Reps</span>
                            </div>
                        </div>
                        {/* Dynamic Notification Banner */}
                        <div className="bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 rounded-3xl p-5 mb-8 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                            <span className="text-sm font-medium text-slate-300 uppercase tracking-widest mb-1">Today is {currentDay}</span>
                            <h2 className="text-2xl font-black text-cyan-400">Goal: {currentDayGoal}</h2>
                        </div>

                        <div className="bg-slate-900 border border-white/5 p-6 rounded-3xl shadow-xl w-full max-w-sm mx-auto mb-8">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <ActivityIcon className="w-5 h-5 text-cyan-400" /> Workout Setup
                            </h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-3">Select Exercise</label>
                                    
                                    {availableExercises.length === 0 ? (
                                        <div className="p-4 bg-slate-800/50 border border-white/5 rounded-xl text-center text-slate-400 text-sm italic">
                                            Rest day configured. Take it easy!
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {availableExercises.map((ex) => (
                                                <button 
                                                    key={ex}
                                                    onClick={() => setExerciseType(ex)}
                                                    className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all border ${
                                                        exerciseType === ex 
                                                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
                                                        : 'bg-slate-800 border-white/5 text-slate-400 hover:bg-slate-700'
                                                    }`}
                                                >
                                                    {ex}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="flex justify-between items-center text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                        <span>Target Reps</span>
                                        <span className="text-cyan-400 text-lg">{targetReps}</span>
                                    </label>
                                    <input 
                                        type="range" 
                                        min="1" 
                                        max="50" 
                                        value={targetReps} 
                                        onChange={(e) => setTargetReps(parseInt(e.target.value))}
                                        className="w-full accent-cyan-400"
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={handleStart}
                            className="group relative w-full max-w-sm mx-auto bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-900 py-5 rounded-2xl flex items-center justify-center font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                        >
                            START WORKOUT
                            <Play className="w-6 h-6 ml-2 fill-slate-900" />
                        </button>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="pt-6">
                        <h2 className="text-2xl font-bold mb-6">Past Workouts</h2>
                        <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-white/5">
                            <Clock className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                            <p className="text-slate-400 font-medium">No workouts recorded yet.</p>
                            <p className="text-slate-500 text-sm mt-1">Start a session today to build your history!</p>
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="pt-6 flex flex-col gap-6">
                        <h2 className="text-2xl font-bold mb-2">Profile Settings</h2>
                        
                        <div className="bg-slate-900 border border-white/5 p-6 rounded-3xl">
                            <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Display Name</label>
                            <input type="text" value="Mohit" readOnly className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none opacity-70" />
                        </div>
                        
                        <div className="bg-slate-900 border border-white/5 p-6 rounded-3xl">
                            <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Daily Goal (Reps)</label>
                            <input 
                                type="number" 
                                value={dailyGoal} 
                                onChange={(e) => setDailyGoal(parseInt(e.target.value))}
                                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors" 
                            />
                        </div>

                        <div className="bg-slate-900 border border-white/5 p-6 rounded-3xl flex items-center justify-between">
                            <span className="text-sm uppercase tracking-widest text-slate-400 font-bold">Lifetime Reps</span>
                            <span className="text-3xl font-black text-cyan-400">0</span>
                        </div>

                        {/* My Weekly Split Section */}
                        <div className="bg-slate-900 border border-white/5 p-6 rounded-3xl mt-2">
                            <h3 className="text-lg font-bold mb-6 text-white flex items-center justify-between">
                                My Weekly Split
                                <span className="text-xs font-medium bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full uppercase tracking-wider">Planner</span>
                            </h3>
                            <div className="space-y-4">
                                {daysOfWeek.map((day) => (
                                    <div key={day} className="flex items-center justify-between gap-4">
                                        <label className="text-sm font-bold text-slate-400 w-24 shrink-0">{day}</label>
                                        <div className="relative flex-1">
                                            <select
                                                value={weeklyPlan[day]}
                                                onChange={(e) => handlePlanChange(day, e.target.value)}
                                                className="w-full appearance-none bg-slate-800 border border-white/10 rounded-xl px-4 py-3 pr-10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors shadow-sm cursor-pointer"
                                            >
                                                {workoutOptions.map((opt) => (
                                                    <option key={opt} value={opt} className="bg-slate-800 text-white py-2">
                                                        {opt}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Bottom Navigation Bar */}
            <nav className="fixed bottom-0 w-full bg-slate-900 border-t border-white/5 px-8 pt-4 pb-6 flex items-center justify-between z-40">
                <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'home' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-400'}`}>
                    <Home className="w-6 h-6" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
                </button>
                <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'history' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-400'}`}>
                    <Clock className="w-6 h-6" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">History</span>
                </button>
                <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'profile' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-400'}`}>
                    <User className="w-6 h-6" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
                </button>
            </nav>
        </div>
    );
};

export default Dashboard;
