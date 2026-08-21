
interface ErrorMainProps {
  sub: string;
  title: string;
  description: string;
}

export default function ErrorMain({sub, title, description}: ErrorMainProps) {
  return (
    <div className="flex flex-col h-full item-center justify-center text-center text-white">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-300">{sub}</p>
      <h1 className="mt-4 text-4xl font-bold tracking-right sm:text-6xl">{title}</h1>
      <p className="mt-6 text-lg text-slate-300">{description}</p>
    </div>
  )
}