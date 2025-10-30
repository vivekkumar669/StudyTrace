import { useState, useEffect } from "react";
import { Trash2, Plus, Check } from "lucide-react";

interface Activity {
  id: number;
  name: string;
  completed: boolean;
}

interface TodaysActivitiesProps {
  type: "skills" | "college";
}

export default function TodaysActivities({ type }: TodaysActivitiesProps) {
  const storageKey = `activities-${type}`;
  const [activities, setActivities] = useState<Activity[]>([]);
  const [newActivity, setNewActivity] = useState("");

  // Load from localStorage on mount
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

  // Save to localStorage whenever activities change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(activities));
  }, [activities, storageKey]);

  const title =
    type === "skills"
      ? "Today's Skills & Project Activities"
      : "College Activities";

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      setActivities([
        ...activities,
        { id: Date.now(), name: newActivity, completed: false },
      ]);
      setNewActivity("");
    }
  };

  const handleToggleActivity = (id: number) => {
    setActivities(
      activities.map((a) =>
        a.id === id ? { ...a, completed: !a.completed } : a
      )
    );
  };

  const handleRemoveActivity = (id: number) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  const completedCount = activities.filter((a) => a.completed).length;
  const totalCount = activities.length;

  return (
    <div className="rounded-lg border border-border bg-card p-3 sm:p-4 md:p-6">
      <div className="mb-3 sm:mb-4 flex items-center justify-between gap-2">
        <h3 className="text-sm sm:text-base font-semibold text-foreground truncate">{title}</h3>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {completedCount}/{totalCount}
        </span>
      </div>

      <div className="space-y-2 mb-3 sm:mb-4">
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No activities yet
          </p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
            >
              <button
                onClick={() => handleToggleActivity(activity.id)}
                className={`flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  activity.completed
                    ? "bg-green-500 border-green-500"
                    : "border-muted-foreground hover:border-green-500"
                }`}
              >
                {activity.completed && <Check size={12} className="sm:w-3.5 sm:h-3.5 text-white" />}
              </button>
              <span
                className={`flex-1 text-xs sm:text-sm transition-colors truncate ${
                  activity.completed
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                }`}
              >
                {activity.name}
              </span>
              <button
                onClick={() => handleRemoveActivity(activity.id)}
                className="p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary rounded flex-shrink-0"
              >
                <Trash2 size={12} className="sm:w-3.5 sm:h-3.5 text-muted-foreground" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add new activity */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newActivity}
          onChange={(e) => setNewActivity(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddActivity()}
          placeholder="Add activity..."
          className="flex-1 rounded-lg bg-secondary px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleAddActivity}
          className="p-1.5 sm:p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors flex-shrink-0"
        >
          <Plus size={14} className="sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
}
