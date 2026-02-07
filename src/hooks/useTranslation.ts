"use client";

import { useCallback } from "react";
import ptBR from "@/locales/pt-BR.json";
import { isPlainObject } from "@/utils/type-guards";

type TranslationKey = string;
type TranslationParams = Record<string, string | number>;

/**
 * Hook para internacionalização (i18n)
 * Fornece traduções baseadas em chaves e parâmetros
 */
export const useTranslation = () => {
  /**
   * Obtém uma tradução baseada em uma chave
   * @param key Chave no formato "namespace.key" ou "namespace.nested.key"
   * @param params Parâmetros para substituição no texto
   * @returns Texto traduzido
   */
  const t = useCallback((key: TranslationKey, params?: TranslationParams): string => {
    // Divide a chave por pontos para navegar no objeto
    const keys = key.split(".");
    let value: unknown = ptBR;

    // Navega pelo objeto de tradução
    for (const k of keys) {
      if (isPlainObject(value) && k in value) {
        value = value[k];
      } else {
        // Retorna a chave original se não encontrar a tradução
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    // Se o valor final não for uma string, converte para string
    let result = typeof value === "string" ? value : String(value);

    // Substitui parâmetros no formato {param}
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        result = result.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(paramValue));
      });
    }

    return result;
  }, []);

  return { t };
};

/**
 * Tipo para as chaves de tradução disponíveis
 */
export type TranslationKeys =
  | `common.${keyof typeof ptBR.common}`
  | `auth.${keyof typeof ptBR.auth}`
  | `cart.${keyof typeof ptBR.cart}`
  | `menu.${keyof typeof ptBR.menu}`
  | `admin.${keyof typeof ptBR.admin}`
  | `validation.${keyof typeof ptBR.validation}`;
