const DataListsVisual = () => (
  <div className="flex gap-1.5 my-3">
    {[
      { title: "listaNombres", bg: "bg-secondary", color: "text-primary", items: ["Dibujo creativo", "Fútbol", "Lectura"] },
      { title: "listaCategorias", bg: "bg-blue-light", color: "text-accent", items: ["Arte", "Deporte", "Biblioteca"] },
      { title: "listaFotos", bg: "bg-pink-light", color: "text-pink", items: ['""  (vacío)', '""  (vacío)', '""  (vacío)'] },
    ].map((list) => (
      <div key={list.title} className={`flex-1 rounded-lg p-2 ${list.bg}`}>
        <div className={`text-[10px] font-extrabold mb-1 ${list.color}`}>{list.title}</div>
        {list.items.map((item, i) => (
          <div key={i} className="text-[11px] leading-[1.9] border-b border-foreground/5 last:border-b-0">
            [{i + 1}] {item}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default DataListsVisual;
