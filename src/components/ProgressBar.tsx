interface ProgressBarProps {
  current: number;
  max: number;
}

const ProgressBar = ({ current, max }: ProgressBarProps) => {
  const pct = max > 0 ? (current / max) * 100 : 0;

  return (
    <div className="my-4">
      <div className="flex justify-between text-xs font-bold mb-1">
        <span className="text-muted-foreground">Progreso total</span>
        <span className="text-primary">{Math.round(pct)}%</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: "var(--gradient-header)",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
