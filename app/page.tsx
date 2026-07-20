export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Monocomb
      </h1>
      <p className="mt-4 max-w-md text-lg text-neutral-400">
        Web development and automation. Site coming soon.
      </p>
      <a
        href="mailto:hello@monocomb.com"
        className="mt-8 rounded-full border border-neutral-700 px-6 py-2 text-sm text-white transition hover:border-neutral-400"
      >
        Get in touch
      </a>
    </main>
  );
}
