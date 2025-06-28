import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Arquivos estáticos não precisam de autenticação
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".gif") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".js")
  ) {
    return NextResponse.next();
  }

  // Páginas públicas que não precisam de autenticação
  const publicPages = [
    "/",
    "/login",
    "/register",
    "/access-denied",
    "/welcome",
  ];

  if (publicPages.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Matcher mais simples
export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
