import { TrendingUp, Target, Zap, Calendar } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export default function StatsScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0f1420] to-[#0a0e1a] text-white">
      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Your Stats</h1>
          <p className="text-sm text-gray-400">Track your progress over time</p>
        </div>

        {/* Time Period Selector */}
        <div className="mb-6 flex gap-2">
          {['Week', 'Month', 'Year'].map((period, index) => (
            <button
              key={period}
              className={`flex-1 py-3 rounded-xl transition-all duration-200 ${
                index === 0
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'bg-[#1a1f35] border border-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <span className="text-sm">{period}</span>
            </button>
          ))}
        </div>

        {/* Overall Stats */}
        <div className="mb-6 bg-gradient-to-br from-[#1a1f35] to-[#141826] rounded-3xl p-6 border border-gray-800/50 shadow-2xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Average Score</p>
              <p className="text-2xl">86</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Total Workouts</p>
              <p className="text-xl">47</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Total Time</p>
              <p className="text-xl">8.5h</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Calories Burned</p>
              <p className="text-xl">12.4k</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Best Streak</p>
              <p className="text-xl">12 days</p>
            </div>
          </div>
        </div>

        {/* Monthly Breakdown */}
        <div className="mb-6 bg-gradient-to-br from-[#1a1f35] to-[#141826] rounded-2xl p-5 border border-gray-800/50">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-purple-500/10 p-2.5 rounded-xl">
              <Calendar className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-base">This Month</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Workouts completed</span>
              <span className="text-base">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Avg posture accuracy</span>
              <span className="text-base">91%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Total reps</span>
              <span className="text-base">1,248</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Active days</span>
              <span className="text-base">18/30</span>
            </div>
          </div>
        </div>

        {/* Exercise Breakdown */}
        <div className="bg-gradient-to-br from-[#1a1f35] to-[#141826] rounded-2xl p-5 border border-gray-800/50">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-orange-500/10 p-2.5 rounded-xl">
              <Target className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="text-base">Exercise Breakdown</h3>
          </div>

          <div className="space-y-4">
            {[
              { name: 'Squats', count: 428, accuracy: 94, color: 'from-purple-500 to-pink-500' },
              { name: 'Push-ups', count: 312, accuracy: 88, color: 'from-blue-500 to-cyan-500' },
              { name: 'Jumping Jacks', count: 508, accuracy: 91, color: 'from-emerald-500 to-teal-500' },
            ].map((exercise) => (
              <div key={exercise.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{exercise.name}</span>
                  <span className="text-xs text-gray-400">{exercise.count} reps</span>
                </div>
                <div className="relative w-full h-2 bg-gray-800/50 rounded-full overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r ${exercise.color} rounded-full`}
                    style={{ width: `${exercise.accuracy}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
