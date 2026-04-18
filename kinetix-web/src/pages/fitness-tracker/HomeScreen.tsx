import { useNavigate } from 'react-router-dom';
import { Camera, TrendingUp, Zap, Award, Activity } from 'lucide-react';
import { WeeklyChart } from '../../components/fitness-tracker/WeeklyChart';
import { ExerciseCard } from '../../components/fitness-tracker/ExerciseCard';
import { MetricCard } from '../../components/fitness-tracker/MetricCard';
import { CircularProgress } from '../../components/fitness-tracker/CircularProgress';
import { BottomNav } from '../../components/fitness-tracker/BottomNav';

export default function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0f1420] to-[#0a0e1a] text-white">
      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-gray-400 mb-1">Good evening</p>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Alex Rivera</h1>
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-xs text-emerald-400">AI active</span>
            </div>
          </div>
        </div>

        {/* Hero Card - Today's Cardio Score */}
        <div className="mb-5 bg-gradient-to-br from-[#1a1f35] to-[#141826] rounded-3xl p-6 border border-gray-800/50 shadow-2xl">
          <p className="text-sm text-gray-400 mb-3">Today's Cardio Score</p>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-baseline gap-2">
              <h2 className="text-5xl">82</h2>
              <span className="text-xl text-gray-500">/100</span>
            </div>
            <CircularProgress value={82} size={64} />
          </div>

          <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-3 py-2.5 rounded-xl">
            <Zap className="w-4 h-4 text-blue-400" />
            <p className="text-sm text-blue-300">Posture improved 12% this week</p>
          </div>
        </div>

        {/* Start Workout CTA */}
        <button
          onClick={() => navigate('/workout')}
          className="w-full mb-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 rounded-2xl p-4 flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99]"
        >
          <Camera className="w-5 h-5" />
          <span className="text-base">Start Workout</span>
        </button>

        {/* Consistency Section */}
        <div className="mb-5 bg-gradient-to-br from-[#1a1f35] to-[#141826] rounded-2xl p-5 border border-gray-800/50 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Workout Streak</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl">3</h3>
                <span className="text-base text-gray-400">days</span>
              </div>
            </div>
            <div className="bg-orange-500/10 p-3 rounded-xl border border-orange-500/20">
              <Activity className="w-6 h-6 text-orange-400" />
            </div>
          </div>

          <div className="flex gap-1.5">
            {[85, 70, 90, 65, 80, 75, 82].map((value, index) => (
              <div key={index} className="flex-1 flex items-end h-14 bg-gray-800/30 rounded-lg p-1">
                <div
                  className="w-full rounded-sm bg-gradient-to-t from-cyan-500 to-blue-500"
                  style={{ height: `${value}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <MetricCard label="Reps Completed" value="284" icon="target" />
          <MetricCard label="Exercises" value="12" icon="activity" />
          <MetricCard label="Calories" value="1,847" unit="kcal" icon="zap" />
          <MetricCard label="BMI" value="22.4" subValue="165 lbs" icon="trending" />
        </div>

        {/* Exercise Cards */}
        <div className="mb-5">
          <h3 className="text-base mb-3 text-gray-400">Recent Exercises</h3>
          <div className="space-y-3">
            <ExerciseCard
              name="Squats"
              reps={45}
              accuracy={94}
              gradient="from-purple-500/20 to-pink-500/20"
              borderColor="border-purple-500/30"
            />
            <ExerciseCard
              name="Push-ups"
              reps={32}
              accuracy={88}
              gradient="from-blue-500/20 to-cyan-500/20"
              borderColor="border-blue-500/30"
            />
            <ExerciseCard
              name="Jumping Jacks"
              reps={60}
              accuracy={91}
              gradient="from-emerald-500/20 to-teal-500/20"
              borderColor="border-emerald-500/30"
            />
          </div>
        </div>

        {/* AI Coach Section */}
        <div className="mb-5 bg-gradient-to-br from-[#1a1f35] to-[#141826] rounded-2xl p-5 border border-gray-800/50 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-xl">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base">AI Coach</h3>
          </div>

          <div className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <p className="text-xs text-blue-400 mb-1.5">Posture Correction</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Keep your back straight during squats. Your form improved 15% today!
              </p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
              <p className="text-xs text-emerald-400 mb-1.5">Performance Tip</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Try increasing push-up depth by 2 inches for better activation.
              </p>
            </div>
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <div className="mb-5 bg-gradient-to-br from-[#1a1f35] to-[#141826] rounded-2xl p-5 border border-gray-800/50 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base">Weekly Progress</h3>
            <div className="flex items-center gap-1 text-emerald-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+18%</span>
            </div>
          </div>
          <WeeklyChart />
        </div>

        {/* Achievements */}
        <div className="bg-gradient-to-br from-[#1a1f35] to-[#141826] rounded-2xl p-5 border border-gray-800/50 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-xl">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base">Achievements</h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-4 flex flex-col items-center gap-2">
              <div className="bg-amber-500/20 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-xs text-center text-gray-300 leading-tight">3 Day Streak</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4 flex flex-col items-center gap-2">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-xs text-center text-gray-300 leading-tight">100 Workouts</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 flex flex-col items-center gap-2">
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <Award className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-xs text-center text-gray-300 leading-tight">Perfect Form</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
