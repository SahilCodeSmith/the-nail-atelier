export default function Loading() {
  return (
    <div
      className="grid min-h-[60vh] place-items-center"
      role="status"
      aria-label="Loading"
    >
      <span className="font-mono text-[0.75rem] uppercase tracking-[0.24em] text-greige animate-pulse motion-reduce:animate-none">
        The Nail Atelier
      </span>
    </div>
  );
}
