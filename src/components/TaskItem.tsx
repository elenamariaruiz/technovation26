import { useState, useEffect } from "react";

interface TaskItemProps {
  checked: boolean;
  onToggle: () => void;
  name: string;
  description: string;
  tip?: string;
  points: number;
  color: string;
  colorLight: string;
  locked?: boolean;
  expanded?: boolean;
  index: number;
}

const MiniConfetti = () => {
  const emojis = ["⭐", "✨", "🎉", "💫", "🌟"];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {Array.from({ length: 12 }, (_, i) => (
        <span
          key={i}
          className="absolute text-sm"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 60}%`,
            animation: `mini-confetti 0.8s ${i * 0.05}s ease-out forwards`,
            opacity: 0,
          }}
        >
          {emojis[i % emojis.length]}
        </span>
      ))}
    </div>
  );
};

const TaskItem = ({ checked, onToggle, name, description, tip, points, color, colorLight, locked, expanded, index }: TaskItemProps) => {
  const [justChecked, setJustChecked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleToggle = () => {
    if (locked) return;
    if (!checked) {
      setJustChecked(true);
      setShowConfetti(true);
      setTimeout(() => setJustChecked(false), 600);
      setTimeout(() => setShowConfetti(false), 1000);
    }
    onToggle();
  };

  return (
    <div
      className={`relative rounded-2xl border-l-4 transition-all duration-400 overflow-hidden ${
        locked ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
      }`}
      style={{
        borderLeftColor: checked ? "hsl(var(--success))" : locked ? "hsl(var(--muted-foreground))" : color,
      }}
    >
      {/* Header - always visible */}
      <div
        className="flex items-center gap-3 p-3 transition-all duration-300"
        style={{
          background: checked ? "hsl(var(--success-light))" : locked ? "hsl(var(--muted) / 0.5)" : colorLight,
        }}
        onClick={handleToggle}
      >
        <div
          className="w-7 h-7 rounded-full border-[3px] flex-shrink-0 flex items-center justify-center text-sm transition-all"
          style={{
            borderColor: checked ? "hsl(var(--success))" : locked ? "hsl(var(--muted-foreground))" : color,
            background: checked ? color : "transparent",
            color: checked ? "white" : "transparent",
          }}
        >
          {checked ? "✓" : locked ? "🔒" : ""}
        </div>

        <div className="flex-1 min-w-0">
          <div className={`font-extrabold text-sm ${locked ? "text-muted-foreground" : "text-foreground"}`}>
            {name}
          </div>
          {checked && !expanded && (
            <div className="text-[11px] text-success font-bold mt-0.5">✅ ¡Completada!</div>
          )}
        </div>

        <div className="flex flex-col items-center gap-0.5 flex-shrink-0" style={{ color: locked ? "hsl(var(--muted-foreground))" : color }}>
          <span className="font-display text-base">{points}</span>
          <span className="text-xs">⭐</span>
        </div>

        {justChecked && <span className="text-lg animate-bounce-in">✨</span>}
      </div>

      {/* Expandable content */}
      <div
        className="transition-all duration-400 ease-in-out"
        style={{
          maxHeight: expanded && !checked ? "300px" : "0px",
          opacity: expanded && !checked ? 1 : 0,
          overflow: "hidden",
        }}
      >
        <div className="px-3 pb-3 pt-1" style={{ background: colorLight }}>
          <div className="text-xs text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
          {tip && (
            <div className="text-[11px] text-muted-foreground/70 mt-1.5 italic">
              <span style={{ color: "hsl(var(--amber))" }}>💡 Pista:</span> {tip}
            </div>
          )}

          {!locked && !checked && (
            <button
              onClick={(e) => { e.stopPropagation(); handleToggle(); }}
              className="mt-3 w-full py-2 rounded-lg font-display text-sm text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-md"
              style={{ background: color }}
            >
              ✅ ¡Hecho!
            </button>
          )}
        </div>
      </div>

      {showConfetti && <MiniConfetti />}
    </div>
  );
};

export default TaskItem;
