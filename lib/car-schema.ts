// lib/car-schema.ts
import { z } from "zod";

export const carSchema = z
  .object({
    // ── Core ──────────────────────────────────────────────────────
    name: z.string().min(2, "Car name must be at least 2 characters"),
    brand: z.string().min(1, "Brand is required"),
    model: z.string().min(1, "Model is required"),
    year: z
      .number({ coerce: true })
      .min(1900, "Year must be 1900 or later")
      .max(2030, "Year can't exceed 2030"),
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
      ],
      {
        required_error: "Please select a car type",
      },
    ),
    condition: z.enum(["New", "Used"], {
      required_error: "Condition is required",
    }),
    available: z.enum(["Buy", "Rent", "Both"], {
      required_error: "Availability is required",
    }),
    color: z.string().optional(),

    // ── Pricing ───────────────────────────────────────────────────
    buyPrice: z
      .number({ coerce: true })
      .positive("Buy price must be positive")
      .optional(),
    rentPricePerDay: z
      .number({ coerce: true })
      .positive("Rent price must be positive")
      .optional(),

    // ── Key specs ─────────────────────────────────────────────────
    fuelType: z.enum(["Petrol", "Diesel", "Electric", "Hybrid"], {
      required_error: "Fuel type is required",
    }),
    transmission: z.enum(["Automatic", "Manual"], {
      required_error: "Transmission is required",
    }),
    horsepower: z
      .number({ coerce: true })
      .min(1, "Horsepower must be at least 1"),
    seatingCapacity: z
      .number({ coerce: true })
      .min(1, "At least 1 seat required")
      .max(20, "Max 20 seats"),
    mileage: z.number({ coerce: true }).min(0, "Mileage can't be negative"),
    doors: z
      .number({ coerce: true })
      .min(1, "At least 1 door required")
      .max(6, "Max 6 doors"),

    // ── Extended specs (optional) ─────────────────────────────────
    engineSize: z.string().optional(),
    torque: z.string().optional(),
    topSpeed: z.string().optional(),
    acceleration: z.string().optional(),
    fuelEfficiency: z.string().optional(),

    // ── Rich content ──────────────────────────────────────────────
    description: z.string().optional(),

    // ── Publish ───────────────────────────────────────────────────
    isPublished: z.boolean().default(true),
    isFeatured: z.boolean().default(false),
  })
  // ── Cross-field validation: price required based on availability ─
  .superRefine((data, ctx) => {
    if (data.available !== "Rent" && !data.buyPrice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Buy price is required when availability includes Buy",
        path: ["buyPrice"],
      });
    }
    if (data.available !== "Buy" && !data.rentPricePerDay) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Rent price is required when availability includes Rent",
        path: ["rentPricePerDay"],
      });
    }
  });

export type CarFormValues = z.infer<typeof carSchema>;
