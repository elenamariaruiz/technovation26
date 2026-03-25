const emojis = ["⭐", "🌸", "💜", "✨", "🦋", "🚀", "🎨"];

const FloatingEmojis = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {emojis.map((emoji, i) => (
      <span
        key={i}
        className="absolute text-xl opacity-[0.07] animate-float"
        style={{
          left: `${10 + i * 13}%`,
          top: `${8 + (i % 4) * 25}%`,
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
