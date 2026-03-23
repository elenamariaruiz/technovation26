interface CodeBlockProps {
  children: React.ReactNode;
}

const CodeBlock = ({ children }: CodeBlockProps) => (
  <div className="rounded-lg p-3 my-3 font-mono text-xs leading-7 overflow-x-auto" style={{ background: "#1E1B4B", color: "#C4B5FD" }}>
    {children}
  </div>
);

export default CodeBlock;
