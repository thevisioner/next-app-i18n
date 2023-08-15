import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  isPathnameMissingLocale,
  removeDefaultLocale,
} from "@/lib/i18n";

type RedirectStrategy = "redirect" | "rewrite";

const strategy: RedirectStrategy = "rewrite";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPathnameMissingLocale(pathname)) {
    // e.g. incoming request is /products
    // The new URL is now /en/products
    const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
    if (strategy === "redirect") {
      return NextResponse.redirect(newUrl);
    } else {
      return NextResponse.rewrite(newUrl);
    }
    // Redirect to remove default locale from the URL if present
  } else if (pathname.startsWith(`/${defaultLocale}`)) {
    const newUrl = new URL(removeDefaultLocale(pathname), request.url);
    return NextResponse.redirect(newUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
