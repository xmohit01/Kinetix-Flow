import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { X, Pause, Play } from 'lucide-react';

export default function WorkoutTrackingScreen() {
  const navigate = useNavigate();
  const [reps, setReps] = useState(0);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [feedback, setFeedback] = useState('Keep your back straight');

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  useEffect(() => {
    const repInterval = setInterval(() => {
      if (!isPaused && reps < 20) {
        setReps((prev) => prev + 1);
        const feedbacks = [
          'Great form!',
          'Keep your back straight',
          'Nice depth on that rep',
          'Maintain your posture',
          'Perfect alignment',
        ];
        setFeedback(feedbacks[Math.floor(Math.random() * feedbacks.length)]);
      }
    }, 2500);

    return () => clearInterval(repInterval);
  }, [isPaused, reps]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStop = () => {
    navigate('/loading');
    setTimeout(() => {
      navigate('/summary');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0f1420] to-[#0a0e1a] text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button
          onClick={handleStop}
          className="w-10 h-10 flex items-center justify-center bg-gray-800/50 hover:bg-gray-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-xs text-emerald-400">AI tracking</span>
        </div>
      </div>

      {/* Camera Preview Area */}
      <div className="px-4 mb-6">
        <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden border border-gray-800">
          {/* Simulated camera view with skeleton overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-4">
                <svg
                  className="w-48 h-48 mx-auto opacity-40"
                  viewBox="0 0 200 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Head */}
                  <circle cx="100" cy="50" r="20" stroke="#06b6d4" strokeWidth="3" />
                  {/* Body line */}
                  <line x1="100" y1="70" x2="100" y2="180" stroke="#06b6d4" strokeWidth="3" />
                  {/* Arms */}
                  <line x1="100" y1="100" x2="60" y2="140" stroke="#06b6d4" strokeWidth="3" />
                  <line x1="100" y1="100" x2="140" y2="140" stroke="#06b6d4" strokeWidth="3" />
                  {/* Legs */}
                  <line x1="100" y1="180" x2="70" y2="260" stroke="#06b6d4" strokeWidth="3" />
                  <line x1="100" y1="180" x2="130" y2="260" stroke="#06b6d4" strokeWidth="3" />
                  {/* Joints */}
                  <circle cx="100" cy="70" r="4" fill="#06b6d4" />
                  <circle cx="100" cy="100" r="4" fill="#06b6d4" />
                  <circle cx="60" cy="140" r="4" fill="#06b6d4" />
                  <circle cx="140" cy="140" r="4" fill="#06b6d4" />
                  <circle cx="100" cy="180" r="4" fill="#06b6d4" />
                  <circle cx="70" cy="260" r="4" fill="#06b6d4" />
                  <circle cx="130" cy="260" r="4" fill="#06b6d4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Live Feedback Overlay */}
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-blue-500/20 backdrop-blur-md border border-blue-500/30 rounded-2xl px-4 py-3">
              <p className="text-sm text-blue-300 mb-1">Live Feedback</p>
              <p className="text-base text-white">{feedback}</p>
            </div>
          </div>

          {/* Reps Counter */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Reps</p>
                  <p className="text-4xl">{reps}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400 mb-1">Time</p>
                  <p className="text-2xl">{formatTime(time)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 flex items-center justify-center gap-4">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/30"
        >
          {isPaused ? <Play className="w-7 h-7" /> : <Pause className="w-7 h-7" />}
        </button>

        <button
          onClick={handleStop}
          className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-2xl transition-colors"
        >
          <span className="text-base">Finish Workout</span>
        </button>
      </div>

      {/* Exercise Name */}
      <div className="px-4 mt-8 text-center">
        <p className="text-sm text-gray-400 mb-1">Current Exercise</p>
        <h2 className="text-2xl">Squats</h2>
      </div>
    </div>
  );
}
