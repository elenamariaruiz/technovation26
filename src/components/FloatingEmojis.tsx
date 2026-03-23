const emojis = ["⭐", "🌸", "💜", "✨", "🦋"];

const FloatingEmojis = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {emojis.map((emoji, i) => (
      <span
        key={i}
        className="absolute text-xl opacity-10 animate-float"
        style={{
          left: `${15 + i * 18}%`,
          top: `${10 + (i % 3) * 30}%`,
          animationDelay: `${i * 0.7}s`,
          animationDuration: `${3 + i * 0.5}s`,
        }}
      >
        {emoji}
      </span>
    ))}
  </div>
);

export default FloatingEmojis;
