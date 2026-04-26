export function InlineCode ({ children }: { children: string }) {
  return (
    <code
      className="bg-gray-400/10 text-gray-300 p-1 rounded-md text-sm font-mono tracking-widest wrap-break-word"
    >
      {children}
    </code>
  )
}