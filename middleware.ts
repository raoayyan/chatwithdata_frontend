import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/", "/chat"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    // Redirect with a query parameter to show an alert/message on the next page
    const url = new URL("/", req.url);
    url.searchParams.set("loginRequired", "true"); // Add a query param
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
