import { useState, useEffect } from "react";
import MissionHeader from "@/components/MissionHeader";
import TaskItem from "@/components/TaskItem";
import HintBox from "@/components/HintBox";
import VerificationBlock from "@/components/VerificationBlock";
import RewardBanner from "@/components/RewardBanner";
import Diploma from "@/components/Diploma";
import FloatingEmojis from "@/components/FloatingEmojis";
import ProgressBar from "@/components/ProgressBar";
import ContinueButton from "@/components/ContinueButton";
import Confetti from "@/components/Confetti";
import TipBox from "@/components/TipBox";
import BlocksTheory from "@/components/BlocksTheory";
import ListExplanation from "@/components/ListExplanation";
import pistaMision3 from "@/assets/pista_m3_final.png";

const STORAGE_KEY = "misiones-appinventor-v3";

type Screen = "welcome" | "mission1_theory" | "mission1" | "mission2" | "mission3" | "mission4" | "verify" | "reward";

// Mission colors as raw CSS values
const MISSION_COLORS = {
  1: { color: "#E8870E", light: "hsl(36 100% 96%)" },
  2: { color: "#B35CFF", light: "hsl(270 100% 97%)" },
  3: { color: "#3B8BF5", light: "hsl(213 95% 95%)" },
  4: { color: "#0CAE82", light: "hsl(160 80% 95%)" },
};

// Task definitions per mission
const MISSIONS = [
  {
    num: 1, emoji: "🚪", title: "Abrir Otras Pantallas", subtitle: "Tu primer bloque de programación · 19 pts",
    points: 19,
    image: "/flujo-pantallas.jpg",
    intro: "¡Vamos a hacer que el botón 'Crear Incidencia' de la pantalla Lista_Incidencias abra la pantalla Crear_Incidencia! Es como ponerle una puerta mágica al botón 🚪✨",
    tasks: [
      { name: "🧱 Tarea 1 — Abre el editor de bloques", desc: 'Asegúrate de estar en la pantalla <strong>Screen1</strong> (Lista_Incidencias). Arriba a la derecha, pulsa el botón <strong>"Bloques"</strong> para abrir el editor de programación.', tip: 'Si ves el diseño del teléfono, es que estás en "Diseñador". Cambia a "Bloques".', pts: 3 },
      { name: "🔘 Tarea 2 — Bloque cuando btn_crear_incidencia.Clic", desc: 'En el panel izquierdo, busca <strong>btn_crear_incidencia</strong> y arrastra el bloque <strong>cuando btn_crear_incidencia.Clic</strong> al área de trabajo.', tip: 'El bloque está en la categoría del botón, en el panel izquierdo bajo tus componentes.', pts: 4 },
      { name: "📲 Tarea 3 — Añade 'abrir otra pantalla'", desc: 'Ve a la sección <strong>Control</strong> del panel izquierdo. Arrastra el bloque <strong>abrir otra pantalla nombre de pantalla</strong> y colócalo DENTRO del bloque del botón.', tip: 'Está en "Control" → busca "abrir otra pantalla nombre de pantalla".', pts: 4 },
      { name: '✏️ Tarea 4 — Escribe el nombre de la pantalla', desc: 'En el hueco del nombre, conecta un bloque de <strong>Texto</strong> (comillas) y escribe exactamente <strong>"Crear_Incidencia"</strong>. ¡Cuidado con las mayúsculas y el guion bajo!', tip: 'El bloque de texto está en la sección "Texto" → es el que tiene comillas vacías "".', pts: 4 },
      { name: '❌ Tarea 5 — Cierra la pantalla con Aceptar y Salir', desc: 'Cambia a la pantalla <strong>Crear_Incidencia</strong> y abre los bloques. De momento los botones <em>Aceptar</em> y <em>Salir</em> solo cerrarán la pantalla: busca cada botón en el panel izquierdo, arrastra el bloque <strong>cuando BtnAceptar.Clic</strong> (y luego <strong>cuando BtnSalir.Clic</strong>) al área de trabajo, y dentro de cada uno coloca el bloque <strong>cerrar pantalla</strong> de la sección <strong>Control</strong>.', tip: 'El bloque "cerrar pantalla" está en Control. Repite los mismos pasos para cada botón.', pts: 4 },
    ],
    hints: [
      { text: 'El bloque del botón está en el panel izquierdo bajo tus componentes. "Abrir otra pantalla" está en Control. El bloque de texto con comillas está en "Texto". Para cerrar pantalla, usa "cerrar pantalla" de Control dentro de cada bloque de botón (BtnAceptar y BtnSalir).' },
    ],
    hintCosts: [5],
  },
  {
    num: 2, emoji: "🏠", title: "Programación de Lista_Incidencias (I)", subtitle: "Variables y carga inicial · 15 pts",
    points: 15,
    intro: "¡Vamos a hacer que Screen1 cargue las incidencias al abrirse! Primero crearemos la variable que las guarda y luego le diremos a la app qué mostrar al iniciar 🏠",
    tasks: [
      { name: '📦 Tarea 1 — Crea la variable "listaIncidencias"', desc: 'Crea un bloque <strong>inicializar global listaIncidencias como</strong> con una lista vacía. Esta guardará todas las incidencias mientras la app está abierta.', tip: "Está en 'Variables' → arrastra 'inicializar global nombre como' y cámbialo a listaIncidencias.", pts: 5 },
      { name: '🔌 Tarea 2 — Bloque "Al inicializar Screen1"', desc: 'Crea el bloque <strong>cuando Screen1.Inicializar</strong>. Carga la lista desde TinyBD con etiqueta <em>"Incidencias"</em>. Si está vacía, añade dos ejemplos ("Basura en la Playa / A Coruña" y "Señal Rota / Arteixo"). Al final, muéstralos con <strong>VisorDeLista1.AddItems</strong>.', tip: 'Usa el bloque "¿está vacía la lista?" para comprobar si hay datos.', pts: 10 },
    ],
    hints: [
      { text: 'Para crear la variable global: "Variables" → arrastra "inicializar global nombre como" y cámbialo a "listaIncidencias". En el bloque Inicializar, usa "si está vacía la lista" de "Listas" y "insertar elemento en lista" para los ejemplos. Muestra los datos con VisorDeLista1.AddItems.' },
    ],
    hintCosts: [5],
  },
  {
    num: 3, emoji: "⚙️", title: "Programación de Crear_Incidencia", subtitle: "Editor de bloques · 25 pts",
    points: 25,
    intro: "¡Hora de dar vida a los bloques! Ve a la pantalla Crear_Incidencia y abre el editor de bloques. Vamos a decirle a la app qué hacer cuando alguien añade una incidencia 🧱",
    showListExplanationBeforeTask: 3,
    tasks: [
      { name: '👁️ Tarea 1 — Añade un VisorDeLista', desc: 'En el <strong>Diseñador</strong>, arrastra un componente <strong>VisorDeLista</strong> a la pantalla Crear_Incidencia. <strong>¡MUY IMPORTANTE!</strong> En el panel de la derecha (Propiedades), marca la opción <strong>Visible = NO visible</strong>. Lo necesitamos para crear elementos, pero no queremos que se vea.', tip: 'El VisorDeLista está en "Interfaz de usuario" en la paleta de componentes. Recuerda ponerlo en NO visible.', pts: 5 },
      { name: '📦 Tarea 2 — Crea la variable global "lista"', desc: 'En "Variables", crea un bloque <strong>inicializar global lista como</strong> y ponle una <em>lista vacía</em> como valor inicial.', tip: 'La lista vacía está en "Listas" → "crear una lista vacía".', pts: 5 },
      { name: '🔌 Tarea 3 — Bloque "Al inicializar Crear_Incidencia"', desc: 'Crea el bloque <strong>cuando Crear_Incidencia.Inicializar</strong>. Dentro, pon la variable <em>lista</em> igual a lo que devuelve <strong>TinyBD1.ObtenerValor</strong> con etiqueta <em>"Incidencias"</em> y valor por defecto <em>lista vacía</em>.', tip: "Así cargamos las incidencias que ya existían antes.", pts: 5 },
      { name: "➕ Tarea 4 — Añade la nueva incidencia a la lista", desc: 'En el bloque <strong>cuando Botón1.Clic</strong>, usa <strong>insertar elemento en lista</strong> con índice = longitud de la lista + 1, y como elemento <strong>VisorDeLista1.CrearElemento</strong> con textoPrincipal, textoDetalle y nombreImagen de los campos de texto.', tip: "textoPrincipal = CampoDeTexto1.Texto, textoDetalle = CampoDeTexto2.Texto, nombreImagen = SelectorDeImagen1.Selección.", pts: 5 },
      { name: "💾 Tarea 5 — Guarda y cierra la pantalla", desc: 'Después de insertar el elemento, usa <strong>TinyBD1.GuardarValor</strong> con etiqueta <em>"Incidencias"</em> y valor la variable <em>lista</em>. Por último añade el bloque <strong>cerrar pantalla</strong>.', tip: "¡El orden importa! Primero guardar, luego cerrar.", pts: 5 },
    ],
    hints: [
      { text: 'Para crear la variable: "Variables" → "inicializar global nombre como" → cambia a "lista". En Inicializar, usa "poner global lista como" + TinyBD1.ObtenerValor. Para insertar: "Listas" → "insertar elemento en lista" con índice = longitud + 1. Guarda con TinyBD1.GuardarValor y cierra pantalla.' },
      { text: '', image: pistaMision3 },
    ],
    hintCosts: [5, 10],
  },
  {
    num: 4, emoji: "🔄", title: "Programación de Lista_Incidencias (II)", subtitle: "¡La última misión! · 15 pts",
    points: 15,
    intro: "¡Último paso! Vuelve a Screen1 y haz que la lista se actualice sola al volver de crear una incidencia. Luego prueba que todo funciona 🏁",
    tasks: [
      { name: "🔄 Tarea 1 — Recarga la lista al volver", desc: 'Crea el bloque <strong>cuando Screen1.OtraPantallaCerrada</strong>. Dentro, vuelve a leer TinyBD y actualiza <strong>VisorDeLista1.AddItems</strong> con la lista nueva para que aparezca la incidencia recién creada.', tip: 'Este bloque es el "truco" que hace que la app se actualice sola al volver.', pts: 10 },
      { name: "🧪 Tarea 2 — ¡Prueba tu app! (Opcional)", desc: '<strong>Conecta tu dispositivo o usa el emulador!</strong><br/>Este paso es completamente opcional, puedes pedirle ayuda a tus padres para hacerlo.<br/><br/>En la parte superior de la pantalla de App Inventor está el menú <strong>Generar</strong>. Ahí puedes generar la aplicación para Android (<em>App de Android (.apk)</em>) o para iOS (<em>iOS Ad Hoc (.ipa)</em>).', tip: "Usa AI Companion o el emulador para probar.", pts: 5, optional: true },
    ],
    hints: [
      { text: 'El bloque "cuando Screen1.OtraPantallaCerrada" está en el panel izquierdo al clicar en Screen1. Es casi igual que el bloque Inicializar: lee TinyBD y llama a VisorDeLista1.AddItems. Para probar: "Conectar" → "AI Companion" y escanea el QR.' },
    ],
    hintCosts: [5],
  },
];

const MAX_SCORE = MISSIONS.reduce((sum, m) => sum + m.points, 0); // 120

// Verification items per mission
const verifItems: Record<number, { id: string; text: string }[]> = {
  1: [
    { id: "v1_1", text: "El bloque 'cuando btn_crear_incidencia.Clic' existe y abre 'Crear_Incidencia'" },
    { id: "v1_2", text: "BtnAceptar.Clic y BtnSalir.Clic tienen cada uno un bloque 'cerrar pantalla'" },
  ],
  2: [
    { id: "v2_1", text: "Variable 'listaIncidencias' existe con lista vacía" },
    { id: "v2_2", text: "Al inicializar Screen1 se cargan datos y se muestran ejemplos si está vacía" },
  ],
  3: [
    { id: "v3_0", text: "El VisorDeLista existe y está marcado como NO visible" },
    { id: "v3_1", text: "La variable global 'lista' se inicializa con lista vacía" },
    { id: "v3_2", text: "Al inicializar la pantalla se cargan los datos de TinyBD" },
    { id: "v3_3", text: "Al pulsar el botón: inserta en lista, guarda y cierra" },
  ],
  4: [
    { id: "v4_1", text: "Al volver de Crear_Incidencia se recarga la lista automáticamente" },
    { id: "v4_2", text: "La app funciona de extremo a extremo: crear incidencia aparece en la lista" },
  ],
};

interface State {
  name: string;
  currentScreen: Screen;
  tasks: Record<number, boolean[]>;
  hints: Record<number, boolean[]>;
  verif: Record<string, boolean>;
  verified: boolean;
}

const defaultState: State = {
  name: "",
  currentScreen: "welcome",
  tasks: {
    1: [false, false, false, false, false],
    2: [false, false],
    3: [false, false, false, false, false],
    4: [false, false],
  },
  hints: {
    1: [false],
    2: [false],
    3: [false, false],
    4: [false],
  },
  verif: {},
  verified: false,
};

const Index = () => {
  const [state, setState] = useState<State>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return defaultState;
      const parsed = JSON.parse(saved);
      return {
        ...defaultState,
        ...parsed,
        tasks: { ...defaultState.tasks, ...parsed.tasks },
        hints: { ...defaultState.hints, ...parsed.hints },
      };
    } catch {
      return defaultState;
    }
  });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const update = (partial: Partial<State>) => setState((s) => ({ ...s, ...partial }));

  const goTo = (screen: Screen) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => update({ currentScreen: screen }), 200);
  };

  const toggleTask = (mission: number, i: number) => {
    const current = state.tasks[mission] ?? [...defaultState.tasks[mission as keyof typeof defaultState.tasks]];
    const updated = [...current];
    updated[i] = !updated[i];
    update({ tasks: { ...state.tasks, [mission]: updated } });
  };

  const useHint = (mission: number, i: number) => {
    const current = state.hints[mission] ?? [...defaultState.hints[mission as keyof typeof defaultState.hints]];
    const updated = [...current];
    updated[i] = true;
    update({ hints: { ...state.hints, [mission]: updated } });
  };

  // Calculate scores
  const getMissionScore = (mNum: number) => {
    const mission = MISSIONS[mNum - 1];
    if (!mission) return 0;
    const taskPts = mission.tasks.reduce((sum, t, i) => sum + (state.tasks[mNum]?.[i] ? t.pts : 0), 0);
    const hintPenalty = (state.hints[mNum] || []).reduce((sum, used, i) => sum + (used ? (mission.hintCosts[i] ?? 0) : 0), 0);
    return Math.max(0, taskPts - hintPenalty);
  };

  const totalScore = state.verified
    ? Math.max(0, MISSIONS.reduce((sum, m) => sum + m.points, 0) - [1, 2, 3, 4].reduce((sum, n) => sum + (state.hints[n] || []).reduce((s, used, i) => s + (used ? (MISSIONS[n - 1]?.hintCosts[i] ?? 0) : 0), 0), 0))
    : [1, 2, 3, 4].reduce((sum, n) => sum + getMissionScore(n), 0);

  const allMissionTasksDone = (mNum: number) => {
    const mission = MISSIONS[mNum - 1];
    if (!mission) return false;
    return mission.tasks.every((task, i) => (task as any).optional || (state.tasks[mNum]?.[i] ?? false));
  };

  const allVerifDone = Object.keys(verifItems).every(
    (mKey) => verifItems[Number(mKey)].every((item) => state.verif[item.id])
  );

  const handleConfirmAll = () => {
    update({ verified: true });
    setShowConfetti(true);
    setTimeout(() => {
      goTo("reward");
      setTimeout(() => setShowConfetti(false), 4000);
    }, 500);
  };

  const { currentScreen } = state;

  const NavBar = ({ back, backLabel }: { back: Screen; backLabel: string }) => (
    <div className="flex items-center gap-2 mb-4">
      <button onClick={() => goTo(back)} className="text-muted-foreground hover:text-pink text-sm">← {backLabel}</button>
      <span className="flex-1" />
      <span className="text-xs font-bold text-muted-foreground">{state.name}</span>
      <span className="text-sm font-display text-pink">{totalScore} ⭐</span>
    </div>
  );

  const MissionScreen = ({ missionIndex }: { missionIndex: number }) => {
    const m = MISSIONS[missionIndex];
    const mNum = m.num;
    const mc = MISSION_COLORS[mNum as keyof typeof MISSION_COLORS];
    const tasksDone = state.tasks[mNum]?.filter(Boolean).length ?? 0;
    const allDone = allMissionTasksDone(mNum);
    // Navigation: welcome → mission1_theory → mission1 → mission2 → mission3 → mission4 → verify
    const nextScreen: Screen = missionIndex < 3
      ? (`mission${missionIndex + 2}` as Screen)
      : "verify";
    const nextLabel = missionIndex < 3
      ? `Siguiente: Misión ${missionIndex + 2}`
      : "Ir a verificación 🔍";
    const prevScreen: Screen = missionIndex === 0
      ? "mission1_theory"
      : (`mission${missionIndex}` as Screen);
    const prevLabel = missionIndex === 0 ? "Teoría de bloques" : `Misión ${missionIndex}`;

    const firstUncompletedIndex = state.tasks[mNum]?.findIndex((done) => !done) ?? 0;

    return (
      <div key={`mission${mNum}`} className="animate-fade-in">
        <NavBar back={prevScreen} backLabel={prevLabel} />

        <MissionHeader
          number={mNum}
          emoji={m.emoji}
          title={m.title}
          subtitle={m.subtitle}
          points={m.points}
          earnedPoints={getMissionScore(mNum)}
          verified={state.verified}
          optional={(m as any).optional}
        />

        <TipBox type="info">{m.intro}</TipBox>

        {(m as any).image && (
          <div className="mt-3 rounded-xl overflow-hidden border border-muted">
            <img src={(m as any).image} alt="Flujo entre pantallas" className="w-full object-contain" />
          </div>
        )}

        <div className="space-y-2 mt-4">
          {m.tasks.map((task, i) => {
            const isLocked = i > 0 && !state.tasks[mNum]?.[i - 1] && !(task as any).optional;
            const isExpanded = i === firstUncompletedIndex;
            const showListExplanation = (m as any).showListExplanationBeforeTask === i;

            return (
              <div key={i}>
                {showListExplanation && state.tasks[mNum]?.[i - 1] && (
                  <ListExplanation />
                )}
                <TaskItem
                  index={i}
                  checked={state.tasks[mNum]?.[i] ?? false}
                  onToggle={() => toggleTask(mNum, i)}
                  name={task.name}
                  description={task.desc}
                  tip={task.tip}
                  points={task.pts}
                  color={mc.color}
                  colorLight={mc.light}
                  locked={isLocked}
                  expanded={isExpanded}
                />
              </div>
            );
          })}
        </div>

        <HintBox
          hints={m.hints}
          costs={m.hintCosts}
          usedHints={state.hints[mNum] || [false, false, false]}
          onUseHint={(i) => useHint(mNum, i)}
          missionColor={mc.color}
        />

        <ProgressBar current={tasksDone} max={m.tasks.length} />

        {allDone && (
          <div className="animate-bounce-in text-center my-4">
            <span className="text-3xl">{m.emoji}✅</span>
            <p className="font-display text-sm mt-1" style={{ color: mc.color }}>¡Todos los pasos completados!</p>
          </div>
        )}

        <div className="mt-6">
          <ContinueButton onClick={() => goTo(nextScreen)} label={nextLabel} disabled={!allDone} />
          {!allDone && (
            <p className="text-xs text-center text-muted-foreground mt-2">
              Completa todos los pasos para continuar ({tasksDone}/{m.tasks.length})
            </p>
          )}
        </div>
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-background relative">
      <FloatingEmojis />
      <Confetti active={showConfetti} />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6">

        {/* ══════ BIENVENIDA ══════ */}
        {currentScreen === "welcome" && (
          <div key="welcome" className="animate-fade-in">
            <div
              className="rounded-2xl p-6 text-primary-foreground text-center mb-6"
              style={{ background: "var(--gradient-header)" }}
            >
              <div className="text-2xl mb-2 tracking-widest">⭐ 🚀 ⭐</div>
              <h1 className="font-display text-2xl md:text-3xl mb-1 animate-float">¡Misiones App Inventor!</h1>
              <p className="text-sm opacity-80 mb-4">Tu guía para crear una app increíble paso a paso</p>

              <div className="inline-block rounded-xl px-4 py-3 mb-2" style={{ background: "rgba(255,255,255,0.15)" }}>
                <div className="text-[10px] uppercase tracking-widest opacity-70 mb-1">Programadora</div>
                <input
                  type="text"
                  value={state.name}
                  onChange={(e) => update({ name: e.target.value })}
                  placeholder="Escribe tu nombre..."
                  className="bg-transparent border-b-2 border-primary-foreground/40 text-primary-foreground font-bold text-base w-48 outline-none text-center placeholder:text-primary-foreground/30 placeholder:font-normal"
                />
              </div>
            </div>

            <div className="bg-amber-light rounded-xl px-4 py-3 text-center mb-5 animate-slide-up">
              <p className="font-display text-lg text-amber">🏆 Total: {MAX_SCORE} puntos disponibles</p>
            </div>

            {/* Missions overview */}
            <div className="space-y-3 mb-6">
              {MISSIONS.map((m, i) => {
                const mc = MISSION_COLORS[m.num as keyof typeof MISSION_COLORS];
                return (
                  <div
                    key={m.num}
                    className="rounded-xl p-4 border-2 bg-card animate-slide-up"
                    style={{ borderColor: `${mc.color}33`, animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{m.emoji}</span>
                      <div className="flex-1">
                        <h2 className="font-display text-base" style={{ color: mc.color }}>
                          Misión {m.num} · {m.title}
                        </h2>
                        <p className="text-xs text-muted-foreground">{m.subtitle}</p>
                      </div>
                      <div className="font-display text-lg" style={{ color: mc.color }}>{m.points} ⭐</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <ContinueButton
              onClick={() => goTo("mission1_theory")}
              label="¡Empezar!"
              disabled={!state.name.trim()}
            />
            {!state.name.trim() && (
              <p className="text-xs text-center text-muted-foreground mt-2 animate-wiggle">
                👆 Escribe tu nombre para empezar
              </p>
            )}
          </div>
        )}

        {/* ══════ MISIONES ══════ */}
        {currentScreen === "mission1_theory" && (
          <div key="theory" className="animate-fade-in">
            <NavBar back="welcome" backLabel="Inicio" />
            <BlocksTheory />
            <div className="mt-6">
              <ContinueButton onClick={() => goTo("mission1")} label="¡Vamos a programar! 🧱" />
            </div>
          </div>
        )}
        {currentScreen === "mission1" && <MissionScreen missionIndex={0} />}
        {currentScreen === "mission2" && <MissionScreen missionIndex={1} />}
        {currentScreen === "mission3" && <MissionScreen missionIndex={2} />}
        {currentScreen === "mission4" && <MissionScreen missionIndex={3} />}

        {/* ══════ VERIFICACIÓN ══════ */}
        {currentScreen === "verify" && (
          <div key="verify" className="animate-fade-in">
            <NavBar back="mission4" backLabel="Misión 4" />

            <div className="text-center mb-6">
              <div className="text-5xl mb-2 animate-float">🔍</div>
              <h2 className="font-display text-xl text-pink">Verificación de la mentora</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Pide a tu mentora que revise tu trabajo y confirme
              </p>
            </div>

            {MISSIONS.map((m) => {
              const mc = MISSION_COLORS[m.num as keyof typeof MISSION_COLORS];
              return (
                <div key={m.num} className="mb-4">
                  <h3 className="font-display text-sm mb-2" style={{ color: mc.color }}>
                    Misión {m.num} · {m.emoji} {m.title}
                  </h3>
                  <VerificationBlock
                    items={verifItems[m.num]}
                    checkedItems={state.verif}
                    onVerify={(id) => update({ verif: { ...state.verif, [id]: !state.verif[id] } })}
                    requiresMentor={true}
                  />
                </div>
              );
            })}

            {allVerifDone && (
              <div className="animate-bounce-in">
                <button
                  onClick={handleConfirmAll}
                  className="w-full py-4 rounded-xl font-display text-lg text-primary-foreground transition-all hover:scale-105 hover:shadow-xl"
                  style={{ background: "var(--gradient-header)" }}
                >
                  🏆 ¡Confirmar y dar puntos! 🏆
                </button>
              </div>
            )}
          </div>
        )}

        {/* ══════ RECOMPENSA ══════ */}
        {currentScreen === "reward" && (
          <div key="reward" className="animate-fade-in text-center">
            <div className="py-8">
              <div className="text-6xl mb-4 animate-bounce-in">🏆</div>
              <h2 className="font-display text-2xl md:text-3xl text-pink mb-2 animate-slide-up">
                ¡Felicidades, {state.name}!
              </h2>
              <p className="text-muted-foreground mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                Has completado todas las misiones
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6 max-w-md mx-auto">
                {MISSIONS.map((m, i) => (
                  <div
                    key={m.num}
                    className="rounded-xl p-3 animate-slide-up"
                    style={{ background: `var(--gradient-mission${m.num})`, animationDelay: `${0.3 + i * 0.1}s` }}
                  >
                    <div className="text-primary-foreground text-xs opacity-80">Misión {m.num} {m.emoji}</div>
                    <div className="text-primary-foreground font-display text-xl">{getMissionScore(m.num)} ⭐</div>
                  </div>
                ))}
              </div>

              <div className="animate-slide-up" style={{ animationDelay: "0.7s" }}>
                <div className="inline-block rounded-2xl px-8 py-4" style={{ background: "var(--gradient-reward)" }}>
                  <div className="text-xs font-bold" style={{ color: "#92400E" }}>TOTAL</div>
                  <div className="font-display text-4xl text-amber animate-star-pulse">
                    {totalScore} ⭐
                  </div>
                  <div className="text-xs text-muted-foreground">de {MAX_SCORE}</div>
                </div>
              </div>

              <div className="animate-slide-up" style={{ animationDelay: "0.9s" }}>
                <Diploma name={state.name} totalScore={totalScore} maxScore={MAX_SCORE} visible={true} />
              </div>

              <div className="mt-6 animate-slide-up" style={{ animationDelay: "1.1s" }}>
                <RewardBanner
                  emoji="🎉🌟🎊"
                  title="¡Eres una programadora increíble!"
                  subtitle="Tu app funciona con base de datos y varias pantallas. ¡Eso es programación de verdad!"
                  visible={true}
                />
              </div>

              <button
                onClick={() => goTo("welcome")}
                className="mt-4 text-sm text-muted-foreground underline hover:text-pink transition-colors"
              >
                ← Volver al inicio
              </button>
            </div>
          </div>
        )}

        {/* Reset */}
        <div className="text-center mt-10 mb-4">
          <button
            onClick={() => {
              if (window.confirm("¿Segura que quieres borrar todo el progreso?")) {
                setState(defaultState);
              }
            }}
            className="text-[10px] text-muted-foreground/50 hover:text-destructive transition-colors"
          >
            🗑️ Reiniciar ficha
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
