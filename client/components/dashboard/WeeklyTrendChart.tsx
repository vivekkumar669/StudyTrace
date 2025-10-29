import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";

export default function WeeklyTrendChart() {
  const data = [
    { name: "Sun", value: 0.0 },
    { name: "Mon", value: 0.0 },
    { name: "Tue", value: 0.0 },
    { name: "Wed", value: 0.0 },
    { name: "Thu", value: 0.0 },
    { name: "Fri", value: 0.0 },
    { name: "Sat", value: 0.0 },
  ];

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="mb-6 text-lg font-semibold text-foreground">
        Weekly Trend
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
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
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#10b981" 
            dot={{ fill: "#10b981", r: 4 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
