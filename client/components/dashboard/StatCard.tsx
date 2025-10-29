interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  subtitle: string;
}

export default function StatCard({
  icon,
  label,
  value,
  subtitle,
}: StatCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-3xl mb-2">{icon}</div>
          <p className="text-sm text-muted-foreground mb-2">{label}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
