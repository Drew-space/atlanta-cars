"use client";
import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { Search, SlidersHorizontal, X } from "lucide-react";

const BASE_TAGS = ["All", "Sedan", "SUV", "Sports"];
const EXTRA_TAGS = [
  "Luxury",
  "Performance",
  "Off-Road",
  "Family",
  "Premium",
  "Electric",
  "Used Car",
];
const ALL_TAGS = [...BASE_TAGS, ...EXTRA_TAGS];
const AVAILABLE_OPTIONS = ["All", "Buy", "Rent", "Both"];

export default function AllCarsPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [activeBrand, setActiveBrand] = useState("All Brands");
  const [activeAvailable, setActiveAvailable] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1200000);
  const [showFilters, setShowFilters] = useState(false);

  // ── Fetch all brands for the dropdown ────────────────────────────
  const brands = useQuery(api.cars.getAllBrands) ?? ["All Brands"];

  // ── Fetch cars with all active filters applied server-side ────────
  const cars =
    useQuery(api.cars.getCars, {
      search: query || undefined,
      tag: activeTag !== "All" ? activeTag : undefined,
      brand: activeBrand !== "All Brands" ? activeBrand : undefined,
      available: activeAvailable !== "All" ? activeAvailable : undefined,
      maxPrice: maxPrice < 1200000 ? maxPrice : undefined,
      onlyPublished: true,
    }) ?? [];

  const clearFilters = () => {
    setQuery("");
    setActiveTag("All");
    setActiveBrand("All Brands");
    setActiveAvailable("All");
    setMaxPrice(1200000);
  };

  const hasFilters =
    query ||
    activeTag !== "All" ||
    activeBrand !== "All Brands" ||
    activeAvailable !== "All" ||
    maxPrice < 1200000;

  const isLoading = cars === undefined;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        {/* Hero header */}
        <div className="relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80&auto=format&fit=crop"
            alt="Cars background"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/65" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 pt-36 pb-16">
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4 border"
              style={{
                background: "rgba(30,144,255,0.15)",
                borderColor: "rgba(30,144,255,0.3)",
                color: "#1E90FF",
              }}
            >
              Our Inventory
            </span>
            <h1 className="font-black text-4xl md:text-5xl tracking-tight text-white mb-3">
              All <span style={{ color: "#1E90FF" }}>Cars</span>
            </h1>
            <p className="text-white/60 text-sm max-w-xl leading-relaxed mb-8">
              Browse our full collection of premium vehicles. Filter by type,
              brand, price, or availability to find your perfect match.
            </p>

            {/* Search */}
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
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none backdrop-blur-md transition-all"
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(30,144,255,0.5)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")
                }
              />
            </div>
          </div>
        </div>

        {/* Filters + Grid */}
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10">
          {/* Tag pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border"
                style={
                  activeTag === tag
                    ? {
                        background: "#1E90FF",
                        color: "#fff",
                        borderColor: "#1E90FF",
                      }
                    : {
                        background: "#fff",
                        color: "#6b7280",
                        borderColor: "#e5e7eb",
                      }
                }
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Filters row */}
          <div className="flex flex-wrap gap-3 items-center mb-6">
            {/* Brand dropdown */}
            <select
              value={activeBrand}
              onChange={(e) => setActiveBrand(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none cursor-pointer"
            >
              {brands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>

            {/* Availability toggle */}
            <div className="flex rounded-xl border border-gray-200 bg-white overflow-hidden">
              {AVAILABLE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setActiveAvailable(opt)}
                  className="px-4 py-2.5 text-xs font-semibold transition-colors border-r last:border-r-0 border-gray-200"
                  style={
                    activeAvailable === opt
                      ? { background: "#1E90FF", color: "#fff" }
                      : { color: "#6b7280" }
                  }
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Price filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-colors bg-white"
              style={
                showFilters
                  ? { borderColor: "#1E90FF", color: "#1E90FF" }
                  : { borderColor: "#e5e7eb", color: "#6b7280" }
              }
            >
              <SlidersHorizontal size={15} />
              Price Filter
            </button>

            {/* Clear all */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors"
              >
                <X size={14} /> Clear All
              </button>
            )}

            <span className="ml-auto text-sm text-gray-400 font-medium">
              {isLoading
                ? "Loading…"
                : `${cars.length} car${cars.length !== 1 ? "s" : ""} found`}
            </span>
          </div>

          {/* Price slider */}
          {showFilters && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                Max Price:{" "}
                <span style={{ color: "#1E90FF" }}>
                  ${maxPrice.toLocaleString("en-US")}
                </span>
              </label>
              <input
                type="range"
                min={10000}
                max={1200000}
                step={5000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="flex-1 h-2 rounded-full"
                style={{ accentColor: "#1E90FF" }}
              />
              <span className="text-xs text-gray-400 whitespace-nowrap">
                Up to $1,200,000
              </span>
            </div>
          )}

          {/* Loading skeleton */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse"
                >
                  <div className="aspect-[16/10] bg-gray-200" />
                  <div className="p-4 flex flex-col gap-3">
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="h-10 bg-gray-100 rounded-xl" />
                      ))}
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Car grid */}
          {!isLoading && cars.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && cars.length === 0 && (
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
                className="px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors"
                style={{ background: "#1E90FF" }}
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
