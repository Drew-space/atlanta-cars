"use client";

import { use, useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { carSchema, type CarFormValues } from "@/lib/car-schema";
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

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-[11px] text-destructive mt-1">{message}</p>;
}

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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [imageError, setImageError] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      type: "Sedan",
      condition: "New",
      available: "Both",
      fuelType: "Petrol",
      transmission: "Automatic",
      isPublished: true,
      isFeatured: false,
    },
  });

  const available = watch("available");

  // Pre-fill once car loads
  useEffect(() => {
    if (!car) return;
    reset({
      name: car.name,
      brand: car.brand,
      model: car.model,
      year: car.year,
      type: car.type as CarFormValues["type"],
      condition: car.condition as CarFormValues["condition"],
      available: car.available as CarFormValues["available"],
      buyPrice: car.buyPrice ?? undefined,
      rentPricePerDay: car.rentPricePerDay ?? undefined,
      fuelType: car.fuelType as CarFormValues["fuelType"],
      transmission: car.transmission as CarFormValues["transmission"],
      horsepower: car.horsepower,
      seatingCapacity: car.seatingCapacity,
      mileage: car.mileage,
      doors: car.doors,
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
  }, [car, reset]);

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setNewFiles((p) => [...p, ...files]);
    setNewPreviews((p) => [...p, ...files.map((f) => URL.createObjectURL(f))]);
    setImageError("");
    e.target.value = "";
  }

  function addTag(tag: string) {
    const t = tag.trim();
    if (t && !tags.includes(t)) setTags((p) => [...p, t]);
    setTagInput("");
  }

  function addFeature() {
    const f = featureInput.trim();
    if (f && !features.includes(f)) setFeatures((p) => [...p, f]);
    setFeatureInput("");
  }

  async function uploadNewImages(): Promise<string[]> {
    const ids: string[] = [];
    for (const file of newFiles) {
      const url = await generateUploadUrl();
      const res = await fetch(url, {
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

  async function onSubmit(data: CarFormValues) {
    const total = existingImages.length + newFiles.length;
    if (total === 0) {
      setImageError("At least one image is required");
      return;
    }

    try {
      setUploading(true);
      const newIds = await uploadNewImages();
      const allImages = [...existingImages, ...newIds];

      await updateCar({
        id: id as Id<"cars">,
        ...data,
        images: allImages,
        tags: tags.length ? tags : undefined,
        features: features.length ? features : undefined,
      });

      toast.success("Car updated successfully!");
      router.push("/admin");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update car");
    } finally {
      setUploading(false);
    }
  }

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

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 max-w-4xl mx-auto w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Car Images</CardTitle>
            <p className="text-xs text-muted-foreground">
              Remove existing or add new ones. First image is the cover.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {existingImages.map((src, i) => (
                <div
                  key={`e-${i}`}
                  className="relative w-28 h-20 rounded-xl overflow-hidden border"
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-black/60 text-white px-1.5 py-0.5 rounded-full">
                      Cover
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setExistingImages((p) => p.filter((_, idx) => idx !== i))
                    }
                    className="absolute top-1 right-1 w-5 h-5 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {newPreviews.map((src, i) => (
                <div
                  key={`n-${i}`}
                  className="relative w-28 h-20 rounded-xl overflow-hidden border border-blue-300"
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded-full">
                    New
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setNewFiles((p) => p.filter((_, idx) => idx !== i));
                      setNewPreviews((p) => p.filter((_, idx) => idx !== i));
                    }}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
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
            {imageError && (
              <p className="text-[11px] text-destructive mt-2">{imageError}</p>
            )}
          </CardContent>
        </Card>

        {/* Core Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Core Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Car Name *</Label>
              <Input {...register("name")} className="h-9 text-sm" />
              <FieldError message={errors.name?.message} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Brand *</Label>
              <Input {...register("brand")} className="h-9 text-sm" />
              <FieldError message={errors.brand?.message} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Model *</Label>
              <Input {...register("model")} className="h-9 text-sm" />
              <FieldError message={errors.model?.message} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Year *</Label>
              <Input
                {...register("year")}
                type="number"
                className="h-9 text-sm"
              />
              <FieldError message={errors.year?.message} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Type *</Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
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
                )}
              />
              <FieldError message={errors.type?.message} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Color</Label>
              <Input {...register("color")} className="h-9 text-sm" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Condition *</Label>
              <Controller
                name="condition"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
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
                )}
              />
              <FieldError message={errors.condition?.message} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Availability *</Label>
              <Controller
                name="available"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
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
                )}
              />
              <FieldError message={errors.available?.message} />
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Pricing (USD)</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {available !== "Rent" && (
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Buy Price ($)</Label>
                <Input
                  {...register("buyPrice")}
                  type="number"
                  min={0}
                  className="h-9 text-sm"
                />
                <FieldError message={errors.buyPrice?.message} />
              </div>
            )}
            {available !== "Buy" && (
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Rent Price per Day ($)</Label>
                <Input
                  {...register("rentPricePerDay")}
                  type="number"
                  min={0}
                  className="h-9 text-sm"
                />
                <FieldError message={errors.rentPricePerDay?.message} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Key Specs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Key Specifications
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Fuel Type *</Label>
              <Controller
                name="fuelType"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
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
                )}
              />
              <FieldError message={errors.fuelType?.message} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Transmission *</Label>
              <Controller
                name="transmission"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
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
                )}
              />
              <FieldError message={errors.transmission?.message} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Horsepower (hp) *</Label>
              <Input
                {...register("horsepower")}
                type="number"
                min={0}
                className="h-9 text-sm"
              />
              <FieldError message={errors.horsepower?.message} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Seating Capacity *</Label>
              <Input
                {...register("seatingCapacity")}
                type="number"
                min={1}
                max={20}
                className="h-9 text-sm"
              />
              <FieldError message={errors.seatingCapacity?.message} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Mileage (mi) *</Label>
              <Input
                {...register("mileage")}
                type="number"
                min={0}
                className="h-9 text-sm"
              />
              <FieldError message={errors.mileage?.message} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Doors *</Label>
              <Input
                {...register("doors")}
                type="number"
                min={1}
                max={6}
                className="h-9 text-sm"
              />
              <FieldError message={errors.doors?.message} />
            </div>
          </CardContent>
        </Card>

        {/* Extended Specs */}
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
                {...register("engineSize")}
                placeholder="e.g. 3.5L V6"
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Torque</Label>
              <Input
                {...register("torque")}
                placeholder="e.g. 450 Nm"
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Top Speed</Label>
              <Input
                {...register("topSpeed")}
                placeholder="e.g. 250 mph"
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">0–60 mph</Label>
              <Input
                {...register("acceleration")}
                placeholder="e.g. 0-60 mph in 4.2s"
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label className="text-xs">Fuel Efficiency</Label>
              <Input
                {...register("fuelEfficiency")}
                placeholder="e.g. 30 MPG"
                className="h-9 text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
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
                    <button
                      type="button"
                      onClick={() => setTags((p) => p.filter((x) => x !== t))}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features */}
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
                      onClick={() =>
                        setFeatures((p) => p.filter((x) => x !== f))
                      }
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

        {/* Description */}
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
              {...register("description")}
              placeholder="Write a short description..."
              rows={4}
              className="text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Publish Settings */}
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
              <Controller
                name="isPublished"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
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
              <Controller
                name="isFeatured"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
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
