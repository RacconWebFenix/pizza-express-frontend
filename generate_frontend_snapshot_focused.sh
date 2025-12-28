#!/bin/bash

###############################################################################
# Script: generate_frontend_snapshot_focused.sh
# Descrição: Gera snapshot focado APENAS nos arquivos de código-fonte
# Data: 28/12/2025
###############################################################################

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configurações
PROJECT_ROOT="$(pwd)"
OUTPUT_FILE="FRONTEND_SNAPSHOT_FOCUSED_$(date +%Y%m%d_%H%M%S).md"

# Pastas prioritárias para incluir (APENAS código-fonte)
INCLUDE_DIRS=(
    "src/features"
    "src/app"
    "src/components"
    "src/types"
    "src/utils"
    "src/hooks"
    "src/constants"
    "src/theme"
)

# Arquivos de configuração importantes
INCLUDE_FILES=(
    "package.json"
    "next.config.mjs"
    "tsconfig.json"
)

echo -e "${BLUE}🎯 Gerando Snapshot Focado - Apenas Código-Fonte${NC}"
echo -e "${BLUE}=================================================${NC}"
echo ""

###############################################################################
# Inicializar arquivo
###############################################################################
cat > "$OUTPUT_FILE" << 'EOF'
# 🎨 Frontend Snapshot - Código-Fonte Focado

**Snapshot contendo APENAS arquivos de código-fonte essenciais**

> ⚠️ Este snapshot foca em: services, components, hooks, types, utils

---

# 📁 Estrutura de Pastas Incluídas

EOF

# Adicionar lista de pastas incluídas
for dir in "${INCLUDE_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "- ✅ \`$dir/\`" >> "$OUTPUT_FILE"
    fi
done

cat >> "$OUTPUT_FILE" << 'EOF'

---

# 📄 Conteúdo dos Arquivos

EOF

###############################################################################
# Processar arquivos de configuração
###############################################################################
echo -e "${GREEN}✓${NC} Processando arquivos de configuração..."

for file in "${INCLUDE_FILES[@]}"; do
    if [ -f "$file" ]; then
        cat >> "$OUTPUT_FILE" << EOF

## 📝 \`$file\`

\`\`\`json
$(cat "$file" 2>/dev/null || echo "[Erro ao ler]")
\`\`\`

---

EOF
    fi
done

###############################################################################
# Processar pastas prioritárias
###############################################################################
TOTAL_FILES=0

for base_dir in "${INCLUDE_DIRS[@]}"; do
    if [ ! -d "$base_dir" ]; then
        continue
    fi

    echo -e "${BLUE}Processando:${NC} $base_dir"

    # Encontrar todos os arquivos .ts, .tsx, .js, .jsx
    while IFS= read -r -d '' file; do
        # Ignorar arquivos de teste
        if [[ "$file" == *".test."* ]] || [[ "$file" == *".spec."* ]]; then
            continue
        fi

        # Detectar linguagem
        ext="${file##*.}"
        lang="typescript"
        case "$ext" in
            tsx) lang="tsx" ;;
            jsx) lang="jsx" ;;
            js) lang="javascript" ;;
        esac

        # Adicionar ao snapshot
        cat >> "$OUTPUT_FILE" << EOF

## 📝 \`$file\`

\`\`\`$lang
$(cat "$file" 2>/dev/null || echo "[Erro ao ler arquivo]")
\`\`\`

---

EOF

        TOTAL_FILES=$((TOTAL_FILES + 1))

        # Progresso
        if [ $((TOTAL_FILES % 5)) -eq 0 ]; then
            echo -e "  ${YELLOW}→${NC} $TOTAL_FILES arquivos processados..."
        fi
    done < <(find "$base_dir" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) -print0)
done

###############################################################################
# Metadados finais
###############################################################################
cat >> "$OUTPUT_FILE" << EOF

---

# 📊 Metadados

| Item | Valor |
|------|-------|
| **Gerado em** | $(date '+%d/%m/%Y às %H:%M:%S') |
| **Arquivos processados** | $TOTAL_FILES |
| **Tamanho do snapshot** | $(du -h "$OUTPUT_FILE" 2>/dev/null | cut -f1 || echo "N/A") |

---

**🎯 Snapshot focado gerado com sucesso!**

EOF

FILE_SIZE=$(du -h "$OUTPUT_FILE" 2>/dev/null | cut -f1 || echo "N/A")

echo ""
echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}✓ SNAPSHOT FOCADO GERADO!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo -e "📄 Arquivo: ${BLUE}$OUTPUT_FILE${NC}"
echo -e "📊 Tamanho: ${YELLOW}$FILE_SIZE${NC}"
echo -e "🗂️  Arquivos: ${YELLOW}$TOTAL_FILES${NC}"
echo ""
echo -e "${GREEN}💡 Este snapshot contém apenas código-fonte essencial${NC}"
echo ""

exit 0
