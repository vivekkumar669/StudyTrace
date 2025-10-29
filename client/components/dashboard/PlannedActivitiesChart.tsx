import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function PlannedActivitiesChart() {
  const data = [
    { name: "Coding", value: 45 },
    { name: "Meeting", value: 30 },
    { name: "Exam prep", value: 25 },
  ];

  const COLORS = ["#10b981", "#3b82f6", "#a855f7"];

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Planned Activities
        </h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/30">
            Day
          </button>
          <button className="px-3 py-1 rounded-full text-xs font-medium text-muted-foreground hover:bg-secondary">
            Month
          </button>
          <button className="px-3 py-1 rounded-full text-xs font-medium text-muted-foreground hover:bg-secondary">
            Year
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <ResponsiveContainer width={300} height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          <span className="text-xs text-muted-foreground">Exam prep</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          <span className="text-xs text-muted-foreground">Meeting</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="text-xs text-muted-foreground">Coding</span>
        </div>
      </div>
    </div>
  );
}
