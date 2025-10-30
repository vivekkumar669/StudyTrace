import { ChevronLeft, ChevronRight, Plus, Trash2, Edit2, Check, X } from "lucide-react";
import { useState, useEffect } from "react";

interface WeekActivity {
  id: number;
  day: number; // 0-6
  title: string;
  hour: number;
}

interface WeekViewProps {
  week: Date;
}

export default function WeekView({ week }: WeekViewProps) {
  const [currentWeek, setCurrentWeek] = useState(week);
  const [activities, setActivities] = useState<WeekActivity[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<{
    day: number;
    hour: number;
  } | null>(null);
  const [newActivityTitle, setNewActivityTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const storageKey = `weekSchedule-${currentWeek.toISOString().split("T")[0]}`;

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setActivities(JSON.parse(saved));
      } catch {
        setActivities([]);
      }
    }
  }, [storageKey]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(activities));
  }, [activities, storageKey]);

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

  const hours = Array.from({ length: 8 }, (_, i) => 8 + i);

  const getActivitiesForSlot = (dayIndex: number, hour: number) =>
    activities.filter((a) => a.day === dayIndex && a.hour === hour);

  const handleAddActivity = () => {
    if (selectedSlot && newActivityTitle.trim()) {
      setActivities([
        ...activities,
        {
          id: Date.now(),
          day: selectedSlot.day,
          hour: selectedSlot.hour,
          title: newActivityTitle,
        },
      ]);
      setNewActivityTitle("");
    }
  };

  const handleDeleteActivity = (id: number) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  const handleStartEdit = (id: number, title: string) => {
    setEditingId(id);
    setEditingTitle(title);
  };

  const handleSaveEdit = () => {
    if (editingId && editingTitle.trim()) {
      setActivities(
        activities.map((a) =>
          a.id === editingId ? { ...a, title: editingTitle } : a
        )
      );
      setEditingId(null);
      setEditingTitle("");
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      {/* Week header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() =>
            setCurrentWeek(
              new Date(currentWeek.getTime() - 7 * 24 * 60 * 60 * 1000)
            )
          }
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
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
        <button
          onClick={() =>
            setCurrentWeek(
              new Date(currentWeek.getTime() + 7 * 24 * 60 * 60 * 1000)
            )
          }
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Week grid */}
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
              const isToday = date.toDateString() === new Date().toDateString();
              return (
                <div
                  key={index}
                  className={`flex-1 min-w-fit text-center p-2 rounded-lg ${
                    isToday ? "bg-green-500/20" : "bg-secondary/50"
                  }`}
                >
                  <p className="text-xs font-medium text-muted-foreground">
                    {dayName}
                  </p>
                  <p
                    className={`text-lg font-bold ${
                      isToday ? "text-green-500" : "text-foreground"
                    }`}
                  >
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
                    const slotActivities = getActivitiesForSlot(dayIndex, hour);
                    const isSelected =
                      selectedSlot?.day === dayIndex &&
                      selectedSlot?.hour === hour;

                    return (
                      <button
                        key={`${dayIndex}-${hour}`}
                        onClick={() =>
                          setSelectedSlot(
                            isSelected
                              ? null
                              : { day: dayIndex, hour }
                          )
                        }
                        className={`flex-1 min-w-fit min-h-16 rounded-lg border transition-colors ${
                          isSelected
                            ? "border-green-500 bg-green-500/20"
                            : "border-border bg-secondary/30 hover:bg-secondary/50"
                        }`}
                      >
                        <div className="h-full flex flex-col gap-1 p-1">
                          {slotActivities.map((activity) =>
                            editingId === activity.id ? (
                              <div
                                key={activity.id}
                                className="text-xs flex gap-1"
                              >
                                <input
                                  type="text"
                                  value={editingTitle}
                                  onChange={(e) =>
                                    setEditingTitle(e.target.value)
                                  }
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex-1 rounded bg-secondary px-1 py-0.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSaveEdit();
                                  }}
                                  className="p-0.5 hover:bg-secondary rounded"
                                >
                                  <Check size={10} />
                                </button>
                              </div>
                            ) : (
                              <div
                                key={activity.id}
                                className="text-xs bg-green-500/30 rounded px-1 py-0.5 text-green-100 flex items-center justify-between group"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span className="flex-1 text-left truncate">
                                  {activity.title}
                                </span>
                                <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleStartEdit(
                                        activity.id,
                                        activity.title
                                      );
                                    }}
                                    className="p-0.5 hover:bg-green-500/50 rounded"
                                  >
                                    <Edit2 size={10} />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteActivity(activity.id);
                                    }}
                                    className="p-0.5 hover:bg-green-500/50 rounded"
                                  >
                                    <Trash2 size={10} />
                                  </button>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add activity panel */}
      {selectedSlot && (
        <div className="mt-6 border-t border-border pt-4">
          <p className="text-sm text-muted-foreground mb-3">
            Add activity for{" "}
            {weekDays[selectedSlot.day].toLocaleDateString()} at{" "}
            {String(selectedSlot.hour).padStart(2, "0")}:00
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={newActivityTitle}
              onChange={(e) => setNewActivityTitle(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddActivity()}
              placeholder="Activity title..."
              className="flex-1 rounded-lg bg-secondary px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleAddActivity}
              className="px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              Add
            </button>
            <button
              onClick={() => setSelectedSlot(null)}
              className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
