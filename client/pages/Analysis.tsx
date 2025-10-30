import { useState } from "react";
import StatCard from "../components/dashboard/StatCard";
import PlannedActivitiesChart from "../components/dashboard/PlannedActivitiesChart";
import WeeklyTrendChart from "../components/dashboard/WeeklyTrendChart";
import StudyStatistics from "../components/dashboard/StudyStatistics";

export default function Analysis() {
  const [activeTab, setActiveTab] = useState("week");

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">Analysis Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Track your study statistics and progress</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:grid-cols-4">
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

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Planned Activities */}
        <PlannedActivitiesChart />

        {/* Weekly Trend */}
        <WeeklyTrendChart />
      </div>

      {/* Study Statistics */}
      <StudyStatistics />

      {/* Goal Insights */}
      <div className="rounded-lg border border-border bg-card p-3 sm:p-4 md:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Goal Insights</h2>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {/* Goal Progress */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Weekly Goal Progress</h3>
            <div className="rounded-lg bg-secondary/30 p-6">
              <p className="text-3xl font-bold text-green-500 mb-2">5 min</p>
              <p className="text-sm text-muted-foreground mb-4">
                of your study goal
              </p>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden mb-2">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: "2.5%" }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">
                195 minutes remaining to reach your goal
              </p>
            </div>
          </div>

          {/* Study Streak */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Study Streak</h3>
            <div className="rounded-lg bg-secondary/30 p-6">
              <p className="text-3xl font-bold text-blue-500 mb-2">1 day</p>
              <p className="text-sm text-muted-foreground mb-4">
                Current study streak
              </p>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-lg ${
                      i === 0
                        ? "bg-green-500"
                        : i === 6
                        ? "bg-green-500/30"
                        : "bg-secondary"
                    }`}
                    title={
                      ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="rounded-lg border border-border bg-card p-3 sm:p-4 md:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Performance Summary</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Most Active Day</p>
            <p className="text-2xl font-bold text-green-500">Thursday</p>
            <p className="text-xs text-muted-foreground">2h 30m studied</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Study Time</p>
            <p className="text-2xl font-bold text-blue-500">12.5h</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Goals Completed</p>
            <p className="text-2xl font-bold text-purple-500">3/8</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </div>
        </div>
      </div>
    </div>
  );
}
