import { useState } from "react";

interface Hint {
  text: string;
  image?: string;
}

interface HintBoxProps {
  hints: Hint[];
  costs: number[];
  usedHints: boolean[];
  onUseHint: (index: number) => void;
  missionColor: string;
}

const HintBox = ({ hints, costs, usedHints, onUseHint, missionColor }: HintBoxProps) => {
  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);

  const handleConfirm = (index: number) => {
    onUseHint(index);
    setConfirmIndex(null);
  };

  return (
    <div className="my-4 rounded-xl border-2 border-dashed p-3" style={{ borderColor: missionColor, background: `${missionColor}10` }}>
      <div className="font-display text-sm mb-2 flex items-center gap-1.5" style={{ color: missionColor }}>
        💡 Pistas
        <span className="text-[10px] font-body font-normal text-muted-foreground">(cuestan puntos)</span>
      </div>

      <div className="space-y-2">
        {hints.map((hint, i) => (
          <div key={i} className="rounded-lg bg-card border border-border p-2.5">
            {usedHints[i] ? (
              <div className="text-xs text-muted-foreground">
                <span className="font-bold" style={{ color: missionColor }}>Pista {i + 1}:</span>
                <span className="text-destructive text-[10px] ml-1">(-{costs[i]} pts)</span>
                {hint.image ? (
                  <div className="mt-2">
                    <p className="font-bold text-[11px] mb-1" style={{ color: missionColor }}>La programación quedaría así:</p>
                    <img src={hint.image} alt={`Pista ${i + 1}`} className="rounded-lg border border-border w-full object-contain" />
                  </div>
                ) : (
                  <span className="ml-1">{hint.text}</span>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-muted-foreground">
                  🔒 Pista {i + 1}
                </span>
                <button
                  onClick={() => setConfirmIndex(i)}
                  disabled={i > 0 && !usedHints[i - 1]}
                  className="text-[11px] font-bold px-3 py-1 rounded-full text-primary-foreground transition-all hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
                  style={{ background: missionColor }}
                >
                  Desbloquear (-{costs[i]} ⭐)
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Confirmation dialog */}
      {confirmIndex !== null && (
        <div className="fixed inset-0 bg-foreground/40 flex items-center justify-center z-50" onClick={() => setConfirmIndex(null)}>
          <div className="bg-card rounded-2xl p-6 shadow-xl max-w-xs w-full mx-4 text-center animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="text-4xl mb-2">🤔</div>
            <h3 className="font-display text-lg" style={{ color: missionColor }}>¿Usar pista {confirmIndex + 1}?</h3>
            <p className="text-sm text-muted-foreground mt-2 mb-4">
              Perderéis <span className="font-bold text-destructive">{costs[confirmIndex]} puntos</span>.
              <br />¿Estáis seguras de que queréis utilizarla?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmIndex(null)}
                className="flex-1 py-2 rounded-lg font-bold text-sm border-2 border-border text-muted-foreground hover:bg-muted transition-colors"
              >
                No, seguimos 💪
              </button>
              <button
                onClick={() => handleConfirm(confirmIndex)}
                className="flex-1 py-2 rounded-lg font-bold text-sm text-primary-foreground transition-colors"
                style={{ background: missionColor }}
              >
                Sí, mostrar 👀
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HintBox;
