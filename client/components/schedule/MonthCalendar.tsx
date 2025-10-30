import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";

interface CalendarEvent {
  id: number;
  date: number;
  title: string;
}

interface MonthCalendarProps {
  month: Date;
  onSelectMonth?: () => void;
}

export default function MonthCalendar({
  month,
  onSelectMonth,
}: MonthCalendarProps) {
  const storageKey = `scheduleEvents-${month.getFullYear()}-${month.getMonth()}`;
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setEvents(JSON.parse(saved));
      } catch {
        setEvents([]);
      }
    }
  }, [storageKey]);

  // Save to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(events));
  }, [events, storageKey]);

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

  const getDayEvents = (day: number) =>
    events.filter((e) => e.date === day);

  const handleAddEvent = (day: number) => {
    if (newEventTitle.trim()) {
      setEvents([
        ...events,
        { id: Date.now(), date: day, title: newEventTitle },
      ]);
      setNewEventTitle("");
      setSelectedDate(null);
    }
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter((e) => e.id !== eventId));
  };

  const handleStartEdit = (eventId: number, title: string) => {
    setEditingEventId(eventId);
    setEditingTitle(title);
  };

  const handleSaveEdit = () => {
    if (editingEventId && editingTitle.trim()) {
      setEvents(
        events.map((e) =>
          e.id === editingEventId ? { ...e, title: editingTitle } : e
        )
      );
      setEditingEventId(null);
      setEditingTitle("");
    }
  };

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
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="text-xs font-medium text-muted-foreground py-1"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {days.map((day, index) => {
          const dayEvents = day ? getDayEvents(day) : [];
          return (
            <div key={index}>
              <button
                onClick={() => day && setSelectedDate(day === selectedDate ? null : day)}
                className={`w-full aspect-square text-xs font-medium rounded transition-colors ${
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
              {dayEvents.length > 0 && (
                <div className="text-xs mt-1 text-green-400">
                  {dayEvents.length} event{dayEvents.length > 1 ? "s" : ""}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected date events and form */}
      {selectedDate && (
        <div className="border-t border-border pt-4 space-y-3">
          <h4 className="text-sm font-semibold text-foreground">
            Events on {month.getFullYear()}-{String(month.getMonth() + 1).padStart(2, "0")}-{String(selectedDate).padStart(2, "0")}
          </h4>

          {/* Add new event */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add event..."
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && handleAddEvent(selectedDate)
              }
              className="flex-1 rounded-lg bg-secondary px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={() => handleAddEvent(selectedDate)}
              className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Events list */}
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {getDayEvents(selectedDate).map((event) =>
              editingEventId === event.id ? (
                <div key={event.id} className="flex gap-2">
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="flex-1 rounded-lg bg-secondary px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={() => setEditingEventId(null)}
                    className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
                >
                  <p className="text-xs text-foreground flex-1">{event.title}</p>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleStartEdit(event.id, event.title)}
                      className="p-1 hover:bg-secondary/80 rounded"
                    >
                      <Edit2 size={12} className="text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="p-1 hover:bg-secondary/80 rounded"
                    >
                      <Trash2 size={12} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

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
