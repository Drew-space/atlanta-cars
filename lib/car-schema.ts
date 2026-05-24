// lib/car-schema.ts
import { z } from "zod";

// ── Strategy: keep all fields as strings/native types in the schema
// so zodResolver + react-hook-form are happy.
// Number coercion happens in onSubmit before sending to Convex.

export const carSchema = z
  .object({
    // ── Core ──────────────────────────────────────────────────────
    name: z.string().min(2, "Car name must be at least 2 characters"),
    brand: z.string().min(1, "Brand is required"),
    model: z.string().min(1, "Model is required"),
    year: z.string().min(4, "Year is required"),
    type: z.enum(
      [
        "Sedan",
        "SUV",
        "Sports",
        "Truck",
        "Coupe",
        "Hatchback",
        "Convertible",
        "Van",
      ] as const,
      { message: "Please select a car type" },
    ),
    condition: z.enum(["New", "Used"] as const, {
      message: "Condition is required",
    }),
    available: z.enum(["Buy", "Rent", "Both"] as const, {
      message: "Availability is required",
    }),
    color: z.string().optional(),

    // ── Pricing — strings so RHF input values work cleanly ────────
    buyPrice: z.string().optional(),
    rentPricePerDay: z.string().optional(),

    // ── Key specs — strings, coerced in onSubmit ──────────────────
    fuelType: z.enum(["Petrol", "Diesel", "Electric", "Hybrid"] as const, {
      message: "Fuel type is required",
    }),
    transmission: z.enum(["Automatic", "Manual"] as const, {
      message: "Transmission is required",
    }),
    horsepower: z.string().min(1, "Horsepower is required"),
    seatingCapacity: z.string().min(1, "Seating capacity is required"),
    mileage: z.string().min(1, "Mileage is required"),
    doors: z.string().min(1, "Doors is required"),

    // ── Extended specs ────────────────────────────────────────────
    engineSize: z.string().optional(),
    torque: z.string().optional(),
    topSpeed: z.string().optional(),
    acceleration: z.string().optional(),
    fuelEfficiency: z.string().optional(),
    description: z.string().optional(),

    // ── Publish ───────────────────────────────────────────────────
    isPublished: z.boolean().default(true),
    isFeatured: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (
      data.available !== "Rent" &&
      (!data.buyPrice || Number(data.buyPrice) <= 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Buy price is required when availability includes Buy",
        path: ["buyPrice"],
      });
    }
    if (
      data.available !== "Buy" &&
      (!data.rentPricePerDay || Number(data.rentPricePerDay) <= 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Rent price is required when availability includes Rent",
        path: ["rentPricePerDay"],
      });
    }
    if (Number(data.horsepower) < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must be at least 1 hp",
        path: ["horsepower"],
      });
    }
    if (Number(data.seatingCapacity) < 1 || Number(data.seatingCapacity) > 20) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must be between 1 and 20 seats",
        path: ["seatingCapacity"],
      });
    }
    if (Number(data.mileage) < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Can't be negative",
        path: ["mileage"],
      });
    }
    if (Number(data.doors) < 1 || Number(data.doors) > 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must be between 1 and 6 doors",
        path: ["doors"],
      });
    }
    if (Number(data.year) < 1900 || Number(data.year) > 2030) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Year must be between 1900 and 2030",
        path: ["year"],
      });
    }
  });

export type CarFormValues = z.infer<typeof carSchema>;

// ── Helper: convert form string values to numbers for Convex ─────────
export function coerceCarFormNumbers(data: CarFormValues) {
  return {
    ...data,
    year: Number(data.year),
    horsepower: Number(data.horsepower),
    seatingCapacity: Number(data.seatingCapacity),
    mileage: Number(data.mileage),
    doors: Number(data.doors),
    buyPrice: data.buyPrice ? Number(data.buyPrice) : undefined,
    rentPricePerDay: data.rentPricePerDay
      ? Number(data.rentPricePerDay)
      : undefined,
  };
}
