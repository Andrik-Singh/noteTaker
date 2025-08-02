// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicRoutes = [
  "/signin",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-email"
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Get the session cookie
  const session = getSessionCookie(request);

  const isPublic = publicRoutes.includes(pathname);
  const isLoggedIn = !!session;

  // Not logged in → trying to access a protected route
  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Logged in → trying to access a public route (e.g., /signin)
  if (isLoggedIn && isPublic) {
    return NextResponse.redirect(new URL("/notes", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
     "/notes/:path*",            // protect all /notes routes
    "/signin",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
    "/((?!_next|api|static|favicon.ico).*)", // Exclude Next.js internals and API routes
  ],
};