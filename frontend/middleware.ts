import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;
  // console.log("currentUser: ", currentUser, );

  if (currentUser && request.nextUrl.pathname !== "/task") {
    return NextResponse.rewrite(new URL("/task", request.url));
  }
  if (!currentUser && request.nextUrl.pathname === "/task") {
    return NextResponse.rewrite(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/task"],
};
