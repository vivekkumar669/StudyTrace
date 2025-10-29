import { useState } from "react";
import { ChevronDown, Trash2, Plus } from "lucide-react";

interface TodaysActivitiesProps {
  type: "skills" | "college";
}

export default function TodaysActivities({ type }: TodaysActivitiesProps) {
  const [activities, setActivities] = useState(
    type === "skills"
      ? [
          { id: 1, name: "Coding", time: "13:00" },
          { id: 2, name: "Review", time: "14:30" },
        ]
      : [
          { id: 3, name: "Math Class", time: "10:00" },
          { id: 4, name: "Chemistry Lab", time: "11:30" },
        ]
  );

  const [newActivity, setNewActivity] = useState("");

  const title = type === "skills" 
    ? "Today's Skills & Project Activities" 
    : "College Activities";

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      setActivities([
        ...activities,
        { id: Date.now(), name: newActivity, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) },
      ]);
      setNewActivity("");
    }
  };

  const handleRemoveActivity = (id: number) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">
          {title}
        </h3>
        <span className="text-xs text-muted-foreground">
          {activities.length}/{activities.length}
        </span>
      </div>

      <div className="space-y-2">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              <div>
                <p className="text-sm text-foreground">{activity.name}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
            <button
              onClick={() => handleRemoveActivity(activity.id)}
              className="p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary rounded"
            >
              <Trash2 size={14} className="text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>

      {/* Add new activity */}
      <div className="mt-4 space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddActivity()}
            placeholder="Add activity..."
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
    </div>
  );
}
