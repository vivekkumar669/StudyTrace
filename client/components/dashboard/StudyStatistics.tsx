import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";

export default function StudyStatistics() {
  const [activeTab, setActiveTab] = useState("week");

  const data = [
    { name: "Mon", value: 0 },
    { name: "Tue", value: 0 },
    { name: "Wed", value: 0 },
    { name: "Thu", value: 0 },
    { name: "Fri", value: 0 },
    { name: "Sat", value: 0 },
    { name: "Sun", value: 0 },
  ];

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Study Statistics
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("week")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              activeTab === "week"
                ? "bg-green-500 text-white"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setActiveTab("month")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              activeTab === "month"
                ? "bg-green-500 text-white"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setActiveTab("year")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              activeTab === "year"
                ? "bg-green-500 text-white"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            Year
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-2xl font-bold text-green-500">0h 5min</p>
        <p className="text-sm text-muted-foreground">Total studied in period</p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
          <XAxis 
            dataKey="name" 
            stroke="#6b7280"
            style={{ fontSize: "12px" }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: "12px" }}
          />
          <Bar dataKey="value" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
