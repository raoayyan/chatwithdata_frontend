import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/test",
  "/get-started1",
  "/chat1",
  "/chat1/",
  "/chat1/[chatId]",
  "/chat1/[chatId]/",
];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log("Token from middleware:", token);
  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    // Redirect with a query parameter to show an alert/message on the next page
    const url = new URL("/", req.url);
    url.searchParams.set("loginRequired", "true"); // Add a query param
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
