import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface UserProfile {
  id: number;
  role: "CLIENTE" | "FUNCIONARIO" | "ADMIN";
}

/**
 * Função para validar token e obter perfil do usuário
 */
async function validateTokenAndGetUser(
  token: string
): Promise<UserProfile | null> {
  try {
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!API_URL) return null;

    const response = await fetch(`${API_URL}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const userData = await response.json();
      return {
        id: userData.id,
        role: userData.role,
      };
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Verifica se o usuário tem as roles necessárias
 */
function hasRequiredRole(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole);
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Log apenas em desenvolvimento
  if (process.env.NODE_ENV !== "production") {
    console.log(`[MIDDLEWARE] Processing request for: ${pathname}`);
  }

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

  // Rotas protegidas por roles específicos
  const roleProtectedRoutes: Record<string, string[]> = {
    "/dashboard": ["CLIENTE", "FUNCIONARIO", "ADMIN"], // Todos podem acessar dashboard básico
    "/pedidos": ["CLIENTE", "FUNCIONARIO", "ADMIN"], // Todos podem ver pedidos
    "/profile": ["CLIENTE", "FUNCIONARIO", "ADMIN"], // Todos podem ver perfil
    "/admin": ["ADMIN"], // Apenas admin
    "/staff": ["FUNCIONARIO", "ADMIN"], // Funcionários e admin
  };

  if (publicPages.includes(pathname)) {
    // Permitir acesso direto ao auth-callback
    if (pathname === "/auth-callback") {
      if (process.env.NODE_ENV !== "production") {
        console.log(`[MIDDLEWARE] Allowing access to auth-callback`);
      }
      return NextResponse.next();
    }

    // Se usuário está logado e tenta acessar login/register, redirecionar para dashboard
    const token = request.cookies.get("authToken")?.value;
    if (token) {
      const user = await validateTokenAndGetUser(token);
      if (user) {
        if (process.env.NODE_ENV !== "production") {
          console.log(`[MIDDLEWARE] Valid token, redirecting to /cardapio`);
        }
        return NextResponse.redirect(new URL("/cardapio", request.url));
      } else {
        if (process.env.NODE_ENV !== "production") {
          console.log(
            `[MIDDLEWARE] Invalid token, allowing access to ${pathname}`
          );
        }
      }
    }
    return NextResponse.next();
  }

  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[MIDDLEWARE] No token, redirecting to login`);
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = await validateTokenAndGetUser(token);

  if (!user) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[MIDDLEWARE] Invalid token, redirecting to login`);
    }
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("authToken");
    return response;
  }

  // Verificar se a rota requer roles específicos
  for (const [routePrefix, allowedRoles] of Object.entries(
    roleProtectedRoutes
  )) {
    if (pathname.startsWith(routePrefix)) {
      if (!hasRequiredRole(user.role, allowedRoles)) {
        if (process.env.NODE_ENV !== "production") {
          console.log(
            `[MIDDLEWARE] User role ${user.role} not allowed for ${pathname}, redirecting to access-denied`
          );
        }
        return NextResponse.redirect(new URL("/access-denied", request.url));
      }
      break;
    }
  }

  if (process.env.NODE_ENV !== "production") {
    console.log(
      `[MIDDLEWARE] Access granted to ${pathname} for user role ${user.role}`
    );
  }
  return NextResponse.next();
}

// Matcher mais simples
export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
