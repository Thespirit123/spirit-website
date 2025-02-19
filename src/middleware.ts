import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type AllowedDomain =
  | "www.thespiritmedia.com.ng"
  | "confessions.thespiritmedia.com.ng"
  | "confessions.thespiritmedia.local"
  | "www.thespiritmedia.local";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") as AllowedDomain;

  if (!hostname) {
    return NextResponse.next();
  }

  if (hostname.startsWith("confessions.")) {
    const response = NextResponse.rewrite(
      new URL("/confessions" + url.pathname, request.url)
    );

    response.headers.set("x-site-subdomain", "confessions");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
