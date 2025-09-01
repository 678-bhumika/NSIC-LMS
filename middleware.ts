// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Protected routes
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/courses(.*)",
  "/teacher(.*)"
]);

// Public routes
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook(.*)",
  "/api/uploadthing(.*)"
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();

  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isPublicRoute(req) && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)"
  ],
};
