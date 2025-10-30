import { useState } from "react";

interface CalendarProps {
  currentMonth: Date;
}

export default function Calendar({ currentMonth }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const todayDate = new Date().getDate();
  const isCurrentMonth =
    new Date().getFullYear() === currentMonth.getFullYear() &&
    new Date().getMonth() === currentMonth.getMonth();

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = [];

  // Add empty slots for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div>
      <div className="mb-4 grid grid-cols-7 gap-2 text-center">
        {weekDays.map((day, index) => (
          <div key={index} className="text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => day && setSelectedDate(day)}
            className={`aspect-square rounded text-sm font-medium transition-colors ${
              day === null
                ? "invisible"
                : day === selectedDate
                ? "bg-green-500 text-white"
                : isCurrentMonth && day === todayDate
                ? "bg-green-500/20 text-green-400 border border-green-500/50"
                : "text-foreground hover:bg-secondary"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}
