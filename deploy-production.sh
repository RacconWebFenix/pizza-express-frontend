#!/bin/bash

# Script para build e deploy da aplicação Pizza Express Frontend

set -e

echo "🍕 Pizza Express Frontend - Production Deploy Script"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker não está instalado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi

print_status "Parando containers existentes..."
docker-compose down 2>/dev/null || true

print_status "Limpando imagens antigas..."
docker image prune -f 2>/dev/null || true

print_status "Construindo a aplicação..."
docker-compose build --no-cache

print_status "Iniciando a aplicação em modo produção..."
docker-compose up -d

print_success "Deploy concluído!"
print_status "A aplicação está rodando em: http://localhost:3000"
print_status ""
print_status "Para verificar os logs:"
print_warning "docker-compose logs -f"
print_status ""
print_status "Para parar a aplicação:"
print_warning "docker-compose down"
print_status ""
print_status "Para acessar o container:"
print_warning "docker-compose exec pizza-express-frontend sh"

# Wait a bit and check if container is running
sleep 5

if docker-compose ps | grep -q "Up"; then
    print_success "Container está rodando com sucesso!"
else
    print_error "Algo deu errado. Verificando logs..."
    docker-compose logs
fi
