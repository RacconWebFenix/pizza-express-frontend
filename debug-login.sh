#!/bin/bash

# Script para debug dos problemas de login/redirecionamento

set -e

echo "🔍 Pizza Express - Debug Script para Problemas de Login"
echo "====================================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_debug() {
    echo -e "${BLUE}[DEBUG]${NC} $1"
}

print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_debug "Verificando status dos containers..."
docker-compose ps

print_debug "Verificando logs do container..."
echo ""
print_info "=== LOGS DOS ÚLTIMOS 50 LINHAS ==="
docker-compose logs --tail=50 pizza-express-frontend

print_debug "Verificando variáveis de ambiente..."
echo ""
print_info "=== VARIÁVEIS DE AMBIENTE ==="
docker-compose exec pizza-express-frontend env | grep -E "(NODE_ENV|NEXT_PUBLIC|PORT|HOSTNAME)" || true

print_debug "Verificando se a aplicação está respondendo..."
echo ""
print_info "=== TESTE DE CONECTIVIDADE ==="
curl -I http://localhost:3000 2>/dev/null || print_error "Aplicação não está respondendo em localhost:3000"

print_debug "Verificando arquivos de configuração importantes..."
echo ""
print_info "=== NEXT.CONFIG.MJS ==="
cat next.config.mjs

echo ""
print_info "=== MIDDLEWARE.TS (primeiras 20 linhas) ==="
head -20 middleware.ts

print_debug "Comandos úteis para debugging:"
echo ""
print_warning "Para entrar no container:"
echo "docker-compose exec pizza-express-frontend sh"
echo ""
print_warning "Para ver logs em tempo real:"
echo "docker-compose logs -f pizza-express-frontend"
echo ""
print_warning "Para reiniciar apenas o frontend:"
echo "docker-compose restart pizza-express-frontend"
echo ""
print_warning "Para verificar o build local:"
echo "npm run build && npm run start"
echo ""
print_warning "Para testar a API externamente:"
echo "curl -X POST https://pizza-express-backend.vercel.app/login -H 'Content-Type: application/json' -d '{\"email\":\"test@test.com\",\"password\":\"test123\"}'"
