import { Plus, Trash2, Edit2, Check, X, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "" });
  const [editEvent, setEditEvent] = useState({ title: "", date: "", time: "" });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("upcomingEvents");
    if (saved) {
      try {
        setEvents(JSON.parse(saved));
      } catch {
        setEvents([]);
      }
    }
  }, []);

  // Save to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem("upcomingEvents", JSON.stringify(events));
  }, [events]);

  const handleAddEvent = () => {
    if (newEvent.title.trim() && newEvent.date && newEvent.time) {
      setEvents([
        ...events,
        {
          id: Date.now(),
          ...newEvent,
        },
      ]);
      setNewEvent({ title: "", date: "", time: "" });
      setIsAdding(false);
    }
  };

  const handleStartEdit = (event: Event) => {
    setEditingId(event.id);
    setEditEvent({ title: event.title, date: event.date, time: event.time });
  };

  const handleSaveEdit = () => {
    if (editEvent.title.trim() && editEvent.date && editEvent.time && editingId) {
      setEvents(
        events.map((e) =>
          e.id === editingId ? { ...e, ...editEvent } : e
        )
      );
      setEditingId(null);
      setEditEvent({ title: "", date: "", time: "" });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditEvent({ title: "", date: "", time: "" });
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">
          Upcoming Events
        </h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="p-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Add new event form */}
      {isAdding && (
        <div className="mb-4 p-4 rounded-lg bg-secondary/50 space-y-3">
          <input
            type="text"
            placeholder="Event title"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            className="w-full rounded-lg bg-secondary px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
              className="rounded-lg bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) =>
                setNewEvent({ ...newEvent, time: e.target.value })
              }
              className="rounded-lg bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddEvent}
              className="flex-1 rounded-lg bg-green-500 text-white px-3 py-2 text-sm font-medium hover:bg-green-600 transition-colors"
            >
              Add Event
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewEvent({ title: "", date: "", time: "" });
              }}
              className="flex-1 rounded-lg bg-secondary text-foreground px-3 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Events list */}
      {sortedEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Calendar size={32} className="text-muted-foreground/50 mb-3" />
          <p className="text-sm text-muted-foreground">No events registered</p>
          <p className="text-xs text-muted-foreground mt-1">
            Click the + button to add your upcoming events
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {sortedEvents.map((event) => (
            <div key={event.id}>
              {editingId === event.id ? (
                <div className="p-3 rounded-lg bg-secondary/50 space-y-2">
                  <input
                    type="text"
                    value={editEvent.title}
                    onChange={(e) =>
                      setEditEvent({ ...editEvent, title: e.target.value })
                    }
                    className="w-full rounded-lg bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={editEvent.date}
                      onChange={(e) =>
                        setEditEvent({ ...editEvent, date: e.target.value })
                      }
                      className="rounded-lg bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="time"
                      value={editEvent.time}
                      onChange={(e) =>
                        setEditEvent({ ...editEvent, time: e.target.value })
                      }
                      className="rounded-lg bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 rounded-lg bg-green-500 text-white px-3 py-2 text-sm font-medium hover:bg-green-600 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 rounded-lg bg-secondary text-foreground px-3 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group">
                  <div className="flex-1">
                    <p className="text-sm text-foreground font-medium">
                      {event.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()} at{" "}
                      {event.time}
                    </p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleStartEdit(event)}
                      className="p-1.5 rounded hover:bg-secondary"
                    >
                      <Edit2 size={14} className="text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="p-1.5 rounded hover:bg-secondary"
                    >
                      <Trash2 size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
