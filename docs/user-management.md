# 👥 Sistema de Gerenciamento de Usuários

## 📋 Visão Geral

O sistema de gerenciamento de usuários permite que administradores tenham controle completo sobre os usuários da plataforma Pizza Express. Implementado seguindo princípios SOLID e Clean Code, oferece uma interface intuitiva para CRUD completo de usuários.

## 🎯 Funcionalidades

### **Operações CRUD**
- ✅ **Criar** novos usuários com roles específicos
- ✅ **Listar** usuários com filtros avançados
- ✅ **Editar** informações dos usuários
- ✅ **Deletar** usuários (com confirmação)

### **Controle de Acesso**
- 🔒 **Apenas administradores** podem acessar o sistema
- 🎭 **Roles suportados**: CLIENTE, FUNCIONARIO, ADMIN
- 🛡️ **Proteção de rotas** com middleware

### **Validações Implementadas**
- 📧 Email único no sistema
- 📱 Formato de telefone brasileiro
- 🔐 Senha obrigatória na criação (mínimo 6 caracteres)
- ✅ Validação em tempo real com feedback visual

## 🏗️ Arquitetura

### **Estrutura de Componentes**
```
src/features/users/
├── components/
│   ├── UsersTable.tsx          # Tabela principal com dados
│   ├── UserFormModal.tsx       # Modal de criação/edição
│   ├── UserFilters.tsx         # Filtros e busca
│   └── index.ts                # Barrel exports
├── hooks/
│   └── useUsers.ts             # Hook de gerenciamento de estado
├── services/
│   └── usersService.ts         # Chamadas para API
└── types/
    └── userManagement.ts       # Tipos TypeScript
```

### **Padrões Implementados**
- **SOLID Principles**: Separação clara de responsabilidades
- **Custom Hooks**: Lógica reutilizável encapsulada
- **TypeScript**: Tipagem forte em todos os componentes
- **React Hook Form + Zod**: Validação robusta e performática

## 🔧 Implementação Técnica

### **Fallback de Busca Local**
Devido a limitações atuais no backend, implementamos um sistema híbrido:

- **Buscas ≥ 3 caracteres**: Enviadas para o backend via API
- **Buscas < 3 caracteres**: Busca local nos dados já carregados
- **Benefício**: Experiência fluida enquanto o backend é corrigido

### **Validações Implementadas**
- Busca requer mínimo 3 caracteres
- Botão desabilitado para buscas insuficientes
- Feedback visual em tempo real
- Validação de email único (via backend)

### **Acesso ao Sistema**
1. Faça login como administrador
2. Navegue para `/admin/users`
3. Interface completa será carregada

### **Criando um Novo Usuário**
```typescript
// Exemplo de criação via API
const newUser = {
  nome: "João Silva",
  email: "joao@email.com",
  telefone: "(11) 99999-9999",
  role: Role.FUNCIONARIO,
  password: "senha123"
};
```

### **Filtrando Usuários**
- **Por role**: CLIENTE, FUNCIONARIO, ADMIN
- **Por busca**: Nome ou email
- **Combinação**: Filtros podem ser combinados

## 🎨 Interface do Usuário

### **Tabela de Usuários**
- 📊 **Colunas**: Nome, Email, Telefone, Role, Ações
- 🏷️ **Badges coloridos** para diferentes roles
- ⚡ **Ações rápidas**: Editar, Deletar
- 📱 **Responsiva** para mobile

### **Modal de Formulário**
- 📝 **Campos validados**: Nome, Email, Telefone, Role
- 🔐 **Campo de senha** (apenas na criação)
- ✅ **Feedback visual** de validação
- 🎯 **Botões temáticos** seguindo o design da pizzaria

### **Sistema de Filtros**
- 🔍 **Busca textual** por nome/email (mínimo 3 caracteres)
- 📋 **Filtro por role** (Cliente, Funcionário, Administrador)
- ⚡ **Aplicação manual** via botão "Filtrar"
- 🔄 **Busca local** como fallback para buscas curtas
- 📝 **Feedback visual** para requisitos mínimos

## 🔒 Segurança

### **Controles Implementados**
- **Autenticação obrigatória** com JWT
- **Verificação de role** no frontend e backend
- **Validação de dados** em múltiplas camadas
- **Proteção contra XSS** e injeção

### **Políticas de Senha**
- **Obrigatória na criação**: Admin define senha inicial
- **Mínimo 6 caracteres**: Validação básica de segurança
- **Não editável**: Senhas não podem ser alteradas via interface
- **Hash no backend**: Senhas são hasheadas antes do armazenamento

## 🚀 API Integration

### **Endpoints Utilizados**
```typescript
### **Endpoints Utilizados**
```typescript
// Buscar usuários com filtros
GET /users?role=FUNCIONARIO&search=admin

// Fallback: busca local para termos curtos (< 3 caracteres)
// Busca todos os usuários e filtra no frontend
GET /users (sem parâmetros de busca)
```

// Criar usuário
POST /users
{
  "nome": "string",
  "email": "string",
  "telefone": "string",
  "role": "CLIENTE|FUNCIONARIO|ADMIN",
  "password": "string"
}

// Atualizar usuário
PATCH /users/:id
{
  "nome": "string",
  "email": "string",
  "telefone": "string",
  "role": "CLIENTE|FUNCIONARIO|ADMIN"
}

// Deletar usuário
DELETE /users/:id
```

### **Tratamento de Erros**
- **400**: Dados inválidos
- **401**: Não autorizado
- **403**: Acesso negado (não é admin)
- **404**: Usuário não encontrado
- **409**: Email já existe

## 🧪 Testes

### **Cobertura de Testes**
- ✅ **Componentes**: UsersTable, UserFormModal, UserFilters
- ✅ **Hooks**: useUsers com estados e efeitos
- ✅ **Serviços**: usersService com chamadas de API
- ✅ **Validações**: Formulários com casos de erro

### **Executando Testes**
```bash
# Todos os testes
npm test

# Apenas testes de usuários
npm test -- --testPathPattern=users

# Com coverage
npm run test:coverage
```

## 🔄 Próximas Melhorias

### **Funcionalidades Planejadas**
- [ ] **Reset de senha** via email
- [ ] **Auditoria de ações** (logs)
- [ ] **Importação/exportação** de usuários
- [ ] **Perfis de usuário** detalhados
- [ ] **Notificações** de boas-vindas

### **Melhorias Técnicas**
- [ ] **Paginação** para grandes volumes
- [ ] **Cache inteligente** de dados
- [ ] **Otimização de performance** com virtualização
- [ ] **Testes E2E** com Playwright

## 📚 Referências

- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Chakra UI](https://chakra-ui.com/)
- [Next.js App Router](https://nextjs.org/docs/app)