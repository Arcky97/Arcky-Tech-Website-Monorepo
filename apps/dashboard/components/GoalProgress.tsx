export default function GoalProgress({
  title,
  current,
  target,
  formatValue = (value) => value.toLocaleString()
}: {
  title: string;
  current: number;
  target: number | null | undefined;
  formatValue?: (value: number) => string;
}) {
  if (target == null || target <= 0) {
    return (
      <div className="rounded-lg bg-gray-700/50 p-4">
        <p className="text-gray-300 font-medium">
          {title}
        </p>
        <p className="mt-2 text-sm text-gray-400">
          No {title.toLowerCase()} goal set
        </p>
      </div>
    );
  }

  const percentage = Math.min(
    (current / target) * 100,
    100
  );

  console.log(percentage);

  return (
    <div className="relative overflow-hidden rounded-lg">
      {percentage === 100 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-green-500/40 backdrop-blur-[1px] p-4">
          <p className="text-center text-lg font-bold text-white">
            {title} goal reached, congrats!
          </p>
        </div>
      )}
      <div className="rounded-lg bg-gray-700/50 p-4">

        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-gray-300 font-medium">
            {title}
          </p>
          <p className="text-sm text-gray-400">
            {percentage.toFixed(1)}%
          </p>
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-600">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="mt-2 flex items-center justify-between gap-2 text-sm">
          <p className="text-white">
            {formatValue(current)}
          </p>
          <p className="text-gray-400">
            {formatValue(target)}
          </p>
        </div>
      </div>    
    </div>
  )
}