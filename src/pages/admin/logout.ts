import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies, redirect }) => {
  // Clear the session cookie
  cookies.delete("admin_session", { path: "/" });

  // Redirect to login page
  return redirect("/admin/login");
};

export const prerender = false;
