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
    <div className="rounded-lg border border-border bg-card p-3 sm:p-4 md:p-6">
      <h3 className="mb-3 sm:mb-4 md:mb-6 text-base sm:text-lg font-semibold text-foreground">Study Session</h3>

      {/* Timer display */}
      <div className="mb-4 sm:mb-6 text-center">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-3 sm:mb-4">
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
              <div className="text-lg sm:text-2xl md:text-3xl font-bold text-green-500">
                {formatTime(timeLeft)}
              </div>
              <div className="text-xs text-muted-foreground">remaining</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-center mb-4 sm:mb-6 flex-wrap">
        <button
          onClick={handleStartPause}
          className="flex items-center gap-1 sm:gap-2 rounded-lg bg-green-500 px-3 sm:px-4 py-2 text-white text-xs sm:text-sm font-medium hover:bg-green-600 transition-colors whitespace-nowrap"
        >
          {isRunning ? (
            <>
              <Pause size={14} fill="currentColor" className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Pause</span>
              <span className="sm:hidden">Pause</span>
            </>
          ) : (
            <>
              <Play size={14} fill="currentColor" className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Start</span>
              <span className="sm:hidden">Start</span>
            </>
          )}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 sm:gap-2 rounded-lg bg-secondary px-3 sm:px-4 py-2 text-foreground text-xs sm:text-sm font-medium hover:bg-secondary/80 transition-colors whitespace-nowrap"
        >
          <RotateCcw size={14} className="sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Reset</span>
          <span className="sm:hidden">Reset</span>
        </button>
      </div>

      {/* Activity selector */}
      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="text-xs sm:text-sm text-muted-foreground block mb-1 sm:mb-2">
            Activity
          </label>
          <button className="w-full flex items-center justify-between rounded-lg bg-secondary p-2 sm:p-3 text-foreground hover:bg-secondary/80 transition-colors">
            <span className="text-xs sm:text-sm truncate">{activity}</span>
            <ChevronDown size={14} className="sm:w-4 sm:h-4 flex-shrink-0 ml-2" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs sm:text-sm text-muted-foreground">Add to schedule</label>
          <button
            onClick={() => setIsEnabled(!isEnabled)}
            className={`relative inline-flex h-5 sm:h-6 w-9 sm:w-11 rounded-full transition-colors flex-shrink-0 ${
              isEnabled ? "bg-green-500" : "bg-secondary"
            }`}
          >
            <span
              className={`inline-block h-4 sm:h-5 w-4 sm:w-5 transform rounded-full bg-white transition-transform ${
                isEnabled ? "translate-x-4 sm:translate-x-5" : "translate-x-0.5 sm:translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
