import { useState } from "react";
import bloquesControl from "@/assets/bloques_control.png";
import bloquesLogica from "@/assets/bloques_logica.png";
import bloquesMatematicas from "@/assets/bloques_matematicas.png";
import bloquesTexto from "@/assets/bloques_texto.png";
import bloquesListas from "@/assets/bloques_listas.png";
import bloquesVariables from "@/assets/bloques_variables.png";
import bloquesComponentes from "@/assets/bloques_componentes.png";

const BLOCK_TYPES = [
  {
    emoji: "🟠",
    name: "Bloques de Control",
    color: "#E8A317",
    desc: "Controlan el flujo del programa: <strong>si…entonces</strong>, <strong>por cada</strong>, <strong>mientras</strong>. Son como las reglas del juego.",
    example: "si CampoDeTexto1.Texto ≠ \"\" entonces…",
    image: bloquesControl,
  },
  {
    emoji: "🟢",
    name: "Bloques de Lógica",
    color: "#4CAF50",
    desc: "Comparan cosas: <strong>verdadero/falso</strong>, <strong>= ≠ > <</strong>, <strong>y / o / no</strong>.",
    example: "CampoDeTexto1.Texto ≠ \"\"",
    image: bloquesLogica,
  },
  {
    emoji: "🔵",
    name: "Bloques de Matemáticas",
    color: "#2196F3",
    desc: "Hacen cálculos: <strong>sumar</strong>, <strong>restar</strong>, <strong>multiplicar</strong>, <strong>números aleatorios</strong>.",
    example: "entero aleatorio entre 1 y 100",
    image: bloquesMatematicas,
  },
  {
    emoji: "🔴",
    name: "Bloques de Texto",
    color: "#E91E63",
    desc: "Trabajan con palabras: <strong>unir</strong>, <strong>longitud</strong>, <strong>comparar textos</strong>, <strong>está vacío</strong>.",
    example: 'unir "Hola " + nombre',
    image: bloquesTexto,
  },
  {
    emoji: "🩵",
    name: "Bloques de Listas",
    color: "#00BCD4",
    desc: "Manejan colecciones de datos: <strong>crear lista</strong>, <strong>insertar elemento</strong>, <strong>longitud de lista</strong>.",
    example: "insertar elemento en lista → índice = longitud + 1",
    image: bloquesListas,
  },
  {
    emoji: "🟤",
    name: "Bloques de Variables",
    color: "#E65100",
    desc: "Guardan información: <strong>inicializar global</strong>, <strong>poner</strong>, <strong>tomar</strong>. Son como cajas con nombre.",
    example: "inicializar global lista como → crear lista vacía",
    image: bloquesVariables,
  },
  {
    emoji: "🟡",
    name: "Bloques de Componentes",
    color: "#795548",
    desc: "Conectan con los componentes de tu app: <strong>cuando Botón1.Clic</strong>, <strong>TinyBD1.GuardarValor</strong>.",
    example: "cuando Botón1.Clic → hacer…",
    image: bloquesComponentes,
  },
];

const BlocksTheory = () => {
  const [openImages, setOpenImages] = useState<Record<number, boolean>>({});

  const toggleImage = (index: number) => {
    setOpenImages((prev) => ({ ...prev, [index]: !prev[index] }));
  };

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

            <button
              onClick={() => toggleImage(i)}
              className="mt-2 flex items-center gap-1.5 text-[11px] font-display px-3 py-1.5 rounded-lg transition-all duration-200"
              style={{
                background: openImages[i] ? block.color : `${block.color}18`,
                color: openImages[i] ? "white" : block.color,
              }}
            >
              {openImages[i] ? "🙈 Ocultar" : "🔍 ¿Dónde puedes encontrarme?"}
            </button>

            {openImages[i] && (
              <div className="mt-2 rounded-lg overflow-hidden border border-border animate-fade-in">
                <img
                  src={block.image}
                  alt={`Captura de ${block.name} en App Inventor`}
                  className="w-full h-auto"
                />
              </div>
            )}
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
