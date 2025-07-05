# 🍕 Pizza Express Frontend

> Sistema moderno de pizzaria desenvolvido com Next.js 15, TypeScript e Chakra UI v3

## 🚀 **Quick Start**

```bash
# Instalação
npm install

# Desenvolvimento
npm run dev

# Build
npm run build

# Servidor de produção
npm start
```

## ✨ **Principais Funcionalidades**

- 🔐 **Autenticação completa** com JWT
- 🎨 **Sistema de Design** padronizado
- 🍕 **Loading animado** com pizza
- 📱 **Interface responsiva** e moderna
- ⚡ **Performance otimizada** com Next.js 15
- 🖼️ **Galeria de pizzas** com imagens
- 🛒 **Sistema de pedidos** completo
- 📊 **Dashboard administrativo**

## 🛠️ **Tecnologias**

- **Next.js 15** + **TypeScript**
- **Chakra UI v3** + **Framer Motion**
- **Jest** + **React Testing Library**
- **JWT** para autenticação
- **React Icons** para ícones

## 🔧 **Configuração**

### **Variáveis de Ambiente**
```env
# .env.local (desenvolvimento)
NEXT_PUBLIC_API_URL=http://localhost:3001

# .env (produção)
NEXT_PUBLIC_API_URL=https://pizza-express-backend.vercel.app
```

### **Backend Requerido**
Este projeto requer o [Pizza Express Backend](https://github.com/RacconWebFenix/pizza-express-backend) rodando.

## 📋 **Scripts**

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - Linting do código
- `npm test` - Execução dos testes

## 🔄 **Fluxo da Aplicação**

### **Página Inicial** (`/`)
- 🏠 Landing page da pizzaria
- 🔄 Redireciona automaticamente para `/cardapio` se o usuário estiver logado
- 🚪 Botões para login/registro

### **Login** (`/login`)
- 🔑 Autenticação do usuário
- ✅ Após login bem-sucedido → **Redireciona automaticamente para `/cardapio`**

### **Cardápio** (`/cardapio`) - **Página Principal**
- 🍕 **Página principal após login**
- 🖼️ Galeria de pizzas com imagens
- 🛒 Funcionalidade de pedidos

### **Outras Páginas**
- 📦 `/pedidos` - Gerenciar pedidos
- 📊 `/dashboard` - Painel administrativo
- 🖼️ `/galeria` - Visualização em grid das pizzas

## 🛡️ **Proteção de Rotas**

- ✅ **Páginas públicas**: `/`, `/login`, `/register`, `/access-denied`
- 🔒 **Páginas protegidas**: `/cardapio`, `/pedidos`, `/dashboard`

## 🎨 **Sistema de Design**

### **Componentes UI Customizados**

- **PizzaButton**: Botões temáticos com variantes (primary, secondary, pizza)
- **PizzaInput**: Input customizado com validação e tema da pizzaria
- **PizzaTextarea**: Textarea para descrições com validação
- **PizzaCard**: Cards de pizza com imagem e informações
- **PizzaLoading**: Loading de tela cheia com animação
- **PizzaSpinner**: Ícone de loading inline
- **PizzaBadge**: Badges informativos com status
- **PizzaFileInput**: Upload de arquivos com preview
- **PizzaImageModal**: Modal para visualização de imagens

### **Sistema de Loading Animado**

O sistema possui **6 tipos de animações aleatórias**:

1. **Rotate**: Rotação completa 360°
2. **Pulse**: Efeito de pulsação com escala
3. **Bounce**: Movimento de pulo vertical
4. **Swing**: Balanço pendular
5. **Flip**: Giro no eixo Y (3D)
6. **Wobble**: Movimento oscilante com rotação

```tsx
import { PizzaLoading, PizzaSpinner } from "@/components/ui";

// Loading de tela cheia
<PizzaLoading 
  isVisible={loading} 
  message="Processando cadastro..." 
  size="lg"
  fullscreen={true}
/>

// Spinner inline
<PizzaSpinner size={24} />
```

## 🏗️ **Arquitetura do Projeto**

### **Estrutura de Pastas**
```
app/                    # Next.js App Router
├── (auth)/            # Grupo de rotas de autenticação
├── cardapio/          # Página do cardápio
├── dashboard/         # Painel administrativo
├── galeria/           # Galeria de pizzas
└── pedidos/           # Gerenciamento de pedidos

components/            # Componentes React
├── auth/              # Componentes de autenticação
├── cardapio/          # Componentes do cardápio
├── dashboard/         # Componentes do dashboard
├── layout/            # Layout e navegação
├── pedidos/           # Componentes de pedidos
└── ui/                # Componentes UI reutilizáveis

hooks/                 # Custom hooks
├── useLogin.ts        # Hook de autenticação
├── usePizzas.ts       # Hook para gerenciar pizzas
├── useDashboard.ts    # Hook do dashboard
└── usePedidos.ts      # Hook de pedidos

services/              # Serviços e APIs
├── auth-service.ts    # Serviços de autenticação
└── pizza-service.ts   # Serviços de pizzas

types/                 # Definições TypeScript
constants/             # Constantes da aplicação
utils/                 # Utilitários e helpers
```

### **Clean Code e Princípios**

- **Separação de responsabilidades**: Lógica de negócio separada da apresentação
- **Componentes puros**: Componentes sem side effects
- **Custom Hooks**: Lógica reutilizável encapsulada
- **TypeScript**: Tipagem forte em todos os componentes
- **Barrel exports**: Imports organizados com arquivos index

## 🔐 **Sistema de Autenticação**

### **Fluxo de Autenticação**
1. Login com email/senha
2. Recebimento de token JWT
3. Armazenamento seguro em cookie
4. Middleware para proteção de rotas
5. Context global para estado de autenticação

### **Validações Implementadas**
- Email em formato válido
- Senha com requisitos mínimos
- Validação em tempo real
- Feedback visual de erros

## 🍕 **Gerenciamento de Pizzas**

### **Funcionalidades**
- ✅ Listagem de pizzas com imagens
- ✅ Criação de novas pizzas
- ✅ Upload de imagens para Cloudinary
- ✅ Visualização em galeria responsiva
- ✅ Cards temáticos com preços

### **Upload de Imagens**
- Suporte a formatos: JPEG, PNG, WebP
- Preview antes do upload
- Integração com Cloudinary
- Fallback para imagem padrão
- Modal para visualização ampliada

## 📊 **Dashboard Administrativo**

### **Estatísticas Disponíveis**
- Total de pizzas cadastradas
- Pedidos do dia
- Receita total
- Pizza mais vendida

### **Ações Administrativas**
- Criar nova pizza
- Navegar para cardápio
- Navegar para pedidos
- Visualizar estatísticas

## 🛒 **Sistema de Pedidos**

### **Funcionalidades**
- Listagem de pedidos
- Filtros por status
- Histórico completo
- Estados de loading/erro

### **Status de Pedidos**
- Preparando
- Entregues
- Cancelados

## 🎯 **UX/UI Implementada**

### **Validações em Tempo Real**
- Feedback visual imediato
- Mensagens de erro contextuais
- Estados de loading elegantes
- Animações suaves

### **Responsividade**
- Design mobile-first
- Grid responsivo
- Navegação adaptável
- Touch-friendly

### **Acessibilidade**
- Suporte a teclado
- Aria labels apropriados
- Contraste adequado
- Navegação por Tab

## 🚀 **Performance**

### **Otimizações Implementadas**
- Lazy loading de componentes
- Imagens otimizadas com Next.js Image
- Bundle splitting automático
- CSS-in-JS otimizado

### **Configurações Next.js**
```javascript
// next.config.mjs
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};
```

## 🧪 **Testes**

### **Configuração de Testes**
- Jest + React Testing Library
- Mocks para APIs
- Testes de componentes
- Testes de hooks

```bash
# Executar testes
npm test

# Testes em modo watch
npm run test:watch

# Coverage
npm run test:coverage
```

## 🔧 **Desenvolvimento**

### **Comandos Úteis**
```bash
# Desenvolvimento com hot reload
npm run dev

# Build de produção
npm run build

# Verificar build
npm run start

# Lint do código
npm run lint

# Fix automático
npm run lint:fix
```

### **Configuração de Desenvolvimento**
```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 📈 **Próximos Passos**

### **Funcionalidades Planejadas**
- [ ] Sistema de avaliações
- [ ] Carrinho de compras
- [ ] Checkout integrado
- [ ] Notificações push
- [ ] Chat de suporte
- [ ] Relatórios avançados

### **Melhorias Técnicas**
- [ ] PWA (Progressive Web App)
- [ ] Testes E2E com Playwright
- [ ] Storybook para componentes
- [ ] Monitoramento de performance
- [ ] Analytics integrado

## 🐛 **Troubleshooting**

### **Problemas Comuns**

#### Erro de autenticação
```bash
# Verificar se o backend está rodando
curl http://localhost:3001/health

# Limpar cookies
# Abrir DevTools > Application > Cookies > Limpar
```

#### Erro de build
```bash
# Limpar cache
rm -rf .next
npm run build
```

#### Erro de imagens
```bash
# Verificar configuração do Cloudinary
# Verificar next.config.mjs
```

## 📝 **Changelog**

### **v1.0.0** (Atual)
- ✅ Sistema de autenticação completo
- ✅ CRUD de pizzas com imagens
- ✅ Dashboard administrativo
- ✅ Sistema de pedidos
- ✅ Galeria responsiva
- ✅ Componentes UI temáticos
- ✅ Loading animado
- ✅ Testes básicos

---

**Desenvolvido com ❤️ para a melhor experiência em pizzarias!** 🍕
