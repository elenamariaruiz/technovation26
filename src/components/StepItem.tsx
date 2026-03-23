import { useState } from "react";

interface StepItemProps {
  checked: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const StepItem = ({ checked, onToggle, children }: StepItemProps) => {
  const [justChecked, setJustChecked] = useState(false);

  const handleToggle = () => {
    if (!checked) {
      setJustChecked(true);
      setTimeout(() => setJustChecked(false), 600);
    }
    onToggle();
  };

  return (
    <li
      className={`flex items-start gap-2 px-3 py-2 rounded-lg mb-1 border-[1.5px] transition-all duration-300 cursor-pointer ${
        checked
          ? "bg-success-light border-success-mid"
          : "bg-card border-border hover:border-primary/30"
      }`}
      onClick={handleToggle}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        className="w-5 h-5 mt-0.5 flex-shrink-0 accent-success cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      />
      <span className={`text-[13px] leading-relaxed flex-1 transition-opacity ${checked ? "opacity-70" : ""}`}>
        {children}
      </span>
      {justChecked && (
        <span className="text-lg animate-bounce-in">✨</span>
      )}
    </li>
  );
};

export default StepItem;
