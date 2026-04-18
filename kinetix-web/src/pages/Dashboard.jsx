import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CameraFeed from '../components/CameraFeed';
import HealthMetrics from '../components/HealthMetrics';
import SummaryPage from '../components/SummaryPage';
import ErrorBoundary from '../components/ErrorBoundary';
import {
    Activity,
    Dumbbell,
    Menu,
    ChevronRight,
    RotateCcw,
    Shield,
    Zap,
    Flame,
    Footprints,
    Target,
    AlertTriangle,
    RefreshCw,
    Clock,
    Timer,
    Trophy,
    CheckCircle,
    TrendingUp,
    Scale,
    X
} from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();

    // --- PHASE-BASED ARCHITECTURE ---
    const [appPhase, setAppPhase] = useState('focus'); // 'focus' | 'goals' | 'workout' | 'summary'
    const [dailyFocus, setDailyFocus] = useState(null);
    const [activeExercise, setActiveExercise] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [setGoals, setSetGoals] = useState({});
    const [currentSet, setCurrentSet] = useState(1);
    const [hasError, setHasError] = useState(false);
    const [workoutHistory, setWorkoutHistory] = useState([]); // Track set-by-set data
    const [activeWorkoutList, setActiveWorkoutList] = useState([]); // Filtered list of exercises with > 0 sets
    const [isFreestyleMode, setIsFreestyleMode] = useState(false);

    // Global Session Tracking
    const [sessionData, setSessionData] = useState({});
    const [sessionTimers, setSessionTimers] = useState({});
    const [sessionStartTime, setSessionStartTime] = useState(null);
    const [setStartTime, setSetStartTime] = useState(null);

    const exerciseCategories = [
        {
            name: 'Chest',
            icon: Shield,
            exercises: ['Push-ups', 'Chest Press', 'Chest Fly']
        },
        {
            name: 'Back & Core',
            icon: Zap,
            exercises: ['Planks', 'Lats Pulldown', 'Crunches', 'Superman']
        },
        {
            name: 'Shoulders & Traps',
            icon: Flame,
            exercises: ['Shoulder Press', 'Lateral Raises', 'Shrugs']
        },
        {
            name: 'Legs',
            icon: Footprints,
            exercises: ['Squats', 'Lunges', 'Hip Thrusts', 'Calf Raises']
        },
        {
            name: 'Arms',
            icon: Dumbbell,
            exercises: ['Bicep Curls', 'Tricep Dips', 'Wrist Curls']
        }
    ];

    const resetIndividualExercise = useCallback((exerciseName) => {
        setSessionData(prev => ({ ...prev, [exerciseName]: 0 }));
        setSessionTimers(prev => ({ ...prev, [exerciseName]: 0 }));
    }, []);

    const finishWorkout = () => {
        console.log('[Kinetix] Protocol Successful: Finalizing Analysis Report');
        setAppPhase('summary');
        setActiveExercise(null);
    };

    const handleExerciseComplete = useCallback((exerciseName, repsCompleted, setsCompleted, timeInSeconds) => {
        if (exerciseName) {
            setSessionData(prev => ({
                ...prev,
                [exerciseName]: {
                    reps: Number(repsCompleted) || 0,
                    sets: Number(setsCompleted) || 1,
                    timeTaken: `${timeInSeconds}s`
                }
            }));
        }

        try {
            const nextPending = activeWorkoutList.find(ex => {
                const goalSets = setGoals[ex] || 0;
                const existing = sessionData[ex];
                const completedReps = typeof existing === 'object' ? (existing.reps || 0) : (existing || 0);
                return (completedReps / 10) < goalSets;
            });

            if (!nextPending) {
                console.log('[Kinetix] All Exercises Complete. Waiting for HUD signaling...');
            } else {
                setActiveExercise(nextPending);
                setCurrentSet(1);
            }
        } catch (err) {
            console.error('[Kinetix Transition Error]', err);
            setHasError(true);
        }
    }, [activeWorkoutList, sessionData, setGoals]);

    const handleSetComplete = useCallback((setStats) => {
        try {
            const currentSetsForEx = (workoutHistory || []).filter(h => h.exerciseName === (activeExercise || setStats.exerciseName)).length;
            const nextSetCount = currentSetsForEx + 1;
            const goalForThisEx = setGoals[activeExercise || setStats.exerciseName] || 0;

            const duration = setStartTime ? Math.round((Date.now() - setStartTime) / 1000) : (Number(setStats.timeTaken) || 0);

            setWorkoutHistory(prev => [...prev, {
                ...setStats,
                reps: Number(setStats.reps) || 0,
                timeTaken: duration,
                setNumber: nextSetCount,
                exerciseName: activeExercise || setStats.exerciseName
            }]);

            setSetStartTime(Date.now());

            const exName = activeExercise || setStats.exerciseName;
            setSessionData(prev => {
                const existing = prev[exName] || { reps: 0, sets: 0, timeTaken: '0s' };
                const newReps = (Number(existing.reps) || 0) + (Number(setStats.reps) || 0);
                return {
                    ...prev,
                    [exName]: {
                        reps: newReps,
                        sets: nextSetCount,
                        timeTaken: `${duration}s`
                    }
                };
            });

            if (nextSetCount < goalForThisEx) {
                setCurrentSet(nextSetCount + 1);
            } else {
                console.log('[Kinetix] Set Sequence Complete. Waiting for final camera transition...');
            }
        } catch (err) {
            console.error('[Kinetix Set Tracking Crash]', err);
            setHasError(true);
        }
    }, [activeExercise, setGoals, setStartTime, workoutHistory]);

    const startWorkoutSession = () => {
        try {
            const category = exerciseCategories.find(c => c.name === dailyFocus);
            if (!category || !category.exercises || category.exercises.length === 0) {
                throw new Error("Focus Data Missing");
            }

            const activeExs = category.exercises.filter(ex => {
                const goal = setGoals[ex];
                return typeof goal === 'number' && goal > 0;
            });

            if (activeExs.length === 0) {
                alert("Tactical Error: Please select at least one exercise to initiate protocol!");
                return;
            }

            const firstEx = activeExs[0];
            const initialSessionData = {};
            activeExs.forEach(ex => initialSessionData[ex] = { reps: 0, sets: 0, timeTaken: '0s' });

            setSessionData(initialSessionData);
            setActiveWorkoutList(activeExs);
            setActiveExercise(firstEx);

            setSessionStartTime(Date.now());
            setSetStartTime(Date.now());
            setAppPhase('workout');
        } catch (err) {
            console.error('[Kinetix Transition Crash]', err);
            setHasError(true);
        }
    };

    const handleFocusSelection = (categoryName) => {
        const category = exerciseCategories.find(c => c.name === categoryName);
        if (category) {
            setDailyFocus(categoryName);
            setIsFreestyleMode(false);
            const initialGoals = {};
            category.exercises.forEach(ex => initialGoals[ex] = 3);
            setSetGoals(initialGoals);
            setAppPhase('goals');
        }
    };

    const handleFreestyleChoice = () => {
        setIsFreestyleMode(true);
        setDailyFocus("Freestyle Mode");

        const allExercises = exerciseCategories.flatMap(cat => cat.exercises);
        const uniqueExercises = [...new Set(allExercises)];

        setActiveWorkoutList(uniqueExercises);
        setActiveExercise(uniqueExercises[0]);
        setAppPhase('workout');
    };

    if (hasError) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 text-center">
                <AlertTriangle className="w-12 h-12 text-red-500 mb-6" />
                <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">Protocol Execution Failed</h1>
                <p className="text-slate-500 mt-2 mb-8">A state undefined error occurred during the high-speed transition.</p>
                <button onClick={() => window.location.reload()} className="px-10 py-4 bg-white text-black font-black uppercase rounded-2xl flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" /> Hard Reset App
                </button>
            </div>
        );
    }

    const currentCategory = exerciseCategories.find(c => c.name === dailyFocus);

    return (
        <div className="relative h-screen w-full max-w-full bg-slate-950 text-white font-sans overflow-x-hidden overflow-y-auto">

            {appPhase === 'focus' && (
                <div className="absolute inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 overflow-y-auto">
                    <div className="max-w-6xl w-full text-center">
                        <Activity className="w-20 h-20 text-neon-cyan mx-auto mb-10 animate-pulse" />
                        <h1 className="text-7xl font-black italic mb-16 tracking-tighter drop-shadow-[0_0_30px_rgba(0,255,255,0.2)]">
                            CHOOSE <span className="text-neon-cyan">TRAINING</span> MODE
                        </h1>

                        <div className="max-w-xl mx-auto mt-8 mb-12 px-4 animate-in fade-in slide-in-from-top-10 duration-1000">
                            <button
                                onClick={() => setAppPhase('metrics')}
                                className="flex items-center justify-center gap-3 w-full py-6 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/50 rounded-[30px] text-green-400 font-black tracking-widest hover:from-green-600/40 hover:to-emerald-600/40 transition-all shadow-[0_0_30px_rgba(34,197,94,0.15)] hover:scale-[1.02] active:scale-95 group"
                            >
                                <Activity size={32} className="group-hover:animate-pulse" />
                                CALCULATE BMI & HEALTH
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            {exerciseCategories.map((cat) => (
                                <div key={cat.name} onClick={() => handleFocusSelection(cat.name)} className="group bg-white/5 border border-white/10 p-10 rounded-[40px] cursor-pointer hover:border-neon-cyan/50 hover:bg-neon-cyan/10 transition-all duration-500">
                                    <cat.icon className="w-12 h-12 mx-auto text-white group-hover:text-neon-cyan transition-colors" />
                                    <h3 className="mt-8 text-2xl font-black italic uppercase tracking-tight group-hover:text-neon-cyan transition-colors">{cat.name}</h3>
                                </div>
                            ))}
                            <div onClick={handleFreestyleChoice} className="group bg-neon-green/5 border border-neon-green/20 p-10 rounded-[40px] cursor-pointer hover:border-neon-green hover:bg-neon-green/10 transition-all duration-500 shadow-[0_0_50px_rgba(57,255,20,0.1)]">
                                <Zap className="w-12 h-12 mx-auto text-neon-green animate-pulse" />
                                <h3 className="mt-8 text-2xl font-black italic uppercase tracking-tight text-neon-green">Free Day</h3>
                                <p className="text-[10px] text-neon-green/60 font-bold uppercase tracking-widest mt-2">Open Protocol</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {appPhase === 'goals' && currentCategory && (
                <div className="absolute inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 overflow-y-auto">
                    <div className="max-w-4xl w-full">
                        <div className="text-center mb-10">
                            <h1 className="text-5xl font-black italic mb-2 uppercase leading-none">CONFIGURING <span className="text-neon-green">{dailyFocus}</span> PROTOCOL</h1>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-[44px] p-10 space-y-4 backdrop-blur-3xl shadow-2xl">
                            {currentCategory.exercises.map((ex) => (
                                <div key={ex} className="flex items-center justify-between p-6 rounded-[24px] bg-slate-900/50 border border-white/5 shadow-inner">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-neon-cyan active-neon-cyan" />
                                        <span className="text-xl font-black uppercase tracking-tight">{ex}</span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sets</p>
                                        <input
                                            type="number"
                                            defaultValue="3"
                                            min="0"
                                            className="w-24 bg-black border border-white/10 rounded-2xl px-6 py-3 text-center text-neon-cyan font-black text-lg focus:border-neon-cyan focus:outline-none transition-all"
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value);
                                                setSetGoals(prev => ({ ...prev, [ex]: isNaN(val) ? 0 : val }));
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={startWorkoutSession}
                                className="w-full mt-6 py-8 bg-gradient-to-r from-neon-cyan to-neon-green rounded-[30px] text-black font-black text-2xl uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(34,211,238,0.4)] hover:shadow-[0_0_60px_rgba(34,211,238,0.6)] hover:scale-[1.01] transition-all active:scale-95"
                            >
                                Initiate Session Protocol
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {appPhase === 'workout' && (
                activeWorkoutList && activeWorkoutList.includes(activeExercise) && dailyFocus ? (
                    <div className="flex h-full w-full">
                        {/* Mobile Overlay */}
                        {isMenuOpen && (
                            <div 
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
                                onClick={() => setIsMenuOpen(false)}
                            />
                        )}
                        
                        <aside className={`fixed md:relative w-64 h-full bg-slate-900 border-r border-white/5 flex flex-col z-40 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                            <button 
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white md:hidden"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <div className="p-8 border-b border-white/5">
                                <div className="flex items-center gap-4 mb-8">
                                    <Activity className="text-neon-cyan w-10 h-10" />
                                    <h1 className="text-3xl font-black italic tracking-tighter">Kinetix</h1>
                                </div>
                                <div className="bg-neon-cyan/5 border border-neon-cyan/20 p-5 rounded-3xl flex items-center gap-4">
                                    <Target className="w-5 h-5 text-neon-cyan" />
                                    <div>
                                        <p className="text-[9px] font-black text-neon-cyan/60 uppercase tracking-widest">Protocol</p>
                                        <p className="text-sm font-black text-neon-cyan uppercase italic tracking-tight">{dailyFocus}</p>
                                    </div>
                                </div>
                            </div>

                            <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-4">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-4 mb-2">Tactical Exercises</p>
                                {activeWorkoutList.map((exName) => (
                                    <button
                                        key={exName}
                                        onClick={() => setActiveExercise(exName)}
                                        className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 font-bold ${activeExercise === exName
                                            ? 'bg-slate-800 text-neon-cyan border border-neon-cyan/20 shadow-lg'
                                            : 'text-slate-500 hover:text-white hover:bg-slate-800/50'}`}
                                    >
                                        <span className="text-sm tracking-tight">{exName}</span>
                                        {activeExercise === exName && <ChevronRight className="w-4 h-4" />}
                                    </button>
                                ))}
                            </nav>

                            <div className="p-6 border-t border-white/5 space-y-3">
                                {isFreestyleMode && (
                                    <button
                                        onClick={() => {
                                            const currentIndex = activeWorkoutList.indexOf(activeExercise);
                                            const nextIndex = (currentIndex + 1) % activeWorkoutList.length;
                                            setActiveExercise(activeWorkoutList[nextIndex]);
                                        }}
                                        className="w-full flex items-center justify-center gap-3 py-4 text-[10px] font-black bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan hover:text-white uppercase transition-all border border-neon-cyan/20 rounded-2xl mb-4"
                                    >
                                        <ChevronRight className="w-3.5 h-3.5" /> Next Exercise
                                    </button>
                                )}
                                <button
                                    onClick={finishWorkout}
                                    className="w-full flex items-center justify-center gap-3 py-4 text-[10px] font-black bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white uppercase transition-all border border-red-500/20 rounded-2xl"
                                >
                                    <Target className="w-3.5 h-3.5" /> End Workout
                                </button>
                                <button
                                    onClick={() => setAppPhase('metrics')}
                                    className="flex items-center gap-3 p-4 mt-6 w-full bg-gray-800/50 border border-green-500/30 rounded-xl hover:bg-gray-800 hover:border-green-400 text-green-400 font-bold transition-all"
                                >
                                    <Activity size={20} />
                                    Body & Health Metrics
                                </button>
                                <button onClick={() => setAppPhase('focus')} className="w-full flex items-center justify-center gap-3 py-4 text-[10px] font-black text-slate-500 hover:text-white uppercase transition-all border border-white/5 rounded-2xl hover:bg-white/5">
                                    <RefreshCw className="w-3.5 h-3.5" /> Re-Deploy Session
                                </button>
                            </div>
                        </aside>

                        <main className="flex-1 relative bg-black">
                            <header className="absolute top-0 left-0 w-full z-20 p-6 flex justify-between items-center pointer-events-none">
                                <button className="md:hidden pointer-events-auto p-4 bg-slate-900/80 rounded-2xl backdrop-blur-md" onClick={() => setIsMenuOpen(true)}>
                                    <Menu className="w-6 h-6" />
                                </button>
                                <div className="px-6 py-2.5 rounded-full bg-slate-950/80 border border-neon-green/30 text-neon-green font-black text-[10px] tracking-widest flex items-center gap-3 shadow-2xl">
                                    <div className="w-2.5 h-2.5 rounded-full bg-neon-green animate-ping" />
                                    AI TRACKING ENABLED
                                </div>
                            </header>

                            <div className="h-full w-full">
                                <ErrorBoundary>
                                    <CameraFeed
                                        activeExercise={activeExercise}
                                        sessionData={sessionData}
                                        setSessionData={setSessionData}
                                        sessionTimers={sessionTimers}
                                        setSessionTimers={setSessionTimers}
                                        resetIndividualExercise={resetIndividualExercise}
                                        goalSets={setGoals[activeExercise] || 3}
                                        allGoals={setGoals}
                                        currentSet={currentSet}
                                        setCurrentSet={setCurrentSet}
                                        dailyExercises={activeWorkoutList}
                                        setActiveExercise={setActiveExercise}
                                        dailyFocus={dailyFocus}
                                        handleExerciseComplete={handleExerciseComplete}
                                        handleSetComplete={handleSetComplete}
                                        setAppPhase={setAppPhase}
                                        isFreestyleMode={isFreestyleMode}
                                    />
                                </ErrorBoundary>
                            </div>
                        </main>
                    </div>
                ) : (
                    <div className="absolute inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center p-8">
                        <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin mb-6" />
                        <h1 className="text-xl font-black text-white italic tracking-tighter uppercase">Finding next exercise...</h1>
                        <p className="text-slate-500 text-xs mt-2 uppercase tracking-widest">Deploying tactical sensor suite</p>
                    </div>
                )
            )}

            {appPhase === 'summary' && (
                <div className="flex-1 w-full h-screen overflow-y-auto">
                    <SummaryPage
                        data={sessionData || {}}
                        onBack={() => {
                            setSessionData({});
                            setAppPhase('focus');
                        }}
                    />
                </div>
            )}

            {appPhase === 'metrics' && (
                <div className="flex-1 w-full h-screen overflow-y-auto p-4 md:p-8 pb-32">
                    <div className="max-w-4xl w-full mx-auto">
                        <HealthMetrics onBack={() => setAppPhase('focus')} />
                        <button
                            onClick={() => setAppPhase('focus')}
                            className="mt-8 px-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all mx-auto block"
                        >
                            Back to Tactical Deck
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;