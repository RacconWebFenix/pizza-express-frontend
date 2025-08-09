/**
 * Constantes para configuração de imagens
 */

export const IMAGE_CONFIG = {
  // Imagem padrão para pizzas
  DEFAULT_PIZZA_IMAGE: "/pizza.png",

  // Timeout para carregamento de imagens externas (ms)
  LOAD_TIMEOUT: 5000,

  // Lista de domínios de imagem confiáveis
  TRUSTED_DOMAINS: [
    "res.cloudinary.com",
    "cloudinary.com",
    "localhost",
    "pizza-express-backend.vercel.app",
  ],

  // Domínios que podem falhar e precisam de fallback
  UNRELIABLE_DOMAINS: ["images.unsplash.com", "unsplash.com"],
};

/**
 * Verifica se uma URL de imagem é de um domínio não confiável
 */
export const isUnreliableDomain = (url: string): boolean => {
  if (!url || !url.startsWith("http")) return false;

  try {
    const hostname = new URL(url).hostname;
    return IMAGE_CONFIG.UNRELIABLE_DOMAINS.some((domain) =>
      hostname.includes(domain)
    );
  } catch {
    return false;
  }
};

/**
 * Verifica se uma URL de imagem é de um domínio confiável
 */
export const isTrustedDomain = (url: string): boolean => {
  if (!url || !url.startsWith("http")) return true; // URLs locais são confiáveis

  try {
    const hostname = new URL(url).hostname;
    return IMAGE_CONFIG.TRUSTED_DOMAINS.some((domain) =>
      hostname.includes(domain)
    );
  } catch {
    return false;
  }
};
