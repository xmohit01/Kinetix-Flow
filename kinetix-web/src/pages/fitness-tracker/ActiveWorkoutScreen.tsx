import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { useExerciseLogic } from '../../hooks/useExerciseLogic';
import { getRepProgressColor } from '../../utils/exerciseUtils';
import { triggerHaptic, speakFeedback } from '../../utils/premiumEffects';
import { ChevronLeft, Play, Pause, Square } from 'lucide-react';

export default function ActiveWorkoutScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeExercise = queryParams.get('exercise') || 'Squats';

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraRef = useRef<Camera | null>(null);
  const poseRef = useRef<Pose | null>(null);

  const [isActive, setIsActive] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [landmarks, setLandmarks] = useState<any>(null);

  const {
    repCount,
    feedback,
    instruction,
    progress,
    reset
  } = useExerciseLogic(isActive ? landmarks : null, activeExercise);

  const [sessionTime, setSessionTime] = useState(0);
  const [prevReps, setPrevReps] = useState(0);
  const [prevFeedback, setPrevFeedback] = useState("");

  const targetReps = parseInt(queryParams.get('reps') || '10', 10);

  // Session timer
  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  // Voice Coaching and Haptics
  useEffect(() => {
    if (isActive && feedback !== prevFeedback && feedback !== "Assume Starting Position") {
      speakFeedback(feedback);
      setPrevFeedback(feedback);
    }
  }, [feedback, isActive, prevFeedback]);

  useEffect(() => {
    if (repCount > prevReps) {
      triggerHaptic('success');
      // Speak rep count occasionally or on milestones
      if (repCount % 5 === 0) {
         speakFeedback(`${repCount} reps. Keep it up!`);
      }
      setPrevReps(repCount);
    }
  }, [repCount, prevReps]);

  // Initialize MediaPipe Pose
  useEffect(() => {
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
          setIsModelLoading(false);
          
          // Initial greeting
          setTimeout(() => {
            speakFeedback(`Starting ${activeExercise.replace('-', ' ')}. Align your body in the frame.`);
          }, 1000);
          
        } catch (err) {
          console.error("Camera Error:", err);
        }
      }
    };

    startCamera();

    return () => {
      try {
        if (cameraRef.current) cameraRef.current.stop();
      } catch (e) { }
      try {
        if (poseRef.current) {
          poseRef.current.close();
          poseRef.current = null;
        }
      } catch (e) { }
    };
  }, []);

  const onResults = (results: any) => {
    if (!canvasRef.current || !webcamRef.current?.video) return;

    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;
    if (videoWidth === 0) return;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasCtx = canvasRef.current.getContext("2d");
    if (!canvasCtx) return;

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, videoWidth, videoHeight);

    if (results?.poseLandmarks) {
      setLandmarks(results.poseLandmarks);
      const color = getRepProgressColor(progress);
      
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#ffffff', lineWidth: 4 });
      drawLandmarks(canvasCtx, results.poseLandmarks, { color: color, lineWidth: 2, radius: 4 });
    } else {
      setLandmarks(null);
    }
    canvasCtx.restore();
  };

  const handleEndWorkout = () => {
    triggerHaptic('heavy');
    speakFeedback("Workout ended. Great job.");
    navigate('/summary', { state: { reps: repCount, time: sessionTime, exercise: activeExercise } });
  };

  const toggleActive = () => {
    triggerHaptic('medium');
    if (!isActive) speakFeedback("Resuming.");
    else speakFeedback("Paused.");
    setIsActive(!isActive);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full h-[100dvh] bg-background overflow-hidden flex flex-col touch-none">
      {/* Background Camera Layer */}
      <Webcam
        ref={webcamRef}
        audio={false}
        mirrored={true}
        playsInline
        videoConstraints={{ facingMode: "user" }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover scale-x-[-1] pointer-events-none"
      />

      {/* Loading Overlay */}
      {isModelLoading && (
        <div className="absolute inset-0 z-50 bg-[#1C1C1E]/90 backdrop-blur-md flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <h2 className="text-white font-serif font-bold text-xl">Warming up tracker...</h2>
          <p className="text-[#8E8E93] text-sm mt-2 font-medium">Calibrating tracking sensors</p>
        </div>
      )}

      {/* Alignment Silhouette (Only when paused/idle) */}
      {!isActive && !isModelLoading && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
          <svg viewBox="0 0 200 400" className="w-[80%] max-w-sm h-full" stroke="white" strokeWidth="4" fill="none" strokeDasharray="10 10">
            {/* Simple abstract human body guide */}
            <circle cx="100" cy="80" r="30" />
            <line x1="100" y1="110" x2="100" y2="250" />
            <line x1="50" y1="130" x2="150" y2="130" />
            <line x1="50" y1="130" x2="30" y2="200" />
            <line x1="150" y1="130" x2="170" y2="200" />
            <line x1="100" y1="250" x2="70" y2="380" />
            <line x1="100" y1="250" x2="130" y2="380" />
          </svg>
        </div>
      )}

      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

      {/* Header UI */}
      <div className="absolute top-0 inset-x-0 px-5 py-8 flex items-center justify-between z-10">
        <button
          onClick={() => {
            triggerHaptic('light');
            navigate(-1);
          }}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 active:scale-90 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="px-5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white font-medium text-sm flex items-center gap-2">
          {isActive && <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(255,107,87,0.8)]" />}
          <span>{activeExercise.replace('-', ' ')}</span>
        </div>
      </div>

      {/* Progress & Rep Bar Overlay (Restored & Modernized) */}
      {isActive && (
        <div className="absolute top-28 inset-x-5 z-10">
           <div className="flex justify-between items-end mb-2">
              <span className="text-white text-sm font-bold">{repCount} <span className="text-white/60 font-medium">/ {targetReps} Reps</span></span>
              <span className="text-white text-sm font-bold">{formatTime(sessionTime)}</span>
           </div>
           <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-md relative">
              <div 
                className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${Math.min(100, (repCount / targetReps) * 100)}%` }}
              />
           </div>
           
           {/* Rep Execution Progress (In-Rep) */}
           <div className="mt-3 flex items-center justify-center gap-2">
             <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-secondary transition-all duration-150"
                  style={{ width: `${progress * 100}%` }}
                />
             </div>
           </div>
        </div>
      )}

      {/* Dynamic Feedback Center Overlay */}
      <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 px-6 flex flex-col items-center justify-center pointer-events-none z-10">
        {isActive ? (
          <>
            <div className={`px-8 py-3 rounded-full backdrop-blur-xl border-2 transition-all transform duration-300 shadow-2xl ${
              feedback.includes('Good') || feedback.includes('Great') || feedback.includes('Solid')
                ? 'bg-[#557A64]/80 border-[#557A64] text-white scale-110'
                : 'bg-[#1C1C1E]/80 border-white/10 text-white'
            }`}>
              <h2 className="text-3xl font-serif italic tracking-wide">{feedback}</h2>
            </div>
            {instruction && <p className="mt-4 text-sm text-white/90 font-medium uppercase tracking-widest drop-shadow-md">{instruction}</p>}
          </>
        ) : (
          !isModelLoading && (
            <div className="flex flex-col items-center animate-bounce">
              <div className="px-8 py-4 rounded-full bg-primary/90 backdrop-blur-xl border border-white/20 text-white shadow-xl shadow-primary/30">
                <h2 className="text-lg font-bold">Tap Play to Start</h2>
              </div>
            </div>
          )
        )}
      </div>

      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Bottom Controls */}
      <div className="absolute bottom-10 inset-x-0 flex flex-col gap-6 z-10">
        <div className="flex items-center justify-center gap-8">
          <button
            onClick={handleEndWorkout}
            className="w-16 h-16 rounded-full bg-white/10 text-white border border-white/20 flex items-center justify-center hover:bg-red-500/80 hover:border-red-500 transition-colors backdrop-blur-md active:scale-90"
          >
            <Square className="w-6 h-6 fill-current" />
          </button>

          <button
            onClick={toggleActive}
            className="w-24 h-24 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center active:scale-95 transition-all shadow-primary/40 border-4 border-white/10"
          >
            {isActive ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-1" />}
          </button>
          
          <div className="w-16 h-16" /> {/* Spacer to center the play button */}
        </div>
      </div>
    </div>
  );
}
