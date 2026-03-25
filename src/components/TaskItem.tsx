import { useState } from "react";

interface TaskItemProps {
  checked: boolean;
  onToggle: () => void;
  name: string;
  description: string;
  tip?: string;
  points: number;
  color: string;
  colorLight: string;
}

const TaskItem = ({ checked, onToggle, name, description, tip, points, color, colorLight }: TaskItemProps) => {
  const [justChecked, setJustChecked] = useState(false);

  const handleToggle = () => {
    if (!checked) {
      setJustChecked(true);
      setTimeout(() => setJustChecked(false), 600);
    }
    onToggle();
  };

  return (
    <div
      className="flex items-start gap-3 rounded-2xl p-3 border-l-4 transition-all duration-300 cursor-pointer"
      style={{
        background: checked ? "hsl(var(--success-light))" : colorLight,
        borderLeftColor: checked ? "hsl(var(--success))" : color,
      }}
      onClick={handleToggle}
    >
      <div
        className="w-7 h-7 rounded-full border-[3px] flex-shrink-0 mt-0.5 flex items-center justify-center text-sm transition-all"
        style={{
          borderColor: checked ? "hsl(var(--success))" : color,
          background: checked ? color : "transparent",
          color: checked ? "white" : "transparent",
        }}
      >
        {checked && "✓"}
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-extrabold text-sm text-foreground">{name}</div>
        <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
        {tip && (
          <div className="text-[11px] text-muted-foreground/70 mt-1 italic">
            <span style={{ color: "hsl(var(--amber))" }}>💡 Pista:</span> {tip}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-0.5 flex-shrink-0" style={{ color }}>
        <span className="font-display text-base">{points}</span>
        <span className="text-xs">⭐</span>
      </div>

      {justChecked && <span className="text-lg animate-bounce-in">✨</span>}
    </div>
  );
};

export default TaskItem;
