import { useState } from "react";

interface FichaHeaderProps {
  name: string;
  onNameChange: (name: string) => void;
  totalScore: number;
  maxScore: number;
}

const FichaHeader = ({ name, onNameChange, totalScore, maxScore }: FichaHeaderProps) => {
  return (
    <div
      className="flex items-center gap-3 rounded-xl px-5 py-4 mb-5 text-primary-foreground"
      style={{ background: "var(--gradient-header)" }}
    >
      <span className="text-4xl flex-shrink-0 animate-float">📱</span>
      <div className="flex-1">
        <h1 className="font-display text-xl md:text-2xl leading-tight">Pantalla Principal</h1>
        <p className="text-sm opacity-80">Misión 1: Diseño · Misión 2: Programación</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-lg px-3 py-2 text-center" style={{ background: "rgba(255,255,255,0.15)" }}>
          <div className="text-xs opacity-70 uppercase tracking-widest mb-1">Programadora</div>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Tu nombre..."
            className="bg-transparent border-b border-primary-foreground/40 text-primary-foreground font-bold text-sm w-full outline-none placeholder:text-primary-foreground/40 placeholder:font-normal text-center"
          />
        </div>
        <div className="rounded-lg px-3 py-2 text-center font-bold text-sm" style={{ background: "rgba(255,255,255,0.2)" }}>
          <div className="text-xs opacity-70">Puntos</div>
          <div className="text-lg">
            {totalScore} <span className="text-amber-mid">⭐</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FichaHeader;
