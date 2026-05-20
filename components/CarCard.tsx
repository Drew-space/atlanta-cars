"use client";
import Link from "next/link";
import { Car } from "@/lib/cars";
import { Fuel, Gauge, Settings2, Tag } from "lucide-react";

export default function CarCard({ car }: { car: Car }) {
  const formatPrice = (n: number) => "$" + n.toLocaleString("en-US");

  return (
    <Link
      href={`/cars/${car.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10] bg-gray-100">
        <img
          src={car.images[0]}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span
            className={`text-[10px] font-bold px-2 py-1 rounded-full ${
              car.condition === "New" ? "text-white" : "bg-amber-500 text-white"
            }`}
            style={car.condition === "New" ? { background: "#1E90FF" } : {}}
          >
            {car.condition}
          </span>
          <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-black/60 text-white backdrop-blur-sm">
            {car.available}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">
            {car.brand} · {car.year}
          </p>
          <h3 className="font-semibold text-gray-900 text-[15px] mt-0.5 leading-tight">
            {car.name}
          </h3>
        </div>

        {/* Mini specs */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Fuel, label: car.fuelType },
            { icon: Settings2, label: car.transmission },
            { icon: Gauge, label: car.horsepower + "hp" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 bg-gray-50 rounded-xl py-2"
            >
              <Icon size={13} className="text-gray-400" />
              <span className="text-[10px] text-gray-500 font-medium">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-end justify-between gap-2">
          <div>
            {car.buyPrice && (
              <p className="text-[11px] text-gray-400">Buy from</p>
            )}
            {car.buyPrice ? (
              <p className="text-[15px] font-black text-gray-900">
                {formatPrice(car.buyPrice)}
              </p>
            ) : (
              <p className="text-[11px] text-gray-400">Rent from</p>
            )}
            {!car.buyPrice && car.rentPricePerDay && (
              <p className="text-[15px] font-black text-gray-900">
                {formatPrice(car.rentPricePerDay)}
                <span className="text-[11px] font-normal text-gray-400">
                  /day
                </span>
              </p>
            )}
            {car.buyPrice && car.rentPricePerDay && (
              <p className="text-[11px] text-gray-400 mt-0.5">
                Rent: {formatPrice(car.rentPricePerDay)}/day
              </p>
            )}
          </div>

          <span
            className="shrink-0 text-[10px] font-semibold px-2.5 py-1.5 rounded-full border flex items-center gap-1"
            style={{
              borderColor: "rgba(30,144,255,0.3)",
              color: "#1E90FF",
              background: "rgba(30,144,255,0.06)",
            }}
          >
            <Tag size={9} />
            {car.type}
          </span>
        </div>
      </div>
    </Link>
  );
}
