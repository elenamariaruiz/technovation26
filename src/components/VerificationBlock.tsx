import { useState } from "react";

interface VerificationItem {
  id: string;
  text: string;
}

interface VerificationBlockProps {
  items: VerificationItem[];
  checkedItems: Record<string, boolean>;
  onVerify: (itemId: string) => void;
  requiresMentor: boolean;
  mentorPassword?: string;
  onAllVerified?: () => void;
}

const MENTOR_KEY = "estrellitas2024";

const VerificationBlock = ({ items, checkedItems, onVerify, requiresMentor, onAllVerified }: VerificationBlockProps) => {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [pendingItemId, setPendingItemId] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);

  const allChecked = items.every((item) => checkedItems[item.id]);

  const handleCheck = (itemId: string) => {
    if (requiresMentor && !unlocked) {
      setPendingItemId(itemId);
      setShowPasswordDialog(true);
      return;
    }
    onVerify(itemId);
  };

  const handleUnlock = () => {
    if (password === MENTOR_KEY) {
      setUnlocked(true);
      setShowPasswordDialog(false);
      setError(false);
      setPassword("");
      if (pendingItemId) {
        onVerify(pendingItemId);
        setPendingItemId(null);
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className="bg-success-light border-2 border-success-mid rounded-xl p-3 my-4 relative">
      <div className="font-display text-sm text-success flex items-center gap-1.5 mb-2">
        🔍 Comprobación {requiresMentor && !unlocked && <span className="text-xs font-body font-normal text-muted-foreground">(requiere mentora)</span>}
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-2 py-1.5 border-b border-success-mid/30 last:border-b-0 text-sm"
          style={{ color: "#065F46" }}
        >
          <input
            type="checkbox"
            checked={!!checkedItems[item.id]}
            onChange={() => handleCheck(item.id)}
            className="w-4 h-4 mt-0.5 flex-shrink-0 accent-success cursor-pointer"
          />
          <span className={checkedItems[item.id] ? "line-through opacity-60" : ""}>{item.text}</span>
        </div>
      ))}

      {allChecked && (
        <div className="text-center mt-2 animate-bounce-in">
          <span className="text-2xl">🎉</span>
          <p className="text-xs font-bold text-success">¡Todo correcto!</p>
        </div>
      )}

      {/* Password dialog */}
      {showPasswordDialog && (
        <div className="fixed inset-0 bg-foreground/40 flex items-center justify-center z-50" onClick={() => setShowPasswordDialog(false)}>
          <div className="bg-card rounded-2xl p-6 shadow-xl max-w-xs w-full mx-4 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="text-4xl mb-2">🔐</div>
            <h3 className="font-display text-lg text-primary mb-1">Clave de mentora</h3>
            <p className="text-xs text-muted-foreground mb-4">Pide a tu mentora que escriba la clave secreta</p>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
              placeholder="Escribe la clave..."
              className="w-full px-3 py-2 rounded-lg border border-border text-center text-sm mb-2 outline-none focus:ring-2 focus:ring-primary/40"
              autoFocus
            />
            {error && <p className="text-destructive text-xs mb-2">Clave incorrecta 😅</p>}
            <button
              onClick={handleUnlock}
              className="w-full py-2 rounded-lg font-bold text-sm text-primary-foreground transition-colors"
              style={{ background: "var(--gradient-header)" }}
            >
              Desbloquear ✨
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationBlock;
