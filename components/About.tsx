import Image from "next/image";

export default function About() {
  return (
    <section className="bg-[#f3f3f3] py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* TOP GRID */}
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {/* LEFT IMAGE */}
          <div className="rounded-3xl relative overflow-hidden shadow-md">
            {/* IMAGE */}
            <Image
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop"
              alt="Car buyer"
              width={400}
              height={400}
              className="w-full h-[320px] object-cover"
            />

            {/* INNER WHITE RING */}
            <div className="pointer-events-none absolute inset-3 rounded-3xl ring-2 ring-white/80" />
          </div>

          {/* CENTER CARD */}
          <div className="bg-white rounded-3xl p-5 text-center shadow-md">
            <h2 className="text-3xl font-semibold mb-4">
              About <span className="text-yellow-500">Us</span>
            </h2>

            <p className="text-gray-500 leading-relaxed mb-6">
              Your trusted source for buying or renting cars. We offer a wide
              selection, transparent pricing, and flexible financing options,
              all designed to make your experience smooth and hassle-free.
            </p>

            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-medium transition">
              Learn More
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="rounded-3xl relative overflow-hidden shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200&auto=format&fit=crop"
              alt="Car showroom"
              height={400}
              width={400}
              className="w-full h-[320px] object-cover"
            />

            <div className="pointer-events-none absolute inset-3 rounded-3xl ring-2 ring-white/80" />
          </div>
        </div>

        {/* BRAND LOGOS */}
        <div className="mt-10 bg-[#eaeaea] rounded-2xl py-8 px-6">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            <img
              src="https://cdn.worldvectorlogo.com/logos/audi-2.svg"
              className="h-8"
            />
            <img
              src="https://cdn.worldvectorlogo.com/logos/rolls-royce.svg"
              className="h-8"
            />
            <img
              src="https://cdn.worldvectorlogo.com/logos/jaguar-2.svg"
              className="h-8"
            />
            <img
              src="https://cdn.worldvectorlogo.com/logos/audi.svg"
              className="h-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
