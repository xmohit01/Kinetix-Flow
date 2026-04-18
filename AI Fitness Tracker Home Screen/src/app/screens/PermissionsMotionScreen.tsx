import { useNavigate } from 'react-router';
import { Activity } from 'lucide-react';

export default function PermissionsMotionScreen() {
  const navigate = useNavigate();

  const handleAllow = () => {
    navigate('/permissions/notifications');
  };

  const handleNotNow = () => {
    navigate('/permissions/notifications');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1420] to-[#0a0e1a] text-white flex items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 rounded-3xl mb-6">
            <Activity className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl mb-3">Motion & Activity</h2>
          <p className="text-base text-gray-400 leading-relaxed">
            Let PostureAI track your movement patterns to provide more accurate rep counting and calorie calculations.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleAllow}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-2xl py-4 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99]"
          >
            <span className="text-base">Allow Motion Tracking</span>
          </button>

          <button
            onClick={handleNotNow}
            className="w-full bg-transparent border border-gray-800 hover:border-gray-700 hover:bg-[#1a1f35] rounded-2xl py-4 transition-all duration-200"
          >
            <span className="text-base text-gray-400">Not Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
