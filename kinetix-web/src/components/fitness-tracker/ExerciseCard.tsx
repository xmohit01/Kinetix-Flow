interface ExerciseCardProps {
  name: string;
  reps: number;
  accuracy: number;
  gradient: string;
  borderColor: string;
}

export function ExerciseCard({ name, reps, accuracy, gradient, borderColor }: ExerciseCardProps) {
  return (
    <div className={`bg-gradient-to-br ${gradient} border ${borderColor} rounded-xl p-4`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-base mb-0.5">{name}</h4>
          <p className="text-sm text-gray-400">{reps} reps completed</p>
        </div>
        <div className="text-right">
          <p className="text-2xl">{accuracy}%</p>
          <p className="text-xs text-gray-400">accuracy</p>
        </div>
      </div>

      <div className="relative w-full h-2 bg-gray-800/50 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${accuracy}%` }}
        ></div>
      </div>
    </div>
  );
}
