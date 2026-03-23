interface DiplomaProps {
  name: string;
  totalScore: number;
  visible: boolean;
}

const Diploma = ({ name, totalScore, visible }: DiplomaProps) => {
  if (!visible) return null;

  return (
    <div className="border-[3px] border-double border-primary rounded-2xl p-5 text-center my-5 animate-bounce-in" style={{ background: "linear-gradient(135deg, hsl(263 90% 96%), hsl(263 90% 93%))" }}>
      <div className="text-3xl mb-1">🌟 🎓 🌟</div>
      <div className="font-display text-lg text-primary">Certificado de Programadora</div>
      <p className="text-xs text-muted-foreground mt-1 mb-3">Este certificado acredita que</p>
      <div className="border-b-2 border-dotted border-primary/30 mx-10 h-7 flex items-end justify-center pb-0.5 font-display text-base text-primary">
        {name || "_______________"}
      </div>
      <p className="text-xs text-muted-foreground mt-2">ha completado el reto <strong>Pantalla Principal con DynamicComponents</strong></p>
      <p className="text-sm text-primary font-bold mt-1">Total: {totalScore} / 300 ⭐</p>
      <div className="flex justify-around text-xs text-muted-foreground mt-3">
        <span>Fecha: {new Date().toLocaleDateString("es-ES")}</span>
        <span>Firma: _______________</span>
      </div>
    </div>
  );
};

export default Diploma;
