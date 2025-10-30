import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Calendar from "../components/dashboard/Calendar";
import StudySessionCard from "../components/dashboard/StudySessionCard";
import StudyGoal from "../components/dashboard/StudyGoal";
import TodaysActivities from "../components/dashboard/TodaysActivities";
import UpcomingEvents from "../components/dashboard/UpcomingEvents";

export default function Dashboard() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9)); // October 2025

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Left column - Calendar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Calendar */}
          <div className="rounded-lg border border-border bg-card p-3 sm:p-4 md:p-6">
            <div className="mb-3 sm:mb-4 flex items-center justify-between gap-2">
              <div className="text-xs sm:text-sm font-medium text-foreground truncate">
                {currentMonth.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() - 1,
                      ),
                    )
                  }
                  className="p-1.5 sm:p-2 hover:bg-secondary rounded transition-colors"
                  title="Previous month"
                >
                  <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() + 1,
                      ),
                    )
                  }
                  className="p-1.5 sm:p-2 hover:bg-secondary rounded transition-colors"
                  title="Next month"
                >
                  <ChevronRight size={16} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
            <Calendar currentMonth={currentMonth} />
          </div>

          {/* Study Goal */}
          <StudyGoal />
        </div>

        {/* Right column - Study Session, Activities, Events */}
        <div className="space-y-4 sm:space-y-6 lg:col-span-2">
          {/* Study Session Card */}
          <StudySessionCard />

          {/* Split Today's Activities */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            <TodaysActivities type="skills" />
            <TodaysActivities type="college" />
          </div>

          {/* Upcoming Events */}
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
}
