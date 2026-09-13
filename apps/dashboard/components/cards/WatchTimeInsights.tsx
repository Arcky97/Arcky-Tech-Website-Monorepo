export default function WatchTimeInsightCard ({watchTotals}: {watchTotals: { last365Days: number, last90Days: number, last28Days: number, last7Days: number }}) {
  const watchTargetHours = 4000;

  const watchRemaingHours = Math.max(watchTargetHours - watchTotals.last365Days, 0);
  const daysToTargetRemaining = Math.ceil((new Date("2027-01-31").getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const dailyWatchAverage = watchTotals.last365Days / 365;
  const targetDailyWatchAverage = watchRemaingHours / daysToTargetRemaining;

  const weeklyWatchAverage = watchTotals.last365Days / 52;
  const targetWeeklyWatchAverage = watchRemaingHours / (daysToTargetRemaining / 7);

  const estimatedDaysToTarget = dailyWatchAverage > 0
    ? Math.ceil(watchRemaingHours / dailyWatchAverage)
    : null;

  return (
    <div className="bg-gray-800 rounded-lg flex flex-col w-[40%] p-4">
      <p className="mb-3 text-2xl font-bold">Watch-Time Insights</p>
      <div className="mb-1 flex items-center justify-between gap-3">
        <p className="text-gray-300">Daily Average</p>
        <p className="text-gray-300">Target Average</p>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-700">
        <div
          className="absolute inset-y-0 rounded-full bg-blue-600"
          style={{
            width: `${Math.min((dailyWatchAverage / targetDailyWatchAverage) * 100, 100)}%`
          }}
        />
      </div>
      <div className="mt-1 flex items-center justify-between gap-3">
        <p className="text-white">
          {dailyWatchAverage.toLocaleString(undefined, { maximumFractionDigits: 1 })}h
        </p>
        <p className="text-white">
          {targetDailyWatchAverage.toLocaleString(undefined, { maximumFractionDigits: 1 })}h
        </p>
      </div>
      <div className="mb-1 flex items-center justify-between gap-3">
        <p className="text-gray-300">
          Weekly Average
        </p>
        <p className="text-gray-300">
          Target Average
        </p>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-700">
        <div
          className="absolute inset-y-0 rounded-full bg-blue-600"
          style={{
            width: `${Math.min((weeklyWatchAverage / targetWeeklyWatchAverage) * 100, 100)}%`
          }}
        />
      </div>
      <div className="mt-1 flex items-center justify-between gap-3">
          <p className="text-white">
            {weeklyWatchAverage.toLocaleString(undefined, { maximumFractionDigits: 1 })}h
          </p>
          <p className="text-white">
            {targetWeeklyWatchAverage.toLocaleString(undefined, { maximumFractionDigits: 1 })}h
          </p>
      </div>
      <div className="grid grid-cols-3 gap-x-6 gap-y-3 text-sm">
        <div>
          <p className="text-gray-400">Remaining Hours</p>
          <p className="font-semibold text-white">
            {watchRemaingHours.toLocaleString(undefined, { maximumFractionDigits: 1 })}h
          </p>
        </div>
        <div>
          <p className="text-gray-400">At Recent Pace</p>
          <p className="font-semibold text-white">
            {estimatedDaysToTarget === null ? "No recent data" : `${estimatedDaysToTarget} days`}
          </p>
        </div>
        <div>
          <p className="text-gray-400">
            Remaining Days
          </p>
          <p className="font-semibold text-white">
            {daysToTargetRemaining} days
          </p>
        </div>
      </div>
    </div>
  )
}