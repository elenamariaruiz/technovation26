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

const STORAGE_KEY = "misiones-appinventor";

type Screen = "welcome" | "mission1" | "mission2" | "mission3_theory" | "mission3" | "mission4" | "verify" | "reward";

// Mission colors as raw CSS values
const MISSION_COLORS = {
  1: { color: "#E11D6D", light: "hsl(340 100% 97%)" },
  2: { color: "#B35CFF", light: "hsl(270 100% 97%)" },
  3: { color: "#3B8BF5", light: "hsl(213 95% 95%)" },
  4: { color: "#0CAE82", light: "hsl(160 80% 95%)" },
};

// Task definitions per mission
const MISSIONS = [
  {
    num: 1, emoji: "🎨", title: "Diseño de la Pantalla Inicial", subtitle: "¡Tu primera pantalla! · 25 pts",
    points: 25, intro: "¡Esta es tu primera pantalla! Aquí aparecerá la lista de reportes. Vamos a construirla juntando piezas como si fuera un puzzle 🧩",
    tasks: [
      { name: "📱 Tarea 1 — Crea una nueva pantalla", desc: 'Asegúrate de que la pantalla se llama <strong>Screen1</strong>. Si ya existe, ¡genial, ya tienes un punto!', tip: 'Mira arriba en "Screens" y comprueba el nombre.', pts: 5 },
      { name: "📋 Tarea 2 — Añade una DisposiciónVertical", desc: 'Arrastra una <strong>DisposiciónVertical</strong> al centro de la pantalla. Esto es como el esqueleto que ordena todo.', tip: 'Está en la sección "Disposición" del panel de componentes.', pts: 5 },
      { name: "📜 Tarea 3 — Añade un VisorDeLista", desc: 'Dentro de la disposición, arrastra un <strong>VisorDeLista</strong>. Aquí es donde aparecerán los reportes guardados.', tip: 'Está en la sección "Interfaz de Usuario".', pts: 5 },
      { name: '🔘 Tarea 4 — Añade el botón "Crear Reporte"', desc: 'Arrastra un <strong>Botón</strong> debajo del visor. Cámbiale el texto a <em>"Crear Reporte"</em> y ponle el nombre <strong>btn_crear_reporte</strong>.', tip: 'Cambia el nombre en "Propiedades" → "Nombre del componente".', pts: 5 },
      { name: "🗄️ Tarea 5 — Añade TinyBD (base de datos)", desc: 'Arrastra un componente <strong>TinyBD</strong> a la pantalla. Aparecerá abajo en la zona de componentes invisibles. ¡Este guardará todos los datos!', tip: 'Está en la sección "Almacenamiento".', pts: 5 },
    ],
    hints: [
      "La DisposiciónVertical está en el panel izquierdo → sección Disposición. Arrástrala al centro del teléfono.",
      "El VisorDeLista se encuentra en Interfaz de Usuario. Arrástralo DENTRO de la DisposiciónVertical.",
      "Para renombrar el botón: selecciónalo → abajo a la derecha en Propiedades → cambia el campo 'Renombrar'.",
    ],
    hintCosts: [5, 5, 10],
  },
  {
    num: 2, emoji: "✏️", title: "Diseño de la Pantalla Crear Reporte", subtitle: "Opcional · Solo si no la tienes aún · 20 pts",
    points: 20, optional: true,
    intro: "Esta es la pantalla donde se escribe un nuevo reporte. ¡Es como rellenar una ficha especial! Si ya la tienes hecha, ¡suma los 20 puntos directamente! 🎉",
    tasks: [
      { name: "➕ Tarea 1 — Crea la pantalla nueva", desc: 'Pulsa el botón <strong>"+"</strong> en la parte superior (junto a "Screens") y llama a la nueva pantalla exactamente <strong>CrearReporte</strong>.', tip: "¡Las mayúsculas y minúsculas importan!", pts: 4 },
      { name: "🏷️ Tarea 2 — Añade etiquetas y campos de texto", desc: 'Coloca <strong>Etiqueta1</strong> + <strong>CampoDeTexto1</strong> para el título, y <strong>Etiqueta2</strong> + <strong>CampoDeTexto2</strong> para la localización.', tip: 'Cambia el texto de las etiquetas a "Título" y "Localización".', pts: 5 },
      { name: "📸 Tarea 3 — Añade el SelectorDeImagen", desc: 'Arrastra un <strong>SelectorDeImagen</strong> para que la usuaria pueda elegir una foto del reporte.', tip: 'Está en "Multimedia".', pts: 4 },
      { name: "💾 Tarea 4 — Añade el botón de guardar y la TinyBD", desc: 'Añade un <strong>Botón</strong> con el texto "Añadir" y un componente <strong>TinyBD</strong> invisible. También necesitas un <strong>VisorDeLista</strong> invisible para crear los elementos.', tip: "El VisorDeLista puede estar oculto; solo lo usamos para sus bloques.", pts: 7 },
    ],
    hints: [
      'Para crear la pantalla: arriba en la barra, junto a "Screen1", hay un botón "+". Escribe exactamente CrearReporte.',
      "Las Etiquetas y CamposDeTexto están en Interfaz de Usuario. Pon primero la Etiqueta y debajo el CampoDeTexto.",
      'El SelectorDeImagen está en la sección "Multimedia" del panel izquierdo.',
    ],
    hintCosts: [5, 5, 10],
  },
  {
    num: 3, emoji: "⚙️", title: "Programación de CrearReporte", subtitle: "Editor de bloques · 25 pts",
    points: 25,
    intro: "¡Hora de dar vida a los bloques! Ve a la pantalla CrearReporte y abre el editor de bloques. Vamos a decirle a la app qué hacer cuando alguien añade un reporte 🧱",
    tasks: [
      { name: '📦 Tarea 1 — Crea la variable global "lista"', desc: 'En "Variables", crea un bloque <strong>inicializar global lista como</strong> y ponle una <em>lista vacía</em> como valor inicial.', tip: 'La lista vacía está en "Listas" → "crear una lista vacía".', pts: 5 },
      { name: '🔌 Tarea 2 — Bloque "Al inicializar CrearReporte"', desc: 'Crea el bloque <strong>cuando CrearReporte.Inicializar</strong>. Dentro, pon la variable <em>lista</em> igual a lo que devuelve <strong>TinyBD1.ObtenerValor</strong> con etiqueta <em>"Actividades"</em> y valor por defecto <em>lista vacía</em>.', tip: "Así cargamos los reportes que ya existían antes.", pts: 5 },
      { name: "🔍 Tarea 3 — Comprueba que el campo no está vacío", desc: 'En el bloque <strong>cuando Botón1.Clic</strong>, añade un <em>si</em> que compruebe que <strong>CampoDeTexto1.Texto ≠ ""</strong> (vacío). Solo si hay texto, hacemos el resto.', tip: 'El bloque "≠" está en "Lógica".', pts: 5 },
      { name: "➕ Tarea 4 — Añade el nuevo reporte a la lista", desc: 'Dentro del <em>entonces</em>, usa <strong>insertar elemento en lista</strong> con índice = longitud de la lista + 1, y como elemento <strong>VisorDeLista1.CrearElemento</strong> con textoPrincipal, textoDetalle y nombreImagen de los campos de texto.', tip: "textoPrincipal = CampoDeTexto1.Texto, textoDetalle = CampoDeTexto2.Texto.", pts: 5 },
      { name: "💾 Tarea 5 — Guarda y cierra la pantalla", desc: 'Después de insertar el elemento, usa <strong>TinyBD1.GuardarValor</strong> con etiqueta <em>"Actividades"</em> y valor la variable <em>lista</em>. Por último añade el bloque <strong>cerrar pantalla</strong>.', tip: "¡El orden importa! Primero guardar, luego cerrar.", pts: 5 },
    ],
    hints: [
      'Para crear la variable: en el panel izquierdo, clica "Variables" y arrastra "inicializar global nombre como". Cambia "nombre" por "lista".',
      'El bloque "cuando CrearReporte.Inicializar" está en el panel izquierdo si clicas en "CrearReporte". Dentro, usa "poner global lista como" y conecta TinyBD1.ObtenerValor.',
      'Para insertar en lista: ve a "Listas" → "insertar elemento en lista". El índice es "longitud de lista" + 1.',
    ],
    hintCosts: [5, 5, 10],
  },
  {
    num: 4, emoji: "🏠", title: "Programación de la Pantalla Inicial", subtitle: "¡La última misión! · 30 pts",
    points: 30,
    intro: "¡La última misión! Vuelve a Screen1 y abre los bloques. Aquí haremos que la lista se cargue sola al entrar y que el botón abra la segunda pantalla 🏁",
    tasks: [
      { name: '📦 Tarea 1 — Crea la variable "listaReportes"', desc: 'Crea un bloque <strong>inicializar global listaReportes como</strong> con una lista vacía. Esta guardará todos los reportes mientras la app está abierta.', tip: "Es igual que hiciste en la misión anterior pero con otro nombre.", pts: 5 },
      { name: '🔌 Tarea 2 — Bloque "Al inicializar Screen1"', desc: 'Crea el bloque <strong>cuando Screen1.Inicializar</strong>. Carga la lista desde TinyBD con etiqueta <em>"Actividades"</em>. Si está vacía, añade dos ejemplos ("Basura en la Playa / A Coruña" y "Señal Rota / Arteixo"). Al final, muéstralos con <strong>VisorDeLista1.AddItems</strong>.', tip: 'Usa el bloque "¿está vacía la lista?" para comprobar si hay datos.', pts: 10 },
      { name: "🔘 Tarea 3 — Botón para abrir la segunda pantalla", desc: 'Crea el bloque <strong>cuando btn_crear_reporte.Clic</strong> y dentro usa <strong>abrir otra pantalla</strong> con el nombre <em>"CrearReporte"</em>.', tip: "El nombre debe ser exactamente igual al de la pantalla, ¡con mayúsculas!", pts: 5 },
      { name: "🔄 Tarea 4 — Recarga la lista al volver", desc: 'Crea el bloque <strong>cuando Screen1.OtraPantallaCerrada</strong>. Dentro, vuelve a leer TinyBD y actualiza <strong>VisorDeLista1.AddItems</strong> con la lista nueva para que aparezca el reporte recién creado.', tip: 'Este bloque es el "truco" que hace que la app se actualice sola al volver.', pts: 10 },
    ],
    hints: [
      'Para crear la variable global: "Variables" → arrastra "inicializar global nombre como" y cámbialo a "listaReportes".',
      'En el bloque Inicializar, usa "si está vacía la lista" de la sección "Listas". Para añadir ejemplos, usa "insertar elemento en lista" dos veces.',
      'El bloque "cuando Screen1.OtraPantallaCerrada" está en el panel izquierdo al clicar en Screen1. Es casi igual que el bloque Inicializar.',
    ],
    hintCosts: [5, 5, 10],
  },
];

const MAX_SCORE = MISSIONS.reduce((sum, m) => sum + m.points, 0); // 100

// Verification items per mission
const verifItems: Record<number, { id: string; text: string }[]> = {
  1: [
    { id: "v1_1", text: "Screen1 tiene una DisposiciónVertical con un VisorDeLista dentro" },
    { id: "v1_2", text: "El botón 'Crear Reporte' (btn_crear_reporte) aparece debajo del visor" },
    { id: "v1_3", text: "El componente TinyBD aparece en la zona de componentes invisibles" },
  ],
  2: [
    { id: "v2_1", text: "Existe la pantalla CrearReporte con etiquetas y campos de texto" },
    { id: "v2_2", text: "Hay un SelectorDeImagen y un botón 'Añadir'" },
    { id: "v2_3", text: "TinyBD y VisorDeLista invisibles están presentes" },
  ],
  3: [
    { id: "v3_1", text: "La variable global 'lista' se inicializa con lista vacía" },
    { id: "v3_2", text: "Al inicializar la pantalla se cargan los datos de TinyBD" },
    { id: "v3_3", text: "Al pulsar el botón: comprueba campo, inserta en lista, guarda y cierra" },
  ],
  4: [
    { id: "v4_1", text: "Variable 'listaReportes' existe con lista vacía" },
    { id: "v4_2", text: "Al inicializar Screen1 se cargan datos y se muestran ejemplos si está vacía" },
    { id: "v4_3", text: "El botón abre CrearReporte y al volver se recarga la lista" },
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
    2: [false, false, false, false],
    3: [false, false, false, false, false],
    4: [false, false, false, false],
  },
  hints: {
    1: [false, false, false],
    2: [false, false, false],
    3: [false, false, false],
    4: [false, false, false],
  },
  verif: {},
  verified: false,
};

const Index = () => {
  const [state, setState] = useState<State>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState;
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
    const tasks = { ...state.tasks, [mission]: [...state.tasks[mission]] };
    tasks[mission][i] = !tasks[mission][i];
    update({ tasks });
  };

  const useHint = (mission: number, i: number) => {
    const hints = { ...state.hints, [mission]: [...state.hints[mission]] };
    hints[mission][i] = true;
    update({ hints });
  };

  // Calculate scores
  const getMissionScore = (mNum: number) => {
    const mission = MISSIONS[mNum - 1];
    const taskPts = mission.tasks.reduce((sum, t, i) => sum + (state.tasks[mNum]?.[i] ? t.pts : 0), 0);
    const hintPenalty = (state.hints[mNum] || []).reduce((sum, used, i) => sum + (used ? mission.hintCosts[i] : 0), 0);
    return Math.max(0, taskPts - hintPenalty);
  };

  const totalScore = state.verified
    ? Math.max(0, MISSIONS.reduce((sum, m) => sum + m.points, 0) - [1, 2, 3, 4].reduce((sum, n) => sum + (state.hints[n] || []).reduce((s, used, i) => s + (used ? MISSIONS[n - 1].hintCosts[i] : 0), 0), 0))
    : [1, 2, 3, 4].reduce((sum, n) => sum + getMissionScore(n), 0);

  const allMissionTasksDone = (mNum: number) => state.tasks[mNum]?.every(Boolean) ?? false;

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
    const nextScreen: Screen = missionIndex === 1
      ? "mission3_theory"
      : missionIndex < 3
        ? (`mission${missionIndex + 2}` as Screen)
        : "verify";
    const nextLabel = missionIndex < 3
      ? `Siguiente: Misión ${missionIndex + 2}`
      : "Ir a verificación 🔍";
    const prevScreen: Screen = missionIndex === 2
      ? "mission3_theory"
      : missionIndex > 0
        ? (`mission${missionIndex}` as Screen)
        : "welcome";
    const prevLabel = missionIndex === 2 ? "Teoría de bloques" : missionIndex > 0 ? `Misión ${missionIndex}` : "Inicio";

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
          optional={m.optional}
        />

        <TipBox type="info">{m.intro}</TipBox>

        <div className="space-y-2 mt-4">
          {m.tasks.map((task, i) => {
            const isLocked = i > 0 && !state.tasks[mNum]?.[i - 1];
            const isExpanded = i === firstUncompletedIndex;

            return (
              <TaskItem
                key={i}
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
          optional={m.optional}
        />

        <TipBox type="info">{m.intro}</TipBox>

        <div className="space-y-2 mt-4">
          {m.tasks.map((task, i) => (
            <TaskItem
              key={i}
              checked={state.tasks[mNum]?.[i] ?? false}
              onToggle={() => toggleTask(mNum, i)}
              name={task.name}
              description={task.desc}
              tip={task.tip}
              points={task.pts}
              color={mc.color}
              colorLight={mc.light}
            />
          ))}
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
              onClick={() => goTo("mission1")}
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
        {currentScreen === "mission1" && <MissionScreen missionIndex={0} />}
        {currentScreen === "mission2" && <MissionScreen missionIndex={1} />}
        {currentScreen === "mission3_theory" && (
          <div key="theory" className="animate-fade-in">
            <NavBar back="mission2" backLabel="Misión 2" />
            <BlocksTheory />
            <div className="mt-6">
              <ContinueButton onClick={() => goTo("mission3")} label="¡Vamos a programar! 🧱" />
            </div>
          </div>
        )}
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
