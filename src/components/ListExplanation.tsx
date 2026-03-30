import { useState } from "react";
import listas1 from "@/assets/listas_1.png";
import listas2 from "@/assets/listas_2.png";
import listas3 from "@/assets/listas_3.png";
import listas4 from "@/assets/listas_4.png";
import listas5 from "@/assets/listas_5.png";
import listas6 from "@/assets/listas_6.png";

const IMAGES = [listas1, listas2, listas3, listas4, listas5, listas6];

const ListExplanation = () => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="rounded-xl bg-card border-2 border-accent/30 p-4 my-4 animate-fade-in">
      <div className="text-center mb-3">
        <div className="text-3xl mb-1">📋</div>
        <h3 className="font-display text-base text-accent">¿Cómo funcionan las Listas?</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Antes de programar, ¡vamos a entender cómo se organizan los datos en listas!
        </p>
      </div>

      <div className="rounded-lg overflow-hidden border border-border mb-3">
        <img
          src={IMAGES[currentImage]}
          alt={`Explicación de listas - paso ${currentImage + 1}`}
          className="w-full h-auto"
        />
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setCurrentImage((p) => Math.max(0, p - 1))}
          disabled={currentImage === 0}
          className="px-3 py-1.5 rounded-lg text-xs font-display transition-all disabled:opacity-30 bg-accent/10 text-accent hover:bg-accent/20"
        >
          ← Anterior
        </button>
        <span className="text-xs font-bold text-muted-foreground">
          {currentImage + 1} / {IMAGES.length}
        </span>
        <button
          onClick={() => setCurrentImage((p) => Math.min(IMAGES.length - 1, p + 1))}
          disabled={currentImage === IMAGES.length - 1}
          className="px-3 py-1.5 rounded-lg text-xs font-display transition-all disabled:opacity-30 bg-accent/10 text-accent hover:bg-accent/20"
        >
          Siguiente →
        </button>
      </div>

      <div className="flex justify-center gap-1.5 mt-2">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              background: i === currentImage ? "hsl(var(--accent))" : "hsl(var(--muted))",
              transform: i === currentImage ? "scale(1.3)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ListExplanation;
