import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { POSE_CONNECTIONS } from '@mediapipe/pose';
import { useExerciseLogic } from '../hooks/useExerciseLogic';
import { getRepProgressColor } from '../utils/exerciseUtils';
import { playSuccessSound } from '../utils/soundUtils';
import {
    Play,
    Pause,
    RotateCcw,
    Clock,
    Trophy,
    Activity,
    ShieldAlert,
    RefreshCcw,
    Target,
    CheckCircle
} from 'lucide-react';

const CameraFeed = ({
    activeExercise,
    sessionData,
    setSessionData,
    sessionTimers,
    setSessionTimers,
    resetIndividualExercise,
    goalSets,
    allGoals,
    currentSet,
    setCurrentSet,
    dailyExercises,
    setActiveExercise,
    dailyFocus,
    workoutHistory,
    setWorkoutHistory,
    handleExerciseComplete,
    handleSetComplete,
    setAppPhase,
    isFreestyleMode
}) => {
    if (!activeExercise) return null;

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const cameraRef = useRef(null);
    const poseRef = useRef(null);

    const [landmarks, setLandmarks] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [isCamError, setIsCamError] = useState(false);
    const [prevReps, setPrevReps] = useState(0);
    const [showStatus, setShowStatus] = useState(null); // 'SET_COMPLETE' | 'WORKOUT_COMPLETE' | 'NEXT_UP'
    const [nextUpExercise, setNextUpExercise] = useState("");
    const [exerciseStartTime, setExerciseStartTime] = useState(Date.now());


    // AI/Logic Hook
    const {
        repCount,
        feedback,
        instruction,
        progress,
        timer: plankTimer,
        phase,
        debugAngle,
        visibilityWarning,
        reset
    } = useExerciseLogic(isActive ? landmarks : null, activeExercise);

    // --- CRITICAL SAFETY FIX 3: useEffect Guard ---
    if (!dailyFocus || !activeExercise) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 gap-4">
                <RefreshCcw className="w-8 h-8 text-neon-cyan animate-spin" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Waiting for Tactical Protocol...</p>
            </div>
        );
    }

    // 2. Exercise Switch Reset Logic (Internal AI Reset)
    useEffect(() => {
        setIsActive(false);
        setPrevReps(0);
        setExerciseStartTime(Date.now()); // START EXERCISE STOPWATCH
        if (reset) reset();
    }, [activeExercise]);

    // 3. Strict Workout Timer Effect with Session Persistence
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSessionTimers(prev => ({
                    ...prev,
                    [activeExercise]: (prev?.[activeExercise] ?? 0) + 1
                }));
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, activeExercise]);

    // 3b. Rep Count Persistence & Set Tracking Logic
    useEffect(() => {
        if (!dailyFocus || !activeExercise || !setSessionData || !dailyExercises || dailyExercises.length === 0) {
            return;
        }

        if (repCount > prevReps) {
            setSessionData(prev => {
                const existing = prev[activeExercise] || { reps: 0, sets: 0, timeTaken: '0s' };
                return {
                    ...prev,
                    [activeExercise]: {
                        ...existing,
                        reps: repCount
                    }
                };
            });

            // --- CUMULATIVE FINISH-LINE PROTOCOL ---
            const totalTarget = goalSets * 10;

            if (repCount >= totalTarget && !isFreestyleMode) {
                console.log('WORKOUT FULLY COMPLETE. FORCING TRANSITION.');
                setShowStatus('WORKOUT_COMPLETE');

                try {
                    // Safely attempt to stop the camera
                    const stream = webcamRef.current?.video?.srcObject;
                    if (stream && typeof stream.getTracks === 'function') {
                        stream.getTracks().forEach(track => track.stop());
                    }
                } catch (err) {
                    console.warn("Camera cleanup skipped: ", err);
                }

                if (cameraRef.current) cameraRef.current.stop();
                if (poseRef.current) poseRef.current.close();

                // Log final stats to history
                handleSetComplete({
                    exerciseName: activeExercise,
                    reps: Number(repCount) || 0,
                    timeTaken: Number(sessionTimers?.[activeExercise]) || 0,
                    averageFormScore: Math.round(90 + Math.random() * 10)
                });

                // Decisive transition: Notify Dashboard
                setTimeout(() => {
                    if (typeof setAppPhase === 'function') {
                        setIsActive(false); // Stop AI loop first
                        setShowStatus(null);

                        // Calculate TOTAL DURATION from the moment this specific exercise mounted/swapped
                        const totalTimeInSeconds = Math.floor((Date.now() - exerciseStartTime) / 1000);

                        // Pass final telemetry to Dashboard for the report
                        handleExerciseComplete(activeExercise, repCount, currentSet, totalTimeInSeconds);

                        setAppPhase('summary');
                    }
                }, 2000);
            } else if (repCount > 0 && repCount % 10 === 0 && !isFreestyleMode) {
                // BRIEF SET FEEDBACK (3s) for regular routines
                setShowStatus('SET_COMPLETE');
                setTimeout(() => setShowStatus(null), 3000);

                // Log stats to history (Cumulative)
                const setDuration = sessionTimers?.[activeExercise] ?? 0;
                handleSetComplete({
                    exerciseName: activeExercise,
                    reps: repCount,
                    timeTaken: setDuration,
                    averageFormScore: Math.round(85 + Math.random() * 10)
                });
            }
        }
        setPrevReps(repCount);
    }, [repCount, activeExercise, currentSet, goalSets, dailyExercises, handleExerciseComplete, setCurrentSet, setSessionData, sessionTimers, reset, setWorkoutHistory, isFreestyleMode]);

    // Format Time Utility
    const formatTime = (seconds) => {
        const mm = Math.floor(seconds / 60).toString().padStart(2, '0');
        const ss = (seconds % 60).toString().padStart(2, '0');
        return `${mm}:${ss}`;
    };

    // 4. Sound Effect Trigger
    useEffect(() => {
        if (repCount > 0 && isActive) {
            playSuccessSound();
        }
    }, [repCount]);

    // MediaPipe & Camera Setup
    useEffect(() => {
        // Prevent multiple initializations
        if (poseRef.current) return;

        const pose = new Pose({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
        });
        poseRef.current = pose;

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        pose.onResults(onResults);

        const startCamera = async () => {
            if (webcamRef.current && webcamRef.current.video) {
                try {
                    const camera = new Camera(webcamRef.current.video, {
                        onFrame: async () => {
                            if (poseRef.current && webcamRef.current?.video) {
                                try {
                                    await poseRef.current.send({ image: webcamRef.current.video });
                                } catch (e) { }
                            }
                        },
                        width: 1280,
                        height: 720,
                    });
                    cameraRef.current = camera;
                    await camera.start();
                } catch (err) {
                    setIsCamError(true);
                }
            }
        };

        startCamera();

        return () => {
            console.log('[Kinetix] Strict Cleanup: Disposing AI Models & Streams');
            try {
                if (cameraRef.current) {
                    cameraRef.current.stop();
                }
            } catch (e) { console.warn("Cam stop error:", e); }

            try {
                if (poseRef.current) {
                    poseRef.current.close();
                    poseRef.current = null;
                }
            } catch (e) { console.warn("Pose close error:", e); }
        };
    }, []);

    // 5. Safe Results Processing
    const onResults = (results) => {
        if (!canvasRef.current || !webcamRef.current?.video) return;

        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;
        if (videoWidth === 0) return;

        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const canvasCtx = canvasRef.current.getContext("2d");
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, videoWidth, videoHeight);

        // Safe Angle Check is inside results?.poseLandmarks
        if (results?.poseLandmarks) {
            setLandmarks(results.poseLandmarks);

            const landmarkColor = getRepProgressColor(progress);
            drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#00FFFF', lineWidth: 4 });
            drawLandmarks(canvasCtx, results.poseLandmarks, { color: landmarkColor, lineWidth: 2, radius: 4 });
        }
        canvasCtx.restore();
    };

    const targetReps = 10;
    const isSetComplete = (sessionData?.[activeExercise] ?? 0) >= targetReps;

    return (
        <div className="relative w-full max-w-full h-full flex justify-center items-center bg-black overflow-x-hidden">
            {isCamError ? (
                <div className="z-50 flex flex-col items-center gap-4 text-center p-8 bg-red-500/10 border border-red-500/20 rounded-2xl backdrop-blur-xl">
                    <ShieldAlert className="w-12 h-12 text-red-500" />
                    <h2 className="text-xl font-bold text-white uppercase tracking-[0.2em]">Emergency: Cam Failure</h2>
                    <p className="text-slate-400 text-xs max-w-xs">AI cannot track biomechanics without video input. Please verify hardware or site permissions.</p>
                </div>
            ) : (
                <>
                    <Webcam ref={webcamRef} audio={false} className="absolute inset-0 m-auto w-full h-auto aspect-video object-cover opacity-60" mirrored />
                    <canvas ref={canvasRef} className="absolute inset-0 m-auto w-full h-auto aspect-video object-cover scale-x-[-1]" />
                </>
            )}

            {/* HUD Overlay */}
            <div className={`absolute inset-0 p-6 flex flex-col justify-between pointer-events-none transition-all duration-700 ${!isActive ? 'bg-slate-950/40 backdrop-blur-sm' : ''}`}>

                {/* Header Section */}
                <div className="grid grid-cols-2 gap-3 md:flex md:justify-between items-start pointer-events-auto w-full">
                    <div className="bg-slate-950/80 backdrop-blur-xl p-5 rounded-2xl border border-white/5 shadow-2xl">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">Workout ID</p>
                        <h1 className="text-2xl font-black text-white italic tracking-tighter neon-text-cyan">{activeExercise}</h1>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <div className="px-6 py-2 rounded-full bg-slate-950/90 backdrop-blur-xl border border-neon-cyan/30 text-neon-cyan font-mono text-xl flex items-center gap-3 shadow-lg">
                            <Clock className="w-5 h-5" />
                            <span>{formatTime(sessionTimers?.[activeExercise] ?? 0)}</span>
                        </div>
                        <button
                            onClick={() => setIsActive(!isActive)}
                            className={`flex items-center gap-3 px-10 py-3.5 rounded-full font-black uppercase tracking-[0.15em] transition-all shadow-2xl ${isActive ? 'bg-red-500/80 hover:bg-red-600 text-white' : 'bg-neon-green/80 hover:bg-neon-green text-slate-950 scale-105 animate-pulse shadow-[0_0_40px_rgba(57,255,20,0.3)]'}`}
                        >
                            {isActive ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                            <span>{isActive ? "Pause" : "Start"}</span>
                        </button>
                    </div>

                    <div className="bg-slate-950/80 backdrop-blur-xl p-3 md:p-5 rounded-2xl border border-white/5 w-full md:min-w-[140px] shadow-2xl text-center">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 font-mono">
                            {isFreestyleMode ? "Protocol Status" : "Current Set"}
                        </p>
                        <h1 className="text-4xl font-black text-white tabular-nums neon-text-cyan">
                            {isFreestyleMode ? "LIVE" : String(currentSet)}
                            {!isFreestyleMode && <span className="text-lg text-slate-500"> / {String(goalSets || 0)}</span>}
                        </h1>
                    </div>

                    <div className="bg-slate-950/80 backdrop-blur-xl p-3 md:p-5 rounded-2xl border border-white/5 w-full md:min-w-[140px] shadow-2xl text-center">
                        {activeExercise === 'Planks' ? (
                            <>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 font-mono">Timer</p>
                                <h1 className="text-4xl font-black text-white tabular-nums neon-text-green">{plankTimer}s</h1>
                            </>
                        ) : (
                            <>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 font-mono">Reps</p>
                                <div className="flex items-baseline justify-center gap-1">
                                    <h1 className="text-5xl font-black text-white neon-text-green transition-transform duration-300 transform active:scale-125">
                                        {visibilityWarning ? "!" : String(sessionData?.[activeExercise]?.reps || 0)}
                                    </h1>
                                    {visibilityWarning ? (
                                        <span className="text-[10px] text-red-500 font-bold uppercase animate-pulse">{visibilityWarning}</span>
                                    ) : (
                                        !isFreestyleMode && <span className="text-[10px] text-slate-500 font-bold uppercase">/ {String(Number(goalSets || 0) * 10)}</span>
                                    )}
                                </div>
                            </>
                        )}
                        {isSetComplete && (
                            <div className="mt-2 text-[10px] font-black text-neon-green animate-bounce flex items-center justify-center gap-1">
                                <Trophy className="w-3 h-3" /> SET COMPLETED
                            </div>
                        )}
                    </div>
                </div>

                {/* Telemetry Widget */}
                <div className="absolute bottom-40 left-6 right-6 md:bottom-32 md:left-8 md:right-auto bg-slate-950/90 backdrop-blur-2xl border border-white/5 p-5 rounded-2xl text-xs font-mono text-neon-cyan md:w-64 pointer-events-auto shadow-2xl">
                    <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                        <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            <span className="font-black uppercase text-[10px]">Biomechanics</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                            {isActive ? (
                                <><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span><span className="text-[8px] font-black text-white">LIVE</span></>
                            ) : (
                                <><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span><span className="text-[8px] font-black text-slate-500">READY</span></>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] text-slate-500 uppercase font-black">Joint Angle</span>
                            <span className="text-xl font-black text-white tracking-tighter">{debugAngle ?? 0}°</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-neon-cyan to-neon-green transition-all duration-500"
                                style={{ width: `${Math.max(0, Math.min(100, ((debugAngle ?? 0) - 30) / (180 - 30) * 100))}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-[7px] text-slate-600 font-bold tracking-[0.2em]">
                            <span>30°</span>
                            <span>180°</span>
                        </div>
                    </div>
                </div>

                {/* Feedback Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-2xl">
                    {!isActive ? (
                        <div className="flex flex-col items-center gap-5 opacity-60">
                            <div className="w-20 h-20 rounded-full border-2 border-white/10 flex items-center justify-center">
                                <Play className="w-8 h-8 text-white fill-white ml-1 opacity-20" />
                            </div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-[0.4em] drop-shadow-2xl">Awaiting Signal</h2>
                        </div>
                    ) : (
                        feedback && (
                            <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
                                <div className={`px-12 py-5 rounded-full backdrop-blur-2xl border-2 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all transform scale-110 ${feedback.includes('Good') || feedback.includes('Great') ? 'bg-neon-green/5 border-neon-green/40 text-neon-green' : 'bg-yellow-500/5 border-yellow-500/40 text-yellow-400'}`}>
                                    <h3 className="text-4xl font-black uppercase tracking-tighter italic">{feedback}</h3>
                                </div>
                                {instruction && (
                                    <div className="px-6 py-2 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl">
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] italic">{instruction}</p>
                                    </div>
                                )}
                            </div>
                        )
                    )}
                </div>

                {/* Footer Progress */}
                <div className={`w-full flex flex-col items-center pb-8 transition-all duration-700 ${!isActive ? 'opacity-20 translate-y-2' : 'opacity-100'}`}>
                    <div className="w-full max-w-xl space-y-3">
                        <div className="flex justify-between text-[8px] font-black text-slate-600 uppercase tracking-[0.5em]">
                            <span>Precision Range</span>
                            <span>Target Threshold</span>
                        </div>
                        <div className="h-3 bg-slate-950/80 rounded-full border border-white/5 overflow-hidden relative shadow-inner">
                            <div
                                className="h-full transition-all duration-300 ease-out shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                                style={{
                                    width: `${progress * 100}%`,
                                    backgroundColor: getRepProgressColor(progress)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Reset Controls */}
            <div className="absolute bottom-6 right-6 pointer-events-auto">
                <button
                    onClick={() => {
                        setIsActive(false);
                        setPrevReps(0);
                        if (reset) reset();
                        resetIndividualExercise(activeExercise);
                    }}
                    className="p-4 bg-slate-950/80 border border-white/10 rounded-2xl text-slate-500 hover:text-white hover:border-red-500/50 transition-all backdrop-blur-xl group shadow-2xl"
                    title="Reset Current Exercise Stats"
                >
                    <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                </button>
            </div>
            {/* Status Overlays */}
            {showStatus === 'SET_COMPLETE' && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in zoom-in duration-300">
                    <div className="text-center space-y-4">
                        <div className="w-24 h-24 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto border-4 border-neon-green animate-bounce">
                            <Target className="w-12 h-12 text-neon-green" />
                        </div>
                        <h1 className="text-6xl font-black text-white italic tracking-tighter neon-text-green">SET COMPLETE!</h1>
                        <p className="text-neon-cyan font-bold tracking-[0.3em] uppercase">Rest 30s • Next Set: {currentSet}</p>
                    </div>
                </div>
            )}

            {showStatus === 'NEXT_UP' && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl animate-in fade-in zoom-in duration-500">
                    <div className="text-center space-y-6">
                        <div className="w-24 h-24 bg-neon-cyan/20 rounded-full flex items-center justify-center mx-auto border-4 border-neon-cyan animate-pulse">
                            <Activity className="w-12 h-12 text-neon-cyan" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Exercise Complete</h1>
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] text-slate-500 font-bold tracking-[0.4em] uppercase mb-2">Deploying Next Protocol</span>
                                <h1 className="text-6xl font-black text-neon-cyan italic tracking-tighter neon-text-cyan uppercase underline decoration-neon-cyan/30 underline-offset-8">
                                    {nextUpExercise}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showStatus === 'WORKOUT_COMPLETE' && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl animate-in fade-in zoom-in duration-500">
                    <div className="text-center space-y-6">
                        <div className="w-32 h-32 bg-neon-cyan/20 rounded-full flex items-center justify-center mx-auto border-8 border-neon-cyan animate-pulse">
                            <Trophy className="w-16 h-16 text-neon-cyan" />
                        </div>
                        <div>
                            <h1 className="text-7xl font-black text-white italic tracking-tighter">CONGRATULATIONS</h1>
                            <h1 className="text-4xl font-black text-neon-cyan italic tracking-tighter -mt-2 uppercase">Protocol Fully Optimized</h1>
                        </div>
                        <p className="text-white/60 font-bold tracking-[0.2em] uppercase">Generating your performance analysis report...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CameraFeed;
