import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",     // Matches all except static files
    "/(api|trpc)(.*)",            // Protect API/trpc routes too
  ],
};
