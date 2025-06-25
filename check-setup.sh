#!/bin/bash

echo "🔍 Verificando configuração do Pizza Express Frontend..."

# Verificar se .env.local existe
if [ -f ".env.local" ]; then
    echo "✅ Arquivo .env.local encontrado"
    echo "📋 Variáveis de ambiente:"
    cat .env.local
else
    echo "❌ Arquivo .env.local não encontrado!"
    echo "💡 Copie o arquivo .env.local.example para .env.local"
    echo "cp .env.local.example .env.local"
fi

echo ""
echo "🌐 Testando conectividade com a API..."

# Verificar se a API está rodando
API_URL="http://localhost:3001"
if curl -s "$API_URL" > /dev/null; then
    echo "✅ API está rodando em $API_URL"
else
    echo "❌ API não está acessível em $API_URL"
    echo "💡 Certifique-se de que o backend está rodando"
fi

echo ""
echo "🛠️  Comandos úteis:"
echo "  npm run dev     - Iniciar o frontend"
echo "  npm test        - Executar testes"
echo "  npm run build   - Build de produção"
