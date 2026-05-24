"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Car,
  EllipsisVertical,
  Search,
  Plus,
  Fuel,
  Settings2,
  Gauge,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  // ── Queries ───────────────────────────────────────────────────────
  const allCars = useQuery(api.cars.getCars, {}) ?? [];
  const featured = useQuery(api.cars.getFeaturedCars) ?? [];

  // ── Mutations ─────────────────────────────────────────────────────
  const deleteCar = useMutation(api.cars.deleteCar);
  const updateCar = useMutation(api.cars.updateCar);

  // ── Derived stats ─────────────────────────────────────────────────
  const totalCars = allCars.length;
  const totalNew = allCars.filter((c) => c.condition === "New").length;
  const totalForRent = allCars.filter(
    (c) => c.available === "Rent" || c.available === "Both",
  ).length;
  const totalFeatured = featured.length;

  // ── Search filter ─────────────────────────────────────────────────
  const filtered = allCars.filter((c) => {
    const q = search.toLowerCase();
    return (
      !search ||
      c.name.toLowerCase().includes(q) ||
      c.brand.toLowerCase().includes(q) ||
      c.type.toLowerCase().includes(q)
    );
  });

  // ── Handlers ──────────────────────────────────────────────────────
  async function handleDelete(id: Id<"cars">) {
    try {
      await deleteCar({ id });
      toast.success("Car deleted");
    } catch {
      toast.error("Failed to delete car");
    }
  }

  async function handleTogglePublish(
    id: Id<"cars">,
    current: boolean | undefined,
  ) {
    try {
      await updateCar({ id, isPublished: !current });
      toast.success(!current ? "Car published" : "Car unpublished");
    } catch {
      toast.error("Failed to update car");
    }
  }

  async function handleToggleFeatured(
    id: Id<"cars">,
    current: boolean | undefined,
  ) {
    try {
      await updateCar({ id, isFeatured: !current });
      toast.success(!current ? "Marked as featured" : "Removed from featured");
    } catch {
      toast.error("Failed to update car");
    }
  }

  const formatPrice = (n?: number) =>
    n ? "$" + n.toLocaleString("en-US") : "—";

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* ── Stat cards ── */}
      <div className="flex gap-3 overflow-x-auto py-1 md:grid md:grid-cols-4 md:overflow-visible">
        <div className="min-w-[130px] rounded-xl bg-blue-50 ring ring-blue-400 text-blue-600 flex flex-col p-4 md:aspect-video shrink-0 md:shrink md:min-w-0">
          <h1 className="text-sm font-medium">Total Cars</h1>
          <div className="flex flex-1 items-center justify-center py-4 md:py-0">
            <p className="text-4xl font-semibold">{totalCars}</p>
          </div>
        </div>
        <div className="min-w-[130px] rounded-xl bg-green-50 ring ring-green-400 text-green-600 flex flex-col p-4 md:aspect-video shrink-0 md:shrink md:min-w-0">
          <h1 className="text-sm font-medium">New Condition</h1>
          <div className="flex flex-1 items-center justify-center py-4 md:py-0">
            <p className="text-4xl font-semibold">{totalNew}</p>
          </div>
        </div>
        <div className="min-w-[130px] rounded-xl bg-purple-50 ring ring-purple-400 text-purple-600 flex flex-col p-4 md:aspect-video shrink-0 md:shrink md:min-w-0">
          <h1 className="text-sm font-medium">Available to Rent</h1>
          <div className="flex flex-1 items-center justify-center py-4 md:py-0">
            <p className="text-4xl font-semibold">{totalForRent}</p>
          </div>
        </div>
        <div className="min-w-[130px] rounded-xl bg-amber-50 ring ring-amber-400 text-amber-600 flex flex-col p-4 md:aspect-video shrink-0 md:shrink md:min-w-0">
          <h1 className="text-sm font-medium">Featured</h1>
          <div className="flex flex-1 items-center justify-center py-4 md:py-0">
            <p className="text-4xl font-semibold">{totalFeatured}</p>
          </div>
        </div>
      </div>

      {/* ── Cars inventory ── */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full gap-3 flex-wrap">
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <CardTitle className="text-sm font-medium">All Cars</CardTitle>
              <div className="relative max-w-xs">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search cars..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-8 text-xs"
                />
              </div>
            </div>
            <Link href="/admin/cars/new">
              <Button
                size="sm"
                className="text-xs h-8 gap-1.5"
                style={{ background: "#1E90FF" }}
              >
                <Plus className="w-3.5 h-3.5" />
                Upload Car
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          {/* Mobile: 2 cols / Desktop: 4 cols */}
          {allCars === undefined ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border overflow-hidden animate-pulse"
                >
                  <div className="aspect-[16/10] bg-muted" />
                  <div className="p-3 flex flex-col gap-2">
                    <div className="h-3 bg-muted rounded w-2/3" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground text-sm">
              {search ? "No cars match your search." : "No cars uploaded yet."}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {filtered.map((car) => (
                <div
                  key={car._id}
                  className="rounded-xl border overflow-hidden bg-background hover:border-blue-200 transition-colors group"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Condition badge */}
                    <span
                      className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={
                        car.condition === "New"
                          ? { background: "#1E90FF" }
                          : { background: "#f59e0b" }
                      }
                    >
                      {car.condition}
                    </span>
                    {/* Three-dot menu */}
                    <div className="absolute top-1.5 right-1.5">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="h-6 w-6 rounded-full bg-white/90 hover:bg-white shadow-sm"
                          >
                            <EllipsisVertical className="h-3 w-3 text-gray-700" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-44 text-xs"
                        >
                          <DropdownMenuItem
                            className="text-xs"
                            onClick={() =>
                              router.push(`/admin/cars/${car._id}/edit`)
                            }
                          >
                            Edit car
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-xs"
                            onClick={() =>
                              handleTogglePublish(car._id, car.isPublished)
                            }
                          >
                            {car.isPublished ? "Unpublish" : "Publish"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-xs"
                            onClick={() =>
                              handleToggleFeatured(car._id, car.isFeatured)
                            }
                          >
                            {car.isFeatured
                              ? "Remove featured"
                              : "Mark as featured"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                className="text-xs text-destructive focus:text-destructive"
                                onSelect={(e) => e.preventDefault()}
                              >
                                Delete car
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete {car.name}?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. The car will be
                                  permanently removed from your inventory.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive text-white hover:bg-destructive/90"
                                  onClick={() => handleDelete(car._id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-3 flex flex-col gap-2">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                        {car.brand} · {car.year}
                      </p>
                      <p className="text-xs font-semibold leading-tight mt-0.5 line-clamp-1">
                        {car.name}
                      </p>
                    </div>

                    {/* Mini specs */}
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-0.5">
                        <Gauge className="w-3 h-3" /> {car.horsepower}hp
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Settings2 className="w-3 h-3" /> {car.transmission}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Fuel className="w-3 h-3" /> {car.fuelType}
                      </span>
                    </div>

                    {/* Price + badges */}
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <p
                        className="text-xs font-black"
                        style={{ color: "#1E90FF" }}
                      >
                        {car.buyPrice
                          ? formatPrice(car.buyPrice)
                          : formatPrice(car.rentPricePerDay) + "/day"}
                      </p>
                      <div className="flex gap-1 flex-wrap">
                        {car.isPublished ? (
                          <Badge
                            variant="outline"
                            className="text-[9px] py-0 px-1.5 text-green-600 border-green-300 bg-green-50"
                          >
                            Live
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-[9px] py-0 px-1.5 text-gray-500 border-gray-300"
                          >
                            Draft
                          </Badge>
                        )}
                        {car.isFeatured && (
                          <Badge
                            variant="outline"
                            className="text-[9px] py-0 px-1.5 text-amber-600 border-amber-300 bg-amber-50"
                          >
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
