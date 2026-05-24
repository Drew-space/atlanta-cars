import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center px-6 text-center">
      {/* Big 404 */}
      <h1
        className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter"
        style={{ color: "#1E90FF", opacity: 0.15 }}
      >
        404
      </h1>

      <div className="-mt-6 flex flex-col items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-black text-white">
          Page not found
        </h2>
        <p className="text-white/50 text-sm max-w-xs leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or you don&apos;t
          have permission to view it.
        </p>

        <Link
          href="/"
          className="mt-4 px-7 py-3 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: "#1E90FF" }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
