"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { cars, allTags, allBrands } from "@/lib/cars";
import { Search, SlidersHorizontal, X } from "lucide-react";
import CarCard from "@/components/CarCard";

export default function AllCarsPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [activeBrand, setActiveBrand] = useState("All Brands");
  const [activeAvailable, setActiveAvailable] = useState("All");
  const [maxPrice, setMaxPrice] = useState(100000000);
  const [showFilters, setShowFilters] = useState(false);

  const availableOptions = ["All", "Buy", "Rent", "Both"];

  const filtered = useMemo(() => {
    return cars.filter((car) => {
      const q = query.toLowerCase();

      const matchesQuery =
        !query ||
        car.name.toLowerCase().includes(q) ||
        car.brand.toLowerCase().includes(q) ||
        car.type.toLowerCase().includes(q) ||
        car.tags.some((t) => t.toLowerCase().includes(q));

      const matchesTag =
        activeTag === "All" ||
        car.tags.includes(activeTag) ||
        car.type === activeTag ||
        (activeTag === "Used Car" && car.condition === "Used");

      const matchesBrand =
        activeBrand === "All Brands" || car.brand === activeBrand;

      const matchesAvailable =
        activeAvailable === "All" ||
        car.available === activeAvailable ||
        car.available === "Both";

      const relevantPrice = car.buyPrice ?? car.rentPricePerDay ?? 0;
      const matchesPrice = relevantPrice <= maxPrice;

      return (
        matchesQuery &&
        matchesTag &&
        matchesBrand &&
        matchesAvailable &&
        matchesPrice
      );
    });
  }, [query, activeTag, activeBrand, activeAvailable, maxPrice]);

  const clearFilters = () => {
    setQuery("");
    setActiveTag("All");
    setActiveBrand("All Brands");
    setActiveAvailable("All");
    setMaxPrice(100000000);
  };

  const hasFilters =
    query ||
    activeTag !== "All" ||
    activeBrand !== "All Brands" ||
    activeAvailable !== "All" ||
    maxPrice < 100000000;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        {/* ── Hero header with Unsplash background ── */}
        <div className="relative overflow-hidden">
          {/* Background */}
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80&auto=format&fit=crop"
            alt="Cars background"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/65" />

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 pt-36 pb-16">
            <span className="inline-block bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
              Our Inventory
            </span>
            <h1 className="font-black text-4xl md:text-5xl tracking-tight text-white mb-3">
              All <span className="text-[#a3b800]">Cars</span>
            </h1>
            <p className="text-white/60 text-sm max-w-xl leading-relaxed mb-8">
              Browse our full collection of premium vehicles. Filter by type,
              brand, price, or availability to find your perfect match.
            </p>

            {/* Search bar */}
            <div className="relative max-w-xl">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, brand, or type…"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-green-500/60 focus:bg-white/15 backdrop-blur-md transition-all"
              />
            </div>
          </div>
        </div>

        {/* ── Filters + Grid ── */}
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10">
          {/* Tag pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                  activeTag === tag
                    ? "bg-[#2e7d32] text-white border-[#2e7d32] shadow-md shadow-green-900/20"
                    : "bg-white text-gray-500 border-gray-200 hover:border-green-400 hover:text-green-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Filters row */}
          <div className="flex flex-wrap gap-3 items-center mb-6">
            {/* Brand */}
            <select
              value={activeBrand}
              onChange={(e) => setActiveBrand(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:border-green-400 cursor-pointer"
            >
              {allBrands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>

            {/* Availability toggle */}
            <div className="flex rounded-xl border border-gray-200 bg-white overflow-hidden">
              {availableOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setActiveAvailable(opt)}
                  className={`px-4 py-2.5 text-xs font-semibold transition-colors border-r last:border-r-0 border-gray-200 ${
                    activeAvailable === opt
                      ? "bg-[#2e7d32] text-white"
                      : "text-gray-500 hover:text-green-700 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Price toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-colors ${
                showFilters
                  ? "border-green-400 text-green-700 bg-green-50"
                  : "border-gray-200 bg-white text-gray-600 hover:border-green-400"
              }`}
            >
              <SlidersHorizontal size={15} />
              Price Filter
            </button>

            {/* Clear */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors"
              >
                <X size={14} /> Clear All
              </button>
            )}

            <span className="ml-auto text-sm text-gray-400 font-medium">
              {filtered.length} car{filtered.length !== 1 ? "s" : ""} found
            </span>
          </div>

          {/* Price slider */}
          {showFilters && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                Max Price:{" "}
                <span className="text-[#2e7d32]">
                  ₦{maxPrice.toLocaleString("en-NG")}
                </span>
              </label>
              <input
                type="range"
                min={5000000}
                max={100000000}
                step={500000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="flex-1 accent-green-600 h-2 rounded-full"
              />
              <span className="text-xs text-gray-400 whitespace-nowrap">
                Up to ₦100,000,000
              </span>
            </div>
          )}

          {/* Car grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🚗</div>
              <h3 className="font-bold text-xl text-gray-700 mb-2">
                No cars found
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Try adjusting your filters or search query.
              </p>
              <button
                onClick={clearFilters}
                className="px-5 py-2.5 bg-[#2e7d32] hover:bg-[#388e3c] text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
