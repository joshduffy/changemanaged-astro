import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);
const isPublicAdminRoute = createRouteMatcher(["/admin/login(.*)"]);

export const onRequest = clerkMiddleware((auth, context) => {
  const { pathname } = context.url;

  // Skip for non-admin routes
  if (!pathname.startsWith("/admin")) {
    return;
  }

  // Allow login page
  if (isPublicAdminRoute(context.request)) {
    return;
  }

  // Protect all other admin routes
  if (isProtectedRoute(context.request)) {
    const { userId } = auth();
    if (!userId) {
      return context.redirect("/admin/login");
    }
  }
});
