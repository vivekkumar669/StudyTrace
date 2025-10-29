import { Plus, Calendar } from "lucide-react";

export default function UpcomingEvents() {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">
          Upcoming Events
        </h3>
        <button className="p-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors">
          <Plus size={16} />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Calendar size={32} className="text-muted-foreground/50 mb-3" />
        <p className="text-sm text-muted-foreground">No events registered</p>
        <p className="text-xs text-muted-foreground mt-1">Add your upcoming</p>
      </div>
    </div>
  );
}
