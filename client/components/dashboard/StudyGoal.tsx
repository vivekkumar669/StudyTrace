import { Edit2, Check, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function StudyGoal() {
  const [goalMinutes, setGoalMinutes] = useState(() => {
    const saved = localStorage.getItem("studyGoal");
    return saved ? parseInt(saved) : 200;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(String(goalMinutes));
  const [showInChart, setShowInChart] = useState(false);
  const [currentMinutes, setCurrentMinutes] = useState(() => {
    const saved = localStorage.getItem("studyMinutes");
    return saved ? parseInt(saved) : 5;
  });

  // Save goal to localStorage
  useEffect(() => {
    localStorage.setItem("studyGoal", String(goalMinutes));
  }, [goalMinutes]);

  // Save current minutes to localStorage
  useEffect(() => {
    localStorage.setItem("studyMinutes", String(currentMinutes));
  }, [currentMinutes]);

  const progress = (currentMinutes / goalMinutes) * 100;
  const remaining = Math.max(0, goalMinutes - currentMinutes);

  const handleSaveGoal = () => {
    const value = parseInt(editValue);
    if (!isNaN(value) && value > 0) {
      setGoalMinutes(value);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(String(goalMinutes));
    setIsEditing(false);
  };

  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="rounded-lg border border-border bg-card p-3 sm:p-4 md:p-6">
      <div className="mb-3 sm:mb-4 flex items-center justify-between gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-foreground">Study Goal</h3>
        <span className="text-xs text-muted-foreground">Weekly</span>
      </div>

      {isEditing ? (
        <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
          <label className="text-xs sm:text-sm text-muted-foreground">Goal (minutes)</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 rounded-lg bg-secondary px-3 py-2 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
              min="1"
            />
            <button
              onClick={handleSaveGoal}
              className="p-1.5 sm:p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors flex-shrink-0"
            >
              <Check size={14} className="sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 sm:p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors flex-shrink-0"
            >
              <X size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 sm:mb-6 flex items-end justify-between gap-2">
            <div className="flex-1">
              <p className="text-2xl sm:text-3xl font-bold text-green-500">
                {formatMinutes(currentMinutes)}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                of {formatMinutes(goalMinutes)} goal
              </p>
            </div>
            <button
              onClick={() => {
                setEditValue(String(goalMinutes));
                setIsEditing(true);
              }}
              className="p-1.5 sm:p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors flex-shrink-0"
            >
              <Edit2 size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>

          <div className="mb-4 sm:mb-6">
            <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <p className="mt-1 sm:mt-2 text-xs text-muted-foreground">
              {remaining} {remaining === 1 ? "minute" : "minutes"} remaining
            </p>
          </div>
        </>
      )}

      <div className="flex items-center justify-between gap-2">
        <label className="text-xs sm:text-sm text-muted-foreground truncate">
          Show in weekly chart
        </label>
        <button
          onClick={() => setShowInChart(!showInChart)}
          className={`relative inline-flex h-5 sm:h-6 w-9 sm:w-11 rounded-full transition-colors flex-shrink-0 ${
            showInChart ? "bg-green-500" : "bg-secondary"
          }`}
        >
          <span
            className={`inline-block h-4 sm:h-5 w-4 sm:w-5 transform rounded-full bg-white transition-transform ${
              showInChart ? "translate-x-4 sm:translate-x-5" : "translate-x-0.5 sm:translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
