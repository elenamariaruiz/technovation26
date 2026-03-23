interface MissionHeaderProps {
  number: number;
  emoji: string;
  title: string;
  subtitle: string;
  points: number;
  earnedPoints: number;
  verified: boolean;
}

const MissionHeader = ({ number, emoji, title, subtitle, points, earnedPoints, verified }: MissionHeaderProps) => {
  const gradient = number === 1 ? "var(--gradient-mission1)" : "var(--gradient-mission2)";

  return (
    <div
      className="flex items-center gap-3 rounded-xl px-4 py-3 text-primary-foreground mb-4"
      style={{ background: gradient }}
    >
      <div className="font-display text-3xl opacity-80 min-w-[38px]">{number}</div>
      <div className="flex-1">
        <h2 className="font-display text-lg leading-tight">{emoji} {title}</h2>
        <p className="text-xs opacity-80">{subtitle}</p>
      </div>
      <div className="rounded-lg px-3 py-1.5 text-sm font-extrabold whitespace-nowrap" style={{ background: "rgba(255,255,255,0.2)" }}>
        {earnedPoints}/{points} ⭐
      </div>
      <div
        className={`w-12 h-12 rounded-full border-2 border-dashed flex flex-col items-center justify-center text-[8px] font-extrabold text-center leading-tight flex-shrink-0 transition-all duration-500 ${
          verified ? "border-primary-foreground/80 opacity-100" : "border-primary-foreground/40 opacity-60"
        }`}
      >
        <span className="text-base">{verified ? "✅" : "🔒"}</span>
        {verified ? "OK" : "SELLO"}
      </div>
    </div>
  );
};

export default MissionHeader;
