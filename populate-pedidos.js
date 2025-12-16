const fs = require("fs");
const path = require("path");

const API_URL = process.env.API_URL || "http://localhost:3001";

// Dados de teste
const nomes = [
  "João Silva",
  "Maria Santos",
  "Carlos Oliveira",
  "Ana Costa",
  "Pedro Ferreira",
  "Juliana Souza",
  "Roberto Alves",
  "Fernanda Lima",
  "Marcos Cesar Domingues",
];

const pizzas = [
  { nome: "Margherita", id: 1 },
  { nome: "Calabresa", id: 2 },
  { nome: "Pepperoni", id: 3 },
  { nome: "Frango com Catupiry", id: 4 },
  { nome: "Quatro Queijos", id: 5 },
];

const statuses = [
  "PENDENTE",
  "EM_PREPARO",
  "A_CAMINHO",
  "ENTREGUE",
];

let cookies = ""; // Armazenar cookies de sessão

async function obterToken() {
  try {
    console.log("🔐 Tentando fazer login...");
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "admin@admin.com",
        password: "123",
      }),
      redirect: "manual", // Não seguir redirecionamentos automaticamente
    });

    console.log(`📊 Status da resposta: ${response.status}`);

    // Capturar cookies
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      cookies = setCookie;
      console.log("🍪 Cookies capturados");
    }

    if (response.status === 307 || response.status === 302 || response.status === 301) {
      console.error("❌ Redirecionado. Backend pode estar usando sessão em vez de JWT.");
      const text = await response.text();
      console.log("Resposta:", text.substring(0, 200));
      return null;
    }

    if (!response.ok) {
      const text = await response.text();
      console.error(`❌ Erro na resposta (${response.status}):`, text.substring(0, 300));
      return null;
    }

    const data = await response.json();
    console.log("📦 Resposta de login:", JSON.stringify(data).substring(0, 100));
    
    // Tentar diferentes formatos de resposta
    const token = data.access_token || data.accessToken || data.data?.accessToken || data.data?.access_token;
    
    if (!token) {
      console.error("❌ Token não encontrado na resposta");
      console.error("Resposta completa:", JSON.stringify(data, null, 2));
      return null;
    }

    console.log("✅ Token obtido com sucesso");
    return token;
  } catch (error) {
    console.error("❌ Erro ao obter token:", error.message);
    return null;
  }
}

async function popularPedidos() {
  console.log("🍕 Iniciando população de pedidos...\n");

  // Obter token válido
  const tokenValido = await obterToken();
  if (!tokenValido) {
    console.error("❌ Não foi possível obter o token de autenticação");
    process.exit(1);
  }

  console.log("✅ Token obtido com sucesso\n");

  // Criar 10 pedidos aleatórios
  for (let i = 0; i < 10; i++) {
    const clienteId = Math.floor(Math.random() * nomes.length) + 1; // IDs de 1 a 9
    const enderecoId = 1; // Usar endereço ID 1 para simplificar
    const statusIndex = Math.floor(Math.random() * statuses.length);
    const status = statuses[statusIndex];

    // Selecionar 2-4 pizzas aleatórias
    const numPizzas = Math.floor(Math.random() * 3) + 2; // 2-4 pizzas
    const pizzasIds = [];
    for (let j = 0; j < numPizzas; j++) {
      const pizzaId = Math.floor(Math.random() * pizzas.length) + 1;
      pizzasIds.push(pizzaId);
    }

    await criarPedido(tokenValido, clienteId, enderecoId, pizzasIds, status);

    // Pequena pausa entre requisições
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log("\n✅ População de pedidos concluída!");
  process.exit(0);
}

async function criarPedido(token, clienteId, enderecoId, pizzasIds, status) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    // Adicionar token se disponível
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Adicionar cookies se disponível (para sessão)
    if (cookies) {
      headers["Cookie"] = cookies;
    }

    const response = await fetch(`${API_URL}/pedidos`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        clienteId,
        enderecoId,
        pizzasIds,
        status,
        observacoes: "Pedido criado via script de teste",
      }),
      redirect: "manual",
    });

    if (response.status === 307 || response.status === 302) {
      console.error(`❌ Redirecionado ao criar pedido (${response.status})`);
      return null;
    }

    if (!response.ok) {
      const text = await response.text();
      console.error(`❌ Erro ao criar pedido (${response.status}):`, text.substring(0, 200));
      return null;
    }

    const data = await response.json();
    const pedidoId = data.id || data.data?.id;
    console.log(`✅ Pedido #${pedidoId} - ${nomes[clienteId - 1]} - ${status}`);
    return data;
  } catch (error) {
    console.error(`❌ Erro na requisição:`, error.message);
    return null;
  }
}

popularPedidos().catch((error) => {
  console.error("Erro fatal:", error);
  process.exit(1);
});
