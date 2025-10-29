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
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <span className="text-xs text-muted-foreground">
          {completedCount}/{totalCount}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No activities yet
          </p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
            >
              <button
                onClick={() => handleToggleActivity(activity.id)}
                className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  activity.completed
                    ? "bg-green-500 border-green-500"
                    : "border-muted-foreground hover:border-green-500"
                }`}
              >
                {activity.completed && <Check size={14} className="text-white" />}
              </button>
              <span
                className={`flex-1 text-sm transition-colors ${
                  activity.completed
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                }`}
              >
                {activity.name}
              </span>
              <button
                onClick={() => handleRemoveActivity(activity.id)}
                className="p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary rounded"
              >
                <Trash2 size={14} className="text-muted-foreground" />
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
          placeholder="Add new activity..."
          className="flex-1 rounded-lg bg-secondary px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleAddActivity}
          className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
