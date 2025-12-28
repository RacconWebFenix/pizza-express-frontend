#!/bin/bash

# Script SIMPLES - VAI FUNCIONAR!
# Versão: ULTRA_SIMPLES

set -e

OUTPUT="BACKEND_FULL_$(date +%Y%m%d_%H%M%S).md"

echo "🚀 Gerando snapshot COMPLETO..."
echo "📄 Arquivo: $OUTPUT"
echo ""

# Iniciar arquivo
cat > "$OUTPUT" << 'EOF'
# Backend Pizza Express - Snapshot Completo

Gerado em: $(date)

---

EOF

# Contador
COUNT=0

# Encontrar TODOS os arquivos (exceto os óbvios)
find . -type f \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/dist/*" \
  ! -path "*/build/*" \
  ! -path "*/coverage/*" \
  ! -path "*/.next/*" \
  ! -name "*.log" \
  ! -name ".DS_Store" \
  ! -name "package-lock.json" \
  ! -name "yarn.lock" \
  ! -name "*.swp" \
  ! -name ".env" \
  ! -name ".env.local" \
  ! -name "BACKEND_*.md" \
  ! -name "PROJECT_*.md" \
  | sort | while read -r FILE; do

    # Incrementar contador
    COUNT=$((COUNT + 1))

    # Mostrar progress
    if [ $((COUNT % 10)) -eq 0 ]; then
        echo -ne "\r📝 Processando: $COUNT arquivos..."
    fi

    # Caminho relativo
    RELPATH="${FILE#./}"

    # Adicionar ao arquivo
    echo "" >> "$OUTPUT"
    echo "---" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
    echo "## $RELPATH" >> "$OUTPUT"
    echo "" >> "$OUTPUT"

    # Verificar extensão
    EXT="${FILE##*.}"

    case "$EXT" in
        ts|tsx|js|jsx|mjs)
            echo '```typescript' >> "$OUTPUT"
            cat "$FILE" >> "$OUTPUT" 2>/dev/null || echo "Erro ao ler" >> "$OUTPUT"
            echo '```' >> "$OUTPUT"
            ;;
        json)
            echo '```json' >> "$OUTPUT"
            cat "$FILE" >> "$OUTPUT" 2>/dev/null || echo "Erro ao ler" >> "$OUTPUT"
            echo '```' >> "$OUTPUT"
            ;;
        md)
            echo '```markdown' >> "$OUTPUT"
            cat "$FILE" >> "$OUTPUT" 2>/dev/null || echo "Erro ao ler" >> "$OUTPUT"
            echo '```' >> "$OUTPUT"
            ;;
        sh|bash)
            echo '```bash' >> "$OUTPUT"
            cat "$FILE" >> "$OUTPUT" 2>/dev/null || echo "Erro ao ler" >> "$OUTPUT"
            echo '```' >> "$OUTPUT"
            ;;
        yml|yaml)
            echo '```yaml' >> "$OUTPUT"
            cat "$FILE" >> "$OUTPUT" 2>/dev/null || echo "Erro ao ler" >> "$OUTPUT"
            echo '```' >> "$OUTPUT"
            ;;
        sql)
            echo '```sql' >> "$OUTPUT"
            cat "$FILE" >> "$OUTPUT" 2>/dev/null || echo "Erro ao ler" >> "$OUTPUT"
            echo '```' >> "$OUTPUT"
            ;;
        prisma)
            echo '```prisma' >> "$OUTPUT"
            cat "$FILE" >> "$OUTPUT" 2>/dev/null || echo "Erro ao ler" >> "$OUTPUT"
            echo '```' >> "$OUTPUT"
            ;;
        html|css|scss|xml|toml)
            echo "\`\`\`$EXT" >> "$OUTPUT"
            cat "$FILE" >> "$OUTPUT" 2>/dev/null || echo "Erro ao ler" >> "$OUTPUT"
            echo '```' >> "$OUTPUT"
            ;;
        *)
            # Tentar como texto
            if file "$FILE" | grep -q text; then
                echo '```' >> "$OUTPUT"
                cat "$FILE" >> "$OUTPUT" 2>/dev/null || echo "Erro ao ler" >> "$OUTPUT"
                echo '```' >> "$OUTPUT"
            else
                echo "[Arquivo binário - $(file -b "$FILE")]" >> "$OUTPUT"
            fi
            ;;
    esac

    echo "" >> "$OUTPUT"
done

echo ""
echo ""
echo "✅ PRONTO!"
echo "📄 Arquivo gerado: $OUTPUT"
echo "📦 Tamanho: $(du -h "$OUTPUT" | cut -f1)"
echo ""
echo "Para visualizar:"
echo "  less $OUTPUT"
echo ""

exit 0
