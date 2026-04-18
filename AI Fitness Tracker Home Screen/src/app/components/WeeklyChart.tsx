export function WeeklyChart() {
  const data = [
    { day: 'Mon', score: 78 },
    { day: 'Tue', score: 72 },
    { day: 'Wed', score: 85 },
    { day: 'Thu', score: 79 },
    { day: 'Fri', score: 88 },
    { day: 'Sat', score: 82 },
    { day: 'Sun', score: 82 },
  ];

  const maxScore = Math.max(...data.map(d => d.score));

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between h-32 gap-2">
        {data.map((item, index) => {
          const height = (item.score / maxScore) * 100;
          const isToday = index === data.length - 1;

          return (
            <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end h-full">
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    isToday
                      ? 'bg-gradient-to-t from-cyan-500 to-blue-500 shadow-lg shadow-blue-500/30'
                      : 'bg-gradient-to-t from-gray-700 to-gray-600'
                  }`}
                  style={{ height: `${height}%` }}
                >
                  {isToday && (
                    <div className="w-full h-full flex items-start justify-center pt-2">
                      <span className="text-xs">{item.score}</span>
                    </div>
                  )}
                </div>
              </div>
              <span className={`text-xs ${isToday ? 'text-white' : 'text-gray-500'}`}>
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
