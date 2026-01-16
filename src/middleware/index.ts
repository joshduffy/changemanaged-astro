import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Only protect /admin/* routes (except login and auth)
  if (pathname.startsWith("/admin")) {
    const publicPaths = ["/admin/login", "/admin/auth/callback"];
    const isPublicPath = publicPaths.some((p) => pathname.startsWith(p));

    if (!isPublicPath) {
      const sessionToken = context.cookies.get("admin_session")?.value;

      if (!sessionToken) {
        return context.redirect("/admin/login");
      }

      // Validate session with the survey API
      const apiUrl =
        import.meta.env.SURVEY_API_URL || "https://survey.changemanaged.io";
      try {
        const response = await fetch(`${apiUrl}/api/admin/auth/session`, {
          headers: { Authorization: `Bearer ${sessionToken}` },
        });

        if (!response.ok) {
          // Clear invalid session
          context.cookies.delete("admin_session", { path: "/" });
          return context.redirect("/admin/login");
        }
      } catch {
        // API error - redirect to login
        return context.redirect("/admin/login");
      }
    }
  }

  return next();
});
