import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Função para validar token com o backend
 */
async function validateTokenWithBackend(token: string): Promise<boolean> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) return false;

    const response = await fetch(`${API_URL}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.ok;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
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
    // Se usuário está logado e tenta acessar login/register, redirecionar para dashboard
    const token = request.cookies.get("authToken")?.value;
    if (token && (pathname === "/login" || pathname === "/register")) {
      const isValid = await validateTokenWithBackend(token);
      if (isValid) {
        return NextResponse.redirect(new URL("/cardapio", request.url));
      }
    }
    return NextResponse.next();
  }

  // Verificar se existe token
  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Validar token com o backend
  const isValidToken = await validateTokenWithBackend(token);

  if (!isValidToken) {
    // Token inválido - remover cookie e redirecionar
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("authToken");
    return response;
  }

  return NextResponse.next();
}

// Matcher mais simples
export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
