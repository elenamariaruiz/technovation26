import { useState, useEffect } from "react";
import FichaHeader from "@/components/FichaHeader";
import MissionHeader from "@/components/MissionHeader";
import StepItem from "@/components/StepItem";
import VerificationBlock from "@/components/VerificationBlock";
import RewardBanner from "@/components/RewardBanner";
import SectionTitle from "@/components/SectionTitle";
import TipBox from "@/components/TipBox";
import CodeBlock from "@/components/CodeBlock";
import PhoneMockup from "@/components/PhoneMockup";
import ComponentTree from "@/components/ComponentTree";
import DataListsVisual from "@/components/DataListsVisual";
import Diploma from "@/components/Diploma";
import FloatingEmojis from "@/components/FloatingEmojis";
import ProgressBar from "@/components/ProgressBar";
import ContinueButton from "@/components/ContinueButton";
import Confetti from "@/components/Confetti";

const STORAGE_KEY = "ficha-pantalla-principal";

type Screen = "welcome" | "mission1" | "mission2" | "verify" | "reward";

interface State {
  name: string;
  currentScreen: Screen;
  m1Steps: boolean[];
  m1Verif: Record<string, boolean>;
  m1Verified: boolean;
  m2Steps: boolean[];
  m2Confirm: boolean;
  m2Verif: Record<string, boolean>;
  m2Verified: boolean;
}

const defaultState: State = {
  name: "",
  currentScreen: "welcome",
  m1Steps: [false, false, false, false, false, false],
  m1Verif: {},
  m1Verified: false,
  m2Steps: [false, false],
  m2Confirm: false,
  m2Verif: {},
  m2Verified: false,
};

const m1VerifItems = [
  { id: "v1_1", text: "En el árbol de componentes ves ContenedorLista dentro de ContenedorPrincipal" },
  { id: "v1_2", text: "El botón BotonAnyadir aparece en la pantalla del teléfono, en la parte de abajo" },
  { id: "v1_3", text: "En la zona gris inferior aparecen DynamicComponents1 y BaseDatos" },
];

const m2VerifItems = [
  { id: "v2_1", text: "Conecta el móvil: menú Connect → AI Companion y escanea el QR" },
  { id: "v2_2", text: "La app abre y aparecen las 3 actividades de ejemplo (Dibujo, Fútbol, Lectura)" },
  { id: "v2_3", text: "Pulsas + Añadir actividad y se abre el formulario" },
  { id: "v2_4", text: "Escribes nombre y categoría, guardas, y la nueva actividad aparece en la lista" },
  { id: "v2_5", text: "Cierras la app, la vuelves a abrir y la actividad nueva sigue ahí ✅" },
];

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

  const toggleM1Step = (i: number) => {
    const steps = [...state.m1Steps];
    steps[i] = !steps[i];
    update({ m1Steps: steps });
  };
  const toggleM2Step = (i: number) => {
    const steps = [...state.m2Steps];
    steps[i] = !steps[i];
    update({ m2Steps: steps });
  };

  // Score
  const m1StepsDone = state.m1Steps.filter(Boolean).length;
  const m1VerifDone = Object.values(state.m1Verif).filter(Boolean).length;
  const m1Points = state.m1Verified ? 100 : Math.round(((m1StepsDone + m1VerifDone) / 9) * 80);

  const m2StepsDone = state.m2Steps.filter(Boolean).length + (state.m2Confirm ? 1 : 0);
  const m2VerifDone = Object.values(state.m2Verif).filter(Boolean).length;
  const m2Points = state.m2Verified ? 200 : Math.round(((m2StepsDone + m2VerifDone) / 8) * 160);

  const totalScore = m1Points + m2Points;
  const m1AllSteps = state.m1Steps.every(Boolean);
  const m2AllSteps = state.m2Steps.every(Boolean) && state.m2Confirm;

  const handleConfirmBoth = () => {
    update({ m1Verified: true, m2Verified: true });
    setShowConfetti(true);
    setTimeout(() => {
      goTo("reward");
      setTimeout(() => setShowConfetti(false), 4000);
    }, 500);
  };

  const { currentScreen } = state;

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingEmojis />
      <Confetti active={showConfetti} />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6">

        {/* ══════ PANTALLA BIENVENIDA ══════ */}
        {currentScreen === "welcome" && (
          <div key="welcome" className="animate-fade-in">
            <div
              className="rounded-2xl p-6 text-primary-foreground text-center mb-6"
              style={{ background: "var(--gradient-header)" }}
            >
              <div className="text-5xl mb-3 animate-float">📱</div>
              <h1 className="font-display text-2xl md:text-3xl mb-1">Pantalla Principal</h1>
              <p className="text-sm opacity-80 mb-4">Misión 1: Diseño · Misión 2: Programación</p>

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

            {/* Missions overview */}
            <div className="space-y-3 mb-6">
              <div className="rounded-xl p-4 border-2 border-primary/20 bg-card animate-slide-up">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🎨</span>
                  <div className="flex-1">
                    <h2 className="font-display text-base text-primary">Misión 1 · Diseñar la pantalla</h2>
                    <p className="text-xs text-muted-foreground">Colocar los componentes en el Designer · ≈ 15 min</p>
                  </div>
                  <div className="font-display text-lg text-amber">+100 ⭐</div>
                </div>
              </div>

              <div className="rounded-xl p-4 border-2 border-accent/20 bg-card animate-slide-up" style={{ animationDelay: "0.15s" }}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🧠</span>
                  <div className="flex-1">
                    <h2 className="font-display text-base text-accent">Misión 2 · Programar la pantalla</h2>
                    <p className="text-xs text-muted-foreground">Editor de Bloques de Screen1 · ≈ 30 min</p>
                  </div>
                  <div className="font-display text-lg text-amber">+200 ⭐</div>
                </div>
              </div>
            </div>

            <div className="bg-amber-light rounded-xl p-4 text-center mb-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <p className="text-sm font-bold" style={{ color: "#78350F" }}>
                🌟 Completa las dos misiones y consigue hasta <span className="font-display text-lg text-amber">300 ⭐</span>
              </p>
              <p className="text-xs mt-1" style={{ color: "#92400E" }}>
                Al final, tu mentora verificará tu trabajo y recibirás tu certificado de programadora
              </p>
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

        {/* ══════ MISIÓN 1 ══════ */}
        {currentScreen === "mission1" && (
          <div key="mission1" className="animate-fade-in">
            {/* Mini header */}
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => goTo("welcome")} className="text-muted-foreground hover:text-primary text-sm">← Inicio</button>
              <span className="flex-1" />
              <span className="text-xs font-bold text-muted-foreground">{state.name}</span>
              <span className="text-sm font-display text-amber">{totalScore} ⭐</span>
            </div>

            <MissionHeader
              number={1}
              emoji="🎨"
              title="Diseñar la pantalla"
              subtitle="Colocar los componentes en el Designer · ≈ 15 min"
              points={100}
              earnedPoints={m1Points}
              verified={state.m1Verified}
            />

            <PhoneMockup />

            <SectionTitle emoji="🧩" title="Estructura de componentes" />
            <ComponentTree />

            <SectionTitle emoji="📋" title="Pasos a seguir" />
            <ul className="list-none p-0">
              {[
                <>Haz clic en <strong className="text-primary">Screen1</strong> (panel derecho) y cambia: <span className="bg-blue-light text-accent rounded px-1 text-xs font-bold">Title</span> → <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">Mis Actividades</code></>,
                <>Desde <span className="bg-amber-light rounded px-1 text-xs font-bold" style={{ color: "#92400E" }}>Layout</span>, arrastra <strong className="text-primary">VerticalArrangement</strong> → renómbralo <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">ContenedorPrincipal</code></>,
                <>Dentro, arrastra <strong className="text-primary">VerticalScrollArrangement</strong> → <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">ContenedorLista</code></>,
                <>Debajo de la lista, arrastra <strong className="text-primary">Button</strong> → <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">BotonAnyadir</code> · Text: <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">+ Añadir actividad</code></>,
                <>Desde <span className="bg-amber-light rounded px-1 text-xs font-bold" style={{ color: "#92400E" }}>Extensions</span>, arrastra <strong className="text-primary">DynamicComponents</strong> (zona gris)</>,
                <>Desde <span className="bg-amber-light rounded px-1 text-xs font-bold" style={{ color: "#92400E" }}>Storage</span>, arrastra <strong className="text-primary">TinyDB</strong> → renómbralo <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">BaseDatos</code></>,
              ].map((content, i) => (
                <StepItem key={i} checked={state.m1Steps[i]} onToggle={() => toggleM1Step(i)}>
                  {content}
                </StepItem>
              ))}
            </ul>

            <TipBox>El <strong>VerticalScrollArrangement</strong> es como el VerticalArrangement normal pero con scroll, así la lista puede crecer sin cortarse.</TipBox>

            <ProgressBar current={m1StepsDone} max={6} />

            {m1AllSteps && (
              <div className="animate-bounce-in text-center my-4">
                <span className="text-3xl">🎨✅</span>
                <p className="font-display text-primary text-sm mt-1">¡Todos los pasos completados!</p>
              </div>
            )}

            <div className="mt-6">
              <ContinueButton
                onClick={() => goTo("mission2")}
                label="Siguiente: Misión 2"
                disabled={!m1AllSteps}
              />
              {!m1AllSteps && (
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Completa todos los pasos para continuar ({m1StepsDone}/6)
                </p>
              )}
            </div>
          </div>
        )}

        {/* ══════ MISIÓN 2 ══════ */}
        {currentScreen === "mission2" && (
          <div key="mission2" className="animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => goTo("mission1")} className="text-muted-foreground hover:text-primary text-sm">← Misión 1</button>
              <span className="flex-1" />
              <span className="text-xs font-bold text-muted-foreground">{state.name}</span>
              <span className="text-sm font-display text-amber">{totalScore} ⭐</span>
            </div>

            <MissionHeader
              number={2}
              emoji="🧠"
              title="Programar la pantalla"
              subtitle="Editor de Bloques de Screen1 · ≈ 30 min"
              points={200}
              earnedPoints={m2Points}
              verified={state.m2Verified}
            />

            <TipBox type="info">Haz clic en <strong>Blocks</strong> (arriba a la derecha). Asegúrate de estar en <strong>Screen1</strong>.</TipBox>

            {/* Paso 1 */}
            <SectionTitle emoji="📦" title="Paso 1 · Las 3 listas de datos" />
            <p className="text-xs mb-2">La app guarda los datos en <strong>3 listas paralelas</strong>:</p>
            <DataListsVisual />
            <ul className="list-none p-0">
              <StepItem checked={state.m2Steps[0]} onToggle={() => toggleM2Step(0)}>
                Ve a <span className="bg-amber-light rounded px-1 text-xs font-bold" style={{ color: "#92400E" }}>Variables</span> → crea 3 variables globales: <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">listaNombres</code>, <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">listaCategorias</code>, <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">listaFotos</code>
              </StepItem>
            </ul>

            {/* Paso 2 */}
            <SectionTitle emoji="🚀" title='Paso 2 · "cuando Screen1 se abre"' />
            <CodeBlock>
              <div className="text-muted-foreground/60">① Cargar las listas desde TinyDB</div>
              <div><span className="text-primary font-bold">set</span> listaNombres ← BaseDatos.<span className="text-amber-mid">GetValue</span> tag: <span className="text-success-mid">"nombres"</span></div>
              <div><span className="text-primary font-bold">set</span> listaCategorias ← BaseDatos.<span className="text-amber-mid">GetValue</span> tag: <span className="text-success-mid">"categorias"</span></div>
              <div><span className="text-primary font-bold">set</span> listaFotos ← BaseDatos.<span className="text-amber-mid">GetValue</span> tag: <span className="text-success-mid">"fotos"</span></div>
              <br />
              <div className="text-muted-foreground/60">② Si no hay datos → poner ejemplos</div>
              <div><span className="text-primary font-bold">if</span> length = 0 <span className="text-primary font-bold">then</span> añadir Dibujo, Fútbol, Lectura</div>
              <br />
              <div className="text-muted-foreground/60">③ Dibujar</div>
              <div><span className="text-primary font-bold">call</span> <span className="text-amber-mid">DibujarLista</span></div>
            </CodeBlock>

            {/* Paso 3 */}
            <SectionTitle emoji="🔄" title='Paso 3 · "cuando vuelves del formulario"' />
            <CodeBlock>
              <div><span className="text-primary font-bold">when</span> Screen1.<span className="text-amber-mid">OtherScreenClosed</span>:</div>
              <div className="pl-4">Recargar las 3 listas + <span className="text-primary font-bold">call</span> <span className="text-amber-mid">DibujarLista</span></div>
            </CodeBlock>

            {/* Paso 4 */}
            <SectionTitle emoji="🔘" title="Paso 4 · Botón Añadir" />
            <ul className="list-none p-0">
              <StepItem checked={state.m2Steps[1]} onToggle={() => toggleM2Step(1)}>
                <span className="bg-destructive/20 text-destructive rounded px-1 text-xs font-bold font-mono">BotonAnyadir.Click</span> → <span className="bg-blue-light text-accent rounded px-1 text-xs font-bold font-mono">open another screen</span>: <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">"PantallaFormulario"</code>
              </StepItem>
            </ul>

            {/* Paso 5 - DibujarLista */}
            <SectionTitle emoji="🏗️" title="Paso 5 · Procedimiento DibujarLista" />
            <TipBox>Borra las tarjetas viejas y las vuelve a crear desde cero cada vez.</TipBox>
            <CodeBlock>
              <div>DynamicComponents1.<span className="text-amber-mid">DeleteAllComponents</span> in: ContenedorLista</div>
              <br />
              <div><span className="text-primary font-bold">for each</span> número from 1 to length of listaNombres:</div>
              <div className="pl-4">Create <span className="text-success-mid">"HorizontalArrangement"</span> → ID: <span className="text-amber-mid">join</span> <span className="text-success-mid">"fila_"</span> número</div>
              <div className="pl-4">Create <span className="text-success-mid">"Image"</span> → ID: <span className="text-amber-mid">join</span> <span className="text-success-mid">"img_"</span> número</div>
              <div className="pl-4">Create <span className="text-success-mid">"Label"</span> ×2 (nombre + categoría)</div>
            </CodeBlock>

            <TipBox><code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">join "fila_" 2</code> produce <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">"fila_2"</code>. ¡Cada tarjeta con nombre único!</TipBox>

            <div className="flex items-center gap-2 my-4 p-3 bg-muted rounded-lg">
              <input
                type="checkbox"
                checked={state.m2Confirm}
                onChange={() => update({ m2Confirm: !state.m2Confirm })}
                className="w-5 h-5 accent-success cursor-pointer"
              />
              <span className="text-sm font-bold">¿Has creado todos los bloques?</span>
              {state.m2Confirm && <span className="text-lg animate-bounce-in">🎉</span>}
            </div>

            <ProgressBar current={m2StepsDone + m2VerifDone} max={8} />

            <div className="mt-6">
              <ContinueButton
                onClick={() => goTo("verify")}
                label="Ir a verificación 🔍"
                disabled={!m2AllSteps}
              />
              {!m2AllSteps && (
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Completa todos los pasos para continuar
                </p>
              )}
            </div>
          </div>
        )}

        {/* ══════ VERIFICACIÓN ══════ */}
        {currentScreen === "verify" && (
          <div key="verify" className="animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => goTo("mission2")} className="text-muted-foreground hover:text-primary text-sm">← Misión 2</button>
              <span className="flex-1" />
              <span className="text-xs font-bold text-muted-foreground">{state.name}</span>
              <span className="text-sm font-display text-amber">{totalScore} ⭐</span>
            </div>

            <div className="text-center mb-6">
              <div className="text-5xl mb-2 animate-float">🔍</div>
              <h2 className="font-display text-xl text-primary">Verificación de la mentora</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Pide a tu mentora que revise tu trabajo y confirme
              </p>
            </div>

            <div className="mb-4">
              <h3 className="font-display text-sm text-primary mb-2">Misión 1 · Diseño 🎨</h3>
              <VerificationBlock
                items={m1VerifItems}
                checkedItems={state.m1Verif}
                onVerify={(id) => update({ m1Verif: { ...state.m1Verif, [id]: !state.m1Verif[id] } })}
                requiresMentor={true}
              />
            </div>

            <div className="mb-6">
              <h3 className="font-display text-sm text-accent mb-2">Misión 2 · Programación 🧠</h3>
              <VerificationBlock
                items={m2VerifItems}
                checkedItems={state.m2Verif}
                onVerify={(id) => update({ m2Verif: { ...state.m2Verif, [id]: !state.m2Verif[id] } })}
                requiresMentor={true}
              />
            </div>

            {m1VerifItems.every((i) => state.m1Verif[i.id]) &&
              m2VerifItems.every((i) => state.m2Verif[i.id]) && (
                <div className="animate-bounce-in">
                  <button
                    onClick={handleConfirmBoth}
                    className="w-full py-4 rounded-xl font-display text-lg text-primary-foreground transition-all hover:scale-105 hover:shadow-xl"
                    style={{ background: "var(--gradient-header)" }}
                  >
                    🏆 ¡Confirmar y dar puntos! 🏆
                  </button>
                </div>
              )}
          </div>
        )}

        {/* ══════ RECOMPENSA FINAL ══════ */}
        {currentScreen === "reward" && (
          <div key="reward" className="animate-fade-in text-center">
            <div className="py-8">
              <div className="text-6xl mb-4 animate-bounce-in">🏆</div>
              <h2 className="font-display text-2xl md:text-3xl text-primary mb-2 animate-slide-up">
                ¡Felicidades, {state.name}!
              </h2>
              <p className="text-muted-foreground mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                Has completado todas las misiones
              </p>

              {/* Score cards */}
              <div className="grid grid-cols-2 gap-3 mb-6 max-w-sm mx-auto">
                <div className="rounded-xl p-4 animate-slide-up" style={{ background: "var(--gradient-mission1)", animationDelay: "0.3s" }}>
                  <div className="text-primary-foreground text-xs opacity-80">Misión 1</div>
                  <div className="text-primary-foreground font-display text-2xl">100 ⭐</div>
                </div>
                <div className="rounded-xl p-4 animate-slide-up" style={{ background: "var(--gradient-mission2)", animationDelay: "0.4s" }}>
                  <div className="text-primary-foreground text-xs opacity-80">Misión 2</div>
                  <div className="text-primary-foreground font-display text-2xl">200 ⭐</div>
                </div>
              </div>

              <div className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
                <div className="inline-block rounded-2xl px-8 py-4" style={{ background: "var(--gradient-reward)" }}>
                  <div className="text-xs font-bold" style={{ color: "#92400E" }}>TOTAL</div>
                  <div className="font-display text-4xl text-amber animate-star-pulse">
                    {totalScore} ⭐
                  </div>
                </div>
              </div>

              <div className="animate-slide-up" style={{ animationDelay: "0.7s" }}>
                <Diploma name={state.name} totalScore={totalScore} visible={true} />
              </div>

              <div className="mt-6 animate-slide-up" style={{ animationDelay: "0.9s" }}>
                <RewardBanner
                  emoji="🎉🌟🎊"
                  title="¡Eres una programadora increíble!"
                  subtitle="Tu app funciona con base de datos y componentes dinámicos. ¡Eso es programación de verdad!"
                  visible={true}
                />
              </div>

              <button
                onClick={() => goTo("welcome")}
                className="mt-4 text-sm text-muted-foreground underline hover:text-primary transition-colors"
              >
                ← Volver al inicio
              </button>
            </div>
          </div>
        )}

        {/* Reset siempre visible */}
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
