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
  const [maxPrice, setMaxPrice] = useState(1200000);
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
        car.tags?.some((t) => t.toLowerCase().includes(q));

      const matchesTag =
        activeTag === "All" ||
        car.tags?.includes(activeTag) ||
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
    setMaxPrice(1200000);
  };

  const hasFilters =
    query ||
    activeTag !== "All" ||
    activeBrand !== "All Brands" ||
    activeAvailable !== "All" ||
    maxPrice < 1200000;

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
                style={
                  {
                    ["--tw-ring-color" as string]: "#1E90FF",
                  } as React.CSSProperties
                }
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
            {allTags.map((tag) => (
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
            <select
              value={activeBrand}
              onChange={(e) => setActiveBrand(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none cursor-pointer"
            >
              {allBrands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>

            <div className="flex rounded-xl border border-gray-200 bg-white overflow-hidden">
              {availableOptions.map((opt) => (
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
