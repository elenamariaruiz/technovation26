const BLOCK_TYPES = [
  {
    emoji: "🟠",
    name: "Bloques de Control",
    color: "#E8A317",
    desc: "Controlan el flujo del programa: <strong>si…entonces</strong>, <strong>por cada</strong>, <strong>mientras</strong>. Son como las reglas del juego.",
    example: "si CampoDeTexto1.Texto ≠ \"\" entonces…",
  },
  {
    emoji: "🟢",
    name: "Bloques de Lógica",
    color: "#4CAF50",
    desc: "Comparan cosas: <strong>verdadero/falso</strong>, <strong>= ≠ > <</strong>, <strong>y / o / no</strong>.",
    example: "CampoDeTexto1.Texto ≠ \"\"",
  },
  {
    emoji: "🔵",
    name: "Bloques de Listas",
    color: "#2196F3",
    desc: "Manejan colecciones de datos: <strong>crear lista</strong>, <strong>insertar elemento</strong>, <strong>longitud de lista</strong>.",
    example: "insertar elemento en lista → índice = longitud + 1",
  },
  {
    emoji: "🟣",
    name: "Bloques de Variables",
    color: "#9C27B0",
    desc: "Guardan información: <strong>inicializar global</strong>, <strong>poner</strong>, <strong>obtener</strong>. Son como cajas con nombre.",
    example: 'inicializar global lista como → crear lista vacía',
  },
  {
    emoji: "🟤",
    name: "Bloques de Componentes",
    color: "#795548",
    desc: "Conectan con los componentes de tu app: <strong>cuando Botón1.Clic</strong>, <strong>TinyBD1.GuardarValor</strong>.",
    example: "cuando Botón1.Clic → hacer…",
  },
];

const BlocksTheory = () => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="text-5xl mb-2 animate-float">🧱</div>
        <h2 className="font-display text-xl text-foreground">
          ¿Cómo funcionan los bloques?
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          En App Inventor, programamos conectando bloques como piezas de puzzle
        </p>
      </div>

      <div className="rounded-xl bg-card border border-border p-4 mb-4">
        <h3 className="font-display text-sm text-foreground mb-2">📐 ¿Qué es el editor de bloques?</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Es la parte de App Inventor donde le dices a tu app <strong>qué hacer</strong>. 
          En vez de escribir código, arrastras bloques de colores y los conectas entre sí. 
          Cada color representa un tipo diferente de bloque. ¡Es como construir con LEGO! 🧩
        </p>
      </div>

      <h3 className="font-display text-sm text-foreground">🎨 Tipos de bloques</h3>

      <div className="space-y-2">
        {BLOCK_TYPES.map((block, i) => (
          <div
            key={i}
            className="rounded-xl border-l-4 p-3 bg-card animate-slide-up"
            style={{ borderLeftColor: block.color, animationDelay: `${i * 0.1}s` }}
          >
            <div className="font-display text-sm flex items-center gap-1.5" style={{ color: block.color }}>
              {block.emoji} {block.name}
            </div>
            <div
              className="text-xs text-muted-foreground mt-1 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: block.desc }}
            />
            <div className="mt-1.5 text-[11px] bg-muted/50 rounded-lg px-2 py-1 font-mono text-muted-foreground">
              📝 {block.example}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-4 text-center" style={{ background: "hsl(213 95% 95%)" }}>
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">💡 Recuerda:</strong> Los bloques se conectan como puzzles. 
          Si un bloque no encaja, ¡es que no va ahí! App Inventor te ayuda mostrándote solo las piezas que encajan.
        </p>
      </div>
    </div>
  );
};

export default BlocksTheory;
