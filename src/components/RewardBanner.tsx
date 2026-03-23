interface RewardBannerProps {
  emoji: string;
  title: string;
  subtitle: string;
  visible: boolean;
}

const RewardBanner = ({ emoji, title, subtitle, visible }: RewardBannerProps) => {
  if (!visible) return null;

  return (
    <div
      className="border-2 border-dashed border-amber-mid rounded-xl p-4 my-4 text-center animate-bounce-in"
      style={{ background: "var(--gradient-reward)" }}
    >
      <div className="text-3xl mb-1">{emoji}</div>
      <div className="font-display text-base text-amber">{title}</div>
      <p className="text-xs" style={{ color: "#78350F" }}>{subtitle}</p>
    </div>
  );
};

export default RewardBanner;
