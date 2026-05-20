import Link from "next/link";
import Navbar from "./Navbar";

export default function Hero() {
  const stats = [
    { value: "70+", label: "Cars Available" },
    { value: "12K+", label: "Happy Clients" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <>
      <Navbar />

      <section className="relative min-h-screen bg-neutral-950 overflow-hidden flex flex-col pt-[68px]">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=85&auto=format&fit=crop"
            alt="Hero car background"
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-neutral-950" />
          <div
            className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] translate-x-1/4 translate-y-1/4"
            style={{ background: "rgba(30,144,255,0.15)" }}
          />
          <div
            className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"
            style={{ background: "rgba(30,144,255,0.08)" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 py-24 max-w-5xl mx-auto w-full">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            <span style={{ color: "#1E90FF" }}>Buy</span> or{" "}
            <span style={{ color: "#1E90FF" }}>Rent</span>
            <br />
            your dream car today
          </h1>

          <p className="text-white/60 text-base md:text-lg max-w-xl leading-relaxed mb-10">
            Explore our vast inventory of cars for sale or rent at unbeatable
            prices. Start your journey with us today and find the perfect
            vehicle for your needs.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link
              href="/allcars"
              className="px-8 py-3.5 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "#1E90FF" }}
            >
              View All Cars
            </Link>
            <Link
              href="/allcars"
              className="px-8 py-3.5 border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white text-sm font-semibold rounded-full transition-all duration-200"
            >
              Explore Car Rentals
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full max-w-lg">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1 px-4 py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
              >
                <span className="text-2xl md:text-3xl font-black text-white">
                  {s.value}
                </span>
                <span className="text-[11px] text-white/50 font-medium tracking-wide uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent z-10" />
      </section>
    </>
  );
}
