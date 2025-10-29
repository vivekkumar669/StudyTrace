import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface WeekViewProps {
  week: Date;
}

interface Activity {
  id: string;
  title: string;
  time: string;
  duration: number;
  color: string;
  startHour: number;
}

export default function WeekView({ week }: WeekViewProps) {
  const [currentWeek, setCurrentWeek] = useState(week);

  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  const weekStart = getWeekStart(currentWeek);
  const weekDays = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    weekDays.push(date);
  }

  // Sample activities
  const activities: Activity[] = [
    {
      id: "1",
      title: "Meeting",
      time: "09:00 - 10:00",
      duration: 1,
      color: "purple",
      startHour: 9,
    },
    {
      id: "2",
      title: "Exam prep",
      time: "11:00 - 13:00",
      duration: 2,
      color: "orange",
      startHour: 11,
    },
  ];

  const hours = Array.from({ length: 8 }, (_, i) => 8 + i);

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      {/* Week header */}
      <div className="mb-6 flex items-center justify-between">
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <ChevronLeft size={20} />
        </button>
        <div className="text-sm font-semibold text-foreground">
          {weekStart.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}{" "}
          -{" "}
          {new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
            }
          )}
        </div>
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Week view */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Days header */}
          <div className="mb-4 flex gap-4">
            <div className="w-20 flex-shrink-0"></div>
            {weekDays.map((date, index) => {
              const dayName = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"][
                index
              ];
              const dayDate = date.getDate();
              const isToday =
                date.toDateString() === new Date().toDateString();
              return (
                <div
                  key={index}
                  className={`flex-1 min-w-min text-center p-2 rounded-lg ${
                    isToday ? "bg-green-500/20" : "bg-secondary/50"
                  }`}
                >
                  <p className="text-xs font-medium text-muted-foreground">
                    {dayName}
                  </p>
                  <p className={`text-lg font-bold ${isToday ? "text-green-500" : "text-foreground"}`}>
                    {dayDate}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Time slots */}
          <div className="space-y-2">
            {hours.map((hour) => (
              <div key={hour} className="flex gap-4">
                <div className="w-20 flex-shrink-0 text-right text-xs text-muted-foreground pt-2">
                  {String(hour).padStart(2, "0")}:00
                </div>
                <div className="flex flex-1 gap-4">
                  {weekDays.map((_, dayIndex) => {
                    const activity = activities.find(
                      (a) => a.startHour === hour && dayIndex === 3 // Thursday
                    );
                    return (
                      <div
                        key={dayIndex}
                        className="flex-1 min-w-min border border-border rounded-lg h-16 relative bg-secondary/30 hover:bg-secondary/50 transition-colors"
                      >
                        {activity && (
                          <div
                            className={`absolute inset-0 p-2 rounded-lg flex flex-col justify-center text-xs font-medium ${
                              activity.color === "purple"
                                ? "bg-purple-500/30 border border-purple-500/50 text-purple-100"
                                : "bg-orange-500/30 border border-orange-500/50 text-orange-100"
                            }`}
                          >
                            <span className="font-semibold">{activity.title}</span>
                            <span className="text-xs opacity-75">
                              {activity.time}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - Weekly stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
        <div className="rounded-lg bg-secondary/30 p-4">
          <p className="text-sm text-muted-foreground mb-2">Completed Tasks</p>
          <p className="text-2xl font-bold text-green-500">0</p>
        </div>
        <div className="rounded-lg bg-secondary/30 p-4">
          <p className="text-sm text-muted-foreground mb-2">Planned Tasks</p>
          <p className="text-2xl font-bold text-blue-500">2</p>
        </div>
      </div>
    </div>
  );
}
