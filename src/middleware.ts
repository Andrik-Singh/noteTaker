import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies"
const publicRoutes=["/signin","/signup","/forgot-password","/reset-password","/verify-email"];
export function middleware(request: NextRequest) {
  // Example middleware logic
  const token = getSessionCookie(request)
  
  if (!token && !publicRoutes.some(route=> route== request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  if(token && publicRoutes.some(route => route == request.nextUrl.pathname)){
    return NextResponse.redirect(new URL("/notes",request.url))
  }
  // You can add more logic here, like validating the token or checking user roles
  return NextResponse.next();
}
export const config={
    matcher:[
        "/notes/:path",
        "/signin",
        "/signup",
        "/forgot-password"
    ]
}