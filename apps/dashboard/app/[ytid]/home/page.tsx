export default function YoutubeHome() {
	return (
		<article className="flex flex-col items-center h-full text-white">
			{/* Hero Section */}
			<section className="text-center w-7/8 lg:w-6/8">
				<p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-300">YouTube workspace</p>
				<h1 className="mt-4 max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl">Welcome to your channel dashboard.</h1>
				<p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Your channel data will live here. The first analytics panels are ready to take shape.</p>
			</section>
		</article>
	);
}
