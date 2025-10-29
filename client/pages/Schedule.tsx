import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MonthCalendar from "../components/schedule/MonthCalendar";
import WeekView from "../components/schedule/WeekView";

interface ScheduleProps {
  setActiveTab?: () => void;
}

export default function Schedule({ setActiveTab }: ScheduleProps) {
  const [startMonth, setStartMonth] = useState(new Date(2025, 4)); // May 2025
  const [viewMode, setViewMode] = useState<"months" | "week">("months");
  const [selectedWeek, setSelectedWeek] = useState(
    new Date(2025, 9, 13) // October 13, 2025
  );

  const getMonthsToDisplay = () => {
    const months = [];
    for (let i = 0; i < 4; i++) {
      months.push(
        new Date(startMonth.getFullYear(), startMonth.getMonth() + i)
      );
    }
    return months;
  };

  return (
    <div className="space-y-6">
      {/* View toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Schedule</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("months")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === "months"
                ? "bg-green-500 text-white"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            Months
          </button>
          <button
            onClick={() => setViewMode("week")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === "week"
                ? "bg-green-500 text-white"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            Week
          </button>
        </div>
      </div>

      {viewMode === "months" ? (
        <>
          {/* Month navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() =>
                setStartMonth(
                  new Date(startMonth.getFullYear(), startMonth.getMonth() - 1)
                )
              }
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <p className="text-sm text-muted-foreground">
              {startMonth.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}{" "}
              -{" "}
              {new Date(
                startMonth.getFullYear(),
                startMonth.getMonth() + 3
              ).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
            <button
              onClick={() =>
                setStartMonth(
                  new Date(startMonth.getFullYear(), startMonth.getMonth() + 1)
                )
              }
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Months grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {getMonthsToDisplay().map((month, index) => (
              <MonthCalendar
                key={index}
                month={month}
                onSelectMonth={() => {
                  setSelectedWeek(new Date(month.getFullYear(), month.getMonth(), 1));
                  setViewMode("week");
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Week view */}
          <WeekView week={selectedWeek} />
        </>
      )}
    </div>
  );
}
