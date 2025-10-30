import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MonthCalendar from "../components/schedule/MonthCalendar";
import WeekView from "../components/schedule/WeekView";

export default function Schedule() {
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
    <div className="space-y-4 sm:space-y-6">
      {/* View toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Schedule</h2>
        <div className="flex gap-1 sm:gap-2 w-full sm:w-auto">
          <button
            onClick={() => setViewMode("months")}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              viewMode === "months"
                ? "bg-green-500 text-white"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            Months
          </button>
          <button
            onClick={() => setViewMode("week")}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
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
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <button
              onClick={() =>
                setStartMonth(
                  new Date(startMonth.getFullYear(), startMonth.getMonth() - 1)
                )
              }
              className="p-1.5 sm:p-2 hover:bg-secondary rounded-lg transition-colors flex-shrink-0"
            >
              <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
            </button>
            <p className="text-xs sm:text-sm text-muted-foreground text-center flex-1">
              <span className="hidden sm:inline">
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
              </span>
              <span className="sm:hidden">
                {startMonth.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </p>
            <button
              onClick={() =>
                setStartMonth(
                  new Date(startMonth.getFullYear(), startMonth.getMonth() + 1)
                )
              }
              className="p-1.5 sm:p-2 hover:bg-secondary rounded-lg transition-colors flex-shrink-0"
            >
              <ChevronRight size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Months grid */}
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
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
