interface ExerciseCardProps {
  name: string;
  reps: number;
  accuracy: number;
  gradient: string;
  borderColor: string;
}

export function ExerciseCard({ name, reps, accuracy, gradient, borderColor }: ExerciseCardProps) {
  return (
    <div className={`bg-card border border-border rounded-2xl p-4 shadow-sm`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-base font-bold mb-0.5">{name}</h4>
          <p className="text-sm text-muted-foreground">{reps} reps completed</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{accuracy}%</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">accuracy</p>
        </div>
      </div>

      <div className="relative w-full h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-orange-400 rounded-full transition-all duration-500"
          style={{ width: `${accuracy}%` }}
        ></div>
      </div>
    </div>
  );
}
