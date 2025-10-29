import { useState } from "react";
import { ChevronLeft, ChevronRight, Play, Plus, Edit } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import PlannedActivitiesChart from "../components/dashboard/PlannedActivitiesChart";
import WeeklyTrendChart from "../components/dashboard/WeeklyTrendChart";
import Calendar from "../components/dashboard/Calendar";
import StudySessionCard from "../components/dashboard/StudySessionCard";
import StudyStatistics from "../components/dashboard/StudyStatistics";
import StudyGoal from "../components/dashboard/StudyGoal";
import TodaysActivities from "../components/dashboard/TodaysActivities";
import UpcomingEvents from "../components/dashboard/UpcomingEvents";

interface DashboardProps {
  setActiveTab?: () => void;
}

export default function Dashboard({ setActiveTab }: DashboardProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9)); // October 2025

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon="📚"
          label="Hours Studied"
          value="0.1h"
          subtitle="1 session"
        />
        <StatCard
          icon="⏱️"
          label="Average per Session"
          value="0.1h"
          subtitle="average duration"
        />
        <StatCard
          icon="✓"
          label="Completion Rate"
          value="33%"
          subtitle="of goals"
        />
        <StatCard
          icon="📝"
          label="Planned Hours"
          value="2.8h"
          subtitle="in schedule"
        />
      </div>

      {/* Charts and main content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column - Charts */}
        <div className="space-y-6 lg:col-span-2">
          {/* Planned Activities */}
          <PlannedActivitiesChart />

          {/* Weekly Trend */}
          <WeeklyTrendChart />
        </div>

        {/* Right column - Calendar and Stats */}
        <div className="space-y-6">
          {/* Calendar */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm font-medium text-foreground">
                {currentMonth.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
                    )
                  }
                  className="p-1 hover:bg-secondary rounded"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
                    )
                  }
                  className="p-1 hover:bg-secondary rounded"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <Calendar currentMonth={currentMonth} />
          </div>

          {/* Study Statistics */}
          <StudyStatistics />
        </div>
      </div>

      {/* Bottom row - Study Session, Goal, Activities, Events */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="space-y-6">
          {/* Study Session Card */}
          <StudySessionCard />

          {/* Study Goal */}
          <StudyGoal />
        </div>

        {/* Right column - Activities and Events */}
        <div className="space-y-6">
          {/* Split Today's Activities */}
          <TodaysActivities type="skills" />
          <TodaysActivities type="college" />

          {/* Upcoming Events */}
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
}
