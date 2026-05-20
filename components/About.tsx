import Image from "next/image";
import CarLogos from "./CarLogos";

export default function About() {
  return (
    <section className="bg-[#f3f3f3] py-16 " id="about">
      <div className="max-w-6xl mx-auto px-6">
        {/* TOP GRID */}
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {/* LEFT IMAGE */}
          <div className="rounded-3xl relative overflow-hidden shadow-md">
            {/* IMAGE */}
            <Image
              src={"/images/about1.jpg"}
              alt="Car buyer"
              width={400}
              height={400}
              className="w-full h-[320px] object-cover"
            />

            {/* INNER WHITE RING */}
            <div className="pointer-events-none absolute inset-3 rounded-3xl ring-2 ring-white/80" />
          </div>

          {/* CENTER CARD */}
          <div className="bg-muted rounded-3xl p-5 text-center shadow-sm">
            <h2 className="text-3xl font-semibold mb-4">
              About <span className="text-[#1E90FF] ">Us</span>
            </h2>

            <p className="text-gray-500 leading-relaxed mb-6">
              Your trusted source for buying or renting cars. We offer a wide
              selection, transparent pricing, and flexible financing options,
              all designed to make your experience smooth and hassle-free.
            </p>

            <button className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition">
              Learn More
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="rounded-3xl relative overflow-hidden shadow-md">
            <Image
              src={"/images/about2.jpg"}
              alt="Car showroom"
              height={400}
              width={400}
              className="w-full h-[320px] object-cover"
            />

            <div className="pointer-events-none absolute inset-3 rounded-3xl ring-2 ring-white/80" />
          </div>
        </div>

        {/* BRAND LOGOS */}

        <CarLogos />
      </div>
    </section>
  );
}
