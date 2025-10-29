import { ChevronDown, Toggle, Play } from "lucide-react";
import { useState } from "react";

export default function StudySessionCard() {
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Study Session</h3>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground">Activity</label>
          <button className="mt-2 w-full flex items-center justify-between rounded-lg bg-secondary p-3 text-foreground hover:bg-secondary/80 transition-colors">
            <span className="text-sm">e.g., Study Contribution</span>
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm text-muted-foreground">Add to schedule</label>
          <button
            onClick={() => setIsEnabled(!isEnabled)}
            className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
              isEnabled ? "bg-green-500" : "bg-secondary"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                isEnabled ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-green-500 p-3 text-white font-medium hover:bg-green-600 transition-colors mt-6">
          <Play size={18} fill="currentColor" />
          Start Study
        </button>
      </div>
    </div>
  );
}
