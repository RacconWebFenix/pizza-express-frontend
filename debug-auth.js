console.log("🔍 DEBUG: Diagnóstico de Autenticação");
console.log("Environment:", process.env.NODE_ENV);
console.log("API_URL:", process.env.NEXT_PUBLIC_API_URL);
console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
console.log("Google Auth URL:", process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL);
console.log("Current URL:", window.location.href);
console.log("User Agent:", navigator.userAgent);

// Testar se o backend está acessível
fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`)
  .then((response) => {
    console.log("✅ Backend Health Check:", response.status);
    return response.text();
  })
  .then((data) => console.log("Backend Response:", data))
  .catch((error) => console.error("❌ Backend Health Check Failed:", error));

// Verificar cookies
console.log("Cookies:", document.cookie);

// Verificar localStorage
console.log("LocalStorage keys:", Object.keys(localStorage));

export {};
