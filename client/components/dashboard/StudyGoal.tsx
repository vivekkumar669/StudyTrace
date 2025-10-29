import { Eye } from "lucide-react";
import { useState } from "react";

export default function StudyGoal() {
  const [showInChart, setShowInChart] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Study Goal</h3>
        <span className="text-xs text-muted-foreground">Weekly</span>
      </div>

      <div className="mb-6">
        <p className="text-3xl font-bold text-green-500">5min</p>
        <p className="text-sm text-muted-foreground">of 200 min goal</p>
      </div>

      <div className="mb-6">
        <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full"
            style={{ width: "2.5%" }}
          ></div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          195 5min remaining to reach your goal
        </p>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm text-muted-foreground">
          Show in weekly chart
        </label>
        <button
          onClick={() => setShowInChart(!showInChart)}
          className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${
            showInChart ? "bg-green-500" : "bg-secondary"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              showInChart ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
