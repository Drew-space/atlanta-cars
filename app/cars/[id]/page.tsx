"use client";
import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cars } from "@/lib/cars";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ChevronLeft,
  ChevronRight,
  Fuel,
  Gauge,
  Settings2,
  Users,
  DoorOpen,
  Zap,
  Wind,
  CheckCircle2,
  Phone,
  ArrowLeft,
  Tag,
  Calendar,
  Activity,
} from "lucide-react";

export default function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const car = cars.find((c) => c.id === id);
  if (!car) notFound();

  const [activeImg, setActiveImg] = useState(0);

  const prev = () =>
    setActiveImg((i) => (i === 0 ? car.images.length - 1 : i - 1));
  const next = () =>
    setActiveImg((i) => (i === car.images.length - 1 ? 0 : i + 1));

  const formatPrice = (n: number) => "₦" + n.toLocaleString("en-NG");

  const specs = [
    { icon: Fuel, label: "Fuel Type", value: car.fuelType },
    { icon: Settings2, label: "Transmission", value: car.transmission },
    { icon: Gauge, label: "Horsepower", value: `${car.horsepower} hp` },
    { icon: Wind, label: "Top Speed", value: car.topSpeed },
    { icon: Activity, label: "0–100 km/h", value: car.acceleration },
    { icon: Zap, label: "Engine", value: car.engineSize },
    { icon: Users, label: "Seats", value: `${car.seatingCapacity} seats` },
    { icon: DoorOpen, label: "Doors", value: `${car.doors} doors` },
    { icon: Gauge, label: "Torque", value: car.torque },
    { icon: Fuel, label: "Efficiency", value: car.fuelEfficiency },
    { icon: Calendar, label: "Year", value: String(car.year) },
    {
      icon: Tag,
      label: "Mileage",
      value: `${car.mileage.toLocaleString()} km`,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10">
          {/* Back */}
          <Link
            href="/allcars"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to all cars
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* ── Left: Image carousel ── */}
            <div className="flex flex-col gap-4">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100">
                <img
                  key={activeImg}
                  src={car.images[activeImg]}
                  alt={`${car.name} image ${activeImg + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />

                {/* Prev / Next */}
                {car.images.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}

                {/* Dot indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {car.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        i === activeImg ? "w-5 bg-white" : "w-1.5 bg-white/40"
                      }`}
                    />
                  ))}
                </div>

                {/* Condition badge */}
                <span
                  className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    car.condition === "New"
                      ? "bg-green-500 text-white"
                      : "bg-amber-500 text-white"
                  }`}
                >
                  {car.condition}
                </span>
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-2">
                {car.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`flex-1 rounded-xl overflow-hidden aspect-[16/10] border-2 transition-all duration-200 ${
                      i === activeImg
                        ? "border-[#2e7d32]"
                        : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* ── Right: Details ── */}
            <div className="flex flex-col gap-6">
              {/* Title */}
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-1">
                  {car.brand} · {car.year}
                </p>
                <h1 className="text-3xl font-black text-gray-900 leading-tight">
                  {car.name}
                </h1>
                <p className="text-sm text-gray-500 mt-1">{car.model}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {car.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-semibold px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed">
                {car.description}
              </p>

              {/* Pricing */}
              <div className="flex gap-3">
                {car.buyPrice && (
                  <div className="flex-1 bg-neutral-950 rounded-2xl p-4 flex flex-col gap-1">
                    <p className="text-[11px] text-gray-400 font-medium">
                      Buy price
                    </p>
                    <p className="text-xl font-black text-white">
                      {formatPrice(car.buyPrice)}
                    </p>
                  </div>
                )}
                {car.rentPricePerDay && (
                  <div className="flex-1 bg-[#2e7d32] rounded-2xl p-4 flex flex-col gap-1">
                    <p className="text-[11px] text-green-200 font-medium">
                      Rent per day
                    </p>
                    <p className="text-xl font-black text-white">
                      {formatPrice(car.rentPricePerDay)}
                    </p>
                  </div>
                )}
              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/2348000000000?text=Hi%2C+I'm+interested+in+the+${encodeURIComponent(car.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-[#2e7d32] hover:bg-[#388e3c] text-white font-semibold rounded-2xl transition-colors shadow-lg shadow-green-900/20 text-sm"
              >
                <Phone size={16} />
                Contact to Book
              </a>

              <Link
                href="/allcars"
                className="text-center text-sm text-gray-400 hover:text-gray-700 transition-colors"
              >
                ← Browse more cars
              </Link>
            </div>
          </div>

          {/* ── Specs grid ── */}
          <div className="mt-14">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              Vehicle Specifications
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {specs.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                    <Icon size={15} className="text-[#2e7d32]" />
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-gray-800">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Features ── */}
          <div className="mt-10">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              Features & Equipment
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {car.features.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3"
                >
                  <CheckCircle2 size={15} className="text-[#2e7d32] shrink-0" />
                  <span className="text-sm text-gray-700">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Bottom CTA banner ── */}
          <div className="mt-14 bg-neutral-950 rounded-3xl px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-black text-xl mb-1">
                Ready to drive the {car.name}?
              </h3>
              <p className="text-gray-400 text-sm">
                Contact our team and we'll get you behind the wheel.
              </p>
            </div>
            <a
              href={`https://wa.me/2348000000000?text=Hi%2C+I'm+interested+in+the+${encodeURIComponent(car.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-2 px-7 py-3.5 bg-[#2e7d32] hover:bg-[#388e3c] text-white text-sm font-semibold rounded-full transition-colors shadow-lg shadow-green-900/30"
            >
              <Phone size={15} />
              Contact to Book
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
