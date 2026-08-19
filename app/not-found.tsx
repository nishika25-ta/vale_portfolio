import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#050505] px-6 text-center text-slate-300">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-content-primary">
        404
      </p>
      <h1 className="mt-4 font-display text-5xl text-white sm:text-6xl">Lost in the archive.</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-500">
        That page is not part of this portfolio. Head back to the home page to keep exploring.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-12 items-center rounded-full border border-content-primary/25 bg-content-primary/[0.08] px-6 text-sm font-semibold text-content-primary transition-colors hover:bg-content-primary/[0.14] hover:text-white"
      >
        Back to portfolio
      </Link>
    </main>
  );
}
