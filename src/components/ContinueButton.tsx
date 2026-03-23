interface ContinueButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}

const ContinueButton = ({ onClick, label = "Continuar", disabled = false }: ContinueButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-full max-w-xs mx-auto block py-3 px-6 rounded-xl font-display text-base text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none"
    style={{ background: "var(--gradient-header)" }}
  >
    {label} →
  </button>
);

export default ContinueButton;
