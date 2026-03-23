interface SectionTitleProps {
  emoji: string;
  title: string;
}

const SectionTitle = ({ emoji, title }: SectionTitleProps) => (
  <div className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-muted-foreground my-3 flex items-center gap-1.5">
    {emoji} {title}
    <span className="flex-1 h-px bg-border" />
  </div>
);

export default SectionTitle;
