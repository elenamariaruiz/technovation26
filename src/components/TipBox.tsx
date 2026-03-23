interface TipBoxProps {
  children: React.ReactNode;
  type?: "tip" | "info";
}

const TipBox = ({ children, type = "tip" }: TipBoxProps) => {
  const isTip = type === "tip";
  return (
    <div
      className={`border-l-[3px] rounded-r-lg px-3 py-2 text-xs my-3 ${
        isTip
          ? "border-amber-mid bg-amber-light"
          : "border-blue/40 bg-blue-light"
      }`}
      style={{ color: isTip ? "#78350F" : "#1E3A8A" }}
    >
      {isTip ? "💡 " : "ℹ️ "}{children}
    </div>
  );
};

export default TipBox;
