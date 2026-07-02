export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background" role="status" aria-live="polite">
      <span className="font-label-mono text-label-mono text-on-surface-variant tracking-widest uppercase">
        Loading…
      </span>
    </div>
  );
}
