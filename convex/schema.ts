import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    username: v.string(),
    clerkId: v.string(),
    imageUrl: v.string(),
    updatedAt: v.number(),
  }).index("by_clerkId", ["clerkId"]),

  cars: defineTable({
    // ── Core identity (required) ──────────────────────────────────────────────
    name: v.string(), // e.g. "BMW 5 Series"
    brand: v.string(), // e.g. "BMW"
    model: v.string(), // e.g. "530i"
    year: v.number(), // e.g. 2023
    type: v.string(), // "Sedan" | "SUV" | "Sports" | "Truck" | ...
    condition: v.union(v.literal("New"), v.literal("Used")),
    available: v.union(v.literal("Buy"), v.literal("Rent"), v.literal("Both")),

    // ── Pricing (at least one should be provided, both optional individually) ─
    buyPrice: v.optional(v.number()), // price in Naira if for sale
    rentPricePerDay: v.optional(v.number()), // price in Naira per day if for rent

    // ── Images (required — array of Convex Storage IDs) ──────────────────────
    // In development: plain URLs (Unsplash etc.)
    // In production:  v.id("_storage") returned from storage.generateUploadUrl()
    images: v.array(v.string()),

    // ── Key specs (required — used for filtering & cards) ────────────────────
    fuelType: v.union(
      v.literal("Petrol"),
      v.literal("Diesel"),
      v.literal("Electric"),
      v.literal("Hybrid"),
    ),
    transmission: v.union(v.literal("Automatic"), v.literal("Manual")),
    horsepower: v.number(), // e.g. 248
    seatingCapacity: v.number(), // e.g. 5
    mileage: v.number(), // km driven (0 for new cars)
    doors: v.number(), // e.g. 4

    // ── Extended specs (optional — shown on detail page) ─────────────────────
    engineSize: v.optional(v.string()), // e.g. "3.5L V6"
    torque: v.optional(v.string()), // e.g. "450 Nm"
    topSpeed: v.optional(v.string()), // e.g. "250 km/h"
    acceleration: v.optional(v.string()), // e.g. "0-100 km/h in 6.1s"
    fuelEfficiency: v.optional(v.string()), // e.g. "8.2L/100km"
    color: v.optional(v.string()), // e.g. "Alpine White"

    // ── Categorisation (optional) ─────────────────────────────────────────────
    tags: v.optional(v.array(v.string())),
    // e.g. ["Luxury", "SUV", "Off-Road", "Performance", "Family", "Electric"]

    // ── Rich content (optional) ───────────────────────────────────────────────
    description: v.optional(v.string()),
    features: v.optional(v.array(v.string())),
    // e.g. ["Sunroof", "Heated seats", "Apple CarPlay", ...]

    // ── Meta (optional — useful for admin dashboard later) ───────────────────
    isPublished: v.optional(v.boolean()), // draft vs live listing
    isFeatured: v.optional(v.boolean()), // show on homepage featured section
    postedBy: v.optional(v.string()), // Clerk userId of the agent/admin who posted
  })
    // ── Indexes for common queries ──────────────────────────────────────────
    .index("by_brand", ["brand"])
    .index("by_type", ["type"])
    .index("by_condition", ["condition"])
    .index("by_available", ["available"])
    .index("by_published", ["isPublished"])
    .index("by_featured", ["isFeatured"])
    .index("by_posted_by", ["postedBy"]),
});
