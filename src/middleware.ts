import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Função para validar token com o backend
 */
async function validateTokenWithBackend(token: string): Promise<boolean> {
  try {
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
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

  // Log para debug em produção
  console.log(`[MIDDLEWARE] Processing request for: ${pathname}`);

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
    "/auth-callback",
  ];

  if (publicPages.includes(pathname)) {


    // Permitir acesso direto ao auth-callback
    if (pathname === "/auth-callback") {
      console.log(`[MIDDLEWARE] Allowing access to auth-callback`);
      return NextResponse.next();
    }

    // Se usuário está logado e tenta acessar login/register, redirecionar para dashboard
    const token = request.cookies.get("authToken")?.value;
    if (token && (pathname === "/login" || pathname === "/register")) {
     
      const isValid = await validateTokenWithBackend(token);
      if (isValid) {
        console.log(`[MIDDLEWARE] Valid token, redirecting to /cardapio`);
        return NextResponse.redirect(new URL("/cardapio", request.url));
      } else {
        console.log(
          `[MIDDLEWARE] Invalid token, allowing access to ${pathname}`
        );
      }
    }
    return NextResponse.next();
  }


  const token = request.cookies.get("authToken")?.value;
  

  if (!token) {
   
    return NextResponse.redirect(new URL("/login", request.url));
  }

 
  const isValidToken = await validateTokenWithBackend(token);

  if (!isValidToken) {
   
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
