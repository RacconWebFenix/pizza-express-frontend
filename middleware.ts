import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Páginas públicas que não precisam de autenticação
  const publicPages = ["/", "/login", "/register", "/access-denied", "/welcome"];
  
  const pathname = request.nextUrl.pathname;
  
  // Debug logs para produção
  console.log("Middleware - pathname:", pathname);
  
  if (publicPages.includes(pathname)) {
    console.log("Middleware - public page, allowing access");
    return NextResponse.next();
  }

  const token = request.cookies.get("authToken")?.value;
  console.log("Middleware - token found:", !!token);

  if (!token) {
    console.log("Middleware - no token, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se tem token, permite o acesso
  console.log("Middleware - token found, allowing access");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
