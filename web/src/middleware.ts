import { auth } from "@/auth";

/**
 * Gate every /admin route behind a session. Unauthenticated visitors are sent
 * to the login page (which is itself excluded so there's no redirect loop).
 */
export default auth((req) => {
  const isLogin = req.nextUrl.pathname === "/admin/login";
  if (!req.auth && !isLogin) {
    const url = new URL("/admin/login", req.nextUrl.origin);
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
