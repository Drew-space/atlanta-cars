"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserButton, useUser } from "@clerk/nextjs";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { CarAdminSidebar } from "@/components/CarAdminSidebar";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/cars/new": "Upload Car",
};

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.endsWith("/edit")) return "Edit Car";
  return "Admin";
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoaded } = useUser();

  // ── Simple admin guard via Clerk publicMetadata ───────────────────
  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.replace("/");
      return;
    }
    if (user.publicMetadata?.role !== "admin") {
      router.replace("/");
      return;
    }
  }, [isLoaded, user, router]);

  if (!isLoaded || !user || user.publicMetadata?.role !== "admin") return null;

  const title = getPageTitle(pathname);

  return (
    <TooltipProvider>
      <SidebarProvider>
        <CarAdminSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div className="flex justify-between w-full items-center">
              <h1 className="text-sm font-medium">{title}</h1>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground hidden sm:block">
                  Welcome back,{" "}
                  <span className="font-medium text-foreground">
                    {user.firstName ?? "Admin"}
                  </span>
                </span>
                <UserButton />
              </div>
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
