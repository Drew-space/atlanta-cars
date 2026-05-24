"use client";

import { use, useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ImagePlus, X, Loader2, Plus } from "lucide-react";

type Availability = "Buy" | "Rent" | "Both";
type Condition = "New" | "Used";
type FuelType = "Petrol" | "Diesel" | "Electric" | "Hybrid";
type Transmission = "Automatic" | "Manual";

const CAR_TYPES = [
  "Sedan",
  "SUV",
  "Sports",
  "Truck",
  "Coupe",
  "Hatchback",
  "Convertible",
  "Van",
];
const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid"];
const TRANSMISSIONS = ["Automatic", "Manual"];
const CONDITIONS = ["New", "Used"];
const AVAILABILITY = ["Buy", "Rent", "Both"];
const SUGGESTED_TAGS = [
  "Luxury",
  "Performance",
  "Off-Road",
  "Family",
  "Premium",
  "Electric",
  "Sports",
  "Hybrid",
];

export default function EditCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const car = useQuery(api.cars.getCarById, { id: id as Id<"cars"> });
  const updateCar = useMutation(api.cars.updateCar);
  const generateUploadUrl = useMutation(api.cars.generateUploadUrl);

  // ── Image state ──────────────────────────────────────────────────
  const fileInputRef = useRef<HTMLInputElement>(null);
  // existingImages = URLs already saved in DB (shown as thumbnails)
  const [existingImages, setExistingImages] = useState<string[]>([]);
  // newFiles = files the admin picked to add
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // ── Tag / Feature state ──────────────────────────────────────────
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");

  // ── Form state ───────────────────────────────────────────────────
  const [form, setForm] = useState({
    name: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    type: "Sedan",
    condition: "New" as Condition,
    available: "Both" as Availability,
    buyPrice: "",
    rentPricePerDay: "",
    fuelType: "Petrol" as FuelType,
    transmission: "Automatic" as Transmission,
    horsepower: "",
    seatingCapacity: "",
    mileage: "",
    doors: "",
    engineSize: "",
    torque: "",
    topSpeed: "",
    acceleration: "",
    fuelEfficiency: "",
    color: "",
    description: "",
    isPublished: true,
    isFeatured: false,
  });

  // ── Pre-fill form once car loads ─────────────────────────────────
  useEffect(() => {
    if (!car) return;
    setForm({
      name: car.name,
      brand: car.brand,
      model: car.model,
      year: car.year,
      type: car.type,
      condition: car.condition as Condition,
      available: car.available as Availability,
      buyPrice: car.buyPrice?.toString() ?? "",
      rentPricePerDay: car.rentPricePerDay?.toString() ?? "",
      fuelType: car.fuelType as FuelType,
      transmission: car.transmission as Transmission,
      horsepower: car.horsepower.toString(),
      seatingCapacity: car.seatingCapacity.toString(),
      mileage: car.mileage.toString(),
      doors: car.doors.toString(),
      engineSize: car.engineSize ?? "",
      torque: car.torque ?? "",
      topSpeed: car.topSpeed ?? "",
      acceleration: car.acceleration ?? "",
      fuelEfficiency: car.fuelEfficiency ?? "",
      color: car.color ?? "",
      description: car.description ?? "",
      isPublished: car.isPublished ?? true,
      isFeatured: car.isFeatured ?? false,
    });
    setExistingImages(car.images ?? []);
    setTags(car.tags ?? []);
    setFeatures(car.features ?? []);
  }, [car]);

  // ── Helpers ──────────────────────────────────────────────────────
  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addTag(tag: string) {
    const clean = tag.trim();
    if (clean && !tags.includes(clean)) setTags((prev) => [...prev, clean]);
    setTagInput("");
  }
  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  function addFeature() {
    const clean = featureInput.trim();
    if (clean && !features.includes(clean))
      setFeatures((prev) => [...prev, clean]);
    setFeatureInput("");
  }
  function removeFeature(f: string) {
    setFeatures((prev) => prev.filter((x) => x !== f));
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setNewFiles((prev) => [...prev, ...files]);
    setNewPreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
    e.target.value = "";
  }

  function removeExisting(index: number) {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  }

  function removeNew(index: number) {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  // ── Upload new files to Convex Storage ───────────────────────────
  async function uploadNewImages(): Promise<string[]> {
    const ids: string[] = [];
    for (const file of newFiles) {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!res.ok) throw new Error("Image upload failed");
      const { storageId } = await res.json();
      ids.push(storageId);
    }
    return ids;
  }

  // ── Submit ───────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const totalImages = existingImages.length + newFiles.length;
    if (totalImages === 0) {
      toast.error("At least one image is required");
      return;
    }

    try {
      setUploading(true);
      const newStorageIds = await uploadNewImages();

      // existingImages are already resolved URLs from the DB
      // newStorageIds are raw storageIds — the query will resolve them on next fetch
      const allImages = [...existingImages, ...newStorageIds];

      await updateCar({
        id: id as Id<"cars">,
        name: form.name,
        brand: form.brand,
        model: form.model,
        year: Number(form.year),
        type: form.type,
        condition: form.condition,
        available: form.available,
        buyPrice: form.buyPrice ? Number(form.buyPrice) : undefined,
        rentPricePerDay: form.rentPricePerDay
          ? Number(form.rentPricePerDay)
          : undefined,
        images: allImages,
        fuelType: form.fuelType,
        transmission: form.transmission,
        horsepower: Number(form.horsepower),
        seatingCapacity: Number(form.seatingCapacity),
        mileage: Number(form.mileage),
        doors: Number(form.doors),
        engineSize: form.engineSize || undefined,
        torque: form.torque || undefined,
        topSpeed: form.topSpeed || undefined,
        acceleration: form.acceleration || undefined,
        fuelEfficiency: form.fuelEfficiency || undefined,
        color: form.color || undefined,
        tags: tags.length ? tags : undefined,
        description: form.description || undefined,
        features: features.length ? features : undefined,
        isPublished: form.isPublished,
        isFeatured: form.isFeatured,
      });

      toast.success("Car updated successfully!");
      router.push("/admin");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update car");
    } finally {
      setUploading(false);
    }
  }

  // ── Loading state ────────────────────────────────────────────────
  if (car === undefined) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (car === null) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-muted-foreground text-sm">Car not found.</p>
      </div>
    );
  }

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 max-w-4xl mx-auto w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* ── Images ── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Car Images</CardTitle>
            <p className="text-xs text-muted-foreground">
              Remove existing images or add new ones. First image is the cover.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {/* Existing images from DB */}
              {existingImages.map((src, i) => (
                <div
                  key={`existing-${i}`}
                  className="relative w-28 h-20 rounded-xl overflow-hidden border"
                >
                  <img
                    src={src}
                    alt={`existing ${i}`}
                    className="w-full h-full object-cover"
                  />
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-black/60 text-white px-1.5 py-0.5 rounded-full">
                      Cover
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeExisting(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {/* New image previews */}
              {newPreviews.map((src, i) => (
                <div
                  key={`new-${i}`}
                  className="relative w-28 h-20 rounded-xl overflow-hidden border border-blue-300"
                >
                  <img
                    src={src}
                    alt={`new ${i}`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded-full">
                    New
                  </span>
                  <button
                    type="button"
                    onClick={() => removeNew(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {/* Add more */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-28 h-20 rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-blue-500"
              >
                <ImagePlus className="w-5 h-5" />
                <span className="text-[10px]">Add image</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageSelect}
              />
            </div>
          </CardContent>
        </Card>

        {/* ── Core Details ── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Core Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Car Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Brand *</Label>
              <Input
                value={form.brand}
                onChange={(e) => set("brand", e.target.value)}
                required
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Model *</Label>
              <Input
                value={form.model}
                onChange={(e) => set("model", e.target.value)}
                required
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Year *</Label>
              <Input
                type="number"
                min={1900}
                max={2030}
                value={form.year}
                onChange={(e) => set("year", Number(e.target.value))}
                required
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Type *</Label>
              <Select value={form.type} onValueChange={(v) => set("type", v)}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CAR_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Color</Label>
              <Input
                value={form.color}
                onChange={(e) => set("color", e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Condition *</Label>
              <Select
                value={form.condition}
                onValueChange={(v) => set("condition", v as Condition)}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CONDITIONS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Availability *</Label>
              <Select
                value={form.available}
                onValueChange={(v) => set("available", v as Availability)}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABILITY.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* ── Pricing ── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Pricing (USD)</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {form.available !== "Rent" && (
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Buy Price ($)</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.buyPrice}
                  onChange={(e) => set("buyPrice", e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
            )}
            {form.available !== "Buy" && (
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Rent Price per Day ($)</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.rentPricePerDay}
                  onChange={(e) => set("rentPricePerDay", e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── Key Specs ── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Key Specifications
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Fuel Type *</Label>
              <Select
                value={form.fuelType}
                onValueChange={(v) => set("fuelType", v as FuelType)}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FUEL_TYPES.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Transmission *</Label>
              <Select
                value={form.transmission}
                onValueChange={(v) => set("transmission", v as Transmission)}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TRANSMISSIONS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Horsepower (hp) *</Label>
              <Input
                type="number"
                min={0}
                value={form.horsepower}
                onChange={(e) => set("horsepower", e.target.value)}
                required
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Seating Capacity *</Label>
              <Input
                type="number"
                min={1}
                max={20}
                value={form.seatingCapacity}
                onChange={(e) => set("seatingCapacity", e.target.value)}
                required
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Mileage (mi) *</Label>
              <Input
                type="number"
                min={0}
                value={form.mileage}
                onChange={(e) => set("mileage", e.target.value)}
                required
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Doors *</Label>
              <Input
                type="number"
                min={1}
                max={6}
                value={form.doors}
                onChange={(e) => set("doors", e.target.value)}
                required
                className="h-9 text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* ── Extended Specs ── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Extended Specs{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Engine Size</Label>
              <Input
                placeholder="e.g. 3.5L V6"
                value={form.engineSize}
                onChange={(e) => set("engineSize", e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Torque</Label>
              <Input
                placeholder="e.g. 450 Nm"
                value={form.torque}
                onChange={(e) => set("torque", e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Top Speed</Label>
              <Input
                placeholder="e.g. 250 mph"
                value={form.topSpeed}
                onChange={(e) => set("topSpeed", e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">0–60 mph</Label>
              <Input
                placeholder="e.g. 0-60 mph in 4.2s"
                value={form.acceleration}
                onChange={(e) => set("acceleration", e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label className="text-xs">Fuel Efficiency</Label>
              <Input
                placeholder="e.g. 30 MPG"
                value={form.fuelEfficiency}
                onChange={(e) => set("fuelEfficiency", e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* ── Tags ── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Tags{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_TAGS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => addTag(t)}
                  className="text-[11px] px-3 py-1 rounded-full border transition-colors"
                  style={
                    tags.includes(t)
                      ? {
                          background: "#1E90FF",
                          color: "#fff",
                          borderColor: "#1E90FF",
                        }
                      : {
                          background: "transparent",
                          color: "#6b7280",
                          borderColor: "#e5e7eb",
                        }
                  }
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add custom tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag(tagInput);
                  }
                }}
                className="h-8 text-xs flex-1"
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-8"
                onClick={() => addTag(tagInput)}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="text-xs gap-1 pr-1"
                  >
                    {t}
                    <button type="button" onClick={() => removeTag(t)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── Features ── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Features & Equipment{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex gap-2">
              <Input
                placeholder="e.g. Heated seats, Sunroof..."
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFeature();
                  }
                }}
                className="h-8 text-xs flex-1"
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-8"
                onClick={addFeature}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            {features.length > 0 && (
              <div className="flex flex-col gap-1.5">
                {features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center justify-between text-xs bg-muted/50 rounded-lg px-3 py-2"
                  >
                    <span>{f}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(f)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── Description ── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Description{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Write a short description..."
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
              className="text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* ── Publish Settings ── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Publish Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Publish listing</p>
                <p className="text-xs text-muted-foreground">
                  Make this car visible on the public site
                </p>
              </div>
              <Switch
                checked={form.isPublished}
                onCheckedChange={(v) => set("isPublished", v)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Mark as featured</p>
                <p className="text-xs text-muted-foreground">
                  Show on the homepage featured section
                </p>
              </div>
              <Switch
                checked={form.isFeatured}
                onCheckedChange={(v) => set("isFeatured", v)}
              />
            </div>
          </CardContent>
        </Card>

        {/* ── Submit ── */}
        <div className="flex gap-3 pb-8">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
            disabled={uploading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 text-white"
            style={{ background: "#1E90FF" }}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
