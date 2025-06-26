import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Páginas públicas que não precisam de autenticação
  const publicPages = [
    "/",
    "/login",
    "/register",
    "/access-denied",
    "/welcome",
  ];

  const pathname = request.nextUrl.pathname;

  if (publicPages.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se tem token, permite o acesso
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
