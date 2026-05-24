// convex/cars.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ── Helper — resolve a single car's images (storageId → URL) ─────────────────
async function resolveImages(
  ctx: { storage: { getUrl: (id: string) => Promise<string | null> } },
  images: string[],
): Promise<string[]> {
  return Promise.all(
    images.map(async (img) => {
      if (img.startsWith("http")) return img; // already a URL (seeded data)
      const url = await ctx.storage.getUrl(img);
      return url ?? img;
    }),
  );
}

// ─────────────────────────────────────────────────────────────────
// GET ALL CARS — with optional filters
// ─────────────────────────────────────────────────────────────────
export const getCars = query({
  args: {
    search: v.optional(v.string()),
    type: v.optional(v.string()),
    brand: v.optional(v.string()),
    available: v.optional(v.string()),
    condition: v.optional(v.string()),
    fuelType: v.optional(v.string()),
    tag: v.optional(v.string()),
    minPrice: v.optional(v.number()),
    maxPrice: v.optional(v.number()),
    onlyPublished: v.optional(v.boolean()),
    onlyFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let cars = await ctx.db.query("cars").order("desc").collect();

    if (args.onlyPublished) cars = cars.filter((c) => c.isPublished === true);
    if (args.onlyFeatured) cars = cars.filter((c) => c.isFeatured === true);

    if (args.search?.trim()) {
      const q = args.search.toLowerCase();
      cars = cars.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.brand.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          c.type.toLowerCase().includes(q) ||
          c.tags?.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (args.type && args.type !== "All")
      cars = cars.filter((c) => c.type === args.type);

    if (args.brand && args.brand !== "All Brands")
      cars = cars.filter((c) => c.brand === args.brand);

    if (args.available && args.available !== "All")
      cars = cars.filter(
        (c) => c.available === args.available || c.available === "Both",
      );

    if (args.condition)
      cars = cars.filter((c) => c.condition === args.condition);

    if (args.fuelType) cars = cars.filter((c) => c.fuelType === args.fuelType);

    if (args.tag && args.tag !== "All") {
      if (args.tag === "Used Car") {
        cars = cars.filter((c) => c.condition === "Used");
      } else {
        cars = cars.filter(
          (c) => c.tags?.includes(args.tag!) || c.type === args.tag,
        );
      }
    }

    if (args.minPrice !== undefined || args.maxPrice !== undefined) {
      cars = cars.filter((c) => {
        const price = c.buyPrice ?? c.rentPricePerDay ?? 0;
        const aboveMin =
          args.minPrice !== undefined ? price >= args.minPrice : true;
        const belowMax =
          args.maxPrice !== undefined ? price <= args.maxPrice : true;
        return aboveMin && belowMax;
      });
    }

    // Resolve storageIds → public URLs
    return await Promise.all(
      cars.map(async (car) => ({
        ...car,
        images: await resolveImages(ctx, car.images),
      })),
    );
  },
});

// ─────────────────────────────────────────────────────────────────
// GET SINGLE CAR BY ID
// ─────────────────────────────────────────────────────────────────
export const getCarById = query({
  args: { id: v.id("cars") },
  handler: async (ctx, args) => {
    const car = await ctx.db.get(args.id);
    if (!car) return null;
    return { ...car, images: await resolveImages(ctx, car.images) };
  },
});

// ─────────────────────────────────────────────────────────────────
// GET FEATURED CARS
// ─────────────────────────────────────────────────────────────────
export const getFeaturedCars = query({
  args: {},
  handler: async (ctx) => {
    const cars = await ctx.db
      .query("cars")
      .withIndex("by_featured", (q) => q.eq("isFeatured", true))
      .order("desc")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .collect();

    return await Promise.all(
      cars.map(async (car) => ({
        ...car,
        images: await resolveImages(ctx, car.images),
      })),
    );
  },
});

// ─────────────────────────────────────────────────────────────────
// GET ALL UNIQUE BRANDS
// ─────────────────────────────────────────────────────────────────
export const getAllBrands = query({
  args: {},
  handler: async (ctx) => {
    const cars = await ctx.db.query("cars").collect();
    const brands = Array.from(new Set(cars.map((c) => c.brand))).sort();
    return ["All Brands", ...brands];
  },
});

// ─────────────────────────────────────────────────────────────────
// CREATE CAR
// ─────────────────────────────────────────────────────────────────
export const createCar = mutation({
  args: {
    name: v.string(),
    brand: v.string(),
    model: v.string(),
    year: v.number(),
    type: v.string(),
    condition: v.union(v.literal("New"), v.literal("Used")),
    available: v.union(v.literal("Buy"), v.literal("Rent"), v.literal("Both")),
    buyPrice: v.optional(v.number()),
    rentPricePerDay: v.optional(v.number()),
    images: v.array(v.string()),
    fuelType: v.union(
      v.literal("Petrol"),
      v.literal("Diesel"),
      v.literal("Electric"),
      v.literal("Hybrid"),
    ),
    transmission: v.union(v.literal("Automatic"), v.literal("Manual")),
    horsepower: v.number(),
    seatingCapacity: v.number(),
    mileage: v.number(),
    doors: v.number(),
    engineSize: v.optional(v.string()),
    torque: v.optional(v.string()),
    topSpeed: v.optional(v.string()),
    acceleration: v.optional(v.string()),
    fuelEfficiency: v.optional(v.string()),
    color: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    description: v.optional(v.string()),
    features: v.optional(v.array(v.string())),
    isPublished: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
    postedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("cars", args);
  },
});

// ─────────────────────────────────────────────────────────────────
// UPDATE CAR
// ─────────────────────────────────────────────────────────────────
export const updateCar = mutation({
  args: {
    id: v.id("cars"),
    name: v.optional(v.string()),
    brand: v.optional(v.string()),
    model: v.optional(v.string()),
    year: v.optional(v.number()),
    type: v.optional(v.string()),
    condition: v.optional(v.union(v.literal("New"), v.literal("Used"))),
    available: v.optional(
      v.union(v.literal("Buy"), v.literal("Rent"), v.literal("Both")),
    ),
    buyPrice: v.optional(v.number()),
    rentPricePerDay: v.optional(v.number()),
    images: v.optional(v.array(v.string())),
    fuelType: v.optional(
      v.union(
        v.literal("Petrol"),
        v.literal("Diesel"),
        v.literal("Electric"),
        v.literal("Hybrid"),
      ),
    ),
    transmission: v.optional(
      v.union(v.literal("Automatic"), v.literal("Manual")),
    ),
    horsepower: v.optional(v.number()),
    seatingCapacity: v.optional(v.number()),
    mileage: v.optional(v.number()),
    doors: v.optional(v.number()),
    engineSize: v.optional(v.string()),
    torque: v.optional(v.string()),
    topSpeed: v.optional(v.string()),
    acceleration: v.optional(v.string()),
    fuelEfficiency: v.optional(v.string()),
    color: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    description: v.optional(v.string()),
    features: v.optional(v.array(v.string())),
    isPublished: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

// ─────────────────────────────────────────────────────────────────
// DELETE CAR
// ─────────────────────────────────────────────────────────────────
export const deleteCar = mutation({
  args: { id: v.id("cars") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// ─────────────────────────────────────────────────────────────────
// GENERATE UPLOAD URL — call before uploading, returns a POST URL
// ─────────────────────────────────────────────────────────────────
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// ─────────────────────────────────────────────────────────────────
// GET IMAGE URL — one-off resolution of a single storageId
// ─────────────────────────────────────────────────────────────────
export const getImageUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    if (args.storageId.startsWith("http")) return args.storageId;
    return await ctx.storage.getUrl(args.storageId);
  },
});
