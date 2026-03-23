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

const STORAGE_KEY = "ficha-pantalla-principal";

interface State {
  name: string;
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
  m1Steps: [false, false, false, false, false, false],
  m1Verif: {},
  m1Verified: false,
  m2Steps: [false, false],
  m2Confirm: false,
  m2Verif: {},
  m2Verified: false,
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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const update = (partial: Partial<State>) => setState((s) => ({ ...s, ...partial }));

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

  // Score calculation
  const m1StepsDone = state.m1Steps.filter(Boolean).length;
  const m1VerifDone = Object.values(state.m1Verif).filter(Boolean).length;
  const m1Total = m1StepsDone + m1VerifDone; // 6 steps + 3 verif = 9
  const m1MaxItems = 9;
  const m1Points = state.m1Verified ? 100 : Math.round((m1Total / m1MaxItems) * 80);

  const m2StepsDone = state.m2Steps.filter(Boolean).length + (state.m2Confirm ? 1 : 0);
  const m2VerifDone = Object.values(state.m2Verif).filter(Boolean).length;
  const m2Total = m2StepsDone + m2VerifDone; // 2 steps + 1 confirm + 5 verif = 8
  const m2MaxItems = 8;
  const m2Points = state.m2Verified ? 200 : Math.round((m2Total / m2MaxItems) * 160);

  const totalScore = m1Points + m2Points;
  const totalSteps = m1Total + m2Total;
  const totalMaxSteps = m1MaxItems + m2MaxItems;

  const m1Complete = m1Total === m1MaxItems && state.m1Verified;
  const m2Complete = m2Total === m2MaxItems && state.m2Verified;

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

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingEmojis />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6">
        <FichaHeader
          name={state.name}
          onNameChange={(name) => update({ name })}
          totalScore={totalScore}
          maxScore={300}
        />

        <ProgressBar current={totalSteps} max={totalMaxSteps} />

        {/* ════════ MISIÓN 1 ════════ */}
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
            <>Desde <span className="bg-amber-light rounded px-1 text-xs font-bold" style={{ color: "#92400E" }}>Layout</span>, arrastra <strong className="text-primary">VerticalArrangement</strong> a la pantalla → renómbralo <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">ContenedorPrincipal</code></>,
            <>Dentro de <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">ContenedorPrincipal</code>, arrastra <strong className="text-primary">VerticalScrollArrangement</strong> → <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">ContenedorLista</code></>,
            <>Dentro también de <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">ContenedorPrincipal</code> (debajo de la lista), arrastra <strong className="text-primary">Button</strong> → <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">BotonAnyadir</code> · Text: <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">+ Añadir actividad</code></>,
            <>Desde <span className="bg-amber-light rounded px-1 text-xs font-bold" style={{ color: "#92400E" }}>Extensions</span>, arrastra <strong className="text-primary">DynamicComponents</strong> a la pantalla (queda en zona gris)</>,
            <>Desde <span className="bg-amber-light rounded px-1 text-xs font-bold" style={{ color: "#92400E" }}>Storage</span>, arrastra <strong className="text-primary">TinyDB</strong> a la pantalla → renómbralo <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">BaseDatos</code> (zona gris)</>,
          ].map((content, i) => (
            <StepItem key={i} checked={state.m1Steps[i]} onToggle={() => toggleM1Step(i)}>
              {content}
            </StepItem>
          ))}
        </ul>

        <TipBox>El <strong>VerticalScrollArrangement</strong> es como el VerticalArrangement normal pero con scroll, así la lista puede crecer sin que nada se corte.</TipBox>

        <VerificationBlock
          items={m1VerifItems}
          checkedItems={state.m1Verif}
          onVerify={(id) => update({ m1Verif: { ...state.m1Verif, [id]: !state.m1Verif[id] } })}
          requiresMentor={true}
          onAllVerified={() => update({ m1Verified: true })}
        />

        {m1VerifItems.every((item) => state.m1Verif[item.id]) && !state.m1Verified && (
          <button
            onClick={() => update({ m1Verified: true })}
            className="w-full py-2 rounded-lg font-bold text-sm text-primary-foreground mb-4 transition-transform hover:scale-[1.02]"
            style={{ background: "var(--gradient-mission1)" }}
          >
            ✅ Confirmar Misión 1 completada
          </button>
        )}

        <RewardBanner
          emoji="🎨✅"
          title="¡Misión 1 completada! +100 ⭐"
          subtitle="La pantalla está lista. Ahora viene la parte más chula: ¡los bloques!"
          visible={m1Complete}
        />

        {/* ════════ MISIÓN 2 ════════ */}
        <div className="mt-8">
          <MissionHeader
            number={2}
            emoji="🧠"
            title="Programar la pantalla"
            subtitle="Editor de Bloques de Screen1 · ≈ 30 min"
            points={200}
            earnedPoints={m2Points}
            verified={state.m2Verified}
          />

          <TipBox type="info">Haz clic en el botón <strong>Blocks</strong> (arriba a la derecha). Asegúrate de estar en <strong>Screen1</strong>, no en PantallaFormulario.</TipBox>

          {/* Paso 1 */}
          <SectionTitle emoji="📦" title="Paso 1 · Las 3 listas de datos" />
          <p className="text-xs mb-2">La app guarda los datos en <strong>3 listas paralelas</strong>. El número 2 de cada lista siempre es de la misma actividad:</p>
          <DataListsVisual />
          <ul className="list-none p-0">
            <StepItem checked={state.m2Steps[0]} onToggle={() => toggleM2Step(0)}>
              Ve a <span className="bg-amber-light rounded px-1 text-xs font-bold" style={{ color: "#92400E" }}>Variables</span> → crea 3 variables globales: <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">listaNombres</code>, <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">listaCategorias</code>, <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">listaFotos</code>, todas con valor inicial lista vacía
            </StepItem>
          </ul>

          {/* Paso 2 */}
          <SectionTitle emoji="🚀" title='Paso 2 · Bloque "cuando Screen1 se abre"' />
          <p className="text-xs mb-2">Ve a <span className="bg-amber-light rounded px-1 text-xs font-bold" style={{ color: "#92400E" }}>Screen1</span> → bloque <span className="bg-destructive/20 text-destructive rounded px-1 text-xs font-bold font-mono">Screen1.Initialize</span>. Construye esto dentro:</p>
          <CodeBlock>
            <div className="text-muted-foreground/60">① Cargar las listas guardadas en TinyDB</div>
            <div><span className="text-primary font-bold">set</span> listaNombres ← BaseDatos.<span className="text-amber-mid">GetValue</span> tag: <span className="text-success-mid">"nombres"</span> default: lista vacía</div>
            <div><span className="text-primary font-bold">set</span> listaCategorias ← BaseDatos.<span className="text-amber-mid">GetValue</span> tag: <span className="text-success-mid">"categorias"</span> default: lista vacía</div>
            <div><span className="text-primary font-bold">set</span> listaFotos ← BaseDatos.<span className="text-amber-mid">GetValue</span> tag: <span className="text-success-mid">"fotos"</span> default: lista vacía</div>
            <br />
            <div className="text-muted-foreground/60">② Si la app es nueva → poner ejemplos</div>
            <div><span className="text-primary font-bold">if</span> length of listaNombres = 0 <span className="text-primary font-bold">then</span></div>
            <div className="pl-4"><span className="text-amber-mid">add to list</span> listaNombres: <span className="text-success-mid">"Dibujo creativo"</span></div>
            <div className="pl-4"><span className="text-amber-mid">add to list</span> listaCategorias: <span className="text-success-mid">"Arte"</span></div>
            <div className="pl-4">... (repetir para Fútbol y Lectura)</div>
            <br />
            <div className="text-muted-foreground/60">③ Dibujar las tarjetas</div>
            <div><span className="text-primary font-bold">call</span> <span className="text-amber-mid">DibujarLista</span></div>
          </CodeBlock>

          {/* Paso 3 */}
          <SectionTitle emoji="🔄" title='Paso 3 · Bloque "cuando vuelves del formulario"' />
          <p className="text-xs mb-2">Cuando el usuario vuelve del formulario, recargar la lista:</p>
          <CodeBlock>
            <div><span className="text-primary font-bold">when</span> Screen1.<span className="text-amber-mid">OtherScreenClosed</span>:</div>
            <div className="pl-4 text-muted-foreground/60">Mismo que en ①: recargar las 3 listas desde TinyDB</div>
            <div className="pl-4"><span className="text-primary font-bold">call</span> <span className="text-amber-mid">DibujarLista</span></div>
          </CodeBlock>

          {/* Paso 4 */}
          <SectionTitle emoji="🔘" title="Paso 4 · Botón Añadir" />
          <ul className="list-none p-0">
            <StepItem checked={state.m2Steps[1]} onToggle={() => toggleM2Step(1)}>
              Ve a <span className="bg-amber-light rounded px-1 text-xs font-bold" style={{ color: "#92400E" }}>BotonAnyadir</span> → bloque <span className="bg-destructive/20 text-destructive rounded px-1 text-xs font-bold font-mono">BotonAnyadir.Click</span> → dentro: <span className="bg-blue-light text-accent rounded px-1 text-xs font-bold font-mono">open another screen</span> screenName: <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">"PantallaFormulario"</code>
            </StepItem>
          </ul>

          <div className="flex items-center gap-2 my-3 text-xs">
            <span>¿Has creado los 3 bloques de esta página?</span>
            <input
              type="checkbox"
              checked={state.m2Confirm}
              onChange={() => update({ m2Confirm: !state.m2Confirm })}
              className="w-4 h-4 accent-success cursor-pointer"
            />
            <span className="font-bold">¡Sí!</span>
          </div>

          {/* Paso 5 - DibujarLista */}
          <div
            className="rounded-xl px-4 py-3 text-primary-foreground mb-4 flex items-center gap-3"
            style={{ background: "var(--gradient-mission2)" }}
          >
            <div className="font-display text-2xl opacity-80">2</div>
            <div>
              <div className="font-display text-base">✨ El procedimiento DibujarLista</div>
              <div className="text-[11px] opacity-80">La pieza más importante de toda la app · usa DynamicComponents</div>
            </div>
          </div>

          <TipBox>Este procedimiento <strong>borra las tarjetas viejas</strong> y las <strong>vuelve a crear</strong> todas desde cero. Se llama cada vez que la app abre o vuelve del formulario.</TipBox>

          <SectionTitle emoji="🏗️" title="Paso 5 · Crear el procedimiento" />
          <CodeBlock>
            <div className="text-muted-foreground/60">① Borrar todas las tarjetas que había antes</div>
            <div>DynamicComponents1.<span className="text-amber-mid">DeleteAllComponents</span> in: ContenedorLista</div>
            <br />
            <div className="text-muted-foreground/60">② Repetir para cada actividad</div>
            <div><span className="text-primary font-bold">for each</span> número <span className="text-primary font-bold">from</span> 1 <span className="text-primary font-bold">to</span> length of listaNombres <span className="text-primary font-bold">do</span>:</div>
            <br />
            <div className="pl-4 text-muted-foreground/60">— CREAR LA FILA —</div>
            <div className="pl-4">DynamicComponents1.<span className="text-amber-mid">Create</span></div>
            <div className="pl-8">component: <span className="text-success-mid">"HorizontalArrangement"</span></div>
            <div className="pl-8">in: ContenedorLista</div>
            <div className="pl-8">ID: <span className="text-amber-mid">join</span> <span className="text-success-mid">"fila_"</span> número</div>
            <br />
            <div className="pl-4 text-muted-foreground/60">— CREAR LA IMAGEN —</div>
            <div className="pl-4">DynamicComponents1.<span className="text-amber-mid">Create</span></div>
            <div className="pl-8">component: <span className="text-success-mid">"Image"</span></div>
            <div className="pl-8">in: <span className="text-amber-mid">join</span> <span className="text-success-mid">"fila_"</span> número</div>
            <br />
            <div className="pl-4 text-muted-foreground/60">— CREAR LABELS (nombre + categoría) —</div>
            <div className="pl-4">DynamicComponents1.<span className="text-amber-mid">Create</span> component: <span className="text-success-mid">"Label"</span> ×2</div>
          </CodeBlock>

          <TipBox>El bloque <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">join</code> une dos textos. <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">join "fila_" 2</code> produce <code className="bg-secondary text-primary px-1 rounded text-xs font-bold font-mono">"fila_2"</code>. Así cada tarjeta tiene un nombre único.</TipBox>

          <VerificationBlock
            items={m2VerifItems}
            checkedItems={state.m2Verif}
            onVerify={(id) => update({ m2Verif: { ...state.m2Verif, [id]: !state.m2Verif[id] } })}
            requiresMentor={true}
            onAllVerified={() => update({ m2Verified: true })}
          />

          {m2VerifItems.every((item) => state.m2Verif[item.id]) && !state.m2Verified && (
            <button
              onClick={() => update({ m2Verified: true })}
              className="w-full py-2 rounded-lg font-bold text-sm text-primary-foreground mb-4 transition-transform hover:scale-[1.02]"
              style={{ background: "var(--gradient-mission2)" }}
            >
              ✅ Confirmar Misión 2 completada
            </button>
          )}

          <RewardBanner
            emoji="🏆🎉⭐"
            title="¡Misión 2 completada! +200 ⭐"
            subtitle="¡Tu app funciona con base de datos y componentes dinámicos! Eso es programación de verdad."
            visible={m2Complete}
          />
        </div>

        {/* Diploma */}
        <Diploma
          name={state.name}
          totalScore={totalScore}
          visible={m1Complete && m2Complete}
        />

        {/* Reset */}
        <div className="text-center mt-8 mb-4">
          <button
            onClick={() => {
              if (window.confirm("¿Segura que quieres borrar todo el progreso?")) {
                setState(defaultState);
              }
            }}
            className="text-xs text-muted-foreground underline hover:text-destructive transition-colors"
          >
            🗑️ Reiniciar ficha
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
