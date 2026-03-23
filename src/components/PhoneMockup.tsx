const PhoneMockup = () => (
  <div className="flex gap-4 items-start my-3">
    <div>
      <div className="text-[9px] text-center text-muted-foreground font-bold mb-1">Resultado final 👇</div>
      <div className="w-[110px] border-2 border-muted-foreground/30 rounded-xl overflow-hidden bg-card">
        <div className="py-1.5 text-center text-[8px] font-bold text-primary-foreground" style={{ background: "hsl(var(--primary))" }}>
          📱 Mis Actividades
        </div>
        <div className="p-1.5">
          <div className="bg-secondary rounded p-1.5 border border-dashed border-primary/30 mb-1.5 space-y-0.5">
            {[
              { emoji: "🎨", name: "Dibujo", cat: "Arte" },
              { emoji: "⚽", name: "Fútbol", cat: "Deporte" },
              { emoji: "📚", name: "Lectura", cat: "Biblioteca" },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-1 bg-card rounded p-1 border border-primary/10">
                <div className="w-4 h-4 rounded bg-secondary flex items-center justify-center text-[10px]">{item.emoji}</div>
                <div className="text-[6.5px] leading-tight font-body">
                  <strong>{item.name}</strong><br />{item.cat}
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg py-1 text-center text-[7px] font-bold text-primary-foreground" style={{ background: "hsl(var(--primary))" }}>
            + Añadir actividad
          </div>
        </div>
      </div>
    </div>
    <div className="flex-1 text-xs leading-relaxed">
      <h4 className="text-sm font-extrabold text-primary mb-1.5">¿Qué vamos a poner?</h4>
      <p>Solo <strong>4 componentes</strong>. Los bloques de la Misión 2 se encargarán de rellenar las tarjetas automáticamente usando la extensión.</p>
      <p className="text-primary font-bold text-xs mt-3">La pantalla empieza vacía. ¡La programación la llena sola! 🚀</p>
    </div>
  </div>
);

export default PhoneMockup;
