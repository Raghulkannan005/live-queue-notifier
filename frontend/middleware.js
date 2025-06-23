import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/about", "/api/public"],
  ignoredRoutes: ["/api/webhook(.*)"], // Optional
});

export const config = {
  matcher: [
    // Protect everything except public/static files
    "/((?!_next|.*\\..*|favicon.ico).*)",
  ],
};
