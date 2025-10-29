interface MonthCalendarProps {
  month: Date;
  onSelectMonth?: () => void;
}

export default function MonthCalendar({
  month,
  onSelectMonth,
}: MonthCalendarProps) {
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(month);
  const firstDay = getFirstDayOfMonth(month);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  // Activity data - some days have activity levels
  const activityDays: { [key: number]: "low" | "medium" | "high" } = {
    5: "low",
    12: "medium",
    19: "high",
    26: "high",
    28: "low",
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-4 text-center text-sm font-semibold text-foreground">
        {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </h3>

      <div className="mb-3 grid grid-cols-7 gap-1 text-center">
        {weekDays.map((day) => (
          <div key={day} className="text-xs font-medium text-muted-foreground py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={onSelectMonth}
            className={`aspect-square text-xs font-medium rounded transition-colors ${
              day === null
                ? "invisible"
                : day === 19
                ? "bg-green-500 text-white"
                : activityDays[day]
                ? `bg-green-500/${activityDays[day] === "low" ? "30" : activityDays[day] === "medium" ? "60" : "80"} text-foreground border border-green-500/50`
                : "text-foreground hover:bg-secondary"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Activity legend */}
      <div className="mt-4 flex justify-center gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-green-500/30"></div>
          <span>Less activity</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-green-500/60"></div>
          <span>More activity</span>
        </div>
      </div>
    </div>
  );
}
