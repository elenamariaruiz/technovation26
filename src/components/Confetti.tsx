import { useEffect, useState } from "react";

interface ConfettiProps {
  active: boolean;
}

const emojis = ["⭐", "🎉", "✨", "💜", "🌟", "🎊", "💫", "🦋", "🌈", "🏆"];

const Confetti = ({ active }: ConfettiProps) => {
  const [particles, setParticles] = useState<{ id: number; emoji: string; left: number; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    if (active) {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 3,
        size: 16 + Math.random() * 20,
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: "-40px",
            fontSize: `${p.size}px`,
            animation: `confetti-rain ${p.duration}s ${p.delay}s ease-in forwards`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
};

export default Confetti;
