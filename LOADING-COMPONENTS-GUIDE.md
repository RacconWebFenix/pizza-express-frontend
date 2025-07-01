# Componentes de Loading - Pizza Express

## 🍕 PizzaLoading & PizzaSpinner

Componentes de loading padronizados para todo o projeto, usando a imagem `pizza.png` com animação de rotação.

### 📦 Componentes Disponíveis

#### 1. **PizzaLoading** - Loading de Tela Cheia
Para processos que precisam bloquear toda a interface.

```tsx
import { PizzaLoading } from "@/components/ui";

// Uso básico
<PizzaLoading 
  isVisible={loading} 
  message="Processando cadastro..." 
/>

// Configurações avançadas
<PizzaLoading 
  isVisible={loading}
  message="Salvando dados..."
  size="lg"           // sm | md | lg | xl
  fullscreen={true}   // true | false
  showMessage={true}  // true | false
/>
```

#### 2. **PizzaSpinner** - Ícone de Loading Inline
Para usar dentro de componentes, cards, botões, etc.

```tsx
import { PizzaSpinner } from "@/components/ui";

// Ícone pequeno
<PizzaSpinner size={16} />

// Ícone médio
<PizzaSpinner size={24} />

// Ícone grande
<PizzaSpinner size={32} />
```

#### 3. **PizzaButton com Loading** - Botões com Estado de Carregamento
```tsx
import { PizzaButton } from "@/components/ui";

<PizzaButton 
  loading={isSubmitting}
  variant="primary"
  type="submit"
>
  Cadastrar
</PizzaButton>
```

### 🎯 Casos de Uso

#### Loading de Tela Cheia
```tsx
// Durante cadastro/login
<PizzaLoading 
  isVisible={loading} 
  message="Criando sua conta..." 
/>

// Durante carregamento de dados
<PizzaLoading 
  isVisible={loadingData} 
  message="Carregando cardápio..." 
/>
```

#### Loading Inline/Contextual
```tsx
// Em cards
<PizzaCard>
  {loading ? (
    <Box textAlign="center" py={4}>
      <PizzaSpinner size={32} />
      <PizzaText mt={2}>Carregando...</PizzaText>
    </Box>
  ) : (
    <CardContent />
  )}
</PizzaCard>

// Em listas
{loading ? (
  <PizzaSpinner size={24} />
) : (
  <PizzaText>Dados carregados!</PizzaText>
)}
```

#### Botões com Loading
```tsx
// Botão de submit
<PizzaButton 
  loading={submitting}
  variant="primary"
  type="submit"
>
  {submitting ? "Salvando..." : "Salvar"}
</PizzaButton>

// Botão de ação
<PizzaButton 
  loading={deleting}
  variant="danger"
  onClick={handleDelete}
>
  Excluir
</PizzaButton>
```

### 🎨 Tamanhos Disponíveis

| Tamanho | Pixels | Uso Recomendado |
|---------|---------|-----------------|
| `sm`    | 24px    | Botões pequenos, ícones inline |
| `md`    | 32px    | Cards, seções médias |
| `lg`    | 48px    | Headers, seções importantes |
| `xl`    | 80px    | Loading de tela cheia |

### 🔧 Configurações do PizzaLoading

```tsx
interface PizzaLoadingProps {
  message?: string;         // Texto exibido
  isVisible?: boolean;      // Controle de visibilidade
  size?: "sm" | "md" | "lg" | "xl"; // Tamanho do ícone
  fullscreen?: boolean;     // Overlay de tela cheia
  showMessage?: boolean;    // Mostrar/ocultar mensagem
}
```

### 🎯 Exemplos Práticos

#### 1. Página de Cadastro
```tsx
const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      <PizzaLoading 
        isVisible={loading} 
        message={showSuccess ? "Cadastro realizado!" : "Processando..."}
      />
      
      {!loading && !showSuccess && (
        <RegisterForm onSubmit={handleSubmit} />
      )}
    </>
  );
};
```

#### 2. Lista de Produtos
```tsx
const ProductList = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  return (
    <PizzaCard>
      {loading ? (
        <Box textAlign="center" py={8}>
          <PizzaSpinner size={48} />
          <PizzaText mt={4}>Carregando produtos...</PizzaText>
        </Box>
      ) : (
        <ProductGrid products={products} />
      )}
    </PizzaCard>
  );
};
```

#### 3. Botão de Submit
```tsx
const [saving, setSaving] = useState(false);

<PizzaButton 
  loading={saving}
  variant="primary"
  type="submit"
  w="full"
>
  Salvar Pizza
</PizzaButton>
```

### 🎨 Características Visuais

- **Imagem**: `/pizza.png` redimensionada
- **Animação**: Rotação horizontal 360° no eixo Y (como a Terra girando) em 2 segundos
- **Estilo**: Circular (`borderRadius: 50%`)
- **Performance**: `priority` loading para melhor UX
- **Overlay**: Fundo escuro com blur para tela cheia
- **Z-index**: 9999 para ficar sobre todo conteúdo

### 🚀 Integração

Todos os componentes estão exportados em:
```tsx
import { 
  PizzaLoading, 
  PizzaSpinner, 
  PizzaButton 
} from "@/components/ui";
```

---

## ✅ Resultado

Loading consistente em todo o projeto com:
- **Visual unificado** usando pizza.png
- **Múltiplos tamanhos** para diferentes contextos  
- **Fácil integração** com componentes existentes
- **Performance otimizada** com animações suaves
- **UX profissional** com estados visuais claros
