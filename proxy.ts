import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // If the request is for an admin route, check authentication + role
  if (isAdminRoute(req)) {
    const { userId, sessionClaims } = await auth();

    // Not signed in → 404 (don't reveal the route exists)
    if (!userId) {
      return NextResponse.rewrite(new URL("/not-found", req.url));
    }

    // Signed in but not admin → 404
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    if (role !== "admin") {
      return NextResponse.rewrite(new URL("/not-found", req.url));
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/__clerk/(.*)",
    "/(api|trpc)(.*)",
  ],
};
