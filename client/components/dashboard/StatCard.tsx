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
    <div className="rounded-lg border border-border bg-card p-3 sm:p-4 md:p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xl sm:text-2xl md:text-3xl mb-2">{icon}</div>
          <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2 line-clamp-2">
            {label}
          </p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
            {value}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1 line-clamp-2">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
