import { ColorButton } from "ui";

export default function Home() {
  return (
    <section className="flex flex-col h-full item-center justify-center text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-sky-300">Arcky-Tech Dashboard</p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">Your channel, clearly in view.</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl mb-6">
            Connect your YouTube account to explore channel performance, goals, and the numbers behind your next upload.
          </p>
          <ColorButton
            color="red-500"
            text="Continue with YouTube"
            href="/api/auth/login?provider=youtube&redirect=/"
            padding="px-2 py-3 md:px-3 md:py-4 mt-2"
          />
        </div>
        <div className="border-l border-slate-700/80 pl-7 sm:pl-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Workspace</p>
          <p className="mt-4 text-3xl font-semibold text-slate-100">One calm place for the work behind your videos.</p>
          <div className="mt-4 grid gap-4 text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-1">
            <p className="border-t border-slate-700/80 pt-4">Channel analytics</p>
            <p className="border-t border-slate-700/80 pt-4">Goal tracking</p>
            <p className="border-t border-slate-700/80 pt-4">Overview of published videos</p>
          </div>
        </div>
      </div>
    </section>
  );
}
