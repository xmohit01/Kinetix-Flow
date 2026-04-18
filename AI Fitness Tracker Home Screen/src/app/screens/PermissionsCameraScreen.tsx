import { useNavigate } from 'react-router';
import { Camera } from 'lucide-react';

export default function PermissionsCameraScreen() {
  const navigate = useNavigate();

  const handleAllow = () => {
    navigate('/permissions/motion');
  };

  const handleNotNow = () => {
    navigate('/permissions/motion');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1420] to-[#0a0e1a] text-white flex items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-3xl mb-6">
            <Camera className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-2xl mb-3">Camera Access</h2>
          <p className="text-base text-gray-400 leading-relaxed">
            PostureAI uses your camera to track your posture and form during workouts in real-time, helping you exercise safely and effectively.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleAllow}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-2xl py-4 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99]"
          >
            <span className="text-base">Allow Camera Access</span>
          </button>

          <button
            onClick={handleNotNow}
            className="w-full bg-transparent border border-gray-800 hover:border-gray-700 hover:bg-[#1a1f35] rounded-2xl py-4 transition-all duration-200"
          >
            <span className="text-base text-gray-400">Not Now</span>
          </button>
        </div>

        <p className="text-xs text-center text-gray-500 mt-6 leading-relaxed">
          Your privacy matters. Camera access is only used during workouts and never recorded or stored.
        </p>
      </div>
    </div>
  );
}
