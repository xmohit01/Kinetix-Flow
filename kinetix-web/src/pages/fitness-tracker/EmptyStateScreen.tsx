import { useNavigate } from 'react-router';
import { Activity, ArrowRight } from 'lucide-react';

export default function EmptyStateScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0f1420] to-[#0a0e1a] text-white flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-3xl mb-6">
            <Activity className="w-10 h-10 text-cyan-400/60" />
          </div>
          <h2 className="text-2xl mb-3">No Workouts Yet</h2>
          <p className="text-base text-gray-400 leading-relaxed">
            Start your first AI-powered workout session and let us help you perfect your form.
          </p>
        </div>

        <button
          onClick={() => navigate('/workout')}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-2xl py-4 flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99]"
        >
          <span className="text-base">Start Your First Session</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={() => navigate('/home')}
          className="mt-4 text-sm text-gray-400 hover:text-gray-300 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
