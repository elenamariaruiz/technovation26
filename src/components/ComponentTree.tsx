const ComponentTree = () => (
  <div className="bg-muted rounded-lg p-3 text-xs font-mono leading-[1.8] my-3">
    <div className="font-bold text-primary">Screen1</div>
    <div className="pl-5 text-foreground">
      └─ ContenedorPrincipal <span className="bg-blue-light text-accent rounded px-1 text-[10.5px]">VerticalArrangement</span>
    </div>
    <div className="pl-10 text-muted-foreground">
      ├─ ContenedorLista <span className="bg-blue-light text-accent rounded px-1 text-[10.5px]">VerticalScrollArrangement</span> ← aquí aparecen las tarjetas
    </div>
    <div className="pl-10 text-muted-foreground">
      └─ BotonAnyadir <span className="bg-success-light text-success rounded px-1 text-[10.5px]">Button</span>
    </div>
    <div className="pl-5 text-foreground mt-1">
      └─ <span className="opacity-50">(zona gris)</span> DynamicComponents1 <span className="bg-secondary text-primary rounded px-1 text-[10.5px]">Extension</span>
    </div>
    <div className="pl-5 text-foreground">
      └─ <span className="opacity-50">(zona gris)</span> BaseDatos <span className="bg-destructive/10 text-destructive rounded px-1 text-[10.5px]">TinyDB</span>
    </div>
  </div>
);

export default ComponentTree;
