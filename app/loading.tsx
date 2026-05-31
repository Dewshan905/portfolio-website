export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-6 rounded-[2rem] border border-white/10 bg-white/5 px-8 py-10 shadow-premium backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 animate-pulse rounded-full bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.85)]" />
          <span className="h-3 w-3 animate-pulse rounded-full bg-blue-500 [animation-delay:150ms] shadow-[0_0_20px_rgba(59,130,246,0.85)]" />
          <span className="h-3 w-3 animate-pulse rounded-full bg-indigo-500 [animation-delay:300ms] shadow-[0_0_20px_rgba(99,102,241,0.85)]" />
        </div>
        <div className="text-center">
          <p className="font-display text-lg tracking-[0.3em] text-slate-100">MALEESHA DEWSHAN</p>
          <p className="mt-2 text-sm text-slate-400">Loading a premium developer portfolio</p>
        </div>
      </div>
    </div>
  );
}
