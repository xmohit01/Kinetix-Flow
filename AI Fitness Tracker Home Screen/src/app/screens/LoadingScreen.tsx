import { Activity } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0f1420] to-[#0a0e1a] text-white flex items-center justify-center px-6">
      <div className="text-center">
        <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
          {/* Outer spinning ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-500 border-r-cyan-500 animate-spin"></div>
          {/* Inner icon */}
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 w-16 h-16 rounded-full flex items-center justify-center">
            <Activity className="w-8 h-8 text-cyan-400" />
          </div>
        </div>

        <h2 className="text-xl mb-2">Analyzing posture...</h2>
        <p className="text-sm text-gray-400">AI is processing your workout data</p>

        {/* Skeleton loader dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
