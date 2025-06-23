import { authMiddleware } from '@clerk/nextjs';

// Use the authMiddleware which is more Edge-compatible
export default authMiddleware({
  // Add any configuration options here if needed
  // For example:
  // publicRoutes: ['/'],
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};