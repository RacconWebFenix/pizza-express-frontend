import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Páginas públicas que não precisam de autenticação
  const publicPages = ["/login", "/access-denied"];
  if (publicPages.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("authToken")?.value;
  console.log("Token no middleware:", token); // Debug log

  if (!token) {
    return NextResponse.redirect(new URL("/access-denied", request.url));
  }

  // Se tem token, permite o acesso
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
