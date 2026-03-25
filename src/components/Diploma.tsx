interface DiplomaProps {
  name: string;
  totalScore: number;
  maxScore: number;
  visible: boolean;
}

const Diploma = ({ name, totalScore, maxScore, visible }: DiplomaProps) => {
  if (!visible) return null;

  return (
    <div className="border-[3px] border-double border-pink rounded-2xl p-5 text-center my-5 animate-bounce-in" style={{ background: "linear-gradient(135deg, hsl(340 100% 97%), hsl(270 100% 97%))" }}>
      <div className="text-3xl mb-1">🌟 🎓 🌟</div>
      <div className="font-display text-lg text-pink">Certificado de Programadora</div>
      <p className="text-xs text-muted-foreground mt-1 mb-3">Este certificado acredita que</p>
      <div className="border-b-2 border-dotted border-pink/30 mx-10 h-7 flex items-end justify-center pb-0.5 font-display text-base text-pink">
        {name || "_______________"}
      </div>
      <p className="text-xs text-muted-foreground mt-2">ha completado las <strong>Misiones App Inventor</strong> 🚀</p>
      <p className="text-sm text-pink font-bold mt-1">Total: {totalScore} / {maxScore} ⭐</p>
      <div className="flex justify-around text-xs text-muted-foreground mt-3">
        <span>Fecha: {new Date().toLocaleDateString("es-ES")}</span>
        <span>Firma: _______________</span>
      </div>
    </div>
  );
};

export default Diploma;
