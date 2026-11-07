import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const hasSupabaseCookie = req.cookies
    .getAll()
    .some(
      (c) =>
        c.name.includes("auth-token") ||
        c.name.startsWith("sb-") ||
        c.name.includes("supabase")
    );
  const isLoggedIn = !!req.auth || hasSupabaseCookie;
  const { pathname } = req.nextUrl;

  // Only redirect logged-in users away from the login page
  if (pathname === "/" && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/"],
};
