// src/utils/cookies.ts
"use client";

import Cookies from "js-cookie";

// A chave que usamos para armazenar o token de autenticação
const AUTH_TOKEN_KEY = "authToken";

/**
 * Salva o token de autenticação nos cookies com configurações de segurança.
 * @param token O token a ser salvo.
 * @param options Opções adicionais para o cookie (ex: expiração).
 */
export const setCookie = (
  token: string,
  options?: Cookies.CookieAttributes
): void => {
  const isProduction = process.env.NODE_ENV === "production";
  
  Cookies.set(AUTH_TOKEN_KEY, token, {
    expires: 30, // Expira em 30 dias por padrão
    path: "/",
    secure: isProduction, // Apenas HTTPS em produção
    sameSite: "strict", // Proteção contra CSRF
    ...options,
  });
};

/**
 * Busca o token de autenticação dos cookies.
 * @returns O token, se existir, ou undefined.
 */
export const getAuthToken = (): string | undefined => {
  return Cookies.get(AUTH_TOKEN_KEY);
};

/**
 * Remove o token de autenticação dos cookies.
 */
export const deleteCookie = (): void => {
  Cookies.remove(AUTH_TOKEN_KEY, { path: "/" });
};
