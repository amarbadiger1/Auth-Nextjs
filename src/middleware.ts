import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail" ||
    path === "/forgotpassword";
  const token = request.cookies.get("token")?.value?.trim() || "";

  // Redirect authenticated users away from public paths
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // Redirect unauthenticated users away from private paths
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // Continue to the requested path if no redirects are triggered
  return NextResponse.next();
}

// Path matcher configuration
export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/logout",
    "/verifyemail",
    "/forgotpassword",
  ],
};
