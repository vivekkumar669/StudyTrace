import { ChevronDown, Play, Pause, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";

export default function StudySessionCard() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3.5 * 60 * 60); // 3.5 hours in seconds
  const [activity, setActivity] = useState("e.g., Study Contribution");

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(3.5 * 60 * 60);
  };

  const progress = ((3.5 * 60 * 60 - timeLeft) / (3.5 * 60 * 60)) * 100;

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="mb-6 text-lg font-semibold text-foreground">Study Session</h3>

      {/* Timer display */}
      <div className="mb-6 text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-secondary"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${(progress * 282.6) / 100} 282.6`}
              className="text-green-500 transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">
                {formatTime(timeLeft)}
              </div>
              <div className="text-xs text-muted-foreground">remaining</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-center mb-6">
        <button
          onClick={handleStartPause}
          className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white font-medium hover:bg-green-600 transition-colors"
        >
          {isRunning ? (
            <>
              <Pause size={16} fill="currentColor" />
              Pause
            </>
          ) : (
            <>
              <Play size={16} fill="currentColor" />
              Start
            </>
          )}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-foreground font-medium hover:bg-secondary/80 transition-colors"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      {/* Activity selector */}
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground block mb-2">
            Activity
          </label>
          <button className="w-full flex items-center justify-between rounded-lg bg-secondary p-3 text-foreground hover:bg-secondary/80 transition-colors">
            <span className="text-sm">{activity}</span>
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
      </div>
    </div>
  );
}
