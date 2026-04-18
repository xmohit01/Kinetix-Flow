import { useNavigate } from 'react-router';
import { CheckCircle, TrendingUp, Zap, Target } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export default function WorkoutSummaryScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0f1420] to-[#0a0e1a] text-white">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border-2 border-emerald-500/40 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-3xl mb-2">Great Workout!</h1>
          <p className="text-base text-gray-400">You crushed it today</p>
        </div>

        {/* Score Card */}
        <div className="mb-6 bg-gradient-to-br from-[#1a1f35] to-[#141826] rounded-3xl p-6 border border-gray-800/50 shadow-2xl text-center">
          <p className="text-sm text-gray-400 mb-2">Session Score</p>
          <div className="flex items-baseline justify-center gap-2 mb-4">
            <h2 className="text-6xl">89</h2>
            <span className="text-2xl text-gray-500">/100</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-xl inline-flex">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <p className="text-sm text-emerald-300">+7 from last session</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-[#1a1f35] to-[#141826] rounded-2xl p-5 border border-gray-800/50">
            <div className="bg-purple-500/10 w-10 h-10 rounded-xl flex items-center justify-center mb-3">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-xs text-gray-400 mb-1">Posture Accuracy</p>
            <p className="text-3xl">94%</p>
          </div>

          <div className="bg-gradient-to-br from-[#1a1f35] to-[#141826] rounded-2xl p-5 border border-gray-800/50">
            <div className="bg-blue-500/10 w-10 h-10 rounded-xl flex items-center justify-center mb-3">
              <CheckCircle className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-xs text-gray-400 mb-1">Reps Completed</p>
            <p className="text-3xl">45</p>
          </div>

          <div className="bg-gradient-to-br from-[#1a1f35] to-[#141826] rounded-2xl p-5 border border-gray-800/50">
            <div className="bg-orange-500/10 w-10 h-10 rounded-xl flex items-center justify-center mb-3">
              <Zap className="w-5 h-5 text-orange-400" />
            </div>
            <p className="text-xs text-gray-400 mb-1">Calories Burned</p>
            <p className="text-3xl">142</p>
          </div>

          <div className="bg-gradient-to-br from-[#1a1f35] to-[#141826] rounded-2xl p-5 border border-gray-800/50">
            <div className="bg-cyan-500/10 w-10 h-10 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-xs text-gray-400 mb-1">Duration</p>
            <p className="text-3xl">12m</p>
          </div>
        </div>

        {/* AI Feedback */}
        <div className="mb-6 bg-gradient-to-br from-[#1a1f35] to-[#141826] rounded-2xl p-5 border border-gray-800/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-xl">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base">AI Feedback</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2"></div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Your squat depth improved significantly compared to last session
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Try to maintain knee alignment over your toes for even better form
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2"></div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Your consistency is paying off—keep up this momentum!
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/workout')}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-2xl py-4 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99]"
          >
            <span className="text-base">Start Another Workout</span>
          </button>

          <button
            onClick={() => navigate('/home')}
            className="w-full bg-transparent border border-gray-800 hover:border-gray-700 hover:bg-[#1a1f35] rounded-2xl py-4 transition-all duration-200"
          >
            <span className="text-base text-gray-300">Back to Home</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
