#!/bin/bash

#################################################
# Script: generate-frontend-snapshot.sh
# Versão: 1.0
# Descrição: Gera snapshot do FRONTEND
#################################################

set -e

# Configurações
OUTPUT="FRONTEND_SNAPSHOT_$(date +%Y%m%d_%H%M%S).md"

echo "╔═══════════════════════════════════════════════╗"
echo "║  📦 Frontend Snapshot Generator               ║"
echo "║  Pizza Express - Análise de Implementação    ║"
echo "╚═══════════════════════════════════════════════╝"
echo ""
echo "📄 Arquivo: $OUTPUT"
echo ""

# Iniciar arquivo
cat > "$OUTPUT" << 'EOF'
# 📦 Frontend Pizza Express - Snapshot Completo

**Snapshot para validação de implementação do sistema híbrido**

> Gerado para verificar se as mudanças do backend foram aplicadas corretamente

---

EOF

# Adicionar metadados
cat >> "$OUTPUT" << EOF

## 📋 Metadados

| Propriedade | Valor |
|-------------|-------|
| **Data/Hora** | $(date '+%d/%m/%Y às %H:%M:%S') |
| **Diretório** | \`$(pwd)\` |
| **Sistema** | $(uname -s) |

---

## 📂 Estrutura do Projeto

\`\`\`
EOF

# Adicionar estrutura
if command -v tree &>/dev/null; then
    tree -L 3 -I "node_modules|.next|build|dist|.git" >> "$OUTPUT" 2>/dev/null || echo "." >> "$OUTPUT"
else
    find . -type d -maxdepth 3 | grep -vE "node_modules|\.next|build|dist|\.git" | sort >> "$OUTPUT"
fi

cat >> "$OUTPUT" << 'EOF'
```

---

## 📄 ARQUIVOS DO FRONTEND

EOF

echo "⚙️  Processando arquivos..."

# Contador
COUNT=0

# Encontrar arquivos relevantes do frontend
find . -type f \
  \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) \
  ! -path "*/node_modules/*" \
  ! -path "*/.next/*" \
  ! -path "*/build/*" \
  ! -path "*/dist/*" \
  ! -path "*/.git/*" \
  ! -name "*.test.ts" \
  ! -name "*.test.tsx" \
  ! -name "*.spec.ts" \
  ! -name "*.spec.tsx" \
  | sort | while read -r FILE; do

    COUNT=$((COUNT + 1))

    # Progress
    if [ $((COUNT % 10)) -eq 0 ]; then
        echo -ne "\r📝 Processando: $COUNT arquivos..."
    fi

    # Caminho relativo
    RELPATH="${FILE#./}"

    # Adicionar ao output
    echo "" >> "$OUTPUT"
    echo "---" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
    echo "## 📄 \`$RELPATH\`" >> "$OUTPUT"
    echo "" >> "$OUTPUT"

    # Determinar linguagem
    EXT="${FILE##*.}"
    case "$EXT" in
        ts|tsx)
            echo '```typescript' >> "$OUTPUT"
            ;;
        js|jsx)
            echo '```javascript' >> "$OUTPUT"
            ;;
        *)
            echo '```' >> "$OUTPUT"
            ;;
    esac

    # Adicionar conteúdo
    cat "$FILE" >> "$OUTPUT" 2>/dev/null || echo "⚠️ Erro ao ler arquivo" >> "$OUTPUT"

    echo "" >> "$OUTPUT"
    echo '```' >> "$OUTPUT"
    echo "" >> "$OUTPUT"
done

echo ""
echo ""

# Adicionar arquivos de configuração importantes
echo "📝 Adicionando arquivos de configuração..."

CONFIG_FILES=(
    "package.json"
    "tsconfig.json"
    "next.config.js"
    "next.config.mjs"
    ".env.example"
    "tailwind.config.js"
    "tailwind.config.ts"
)

for CONFIG in "${CONFIG_FILES[@]}"; do
    if [ -f "$CONFIG" ]; then
        echo "" >> "$OUTPUT"
        echo "---" >> "$OUTPUT"
        echo "" >> "$OUTPUT"
        echo "## 📄 \`$CONFIG\`" >> "$OUTPUT"
        echo "" >> "$OUTPUT"

        EXT="${CONFIG##*.}"
        case "$EXT" in
            json)
                echo '```json' >> "$OUTPUT"
                ;;
            js|mjs)
                echo '```javascript' >> "$OUTPUT"
                ;;
            ts)
                echo '```typescript' >> "$OUTPUT"
                ;;
            *)
                echo '```' >> "$OUTPUT"
                ;;
        esac

        cat "$CONFIG" >> "$OUTPUT" 2>/dev/null

        echo "" >> "$OUTPUT"
        echo '```' >> "$OUTPUT"
        echo "" >> "$OUTPUT"
    fi
done

# Estatísticas
FILESIZE=$(du -h "$OUTPUT" | cut -f1)

cat >> "$OUTPUT" << EOF

---

## 📊 Estatísticas

| Métrica | Valor |
|---------|-------|
| **Tamanho do snapshot** | $FILESIZE |
| **Gerado em** | $(date '+%d/%m/%Y %H:%M:%S') |

---

## 🔍 PONTOS DE VERIFICAÇÃO

### ✅ O que deve ter sido implementado:

#### 1. Services (src/services/ ou src/api/)
- [ ] \`orderService.ts\` atualizado
- [ ] Função \`getDeliveryOrders()\` implementada
- [ ] Função \`getDineInOrders()\` implementada
- [ ] Filtro \`?type=DELIVERY\` sendo usado
- [ ] POST /orders com campo \`type\`

#### 2. Types (src/types/ ou interfaces/)
- [ ] Interface \`Order\` com campo \`type: OrderType\`
- [ ] Type \`OrderType = 'DELIVERY' | 'DINE_IN'\`
- [ ] Interface \`Product\` (substitui Pizza)

#### 3. Components
- [ ] Kanban usando \`getDeliveryOrders()\`
- [ ] Badge visual para tipo de pedido
- [ ] Componente de Mesas criado
- [ ] Formulário com seletor de tipo

#### 4. Endpoints
- [ ] Remoção de \`/pedidos\`
- [ ] Uso de \`/orders\`
- [ ] Remoção de \`/pizzas\`
- [ ] Uso de \`/products\`

---

> **Pronto para análise de implementação!**

EOF

echo "╔═══════════════════════════════════════════════╗"
echo "║  ✅ SNAPSHOT GERADO COM SUCESSO!              ║"
echo "╚═══════════════════════════════════════════════╝"
echo ""
echo "  📄 Arquivo: $OUTPUT"
echo "  📦 Tamanho: $FILESIZE"
echo ""
echo "📤 Envie este arquivo para análise"
echo ""

exit 0
