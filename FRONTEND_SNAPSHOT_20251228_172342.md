# 📦 Frontend Pizza Express - Snapshot Completo

**Snapshot para validação de implementação do sistema híbrido**

> Gerado para verificar se as mudanças do backend foram aplicadas corretamente

---


## 📋 Metadados

| Propriedade | Valor |
|-------------|-------|
| **Data/Hora** | 28/12/2025 às 17:23:42 |
| **Diretório** | `/home/raccon/pizza-express-frontend` |
| **Sistema** | Linux |

---

## 📂 Estrutura do Projeto

```
.
├── arquitetura_features.json
├── docker-compose.yml
├── Dockerfile
├── eslint.config.mjs
├── FRONTEND_SNAPSHOT_20251228_172342.md
├── generate-frontend-snapshot.sh
├── jest.config.js
├── jest.setup.js
├── next.config.mjs
├── next-env.d.ts
├── package.json
├── package-lock.json
├── public
│   ├── fenix1.jpeg
│   ├── fenix2.jpeg
│   ├── fenix3.jpeg
│   ├── fenix4.jpeg
│   ├── fenix.png
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── pizza.png
│   ├── vercel.svg
│   └── window.svg
├── README.md
├── src
│   ├── app
│   │   ├── admin
│   │   ├── (auth)
│   │   ├── auth-callback
│   │   ├── cardapio
│   │   ├── dashboard
│   │   ├── favicon.ico
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── pedidos
│   │   ├── profile
│   │   └── provider.tsx
│   ├── components
│   │   ├── icons
│   │   ├── layout
│   │   ├── ProtectedRoute.tsx
│   │   └── ui
│   ├── constants
│   │   ├── cardapio.ts
│   │   ├── dashboard.ts
│   │   ├── index.ts
│   │   └── validation.ts
│   ├── features
│   │   ├── auth
│   │   ├── cart
│   │   ├── categorias
│   │   ├── dashboard
│   │   ├── entregadores
│   │   ├── mesas
│   │   ├── orders
│   │   ├── payments
│   │   ├── pedidos
│   │   ├── produtos
│   │   ├── profile
│   │   ├── upload
│   │   └── users
│   ├── hooks
│   │   ├── usePermissions.ts
│   │   └── useTranslation.ts
│   ├── locales
│   │   └── pt-BR.json
│   ├── middleware.ts
│   ├── theme
│   │   ├── system.ts
│   │   └── theme.ts
│   ├── types
│   │   ├── cart.ts
│   │   ├── categoria.ts
│   │   ├── endereco.ts
│   │   ├── entregador.ts
│   │   ├── index.ts
│   │   ├── mesa.ts
│   │   ├── order.ts
│   │   ├── product.ts
│   │   ├── produto.ts
│   │   ├── upload.ts
│   │   └── users.ts
│   └── utils
│       ├── cookies.ts
│       ├── fetchHelpers.ts
│       ├── format.ts
│       └── validation.ts
├── __tests__
│   ├── cart.test.tsx
│   └── home.test.js
├── tsconfig.json
└── tsconfig.tsbuildinfo

36 directories, 58 files
```

---

## 📄 ARQUIVOS DO FRONTEND


---

## 📄 `jest.config.js`

```javascript
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "next/dist/build/swc/jest-transformer",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
  transformIgnorePatterns: ["/node_modules/(?![@]?next)"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
  ],
};

module.exports = createJestConfig(customJestConfig);

```


---

## 📄 `jest.setup.js`

```javascript
import "@testing-library/jest-dom";

if (typeof global.structuredClone !== "function") {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

```


---

## 📄 `next-env.d.ts`

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference path="./.next/types/routes.d.ts" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```


---

## 📄 `src/app/admin/categorias/page.tsx`

```typescript
"use client";

import { AdminRoute } from "@/components/ProtectedRoute";
import { Box } from "@chakra-ui/react";
import { CategoriasList } from "@/features/categorias";

export default function AdminCategoriasPage() {
  return (
    <AdminRoute>
      <Box p={8}>
        <CategoriasList />
      </Box>
    </AdminRoute>
  );
}
```


---

## 📄 `src/app/admin/delivery-persons/page.tsx`

```typescript
"use client";

import { AdminRoute } from "@/components/ProtectedRoute";
import { Box } from "@chakra-ui/react";
import { EntregadoresList } from "@/features/entregadores";

export default function AdminDeliveryPersonsPage() {
  return (
    <AdminRoute>
      <Box p={8}>
        <EntregadoresList />
      </Box>
    </AdminRoute>
  );
}

```


---

## 📄 `src/app/admin/layout.tsx`

```typescript
"use client";

import { AdminRoute } from "@/components/ProtectedRoute";
import MainLayout from "@/components/layout/MainLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminRoute>
      <MainLayout>{children}</MainLayout>
    </AdminRoute>
  );
}

```


---

## 📄 `src/app/admin/mesas/page.tsx`

```typescript
"use client";

import { AdminRoute } from "@/components/ProtectedRoute";
import { Box, Tabs } from "@chakra-ui/react";
import { DashboardMesas } from "@/features/mesas";
import { TablesList } from "@/features/pedidos/components";

export default function AdminMesasPage() {
  return (
    <AdminRoute>
      <Box p={8}>
        <Tabs.Root defaultValue="mesas" variant="enclosed">
          <Tabs.List>
            <Tabs.Trigger value="mesas">Gerenciar Mesas</Tabs.Trigger>
            <Tabs.Trigger value="pedidos">Pedidos de Mesa</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="mesas">
            <DashboardMesas />
          </Tabs.Content>
          <Tabs.Content value="pedidos">
            <TablesList />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </AdminRoute>
  );
}

```


---

## 📄 `src/app/admin/produtos/page.tsx`

```typescript
"use client";

import { AdminRoute } from "@/components/ProtectedRoute";
import { Box } from "@chakra-ui/react";
import { ProdutosList } from "@/features/produtos";

export default function AdminProdutosPage() {
  return (
    <AdminRoute>
      <Box p={8}>
        <ProdutosList />
      </Box>
    </AdminRoute>
  );
}
```


---

## 📄 `src/app/admin/users/page.tsx`

```typescript
"use client";

import { Box, VStack, Heading, HStack } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { AdminRoute } from "@/components/ProtectedRoute";
import { useUsers, UsersTable, UserFormModal, UserFiltersComponent } from "@/features/users";
import { PizzaButton } from "@/components/ui";

/**
 * Página de Gerenciamento de Usuários
 * Área administrativa completa para CRUD de usuários
 */
export default function AdminUsersPage() {
  const usersHook = useUsers();

  return (
    <AdminRoute>
      <Box p={{ base: 4, md: 8 }}>
        <VStack gap={6} align="stretch">
          {/* Header */}
          <HStack justify="space-between" align="center">
            <Heading size="lg">Gerenciar Usuários</Heading>
            <PizzaButton
              onClick={usersHook.handleCreate}
              icon={FaPlus}
            >
              Novo Usuário
            </PizzaButton>
          </HStack>

          {/* Filtros */}
          <UserFiltersComponent
            filters={usersHook.filters}
            onFiltersChange={usersHook.setFilters}
            onSearch={usersHook.fetchUsers}
          />

          {/* Tabela */}
          <UsersTable
            users={usersHook.users}
            isLoading={usersHook.isLoading}
            onEdit={usersHook.handleEdit}
            onDelete={usersHook.handleDelete}
          />

          {/* Modal de Formulário */}
          <UserFormModal
            isOpen={usersHook.isModalOpen}
            user={usersHook.selectedUser}
            onSubmit={(data) => {
              if (usersHook.selectedUser) {
                return usersHook.updateUser(usersHook.selectedUser.id, data);
              } else {
                return usersHook.createUser(data);
              }
            }}
            onClose={usersHook.onCloseModal}
            isLoading={usersHook.isLoading}
          />
        </VStack>
      </Box>
    </AdminRoute>
  );
}

```


---

## 📄 `src/app/(auth)/access-denied/page.tsx`

```typescript
"use client";

import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const AccessDeniedPage = () => {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgGradient="linear(to-br, brand.secondary, brand.primary)"
        color="white"
      >
        <Flex direction="column" gap={4} textAlign="center" align="center">
          <Heading size="xl">Acesso Negado</Heading>
          <Text fontSize="lg">
            Você não tem permissão para acessar esta página.
          </Text>
          <Button colorScheme="yellow" onClick={handleGoToLogin}>
            Ir para Login
          </Button>
        </Flex>
      </Box>
    </motion.div>
  );
};

export default AccessDeniedPage;

```


---

## 📄 `src/app/auth-callback/auth-callback-view.tsx`

```typescript
"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Flex } from "@chakra-ui/react";

import { useAuth } from "@/features/auth/contexts/AuthContext";
import { PizzaLoading } from "@/components/ui";

// O nome da função foi alterado para ser mais descritivo
export default function AuthCallbackView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { handleAuthentication } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      console.error("Falha na autenticação do Google:", error);
      router.push("/login?error=true");
      return;
    }

    if (token) {
      console.log("[AUTH-CALLBACK] Processando token...");
      handleAuthentication(token);
    } else {
      console.error("[AUTH-CALLBACK] Nenhum token encontrado na URL");
      router.push("/login?error=true");
    }
  }, [searchParams, handleAuthentication, router]);

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
    >
      <PizzaLoading />
    </Flex>
  );
}

```


---

## 📄 `src/app/auth-callback/page.tsx`

```typescript
import { Suspense } from "react";
import { Flex } from "@chakra-ui/react";

import AuthCallbackView from "./auth-callback-view";
import { PizzaLoading } from "@/components/ui";

// O fallback é a UI de carregamento que o servidor envia.
// Podemos usar o mesmo componente de loading para uma experiência consistente.
function LoadingFallback() {
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
    >
      <PizzaLoading />
    </Flex>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthCallbackView />
    </Suspense>
  );
}

```


---

## 📄 `src/app/(auth)/layout.tsx`

```typescript
// src/app/(auth)/layout.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { PizzaLoading } from "@/components/ui";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se não estiver carregando e o usuário ESTIVER autenticado, redireciona para o dashboard
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  // Mostra uma tela de loading enquanto a sessão está sendo verificada
  if (isLoading || isAuthenticated) {
    return <PizzaLoading message="Verificando sessão..." fullscreen />;
  }

  // Se não estiver carregando e não estiver autenticado, mostra o conteúdo (página de login/registro)
  return (
    <Box
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={4}
      overflow="hidden"
      zIndex={9999}
    >
      {children}
    </Box>
  );
}

```


---

## 📄 `src/app/(auth)/login/layout.tsx`

```typescript
import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={4}
      // Fundo mais neutro e elegante, inspirado no overlay do modal
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
    >
      {children}
    </Box>
  );
}

```


---

## 📄 `src/app/(auth)/login/page.tsx`

```typescript
"use client";

import { useState, FormEvent } from "react";
import { Box, VStack, Heading, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { PizzaButton, PizzaInput, PizzaLoading } from "@/components/ui";
import { toaster } from "@/components/ui/toaster";
import { FcGoogle } from "react-icons/fc";
import { FaUserPlus } from "react-icons/fa";

/**
 * Página de Login.
 * Refatorada para usar o estado local do formulário e o hook 'useAuth' centralizado.
 */
export default function LoginPage() {
  // O estado do formulário (email, senha) agora vive aqui. É um estado local.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // A lógica de autenticação (login, loading) vem do nosso AuthContext.
  const { login, isLoading, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validação mais robusta
    if (!email.trim()) {
      setError("Por favor, informe seu endereço de e-mail.");
      return;
    }

    if (!password.trim()) {
      setError("Por favor, informe sua senha.");
      return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, informe um endereço de e-mail válido.");
      return;
    }

    try {
      // Chama a função de login do authService através do context
      const loginSuccess = await login({ email, password });
      if (!loginSuccess) {
        setError(
          "Falha na autenticação. Verifique suas credenciais e tente novamente."
        );
      }
      // O redirecionamento já é tratado pelo AuthContext
    } catch (err) {
      console.error("Erro no login:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Erro inesperado durante o login.";
      setError(errorMessage);

      // Mostra toast de erro para feedback mais visível
      toaster.create({
        title: "Erro no Login",
        description: errorMessage,
        type: "error",
        duration: 5000,
      });
    }
  };

  if (isLoading) {
    return <PizzaLoading message="Autenticando..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: "100%",
         maxWidth: "400px" }}
    >
      <Box
        bg="white"
        p={{ base: 2, md: 3, lg: 4 }}
        borderRadius="md"
        boxShadow="md"
        w="full"
        maxW="380px"
      
        borderTop="4px solid"
        borderColor="brand.primary"
        _dark={{ bg: "gray.800", borderColor: "brand.secondary" }}
      >
        <VStack
          gap={{ base: 2, md: 3, lg: 4 }}
          as="form"
          onSubmit={handleSubmit}
          margin={{ base: 1, md: 1, lg: 1 }}
        >
          <Heading
            size={{ base: "sm", md: "md", lg: "lg" }}
            color="brand.textPrimary"
          >
            Acessar sua Conta
          </Heading>

          {/* O Google Login continua usando a função do AuthContext */}
          <PizzaButton
            onClick={signInWithGoogle}
            w="full"
            variant="outline"
            size={{ base: "sm", md: "md" }}
          >
            <Flex align="center" gap="1">
              <FcGoogle size={18} />
              <Text fontSize={{ base: "sm", md: "md" }}>Entrar com Google</Text>
            </Flex>
          </PizzaButton>

          <Text color="gray.500" fontSize={{ base: "xs", md: "sm" }}>
            ou entre com seu e-mail
          </Text>

          <PizzaInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={
              error &&
              (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                ? "Email inválido"
                : undefined
            }
            required
          />
          <PizzaInput
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error && !password.trim() ? "Senha obrigatória" : undefined}
            required
          />
          {error && (
            <Box
              p={2}
              bg="red.50"
              border="1px solid"
              borderColor="red.200"
              borderRadius="md"
              _dark={{
                bg: "red.900",
                borderColor: "red.700",
              }}
            >
              <Text color="red.600" fontSize="sm" fontWeight="medium">
                {error}
              </Text>
            </Box>
          )}

          <PizzaButton
            type="submit"
            w="full"
            size={{ base: "sm", md: "md", lg: "lg" }}
            loading={isLoading}
          >
            Entrar
          </PizzaButton>

          <Box textAlign="center" mt={1}>
            <Text fontSize="xs" color="gray.600" _dark={{ color: "gray.300" }}>
              Não tem uma conta?{" "}
              <Link href="/register">
                <PizzaButton variant="outline" size="xs" icon={FaUserPlus}>
                  Cadastre-se
                </PizzaButton>
              </Link>
            </Text>
          </Box>
        </VStack>
      </Box>
    </motion.div>
  );
}

```


---

## 📄 `src/app/(auth)/register/page.tsx`

```typescript
"use client";

import { Box, VStack, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PizzaButton, PizzaInput, PizzaLoading } from "@/components/ui";
import { FaSignInAlt } from "react-icons/fa";

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  nome?: string;
  telefone?: string;
  // endereco removido - não será coletado no cadastro conforme documentação
}

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefone: "",
    // endereco removido - não será coletado no cadastro conforme documentação
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const validateForm = (): boolean => {
    // ... (toda a sua lógica de validação continua a mesma)
    const newErrors: FormErrors = {};

    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    else if (formData.nome.trim().length < 2)
      newErrors.nome = "Nome deve ter pelo menos 2 caracteres";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Email é obrigatório";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Email deve ter um formato válido";

    if (!formData.password) newErrors.password = "Senha é obrigatória";
    else if (formData.password.length < 6)
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Senhas não coincidem";

    if (!formData.telefone.trim())
      newErrors.telefone = "Telefone é obrigatório";
    else {
      const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
      if (!phoneRegex.test(formData.telefone))
        newErrors.telefone = "Telefone deve estar no formato (99) 9999-9999";
    }

    // Endereço removido - não será validado no cadastro conforme documentação

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (value: string): string => {
    // ... (sua função de formatação continua a mesma)
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers.length > 0 ? `(${numbers}` : "";
    if (numbers.length <= 6)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(
        6
      )}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
      7,
      11
    )}`;
  };

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      if (field === "telefone") value = formatPhoneNumber(value);
      setFormData({ ...formData, [field]: value });
      if (errors[field as keyof FormErrors])
        setErrors({ ...errors, [field]: undefined });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    // ... (sua lógica de submit continua a mesma)
    e.preventDefault();
    setErrorMessage("");
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: formData.nome.trim(),
            email: formData.email.toLowerCase().trim(),
            password: formData.password,
            telefone: formData.telefone.trim(),
            // endereco removido - não será enviado no cadastro conforme documentação
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => router.push("/login"), 3000);
      } else {
        if (response.status === 409) {
          setErrorMessage("Este email já está cadastrado. Tente fazer login.");
        } else if (responseData.message) {
          setErrorMessage(
            Array.isArray(responseData.message)
              ? responseData.message.join(", ")
              : responseData.message
          );
        } else {
          setErrorMessage("Erro ao realizar cadastro. Tente novamente.");
        }
        setLoading(false);
      }
    } catch {
      setErrorMessage("Erro inesperado. Tente novamente mais tarde.");
      setLoading(false);
    }
  };

  if (loading) {
    return <PizzaLoading isVisible={true} message="Processando cadastro..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: "100%", maxWidth: "420px" }}
    >
      <Box
        bg="white"
        p={{ base: 4, md: 6, lg: 8 }}
        borderRadius="xl"
        boxShadow="xl"
        w="full"
        maxW="420px"
        mx="auto"
        borderTop="4px solid"
        borderColor={showSuccess ? "green.500" : "brand.primary"}
        _dark={{
          bg: "gray.800",
          borderColor: showSuccess ? "green.400" : "brand.secondary",
        }}
        maxH="90vh"
        overflowY="auto"
      >
        {showSuccess ? (
          <VStack gap={4} textAlign="center" py={6}>
            <Text fontSize="4xl">✅</Text>
            <Heading size="lg" color="green.600">
              Cadastro Realizado!
            </Heading>
            <Text color="gray.600" _dark={{ color: "gray.300" }}>
              Sua conta foi criada com sucesso. Estamos redirecionando você para
              o login.
            </Text>
          </VStack>
        ) : (
          <VStack as="form" onSubmit={handleSubmit} gap={{ base: 3, md: 4, lg: 4 }} align="stretch">
            <Heading
              size={{ base: "md", md: "lg" }}
              color="gray.700"
              textAlign="center"
              _dark={{ color: "white" }}
            >
              Crie sua Conta
            </Heading>

            {errorMessage && (
              <Box
                bg="red.50"
                color="red.800"
                p={3}
                rounded="md"
                border="1px"
                borderColor="red.200"
              >
                <Text fontWeight="medium">❌ {errorMessage}</Text>
              </Box>
            )}

            <PizzaInput
              label="Nome Completo"
              type="text"
              value={formData.nome}
              onChange={handleInputChange("nome")}
              error={errors.nome}
              required
            />
            <PizzaInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              error={errors.email}
              required
            />
            <PizzaInput
              label="Telefone"
              type="tel"
              value={formData.telefone}
              onChange={handleInputChange("telefone")}
              placeholder="(11) 99999-9999"
              error={errors.telefone}
              maxLength={15}
              required
            />
            {/* Campo endereço removido - não será coletado no cadastro conforme documentação */}
            <PizzaInput
              label="Senha"
              type="password"
              value={formData.password}
              onChange={handleInputChange("password")}
              error={errors.password}
              required
            />
            <PizzaInput
              label="Confirmar Senha"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange("confirmPassword")}
              error={errors.confirmPassword}
              required
            />

            <PizzaButton
              type="submit"
              variant="solid"
              w="full"
              size={{ base: "md", md: "lg" }}
              disabled={loading}
              mt={2}
            >
              Cadastrar
            </PizzaButton>

            <Box textAlign="center" mt={2}>
              <Text
                fontSize="sm"
                color="gray.600"
                _dark={{ color: "gray.300" }}
              >
                Já tem uma conta?{" "}
                <Link href="/login">
                  <PizzaButton variant="outline" size={{ base: "xs", md: "sm" }} icon={FaSignInAlt} mx="auto" display="block">
                    Fazer login
                  </PizzaButton>
                </Link>
              </Text>
            </Box>
          </VStack>
        )}
      </Box>
    </motion.div>
  );
};

export default RegisterPage;

```


---

## 📄 `src/app/cardapio/layout.tsx`

```typescript
"use client";

import { ReactNode, useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/contexts/AuthContext";
import { PizzaLoading } from "@/components/ui";
import MainLayout from "@/components/layout/MainLayout";
import { usePermissions } from "@/hooks/usePermissions";

interface CardapioLayoutProps {
  children: ReactNode;
}

export default function CardapioLayout({ children }: CardapioLayoutProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const { isCliente } = usePermissions();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
    if (!isLoading && isAuthenticated && !isCliente()) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, isCliente, router]);

  // Mostrar loading enquanto está carregando
  if (isLoading) {
    return (
      <PizzaLoading
        message="Carregando cardápio..."
        isVisible={true}
        fullscreen={true}
        showMessage={true}
      />
    );
  }

  // Se não está autenticado, mostrar loading (vai redirecionar)
  if (!isAuthenticated || !user) {
    return (
      <PizzaLoading
        message="Verificando acesso..."
        isVisible={true}
        fullscreen={true}
        showMessage={true}
      />
    );
  }

  return <MainLayout>{children}</MainLayout>;
}

```


---

## 📄 `src/app/cardapio/page.tsx`

```typescript
"use client";

import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import { useProducts } from "@/features/produtos/hooks/useProducts";
import { ProductCard } from "@/features/produtos/components/ProductCard";
import { PizzaLoading } from "@/components/ui";
import { useCart } from "@/features/cart/context/CartContext";
import { toaster } from "@/components/ui/toaster";
import type { Product } from "@/types/product";

/**
 * Página do Cardápio.
 * Agora utiliza o hook centralizado 'usePizzas' para buscar e exibir os dados.
 */
export default function CardapioPage() {
  const { products, isLoading, error } = useProducts();
  const { addToCart } = useCart();

  // Função para adicionar produto ao carrinho
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toaster.create({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
      type: "success",
    });
  };

  if (isLoading) {
    return <PizzaLoading message="Carregando nosso delicioso cardápio..." />;
  }

  if (error) {
    return <Text color="red.500">Ocorreu um erro: {error}</Text>;
  }

  return (
    <Box p={{ base: 4, md: 8 }}>
      <Heading as="h1" size="2xl" textAlign="center" mb={8}>
        Nosso Cardápio
      </Heading>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={8}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </Grid>
    </Box>
  );
}

```


---

## 📄 `src/app/dashboard/layout.tsx`

```typescript
"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { PizzaLoading } from "@/components/ui";
import MainLayout from "@/components/layout/MainLayout";
import { usePermissions } from "@/hooks/usePermissions";
import { Role } from "@/types/users";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const { hasRole } = usePermissions();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!hasRole([Role.FUNCIONARIO, Role.ADMIN])) {
      router.push("/cardapio");
      return;
    }
  }, [isAuthenticated, isLoading, hasRole, router]);

  if (isLoading || !isAuthenticated || !user) {
    return (
      <PizzaLoading
        message="Carregando dashboard..."
        isVisible={true}
        fullscreen={true}
      />
    );
  }

  if (!hasRole([Role.FUNCIONARIO, Role.ADMIN])) {
    return (
      <PizzaLoading
        message="Redirecionando..."
        isVisible={true}
        fullscreen={true}
      />
    );
  }

  // Novo layout que envolve todo o dashboard
  return <MainLayout>{children}</MainLayout>;
}

```


---

## 📄 `src/app/dashboard/page.tsx`

```typescript
"use client";

import { Box, VStack } from "@chakra-ui/react";
import { DollarSign, ListOrdered, BarChart, ShoppingCart } from "lucide-react";

import { DashboardStats } from "@/features/dashboard/components/DashboardStats";
import { DashboardActions } from "@/features/dashboard/components/DashboardActions";

import { useDashboardStats } from "@/features/dashboard/hooks/useDashboard";

export default function DashboardPage() {
  const { stats, isLoading: isLoadingStats } = useDashboardStats();

  // Criamos o array de estatísticas com os ícones
  const formattedStats = [
    {
      label: "Faturamento Total",
      value: stats.faturamentoTotal,
      icon: DollarSign,
    },
    { label: "Pedidos Hoje", value: stats.pedidosHoje, icon: ShoppingCart },
    {
      label: "Total de Pedidos",
      value: stats.totalDePedidos,
      icon: ListOrdered,
    },
    { label: "Ticket Médio", value: stats.ticketMedio, icon: BarChart },
  ];

  return (
    <Box w="full" minH="100vh" bg="background.primary" p={{ base: 4, md: 8 }}>
      <VStack gap={8} align="stretch">
        <DashboardStats stats={formattedStats} isLoading={isLoadingStats} />
        <DashboardActions />
      </VStack>
    </Box>
  );
}

```


---

## 📄 `src/app/layout.tsx`

```typescript
import { Inter } from "next/font/google";
import { Providers } from "./provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

```


---

## 📄 `src/app/page.tsx`

```typescript
"use client";

import { Box, Flex, Icon, VStack, Image, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaPizzaSlice, FaLeaf, FaFire } from "react-icons/fa";

import { useEffect } from "react";

import { useAuth } from "@/features/auth/contexts/AuthContext";
import { PizzaBadge, PizzaText } from "@/components/ui";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Redireciona usuários logados para o cardápio
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // Use window.location para garantir redirecionamento em produção
      if (typeof window !== "undefined") {
        window.location.href = "/cardapio";
      } else {
        router.push("/cardapio");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  const handleNavigateToWelcome = () => {
    router.push("/cardapio");
  };

  // Mostra loading enquanto verifica autenticação
  // if (isLoading) {
  //   return <AuthLoading message="Verificando login..." />;
  // }

  return (
    <Box
      bgGradient="linear(to-br, yellow.100, orange.100)"
      minH="100vh"
      p={{ base: 6, md: 12 }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <VStack
        gap={{ base: 6, md: 8 }}
        align="center"
        maxW="700px"
        textAlign="center"
        px={4}
      >
        {/* Logo e Branding da Fênix */}
        <VStack gap={3}>
          <Flex align="center" gap={4}>
            <Box>
              <Image
                src="/fenix3.jpeg"
                boxSize={{ base: "120px", md: "150px" }}
                borderRadius="full"
                fit="cover"
                alt="Logo da Fênix Empreendimentos"
                loading="lazy"
              />
            </Box>
            <VStack align="flex-start" gap={1}>
              <PizzaText
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="bold"
                color="brand.primary"
                lineHeight="1.2"
              >
                Fênix Empreendimentos
              </PizzaText>
              <PizzaBadge variant="success" fontSize="xs">
                Inovação e Excelência
              </PizzaBadge>
            </VStack>
          </Flex>
        </VStack>

        {/* Título Principal */}
        <Flex
          align="center"
          gap={3}
          justify="center"
          wrap="wrap"
          aria-label="Bem-vindo à Pizzaria Express"
        >
          <Icon
            as={FaPizzaSlice}
            boxSize={{ base: 6, md: 8 }}
            color="orange.600"
            aria-hidden="true"
            transition="transform 0.3s ease"
            _hover={{ transform: "rotate(15deg)" }}
          />
          <PizzaText
            variant="heading"
            color="brand.primary"
            lineHeight="1.3"
            fontSize={{ base: "2xl", md: "3xl" }}
          >
            Bem-vindo à Pizzaria Express
          </PizzaText>
        </Flex>

        {/* Descrição */}
        <PizzaText
          color="gray.300"
          fontSize={{ base: "md", md: "lg" }}
          lineHeight="1.6"
        >
          Descubra as melhores pizzas artesanais, feitas com ingredientes
          frescos{" "}
          <Icon as={FaLeaf} boxSize={5} color="green.600" aria-hidden="true" />{" "}
          e assadas em nosso tradicional forno a lenha{" "}
          <Icon as={FaFire} boxSize={5} color="orange.600" aria-hidden="true" />
          , garantindo sabor e qualidade excepcionais.
        </PizzaText>

        {/* Botão de Ação */}
        <Button
          variant="solid"
          size="lg"
          px={{ base: 6, md: 8 }}
          py={{ base: 4, md: 6 }}
          borderRadius="lg"
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="semibold"
          colorScheme="orange"
          onClick={handleNavigateToWelcome}
          _hover={{ bg: "orange.500", transform: "scale(1.05)" }}
          transition="all 0.3s ease"
          aria-label="Explorar Cardápio"
        >
          Explorar Cardápio
        </Button>

        {/* Rodapé elegante */}
        <PizzaText color="gray.400" fontSize="sm" opacity={0.8} mt={6}>
          Uma experiência gastronômica única pela Fênix Empreendimentos
        </PizzaText>
      </VStack>
    </Box>
  );
}

```


---

## 📄 `src/app/pedidos/layout.tsx`

```typescript
"use client";

import { ReactNode, useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/contexts/AuthContext";
import { PizzaLoading } from "@/components/ui";
import MainLayout from "@/components/layout/MainLayout";

interface PedidosLayoutProps {
  children: ReactNode;
}

export default function PedidosLayout({ children }: PedidosLayoutProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <PizzaLoading
        message="Carregando pedidos..."
        isVisible={true}
        fullscreen={true}
        showMessage={true}
      />
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <PizzaLoading
        message="Verificando acesso..."
        isVisible={true}
        fullscreen={true}
        showMessage={true}
      />
    );
  }

  return <MainLayout>{children}</MainLayout>;
}

```


---

## 📄 `src/app/pedidos/page.tsx`

```typescript
import { PedidosPageLayout } from "@/features/pedidos/components/PedidosPageLayout";

/**
 * Rota para /pedidos.
 * Apenas renderiza o layout principal da feature.
 */
export default function PedidosPage() {
  return <PedidosPageLayout />;
}

```


---

## 📄 `src/app/profile/layout.tsx`

```typescript
"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { PizzaLoading } from "@/components/ui";
import MainLayout from "@/components/layout/MainLayout";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated || !user) {
    return (
      <PizzaLoading
        message="Carregando perfil..."
        isVisible={true}
        fullscreen={true}
      />
    );
  }

  return <MainLayout>{children}</MainLayout>;
}

```


---

## 📄 `src/app/profile/page.tsx`

```typescript
import { ProfilePageLayout } from "@/features/profile/components/ProfilePageLayout";

/**
 * Rota para /profile.
 * Renderiza o layout principal da feature de perfil.
 * Esta rota deve ser protegida por middleware.
 */
export default function ProfilePage() {
  return <ProfilePageLayout />;
}

```


---

## 📄 `src/app/provider.tsx`

```typescript
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { pizzaExpressSystem } from "@/theme/system";
import { ThemeProvider } from "next-themes";

import { CartProvider } from "@/features/cart/context/CartContext";

import { AuthProvider } from "@/features/auth/contexts/AuthContext";
import { StripeProvider } from "@/features/payments/contexts/StripeContext";
import { CategoriasProvider } from "@/features/categorias/contexts/CategoriasContext";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={pizzaExpressSystem}>
      <AuthProvider>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <StripeProvider>
            <CategoriasProvider>
              <CartProvider>{children}</CartProvider>
              <Toaster />
            </CategoriasProvider>
          </StripeProvider>
        </ThemeProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

```


---

## 📄 `src/components/icons/FenixIcon.tsx`

```typescript
import { Icon, IconProps } from "@chakra-ui/react";

interface FenixIconProps extends Omit<IconProps, "size"> {
  size?: string | number;
}

export const FenixIcon = ({ size = "24px", ...props }: FenixIconProps) => {
  return (
    <Icon width={size} height={size} viewBox="0 0 48 48" {...props}>
      <g>
        <defs>
          <linearGradient
            id="phoenixGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Corpo da Fênix */}
        <path
          d="M24 8C26 8 28 10 28 14C28 16 26 18 24 18C22 18 20 16 20 14C20 10 22 8 24 8Z"
          fill="url(#phoenixGradient)"
        />

        {/* Asa esquerda */}
        <path
          d="M12 20C14 18 18 20 20 24C18 26 14 28 12 26C10 24 10 22 12 20Z"
          fill="url(#phoenixGradient)"
          opacity="0.8"
        />

        {/* Asa direita */}
        <path
          d="M36 20C34 18 30 20 28 24C30 26 34 28 36 26C38 24 38 22 36 20Z"
          fill="url(#phoenixGradient)"
          opacity="0.8"
        />

        {/* Cauda */}
        <path
          d="M24 28C22 30 20 34 22 38C24 40 26 40 28 38C30 34 28 30 24 28Z"
          fill="url(#phoenixGradient)"
          opacity="0.9"
        />

        {/* Detalhes */}
        <circle cx="16" cy="32" r="2" fill="currentColor" opacity="0.6" />
        <circle cx="32" cy="32" r="2" fill="currentColor" opacity="0.6" />
        <circle cx="24" cy="36" r="1.5" fill="currentColor" opacity="0.7" />
      </g>
    </Icon>
  );
};

```


---

## 📄 `src/components/layout/AdminMenuItems.tsx`

```typescript
"use client";

import { Text, Menu } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface AdminMenuItem {
  label: string;
  href: string;
}

interface AdminMenuItemsProps {
  items: AdminMenuItem[];
}

export function AdminMenuItems({ items }: AdminMenuItemsProps) {
  const router = useRouter();

  return (
    <Menu.ItemGroup title="Administração">
      {items.map((item) => (
        <Menu.Item
          key={item.href}
          value={item.href}
          onClick={() => router.push(item.href)}
          _hover={{ bg: "gray.700", cursor: "pointer" }}
        >
          <Text>{item.label}</Text>
        </Menu.Item>
      ))}
    </Menu.ItemGroup>
  );
}

```


---

## 📄 `src/components/layout/Header.tsx`

```typescript
// /components/layout/Header.tsx
"use client";

import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Spacer,
  Button,
  Text,
  Avatar,
  Menu,
} from "@chakra-ui/react";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import NavItem from "./NavItem";
import CartWidget from "@/features/cart/components/CartWidget";
import MobileNavItem from "./MobileNavItem";
import { PizzaButton } from "../ui";
import Link from "next/link";
import { usePermissions } from "@/hooks/usePermissions";
import { useRouter } from "next/navigation";
import { AdminMenuItems } from "./AdminMenuItems";

export function Header() {
  const { open, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, user, logout } = useAuth();
  const { isStaff, isCliente, isAdmin } = usePermissions();
  const router = useRouter();

  // Itens de navegação dinâmicos baseado nas permissões
  const getNavItems = () => [
    {
      label: "Cardápio",
      href: "/cardapio",
      requiresAuth: true,
      requiresCliente: true,
    },
    {
      label: isStaff() ? "Gerenciar Pedidos" : "Meus Pedidos",
      href: "/pedidos",
      requiresAuth: true,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      requiresAuth: true,
      requiresStaff: true,
    },
  ];

  // Itens de navegação do admin (menu dropdown)
  const getAdminNavItems = () => [
    {
      label: "Dashboard",
      href: "/dashboard",
      requiresAuth: true,
      requiresAdmin: true,
    },
    {
      label: "Mesas",
      href: "/admin/mesas",
      requiresAuth: true,
      requiresStaff: true,
    },
    {
      label: "Produtos",
      href: "/admin/produtos",
      requiresAuth: true,
      requiresAdmin: true,
    },
    {
      label: "Categorias",
      href: "/admin/categorias",
      requiresAuth: true,
      requiresAdmin: true,
    },
    {
      label: "Entregadores",
      href: "/admin/delivery-persons",
      requiresAuth: true,
      requiresAdmin: true,
    },
    {
      label: "Usuários",
      href: "/admin/users",
      requiresAuth: true,
      requiresAdmin: true,
    },
  ];

  const accessibleNavItems = getNavItems().filter((item) => {
    if (item.requiresAuth && !isAuthenticated) return false;
    if (item.requiresStaff && !isStaff()) return false;
    if (item.requiresCliente && !isCliente()) return false;
    return true;
  });

  const accessibleAdminNavItems = getAdminNavItems().filter((item) => {
    if (item.requiresAuth && !isAuthenticated) return false;
    if (item.requiresStaff && !isStaff()) return false;
    if (item.requiresAdmin && !isAdmin()) return false;
    return true;
  });

  return (
    <Box
      as="header"
      bg="gray.800"
      bgGradient="linear(to-br, gray.800, black)"
      color="white"
      px={4}
      boxShadow="lg"
      borderBottomWidth="1px"
      borderColor="gray.700"
      position="sticky"
      top={0}
      zIndex="sticky"
    >
      <Flex h={16} alignItems="center">
        <HStack gap={8} alignItems="center">
          <IconButton
            size="md"
            aria-label="Abrir Menu"
            display={{ md: "none" }}
            onClick={open ? onClose : onOpen}
            variant="ghost"
            _hover={{ bg: "whiteAlpha.200" }}
          >
            {open ? <FaTimes color="white" /> : <FaBars color="white" />}
          </IconButton>
          <Link href="/" passHref>
            <Heading size="md" fontFamily="heading" color="whiteAlpha.900">
              Pizza Express
            </Heading>
          </Link>
          <HStack as="nav" gap={4} display={{ base: "none", md: "flex" }}>
            {accessibleNavItems.map((navItem) => (
              <NavItem
                key={navItem.label}
                href={navItem.href}
                label={navItem.label}
              />
            ))}
          </HStack>
        </HStack>

        <Spacer />

        <Flex alignItems="center" gap={4}>
          {isCliente() && <CartWidget />}

          {isAuthenticated ? (
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button variant="ghost" _hover={{ bg: "whiteAlpha.200" }} p={2}>
                  <HStack gap={2}>
                    <Avatar.Root size="sm">
                      <Avatar.Image
                        src={user?.avatar || undefined}
                        alt={user?.nome || ""}
                      />
                      <Avatar.Fallback>
                        {user?.nome?.charAt(0) || "U"}
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <Text
                      display={{ base: "none", md: "block" }}
                      color="whiteAlpha.800"
                      fontSize="sm"
                    >
                      {user?.nome}
                    </Text>
                    <FaChevronDown size={12} />
                  </HStack>
                </Button>
              </Menu.Trigger>
              <Menu.Positioner>
                <Menu.Content bg="gray.800" borderColor="gray.700" minW="200px">
                  <Menu.Item
                    value="profile"
                    onClick={() => router.push("/profile")}
                    _hover={{ bg: "gray.700", cursor: "pointer" }}
                  >
                    <HStack gap={2}>
                      <FaUser />
                      <Text>Meu Perfil</Text>
                    </HStack>
                  </Menu.Item>

                  {/* Menu Admin */}
                  {isAdmin() && (
                    <>
                      <Menu.Separator />
                      <AdminMenuItems items={accessibleAdminNavItems} />
                    </>
                  )}

                  <Menu.Separator />
                  <Menu.Item value="logout" onClick={logout} _hover={{ bg: "gray.700", cursor: "pointer" }}>
                    <HStack gap={2} color="red.400">
                      <FaSignOutAlt />
                      <Text>Sair</Text>
                    </HStack>
                  </Menu.Item>
                  <Menu.Arrow />
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>
          ) : (
            <Link href="/login" passHref>
              <PizzaButton as="a" colorScheme="orange" size="sm">
                Entrar
              </PizzaButton>
            </Link>
          )}
        </Flex>
      </Flex>

      {open ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" gap={4}>
            {accessibleNavItems.map((navItem) => (
              <MobileNavItem
                key={navItem.label}
                href={navItem.href}
                label={navItem.label}
                onClick={onClose}
              />
            ))}
            {isAuthenticated && (
              <>
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  color="white"
                  _hover={{ bg: "gray.700", cursor: "pointer" }}
                  onClick={() => {
                    router.push("/profile");
                    onClose();
                  }}
                >
                  Meu Perfil
                </Button>

                {/* Menu Admin Mobile */}
                {isAdmin() && (
                  <>
                    <Text fontSize="sm" color="gray.400" px={4} py={2}>
                      Administração
                    </Text>
                    {accessibleAdminNavItems.map((item) => (
                      <Button
                        key={item.href}
                        variant="ghost"
                        justifyContent="flex-start"
                        color="white"
                        onClick={() => {
                          router.push(item.href);
                          onClose();
                        }}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </>
                )}

                <PizzaButton
                  variant="outline"
                  colorScheme="red"
                  justifyContent="flex-start"
                  icon={FaSignOutAlt}
                  _hover={{ bg: "gray.700", cursor: "pointer" }}
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                >
                  Sair
                </PizzaButton>
              </>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

```


---

## 📄 `src/components/layout/MainLayout.tsx`

```typescript
"use client";

import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Header } from "./Header";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box bg="gray.900" color="white">
      <Header />
      <Box as="main" minH="calc(100vh - 64px)" p={{ base: 4, md: 8 }}>
        {children}
      </Box>
      {/* <Footer /> */}
    </Box>
  );
}

```


---

## 📄 `src/components/layout/MobileNavItem.tsx`

```typescript
"use client";

import { Button } from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";

interface MobileNavItemProps {
  href: string;
  label: string;
  onClick?: () => void;
}

export default function MobileNavItem({
  href,
  label,
  onClick,
}: MobileNavItemProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === href;

  const handleClick = () => {
    router.push(href);
    onClick?.();
  };

  return (
    <Button
      // ALTERADO: Lógica de estilo para o estado ativo
      variant="ghost"
      bg={isActive ? "brand.accent" : "transparent"}
      color={isActive ? "textPrimary" : "gray.700"}
      size="md"
      onClick={handleClick}
      justifyContent="flex-start"
      w="100%"
    >
      {label}
    </Button>
  );
}

```


---

## 📄 `src/components/layout/NavItem.tsx`

```typescript
"use client";

import { Button } from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  label: string;
}

export default function NavItem({ href, label }: NavItemProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Button
      variant="ghost"
      bg={isActive ? "brand.accent" : "transparent"}
      color={isActive ? "textPrimary" : "whiteAlpha.800"}
      fontWeight={isActive ? "bold" : "normal"}
      size="sm"
      onClick={() => router.push(href)}
      _hover={{
        bg: isActive ? "" : "whiteAlpha.200", // Não aplica hover de fundo se já estiver ativo
        color: "white",
      }}
    >
      {label}
    </Button>
  );
}

```


---

## 📄 `src/components/ProtectedRoute.tsx`

```typescript
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { usePermissions } from "@/hooks/usePermissions";
import { Role } from "@/types/users";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: Role | Role[];
  fallbackPath?: string;
  showAccessDenied?: boolean;
}

/**
 * Componente para proteger rotas baseado em roles
 * Redireciona usuários não autorizados ou mostra mensagem de acesso negado
 */
export const ProtectedRoute = ({
  children,
  requiredRoles,
  fallbackPath = "/access-denied",
  showAccessDenied = true,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { hasRole } = usePermissions();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (requiredRoles && !hasRole(requiredRoles)) {
      if (showAccessDenied) {
        router.push(fallbackPath);
      } else {
        router.push("/dashboard");
      }
      return;
    }
  }, [
    isAuthenticated,
    isLoading,
    hasRole,
    requiredRoles,
    router,
    fallbackPath,
    showAccessDenied,
  ]);

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="background.primary"
      >
        <VStack gap={4}>
          <Spinner size="xl" color="brand.primary" />
          <Text color="text.secondary">Verificando permissões...</Text>
        </VStack>
      </Box>
    );
  }

  // Se não está autenticado, não renderiza nada (redirecionamento em andamento)
  if (!isAuthenticated) {
    return null;
  }

  // Se tem roles requeridas e não tem permissão, não renderiza nada
  if (requiredRoles && !hasRole(requiredRoles)) {
    return null;
  }

  // Tudo ok, renderiza o conteúdo
  return <>{children}</>;
};

/**
 * Componente específico para rotas de admin
 */
export const AdminRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRoles={Role.ADMIN}>{children}</ProtectedRoute>
);

/**
 * Componente específico para rotas de staff (funcionário ou admin)
 */
export const StaffRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRoles={[Role.FUNCIONARIO, Role.ADMIN]}>
    {children}
  </ProtectedRoute>
);

/**
 * Componente específico para rotas de cliente
 */
export const ClientRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRoles={Role.CLIENTE}>{children}</ProtectedRoute>
);

```


---

## 📄 `src/components/ui/AppModal.tsx`

```typescript
"use client";

import { Box, Button, Dialog, Portal } from "@chakra-ui/react";
import { X } from "lucide-react";
import { ReactNode } from "react";

// A interface de props agora tem um nome genérico
interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

/**
 * Componente de Modal genérico para toda a aplicação.
 */
export const AppModal = ({
  isOpen,
  onClose,
  title,
  children,
}: AppModalProps) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details) => !details.open && onClose()}
    >
      <Portal>
        <Box
          as={Dialog.Backdrop}
          bg="blackAlpha.600"
          backdropFilter="blur(2px)"
        />
        <Dialog.Positioner>
          <Dialog.Content
            bg="white"
            _dark={{ bg: "gray.800" }}
            borderRadius="xl"
            boxShadow="xl"
            maxW={{ base: "90vw", md: "80vw", lg: "6xl" }}
            w="full"
            maxH="90vh"
            overflowY="auto"
            p={0}
          >
            <Dialog.Header
              borderBottomWidth="1px"
              borderColor="gray.200"
              _dark={{ borderColor: "gray.600" }}
              p={4}
            >
              <Dialog.Title color="gray.800" _dark={{ color: "white" }}>
                {title}
              </Dialog.Title>
              <Dialog.CloseTrigger
                position="absolute"
                top="12px"
                right="12px"
                asChild
              >
                <Button
                  as="button"
                  variant="ghost"
                  size="sm"
                  aria-label="Close"
                >
                  <X size={20} color="currentColor" />
                </Button>
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body p={6}>{children}</Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

```


---

## 📄 `src/components/ui/index.ts`

```typescript
/**
 * Barrel export para componentes UI customizados do Pizza Express
 * Facilita importações e mantém organização
 */

export { PizzaButton } from "./PizzaButton";
export { PizzaCard } from "./PizzaCard";
export { PizzaBadge } from "./PizzaBadge";
export { PizzaText } from "./PizzaText";
export { PizzaInput } from "./PizzaInput";
export { PizzaTextarea } from "./PizzaTextarea";
export { PizzaLoading } from "./PizzaLoading";
export { PizzaSpinner } from "./PizzaSpinner";
export { PizzaFileInput } from "./PizzaFileInput";
export { PizzaSelect } from "./PizzaSelect";
export { PizzaCheckbox } from "./PizzaCheckbox";
export { AppModal } from "./AppModal";
export { PizzaFormPresentation } from "./PizzaFormPresentation";
export { toaster } from "./toaster";

```


---

## 📄 `src/components/ui/PizzaBadge.tsx`

```typescript
"use client";

import { Badge as ChakraBadge, BadgeProps } from "@chakra-ui/react";

interface PizzaBadgeProps extends Omit<BadgeProps, "colorScheme" | "variant"> {
  variant?:
    | "preparing"
    | "delivered"
    | "cancelled"
    | "success"
    | "warning"
    | "info"
    | "default";
}

/**
 * Componente Badge customizado com cores semânticas do Pizza Express
 */
export function PizzaBadge({
  variant = "default",
  children,
  ...props
}: PizzaBadgeProps) {
  const getBadgeStyles = () => {
    const baseStyles = {
      px: 3,
      py: 1,
      borderRadius: "full",
      fontSize: "sm",
      fontWeight: "600",
      border: "1px solid",
    };

    switch (variant) {
      case "preparing":
        return {
          ...baseStyles,
          bg: "yellow.100",
          color: "yellow.800",
          borderColor: "yellow.300",
        };
      case "delivered":
      case "success":
        return {
          ...baseStyles,
          bg: "green.100",
          color: "green.800",
          borderColor: "green.300",
        };
      case "cancelled":
        return {
          ...baseStyles,
          bg: "red.100",
          color: "red.800",
          borderColor: "red.300",
        };
      case "warning":
        return {
          ...baseStyles,
          bg: "yellow.100",
          color: "yellow.800",
          borderColor: "yellow.300",
        };
      case "info":
        return {
          ...baseStyles,
          bg: "blue.100",
          color: "blue.800",
          borderColor: "blue.300",
        };
      default:
        return {
          ...baseStyles,
          bg: "gray.100",
          color: "gray.800",
          borderColor: "gray.300",
        };
    }
  };

  return (
    <ChakraBadge {...getBadgeStyles()} {...props}>
      {children}
    </ChakraBadge>
  );
}

```


---

## 📄 `src/components/ui/PizzaButton.tsx`

```typescript
// src/components/ui/PizzaButton.tsx

"use client";

import { Button, ButtonProps, Flex, Icon } from "@chakra-ui/react";
import { ElementType } from "react";

interface PizzaButtonProps extends ButtonProps {
  icon?: ElementType;
}

export const PizzaButton = ({
  icon,
  children,
  // ALTERADO: O valor padrão agora é "solid", que é um tipo válido para o Button do Chakra
  variant = "solid",
  size = "md",
  ...props
}: PizzaButtonProps) => {
  return (
    <Button variant={variant} size={size} {...props}>
      <Flex align="center" gap="2">
        {icon && <Icon as={icon} />}
        {children}
      </Flex>
    </Button>
  );
};

```


---

## 📄 `src/components/ui/PizzaCard.tsx`

```typescript
"use client";

import { Box, BoxProps } from "@chakra-ui/react";

interface PizzaCardProps extends Omit<BoxProps, "variant"> {
  variant?: "default" | "pizza" | "success" | "warning" | "danger" | "accent";
}

/**
 * Componente Card customizado com paleta de cores do Pizza Express
 */
export function PizzaCard({
  variant = "default",
  children,
  ...props
}: PizzaCardProps) {
  const getCardStyles = () => {
    const baseStyles = {
      bg: "white",
      borderRadius: "lg",
      boxShadow: "md",
      border: "1px solid",
      transition: "all 0.3s ease",
      overflow: "hidden",
      p: 8, // Padding interno consistente
      _hover: {
        boxShadow: "lg",
        transform: "translateY(-2px)",
      },
    };

    switch (variant) {
      case "pizza":
        return {
          ...baseStyles,
          borderColor: "orange.600",
          _hover: {
            ...baseStyles._hover,
            borderColor: "orange.500",
          },
        };
      case "success":
        return {
          ...baseStyles,
          borderColor: "green.600",
          bg: "#F0FDF4",
          _hover: {
            ...baseStyles._hover,
            borderColor: "green.500",
          },
        };
      case "warning":
        return {
          ...baseStyles,
          borderColor: "yellow.500",
          bg: "yellow.50",
          _hover: {
            ...baseStyles._hover,
            borderColor: "yellow.400",
          },
        };
      case "danger":
        return {
          ...baseStyles,
          borderColor: "red.600",
          bg: "#FEF2F2",
          _hover: {
            ...baseStyles._hover,
            borderColor: "red.500",
          },
        };
      case "accent":
        return {
          ...baseStyles,
          borderColor: "blue.700",
          _hover: {
            ...baseStyles._hover,
            borderColor: "blue.600",
          },
        };
      default:
        return {
          ...baseStyles,
          borderColor: "gray.200",
        };
    }
  };

  return (
    <Box {...getCardStyles()} {...props}>
      {children}
    </Box>
  );
}

```


---

## 📄 `src/components/ui/PizzaCheckbox.tsx`

```typescript
"use client";

import { Box } from "@chakra-ui/react";
import { forwardRef } from "react";
import { PizzaText } from "./PizzaText";

interface PizzaCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

export const PizzaCheckbox = forwardRef<HTMLInputElement, PizzaCheckboxProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <Box w="full">
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#A0AEC0",
            cursor: "pointer",
          }}
        >
          <input
            ref={ref}
            type="checkbox"
            style={{
              accentColor: "#D92B2B",
              width: "16px",
              height: "16px",
              cursor: "pointer",
            }}
            {...props}
          />
          {label && (
            <PizzaText color="gray.300" fontSize="sm">
              {label}
            </PizzaText>
          )}
        </label>

        {error && (
          <PizzaText color="red.500" fontSize="sm" mt={1}>
            {error}
          </PizzaText>
        )}
      </Box>
    );
  }
);

PizzaCheckbox.displayName = "PizzaCheckbox";

```


---

## 📄 `src/components/ui/PizzaFileInput.tsx`

```typescript
"use client";

import { Box, Input, VStack, HStack, Button } from "@chakra-ui/react";
import { useRef, ChangeEvent } from "react";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import { PizzaText } from "./PizzaText";

import Image from "next/image";

interface PizzaFileInputProps {
  label?: string;
  error?: string;
  required?: boolean;
  accept?: string;
  onChange: (file: File | null) => void;
  preview?: string | null;
  onPreviewClick?: () => void;
  onRemove?: () => void;
  placeholder?: string;
}

/**
 * Componente de upload de arquivo customizado para o Pizza Express
 * Segue o padrão visual do projeto e inclui preview de imagem
 */
export function PizzaFileInput({
  label,
  error,
  required,
  accept = "image/jpeg,image/jpg,image/png,image/webp",
  onChange,
  preview,
  onPreviewClick,
  onRemove,
  placeholder = "Clique para selecionar ou arraste uma imagem",
}: PizzaFileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onChange(file || null);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onChange(null);
    onRemove?.();
  };

  return (
    <Box w="full">
      {label && (
        <PizzaText color="gray.800" mb={2} fontSize="sm" fontWeight="medium">
          {label}
          {required && (
            <PizzaText as="span" color="red.500" ml={1}>
              *
            </PizzaText>
          )}
        </PizzaText>
      )}

      <Input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        display="none"
      />

      {!preview ? (
        <Box
          border="2px dashed"
          borderColor={error ? "red.300" : "gray.300"}
          borderRadius="lg"
          p={8}
          textAlign="center"
          cursor="pointer"
          transition="all 0.2s ease-in-out"
          _hover={{
            borderColor: error ? "red.400" : "brand.primary",
            bg: "gray.50",
          }}
          onClick={handleClick}
          bg="white"
        >
          <VStack gap={4}>
            <Box
              w={12}
              h={12}
              borderRadius="full"
              bg="gray.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="gray.500"
            >
              <FaCloudUploadAlt size={24} />
            </Box>

            <VStack gap={1}>
              <PizzaText
                fontSize="md"
                fontWeight="medium"
                color="brand.primary"
              >
                {placeholder}
              </PizzaText>
              <PizzaText fontSize="sm" color="gray.500">
                Formatos aceitos: JPG, PNG, WEBP
              </PizzaText>
              <PizzaText fontSize="sm" color="gray.500">
                Tamanho máximo: 5MB
              </PizzaText>
            </VStack>
          </VStack>
        </Box>
      ) : (
        <Box
          border="2px solid"
          borderColor="gray.200"
          borderRadius="lg"
          p={4}
          bg="white"
        >
          <VStack gap={4}>
            <PizzaText fontSize="sm" fontWeight="medium" color="gray.700">
              Preview da imagem:
            </PizzaText>

            <Box
              position="relative"
              w="full"
              maxW="200px"
              h="150px"
              borderRadius="md"
              overflow="hidden"
              cursor="pointer"
              border="1px solid"
              borderColor="gray.200"
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.2s"
              onClick={onPreviewClick}
            >
              <Image
                src={preview}
                alt="Preview da pizza"
                fill
                sizes="200px"
                className="object-cover"
              />
            </Box>

            <HStack gap={3}>
              <Button
                colorPalette="orange"
                variant="solid"
                onClick={handleClick}
              >
                Alterar
              </Button>

              <Button
                colorPalette="red"
                variant="solid"
                size="sm"
                onClick={handleRemove}
              >
                <HStack gap={1}>
                  <FaTrash size={12} />
                  <span>Remover</span>
                </HStack>
              </Button>
            </HStack>
          </VStack>
        </Box>
      )}

      {error && (
        <PizzaText color="red.500" fontSize="sm" mt={2}>
          {error}
        </PizzaText>
      )}
    </Box>
  );
}

```


---

## 📄 `src/components/ui/PizzaFormPresentation.tsx`

```typescript
"use client";

import { VStack, HStack, Box, Button } from "@chakra-ui/react";
import { PizzaInput, PizzaTextarea, PizzaFileInput, PizzaText } from ".";

interface PizzaFormPresentationProps {
  formData: { nome: string; descricao: string; preco: string };
  errors: { [key: string]: string | undefined };
  imagePreview: string | null;
  isLoading: boolean;
  apiError: string | null;
  isImageModalOpen: boolean;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onImageChange: (file: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  onImageModalOpen: () => void;
  onImageModalClose: () => void;
  onImageRemove: () => void;
  onCancel: () => void;
}

export const PizzaFormPresentation = ({
  formData,
  errors,
  imagePreview,
  isLoading,
  apiError,
  onInputChange,
  onImageChange,
  onSubmit,
  onImageModalOpen,
  onImageRemove,
  onCancel,
}: PizzaFormPresentationProps) => (
  <Box as="form" onSubmit={onSubmit} w="full">
    <VStack align="stretch">
      <PizzaFileInput
        label="Imagem da Pizza *"
        error={errors.imagem}
        onChange={onImageChange}
        preview={imagePreview}
        onPreviewClick={onImageModalOpen}
        onRemove={onImageRemove}
      />
      <PizzaInput
        label="Nome da Pizza"
        name="nome"
        value={formData.nome}
        onChange={onInputChange}
        error={errors.nome}
        placeholder="Ex: Pizza Margherita"
      />
      <PizzaTextarea
        label="Descrição"
        name="descricao"
        value={formData.descricao}
        onChange={onInputChange}
        error={errors.descricao}
        placeholder="Descreva os ingredientes..."
        rows={4}
      />
      <PizzaInput
        label="Preço (R$)"
        name="preco"
        value={formData.preco}
        onChange={onInputChange}
        error={errors.preco}
        placeholder="Ex: 49,90"
      />
      {apiError && (
        <PizzaText variant="danger" fontSize="sm">
          {apiError}
        </PizzaText>
      )}
      <HStack w="full" justify="space-between" mt={4}>
        <Button
          colorPalette="orange"
          variant="solid"
          loading={isLoading}
          disabled={isLoading}
          type="submit"
          flex={1}
        >
          Salvar Pizza
        </Button>
        <Button colorPalette="red" variant="solid" onClick={onCancel} flex={1}>
          Cancelar
        </Button>
      </HStack>
    </VStack>
  </Box>
);

```


---

## 📄 `src/components/ui/PizzaInput.tsx`

```typescript
"use client";

import { Input, InputProps, Box } from "@chakra-ui/react";
import { forwardRef } from "react";
import { PizzaText } from "./PizzaText";

interface PizzaInputProps extends Omit<InputProps, "size"> {
  label?: string;
  error?: string;
  required?: boolean;
  size?: "sm" | "md" | "lg";
}

export const PizzaInput = forwardRef<HTMLInputElement, PizzaInputProps>(
  ({ label, error, required, size = "md", ...props }, ref) => {
    const sizeStyles = {
      sm: {
        fontSize: "sm",
        px: 3,
        py: 2,
        h: "36px",
      },
      md: {
        fontSize: "md",
        px: 4,
        py: 3,
        h: "44px",
      },
      lg: {
        fontSize: "lg",
        px: 5,
        py: 4,
        h: "52px",
      },
    };

    const currentSize = sizeStyles[size];

    return (
      <Box w="full">
        {label && (
          <PizzaText
            color="gray.300"
            mb={2}
            fontSize="sm"
            fontWeight="medium"
          >
            {label}
            {required && (
              <PizzaText as="span" color="red.500" ml={1}>
                *
              </PizzaText>
            )}
          </PizzaText>
        )}

        <Input
          ref={ref}
          bg="gray.700"
          color="white"
          border="1px solid"
          borderColor="gray.600"
          borderRadius="md"
          caretColor="white"
          css={{
            "&::selection": {
              backgroundColor: "rgba(33, 150, 243, 0.3)",
              color: "inherit",
            },
          }}
          _placeholder={{
            color: "gray.400",
          }}
          _hover={{
            borderColor: "gray.500",
          }}
          _focus={{
            borderColor: "brand.primary",
            boxShadow: "0 0 0 1px #D92B2B",
            bg: "gray.700",
            caretColor: "white",
          }}
          _disabled={{
            opacity: 0.6,
            cursor: "not-allowed",
            bg: "gray.800",
          }}
          transition="all 0.2s ease-in-out"
          {...currentSize}
          {...props}
        />

        {error && (
          <PizzaText color="red.500" fontSize="sm" mt={1}>
            {error}
          </PizzaText>
        )}
      </Box>
    );
  }
);

PizzaInput.displayName = "PizzaInput";

```


---

## 📄 `src/components/ui/PizzaLoading.tsx`

```typescript
"use client";

import { Box, VStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { PizzaText } from "./PizzaText";
import { useState, useEffect } from "react";

// 6 tipos diferentes de animações para a pizza
const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`;

const bounceAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-15px); }
  50% { transform: translateY(0); }
  75% { transform: translateY(-8px); }
`;

const swingAnimation = keyframes`
  0%, 100% { transform: rotate(-15deg); }
  50% { transform: rotate(15deg); }
`;

const flipAnimation = keyframes`
  0% { transform: rotateY(0deg); }
  50% { transform: rotateY(180deg); }
  100% { transform: rotateY(360deg); }
`;

const wobbleAnimation = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(-5deg) scale(1.05); }
  50% { transform: rotate(5deg) scale(0.95); }
  75% { transform: rotate(-3deg) scale(1.02); }
  100% { transform: rotate(0deg) scale(1); }
`;

// Array com todas as animações disponíveis
const animations = [
  { keyframe: rotateAnimation, name: "rotate", duration: "2s" },
  { keyframe: pulseAnimation, name: "pulse", duration: "1.5s" },
  { keyframe: bounceAnimation, name: "bounce", duration: "2.5s" },
  { keyframe: swingAnimation, name: "swing", duration: "2s" },
  { keyframe: flipAnimation, name: "flip", duration: "3s" },
  { keyframe: wobbleAnimation, name: "wobble", duration: "2.8s" },
];

interface PizzaLoadingProps {
  message?: string;
  isVisible?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  fullscreen?: boolean;
  showMessage?: boolean;
}

const sizeMap = {
  sm: 24, // Ícone pequeno para botões
  md: 32, // Ícone médio para cards
  lg: 48, // Ícone grande para seções
  xl: 80, // Extra grande para tela cheia
};

export const PizzaLoading = ({
  message = "Carregando...",
  isVisible = true,
  size = "xl",
  fullscreen = true,
  showMessage = true,
}: PizzaLoadingProps) => {
  // Estado para a animação atual
  const [currentAnimation, setCurrentAnimation] = useState(animations[0]);

  // Escolhe uma animação aleatória quando o componente é montado
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * animations.length);
    setCurrentAnimation(animations[randomIndex]);
  }, []);

  if (!isVisible) return null;

  const iconSize = sizeMap[size];

  // Componente do ícone de pizza com animação aleatória
  const PizzaIcon = (
    <Box
      width={`${iconSize}px`}
      height={`${iconSize}px`}
      backgroundImage="url('/pizza.png')"
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      css={{
        animation: `${currentAnimation.keyframe} ${currentAnimation.duration} linear infinite`,
      }}
    />
  );

  // Se não for fullscreen, retorna apenas o ícone (para uso inline)
  if (!fullscreen) {
    return (
      <Box display="inline-flex" alignItems="center" justifyContent="center">
        {PizzaIcon}
      </Box>
    );
  }

  // Versão fullscreen (original)
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0, 0, 0, 0.8)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={9999}
      backdropFilter="blur(4px)"
    >
      <VStack gap={6}>
        {PizzaIcon}

        {showMessage && (
          <PizzaText
            variant="heading"
            color="white"
            fontSize="xl"
            textAlign="center"
          >
            {message}
          </PizzaText>
        )}
      </VStack>
    </Box>
  );
};

```


---

## 📄 `src/components/ui/PizzaSelect.tsx`

```typescript
"use client";

import { Box } from "@chakra-ui/react";
import { forwardRef } from "react";
import { PizzaText } from "./PizzaText";

interface PizzaSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const PizzaSelect = forwardRef<HTMLSelectElement, PizzaSelectProps>(
  ({ label, error, required, children, ...props }, ref) => {
    return (
      <Box w="full">
        {label && (
          <PizzaText color="gray.300" mb={2} fontSize="sm" fontWeight="medium">
            {label}
            {required && (
              <PizzaText as="span" color="red.500" ml={1}>
                *
              </PizzaText>
            )}
          </PizzaText>
        )}

        <select
          ref={ref}
          style={{
            backgroundColor: "#2D3748",
            borderColor: "#4A5568",
            color: "white",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #4A5568",
            width: "100%",
            fontSize: "14px",
            fontFamily: "inherit",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#718096";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#4A5568";
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#D92B2B";
            e.currentTarget.style.boxShadow = "0 0 0 1px #D92B2B";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#4A5568";
            e.currentTarget.style.boxShadow = "none";
          }}
          {...props}
        >
          {children}
        </select>

        {error && (
          <PizzaText color="red.500" fontSize="sm" mt={1}>
            {error}
          </PizzaText>
        )}
      </Box>
    );
  }
);

PizzaSelect.displayName = "PizzaSelect";

```


---

## 📄 `src/components/ui/PizzaSpinner.tsx`

```typescript
"use client";

import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useState, useEffect } from "react";

// 6 tipos diferentes de animações para a pizza
const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`;

const bounceAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-15px); }
  50% { transform: translateY(0); }
  75% { transform: translateY(-8px); }
`;

const swingAnimation = keyframes`
  0%, 100% { transform: rotate(-15deg); }
  50% { transform: rotate(15deg); }
`;

const flipAnimation = keyframes`
  0% { transform: rotateY(0deg); }
  50% { transform: rotateY(180deg); }
  100% { transform: rotateY(360deg); }
`;

const wobbleAnimation = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(-5deg) scale(1.05); }
  50% { transform: rotate(5deg) scale(0.95); }
  75% { transform: rotate(-3deg) scale(1.02); }
  100% { transform: rotate(0deg) scale(1); }
`;

// Array com todas as animações disponíveis
const animations = [
  { keyframe: rotateAnimation, name: "rotate", duration: "2s" },
  { keyframe: pulseAnimation, name: "pulse", duration: "1.5s" },
  { keyframe: bounceAnimation, name: "bounce", duration: "2.5s" },
  { keyframe: swingAnimation, name: "swing", duration: "2s" },
  { keyframe: flipAnimation, name: "flip", duration: "3s" },
  { keyframe: wobbleAnimation, name: "wobble", duration: "2.8s" },
];

interface PizzaSpinnerProps {
  size?: number;
}

export const PizzaSpinner = ({ size = 24 }: PizzaSpinnerProps) => {
  // Estado para a animação atual
  const [currentAnimation, setCurrentAnimation] = useState(animations[0]);

  // Escolhe uma animação aleatória quando o componente é montado
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * animations.length);
    setCurrentAnimation(animations[randomIndex]);
  }, []);

  return (
    <Box
      width={`${size}px`}
      height={`${size}px`}
      backgroundImage="url('/pizza.png')"
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      css={{
        animation: `${currentAnimation.keyframe} ${currentAnimation.duration} linear infinite`,
      }}
    />
  );
};

```


---

## 📄 `src/components/ui/PizzaTextarea.tsx`

```typescript
"use client";

import { Textarea, TextareaProps, Box } from "@chakra-ui/react";
import { forwardRef } from "react";
import { PizzaText } from "./PizzaText";

interface PizzaTextareaProps extends Omit<TextareaProps, "size"> {
  label?: string;
  error?: string;
  required?: boolean;
  size?: "sm" | "md" | "lg";
}

export const PizzaTextarea = forwardRef<
  HTMLTextAreaElement,
  PizzaTextareaProps
>(({ label, error, required, size = "md", ...props }, ref) => {
  const sizeStyles = {
    sm: {
      fontSize: "sm",
      px: 3,
      py: 2,
      minH: "80px",
    },
    md: {
      fontSize: "md",
      px: 4,
      py: 3,
      minH: "100px",
    },
    lg: {
      fontSize: "lg",
      px: 5,
      py: 4,
      minH: "120px",
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <Box w="full">
      {label && (
        <PizzaText color="gray.800" mb={2} fontSize="sm" fontWeight="medium">
          {label}
          {required && (
            <PizzaText as="span" color="red.500" ml={1}>
              *
            </PizzaText>
          )}
        </PizzaText>
      )}

      <Textarea
        ref={ref}
        bg="white"
        color="gray.800"
        border="2px solid"
        borderColor={error ? "red.300" : "gray.300"}
        borderRadius="md"
        caretColor="gray.800"
        css={{
          "&::selection": {
            backgroundColor: "#007bff",
            color: "#ffffff",
          },
        }}
        resize="vertical"
        _placeholder={{
          color: "gray.500",
          fontSize: currentSize.fontSize,
        }}
        _hover={{
          borderColor: error ? "red.400" : "brand.secondary",
        }}
        _focus={{
          borderColor: error ? "red.500" : "brand.primary",
          boxShadow: `0 0 0 1px ${error ? "red.500" : "brand.primary"}`,
          bg: "white",
          caretColor: "gray.800",
        }}
        _disabled={{
          opacity: 0.6,
          cursor: "not-allowed",
          bg: "gray.50",
        }}
        transition="all 0.2s ease-in-out"
        {...currentSize}
        {...props}
      />

      {error && (
        <PizzaText color="red.500" fontSize="sm" mt={1}>
          {error}
        </PizzaText>
      )}
    </Box>
  );
});

PizzaTextarea.displayName = "PizzaTextarea";

```


---

## 📄 `src/components/ui/PizzaText.tsx`

```typescript
"use client";

import { Text as ChakraText, TextProps } from "@chakra-ui/react";

interface PizzaTextProps extends Omit<TextProps, "variant"> {
  variant?:
    | "heading"
    | "subheading"
    | "body"
    | "caption"
    | "muted"
    | "accent"
    | "pizza"
    | "success"
    | "warning"
    | "danger";
}

/**
 * Componente Text customizado com variações semânticas
 */
export function PizzaText({
  variant = "body",
  children,
  ...props
}: PizzaTextProps) {
  const getTextStyles = () => {
    const baseStyles = {
      lineHeight: "1.5",
    };

    switch (variant) {
      case "heading":
        return {
          ...baseStyles,
          fontWeight: "bold",
          color: "gray.800",
        };
      case "subheading":
        return {
          ...baseStyles,
          fontWeight: "600",
          color: "gray.700",
        };
      case "body":
        return {
          ...baseStyles,
          fontWeight: "400",
          color: "gray.800",
        };
      case "caption":
        return {
          ...baseStyles,
          fontWeight: "400",
          color: "gray.600",
          fontSize: "sm",
        };
      case "muted":
        return {
          ...baseStyles,
          fontWeight: "400",
          color: "gray.500",
          fontSize: "sm",
        };
      case "accent":
        return {
          ...baseStyles,
          fontWeight: "600",
          color: "blue.700",
        };
      case "pizza":
        return {
          ...baseStyles,
          fontWeight: "600",
          color: "orange.600",
        };
      case "success":
        return {
          ...baseStyles,
          fontWeight: "600",
          color: "green.600",
        };
      case "warning":
        return {
          ...baseStyles,
          fontWeight: "600",
          color: "yellow.600",
        };
      case "danger":
        return {
          ...baseStyles,
          fontWeight: "600",
          color: "red.600",
        };
      default:
        return baseStyles;
    }
  };

  return (
    <ChakraText {...getTextStyles()} {...props}>
      {children}
    </ChakraText>
  );
}

```


---

## 📄 `src/components/ui/toaster.tsx`

```typescript
"use client"

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react"

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
})

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root width={{ md: "sm" }}>
            {toast.type === "loading" ? (
              <Spinner size="sm" color="blue.solid" />
            ) : (
              <Toast.Indicator />
            )}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description>{toast.description}</Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {toast.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}

```


---

## 📄 `src/constants/cardapio.ts`

```typescript
/**
 * Constantes específicas para o módulo do cardápio
 */

export const CARDAPIO_CONSTANTS = {
  MESSAGES: {
    EMPTY_MENU: "Nenhuma pizza encontrada no cardápio.",
    LOADING: "Carregando cardápio...",
    ERROR_LOADING: "Erro ao carregar pizzas. Tente novamente.",
  },
  LAYOUT: {
    BACKGROUND_COLOR: "yellow.200",
    MIN_HEIGHT: "100vh",
    PADDING: 8,
    MAX_WIDTH: "1200px",
    GAP: 8,
  },
  GRID: {
    COLUMNS: { base: 1, md: 2, lg: 3 },
    GAP: 6,
  },
} as const;

```


---

## 📄 `src/constants/dashboard.ts`

```typescript
/**
 * Constantes específicas para o módulo do dashboard
 */

export const DASHBOARD_CONSTANTS = {
  TITLES: {
    MAIN: "Dashboard Pizza Express",
    STATS: "Estatísticas Gerais",
    QUICK_ACTIONS: "Ações Rápidas",
    CREATE_PIZZA: "Criar Nova Pizza",
  },
  MESSAGES: {
    WELCOME: "Bem-vindo ao painel de controle",
    NO_STATS: "Nenhuma estatística disponível",
    PIZZA_CREATED: "Pizza criada com sucesso!",
  },
  LAYOUT: {
    BACKGROUND_COLOR: "yellow.200",
    MIN_HEIGHT: "100vh",
    PADDING: 8,
    MAX_WIDTH: "1200px",
    GAP: 8,
  },
  GRID: {
    STATS_COLUMNS: { base: 1, md: 2, lg: 4 },
    ACTIONS_COLUMNS: { base: 1, md: 2 },
    GAP: 6,
  },
  ANIMATIONS: {
    FADE_IN: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    },
    STAGGER_CHILDREN: {
      animate: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
  },
} as const;

```


---

## 📄 `src/constants/index.ts`

```typescript
// URLs da API
export const API_ENDPOINTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  PIZZAS: "/pizzas",
  AUTH: {
    LOGIN: "/auth/login",
    ME: "/me",
    LOGOUT: "/auth/logout",
  },
  USERS: "/users",
} as const;

// Rotas da aplicação
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  WELCOME: "/welcome",
  ACCESS_DENIED: "/access-denied",
  APP: {
    DASHBOARD: "/app",
    CARDAPIO: "/cardapio",
    PEDIDOS: "/pedidos",
    ADMIN_DASHBOARD: "/dashboard",
  },
} as const;

// Configurações de autenticação
export const AUTH_CONFIG = {
  TOKEN_KEY: "authToken",
  TOKEN_EXPIRY_DAYS: 1,
  COOKIE_OPTIONS: {
    path: "/",
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
  },
} as const;

// Configurações de UI
export const UI_CONFIG = {
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 50,
  },
  ANIMATION: {
    DURATION: 0.5,
    DELAY_STEP: 0.1,
  },
  BREAKPOINTS: {
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "xl",
  },
} as const;

// Status de pedidos
export const PEDIDO_STATUS = {
  PREPARANDO: "preparando",
  ENTREGUE: "entregue",
  CANCELADO: "cancelado",
} as const;

// Mensagens de erro padrão
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Erro de conexão. Verifique sua internet.",
  UNAUTHORIZED: "Sessão expirada. Faça login novamente.",
  FORBIDDEN: "Você não tem permissão para esta ação.",
  NOT_FOUND: "Recurso não encontrado.",
  SERVER_ERROR: "Erro interno do servidor. Tente novamente.",
  VALIDATION_ERROR: "Dados inválidos. Verifique os campos.",
} as const;

```


---

## 📄 `src/constants/validation.ts`

```typescript
/**
 * Constantes de validação
 * @version 1.0.0
 * @since 28/12/2025
 */

/**
 * Limites de tamanho de arquivo
 */
export const FILE_SIZE_LIMITS = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
} as const;

/**
 * Tipos de arquivo aceitos
 */
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

/**
 * Tipos MIME aceitos para imagens
 */
export const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

/**
 * Extensões de arquivo aceitas
 */
export const ACCEPTED_IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
] as const;

/**
 * Constantes de validação de formulários
 */
export const VALIDATION_RULES = {
  PRODUCT_NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100,
  },
  PRODUCT_DESCRIPTION: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 500,
  },
  PRODUCT_PRICE: {
    MIN: 0.01,
    MAX: 999999.99,
  },
  ORDER_OBSERVATIONS: {
    MAX_LENGTH: 500,
  },
  ORDER_ITEM_QUANTITY: {
    MIN: 1,
    MAX: 99,
  },
} as const;

/**
 * Mensagens de erro padronizadas
 */
export const ERROR_MESSAGES = {
  REQUIRED: "Campo obrigatório",
  INVALID_FORMAT: "Formato inválido",
  FILE_TOO_LARGE: "Arquivo muito grande",
  UNSUPPORTED_FILE_TYPE: "Tipo de arquivo não suportado",
  NETWORK_ERROR: "Erro de conexão",
  UNAUTHORIZED: "Não autorizado",
  NOT_FOUND: "Não encontrado",
  SERVER_ERROR: "Erro interno do servidor",
} as const;

```


---

## 📄 `src/features/auth/contexts/AuthContext.tsx`

```typescript
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { setCookie, getAuthToken, deleteCookie } from "@/utils/cookies";
import { User } from "@/types/users";
import { getMe, loginUser, getGoogleSignInUrl } from "../services/authService";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithGoogle: () => void;
  handleAuthentication: (token: string, redirect?: boolean) => Promise<boolean>;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleAuthentication = useCallback(
    async (token: string, redirect: boolean = true): Promise<boolean> => {
      setIsLoading(true);
      try {
        // No nosso utilitário, setCookie agora é mais simples
        setCookie(token);
        const userData = await getMe(token);
        setUser(userData);
        if (redirect) {
          // Redireciona baseado no role do usuário
          const redirectPath =
            userData.role === "CLIENTE" ? "/cardapio" : "/dashboard";
          router.push(redirectPath);
        }
        return true;
      } catch (error) {
        console.warn("Token inválido detectado, limpando sessão:", error);
        setUser(null);
        deleteCookie();
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    try {
      // 1. Chama o serviço de API para obter o token
      const { access_token } = await loginUser(credentials);
      // 2. Usa o token para autenticar e buscar os dados do usuário
      return await handleAuthentication(access_token, true);
    } catch (error) {
      console.error("Falha no login:", error);
      setIsLoading(false);
      // Propaga o erro para que a página de login possa exibi-lo
      throw error;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthToken();
      if (token) {
        await handleAuthentication(token, false);
      } else {
        setIsLoading(false);
      }
    };
    initAuth();
  }, [handleAuthentication]);

  const signInWithGoogle = () => {
    window.location.href = getGoogleSignInUrl();
  };

  const logout = () => {
    setUser(null);
    deleteCookie();
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signInWithGoogle,
        handleAuthentication,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

```


---

## 📄 `src/features/auth/services/authService.ts`

```typescript
// src/features/auth/services/authService.ts

import { User } from "@/types/users";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:10000";

interface LoginCredentials {
  email: string;
  password: string;
}
interface LoginResponse {
  access_token: string;
  user: User;
}

export const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    let errorMessage = "Credenciais inválidas.";
    try {
      const errorData = await response.json();
      errorMessage =
        errorData?.message || errorData?.error || "Credenciais inválidas.";
    } catch (parseError) {
      console.warn("Não foi possível parsear resposta de erro:", parseError);
      // Mantém a mensagem padrão
    }

    throw new Error(errorMessage);
  }
  return response.json();
};

export const getMe = async (token: string): Promise<User> => {
  const response = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error(
      "Falha ao buscar dados do usuário. O token pode ser inválido."
    );
  }
  return response.json();
};

// URL para iniciar o login com Google
export const getGoogleSignInUrl = (): string => {
  return `${API_URL}/auth/google`;
};

```


---

## 📄 `src/features/cart/components/CartItemCard.tsx`

```typescript
"use client";

import { Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { CartItem } from "@/types";
import { useCart } from "@/features/cart/context/CartContext";
import { formatCurrency } from "@/utils/format";
import { PizzaButton } from "@/components/ui";

interface CartItemCardProps {
  item: CartItem;
}

/**
 * @component CartItemCard
 * @description Card que exibe um único item dentro do modal do carrinho.
 */
const CartItemCard = ({ item }: CartItemCardProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrease = () => {
    updateQuantity(item.product.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    updateQuantity(item.product.id, item.quantity - 1);
  };

  return (
    <Flex
      key={item.product.id}
      alignItems="center"
      justifyContent="space-between"
      p={3}
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="md"
      w="100%"
    >
      <HStack gap={4}>
        <Image
          src={item.product.imageUrl || "/placeholder-image.png"}
          alt={`Imagem do produto ${item.product.name}`}
          boxSize="60px"
          objectFit="cover"
          borderRadius="md"
        />
        <VStack alignItems="flex-start" gap={0}>
          <Text fontWeight="bold">{item.product.name}</Text>
          <Text fontSize="sm" color="gray.500">
            {formatCurrency(parseFloat(item.product.price))}
          </Text>
        </VStack>
      </HStack>

      {/* Controlador de Quantidade Customizado */}
      <HStack gap={4}>
        <HStack>
          <PizzaButton
            size="md"
            onClick={handleDecrease}
            aria-label="Diminuir quantidade"
          >
            -
          </PizzaButton>
          <Text w="40px" textAlign="center" fontWeight="bold">
            {item.quantity}
          </Text>
          <PizzaButton
            size="md"
            onClick={handleIncrease}
            aria-label="Aumentar quantidade"
          >
            +
          </PizzaButton>
        </HStack>
        <Text fontWeight="bold" minW="70px" textAlign="right">
          {formatCurrency(parseFloat(item.product.price) * item.quantity)}
        </Text>
        <PizzaButton
          aria-label="Remover item do carrinho"
          color="red.500"
          variant="solid"
          onClick={() => removeFromCart(item.product.id)}
        />
      </HStack>
    </Flex>
  );
};

export default CartItemCard;

```


---

## 📄 `src/features/cart/components/CartModal.tsx`

```typescript
import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Separator,
  Portal,
  IconButton,
} from "@chakra-ui/react";
import { IoMdClose, IoMdTrash, IoMdAdd, IoMdRemove } from "react-icons/io";

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onCheckout,
  onUpdateQuantity,
}) => {
  if (!isOpen) return null;

  const total = (cartItems || []).reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <Portal>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.600"
        display="flex"
        justifyContent="center"
        alignItems="center"
        zIndex={1000}
        onClick={onClose}
      >
        <Box
          bg="white"
          p={8}
          borderRadius="xl"
          width="90%"
          maxWidth="500px"
          boxShadow="2xl"
          position="relative"
          onClick={(e) => e.stopPropagation()}
          _dark={{
            bg: "gray.800",
            color: "white",
          }}
        >
          {/* Header */}
          <Flex justify="space-between" align="center" mb={6}>
            <Heading size="lg" color="gray.800" _dark={{ color: "white" }}>
              Seu Carrinho
            </Heading>
            <IconButton
              aria-label="Fechar carrinho"
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <IoMdClose />
            </IconButton>
          </Flex>

          {/* Content */}
          {!cartItems || cartItems.length === 0 ? (
            <Box textAlign="center" py={8}>
              <Text color="gray.500" fontSize="lg">
                Seu carrinho está vazio.
              </Text>
            </Box>
          ) : (
            <VStack gap={4} align="stretch">
              {/* Cart Items */}
              {(cartItems || []).map((item, index) => (
                <Box key={item.id}>
                  <HStack justify="space-between" align="center" py={3}>
                    <VStack align="start" gap={2} flex={1}>
                      <Text
                        fontWeight="medium"
                        color="gray.800"
                        _dark={{ color: "white" }}
                      >
                        {item.name}
                      </Text>
                      {/* ALTERADO: Forma de passar o ícone corrigida */}
                      <HStack>
                        <IconButton
                          aria-label="Diminuir quantidade"
                          size="xs"
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <IoMdRemove />
                        </IconButton>
                        <Text
                          w="40px"
                          textAlign="center"
                          fontSize="md"
                          fontWeight="bold"
                        >
                          {item.quantity}
                        </Text>
                        <IconButton
                          aria-label="Aumentar quantidade"
                          size="xs"
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <IoMdAdd />
                        </IconButton>
                      </HStack>
                    </VStack>
                    <HStack spaceX={3}>
                      <Text
                        fontWeight="bold"
                        color="green.600"
                        _dark={{ color: "green.400" }}
                      >
                        R$ {(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </Text>
                      <IconButton
                        aria-label="Remover item"
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <IoMdTrash />
                      </IconButton>
                    </HStack>
                  </HStack>
                  {index < cartItems.length - 1 && <Separator />}
                </Box>
              ))}

              {/* Total */}
              <Box pt={4}>
                <Separator mb={4} />
                <HStack justify="space-between">
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color="gray.800"
                    _dark={{ color: "white" }}
                  >
                    Total:
                  </Text>
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color="green.600"
                    _dark={{ color: "green.400" }}
                  >
                    R$ {total.toFixed(2)}
                  </Text>
                </HStack>
              </Box>
            </VStack>
          )}

          {/* Footer */}
          <Box mt={8}>
            <ButtonGroup width="full" spaceX={3}>
              <Button
                variant="outline"
                colorScheme="gray"
                onClick={onClose}
                flex={1}
                size="lg"
              >
                Continuar Comprando
              </Button>
              <Button
                variant="solid"
                colorScheme="green"
                onClick={onCheckout}
                disabled={!cartItems || cartItems.length === 0}
                flex={1}
                size="lg"
                _disabled={{
                  opacity: 0.6,
                  cursor: "not-allowed",
                }}
              >
                Finalizar Pedido
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Box>
    </Portal>
  );
};
export default CartModal;

```


---

## 📄 `src/features/cart/components/CartWidget.tsx`

```typescript
"use client";

import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import CartModal from "./CartModal";
import { CheckoutForm } from "./CheckoutForm";
import { AppModal } from "@/components/ui";
import { FaShoppingCart } from "react-icons/fa";

const CartWidget = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { open, onOpen, onClose } = useDisclosure();
  const {
    open: isCheckoutOpen,
    onOpen: onOpenCheckout,
    onClose: onCloseCheckout,
  } = useDisclosure();

  // --- ADICIONADO PARA DEBUG ---
  console.log("[CartWidget] Estado do carrinho recebido pelo header:", cart);
  // ----------------------------

  const handleCheckout = () => {
    onClose(); // fechar modal do carrinho
    onOpenCheckout(); // abrir checkout
  };

  const modalCartItems = cart.items.map((item) => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
  }));

  return (
    <>
      <Flex
        as="button"
        alignItems="center"
        position="relative"
        onClick={onOpen}
      >
        <FaShoppingCart
          style={{ width: "24px", height: "24px", color: "white" }}
        />
        {cart.totalItems > 0 && (
          <Flex
            position="absolute"
            top="-8px"
            right="-8px"
            bg="red.500"
            borderRadius="full"
            w="20px"
            h="20px"
            align="center"
            justify="center"
          >
            <Text fontSize="xs" fontWeight="bold" color="white">
              {cart.totalItems}
            </Text>
          </Flex>
        )}
      </Flex>

      <CartModal
        isOpen={open}
        onClose={onClose}
        cartItems={modalCartItems}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        onUpdateQuantity={updateQuantity}
      />

      <AppModal
        isOpen={isCheckoutOpen}
        onClose={onCloseCheckout}
        title="Finalizar Pedido"
      >
        <CheckoutForm onClose={onCloseCheckout} />
      </AppModal>
    </>
  );
};

export default CartWidget;

```


---

## 📄 `src/features/cart/components/CheckoutForm.tsx`

```typescript
"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Heading,
  Separator,
  Dialog,
} from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { ordersService } from "@/features/orders/services/ordersService";
import type { CreateOrderDto } from "@/types/order";
import { toaster } from "@/components/ui/toaster";
import { EnderecoSelectionModal } from "@/features/profile/components/EnderecoSelectionModal";
import { CreditCardForm } from "@/features/payments/components/CreditCardForm";
import type { Endereco } from "@/types/endereco";

interface CheckoutFormProps {
  onClose: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onClose }) => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEndereco, setSelectedEndereco] = useState<Endereco | null>(
    null
  );
  const [isEnderecoModalOpen, setIsEnderecoModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Debug: verificar autenticação
  React.useEffect(() => {
    console.log("🔍 DEBUG CheckoutForm: User autenticado:", !!user);
    console.log("🔍 DEBUG CheckoutForm: User data:", user);
  }, [user]);

  const handleSubmitOrder = async () => {
    if (!user) {
      toaster.create({
        title: "Erro",
        description: "Usuário não autenticado.",
        type: "error",
      });
      return;
    }

    if (!selectedEndereco) {
      toaster.create({
        title: "Endereço obrigatório",
        description: "Selecione um endereço para entrega.",
        type: "warning",
      });
      return;
    }

    // Abrir modal de pagamento em vez de criar pedido diretamente
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = async (intentId: string) => {
    setIsPaymentModalOpen(false);

    // Agora criar o pedido após pagamento aprovado
    setIsSubmitting(true);
    try {
      const orderData: CreateOrderDto = {
        type: "DELIVERY",
        addressId: selectedEndereco!.id,
        items: cart.items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        observations: `Pagamento via Stripe - Intent: ${intentId}`,
      };

      await ordersService.create(orderData);
      toaster.create({
        title: "Pedido realizado!",
        description: "Seu pedido foi enviado com sucesso.",
        type: "success",
      });
      clearCart();
      onClose();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Falha ao criar pedido. Tente novamente.";
      toaster.create({
        title: "Erro",
        description: message,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentCancel = () => {
    setIsPaymentModalOpen(false);
  };

  const handleSelectEndereco = (endereco: Endereco) => {
    setSelectedEndereco(endereco);
    setIsEnderecoModalOpen(false);
  };

  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>
        Finalizar Pedido
      </Heading>

      <VStack align="stretch" gap={4}>
        <Box>
          <Heading size="md" mb={2}>
            Resumo do Pedido
          </Heading>
          {cart.items.map((item) => (
            <Text key={item.product.id}>
              {item.quantity}x {item.product.name} - R${" "}
              {(parseFloat(item.product.price) * item.quantity).toFixed(2)}
            </Text>
          ))}
          <Separator my={2} />
          <Text fontWeight="bold">Total: R$ {cart.totalPrice.toFixed(2)}</Text>
        </Box>

        <Box>
          <Heading size="md" mb={2}>
            Endereço de Entrega
          </Heading>
          {selectedEndereco ? (
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="md"
              borderColor="green.300"
              bg="green.50"
            >
              <Text fontWeight="medium" color="green.700" mb={1}>
                <FaMapMarkerAlt
                  style={{ display: "inline", marginRight: "8px" }}
                />
                {selectedEndereco.tipo}{" "}
                {selectedEndereco.principal && "(Principal)"}
              </Text>
              <Text fontSize="sm" color="gray.700">
                {selectedEndereco.logradouro}, {selectedEndereco.numero}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {selectedEndereco.bairro}, {selectedEndereco.cidade}/
                {selectedEndereco.estado}
              </Text>
              <Text fontSize="sm" color="green.600" fontWeight="medium">
                CEP: {selectedEndereco.cep}
              </Text>
              <Button
                size="sm"
                variant="outline"
                colorScheme="green"
                mt={2}
                onClick={() => setIsEnderecoModalOpen(true)}
              >
                Alterar Endereço
              </Button>
            </Box>
          ) : (
            <Box
              p={4}
              borderWidth="2px"
              borderRadius="md"
              borderColor="gray.300"
              borderStyle="dashed"
              textAlign="center"
            >
              <FaMapMarkerAlt
                size={24}
                style={{ color: "gray", margin: "0 auto 8px" }}
              />
              <Text color="gray.600" mb={2}>
                Nenhum endereço selecionado
              </Text>
              <Button
                colorScheme="green"
                onClick={() => setIsEnderecoModalOpen(true)}
              >
                Selecionar Endereço
              </Button>
            </Box>
          )}
        </Box>

        <Button
          colorScheme="green"
          onClick={handleSubmitOrder}
          loading={isSubmitting}
          loadingText="Enviando pedido..."
        >
          Confirmar Pedido
        </Button>
      </VStack>

      <EnderecoSelectionModal
        isOpen={isEnderecoModalOpen}
        onClose={() => setIsEnderecoModalOpen(false)}
        onSelect={handleSelectEndereco}
        selectedEnderecoId={selectedEndereco?.id}
      />

      {/* Modal de Pagamento */}
      <Dialog.Root
        open={isPaymentModalOpen}
        onOpenChange={(details) => setIsPaymentModalOpen(details.open)}
      >
        <Dialog.Backdrop />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Pagamento</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body style={{ pointerEvents: "auto" }}>
            <CreditCardForm
              amount={Math.round(cart.totalPrice * 100)} // Converter para centavos
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
            />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  );
};

```


---

## 📄 `src/features/cart/context/CartContext.tsx`

```typescript
"use client";

import { Product } from "@/types/product";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// --- TIPAGEM ---
interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

interface CartContextType {
  cart: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialCartState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const calculateCartTotals = (
  items: CartItem[]
): { totalItems: number; totalPrice: number } => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
    0
  );
  return { totalItems, totalPrice };
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartState>(initialCartState);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("pizza-express-cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao carregar carrinho";
      console.error("Falha ao carregar o carrinho:", errorMessage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pizza-express-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((productToAdd: Product) => {
    setCart((prevState) => {
      const existingItem = prevState.items.find(
        (item) => item.product.id === productToAdd.id
      );
      let updatedItems: CartItem[];

      if (existingItem) {
        updatedItems = prevState.items.map((item) =>
          item.product.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [
          ...prevState.items,
          { product: productToAdd, quantity: 1 },
        ];
      }

      console.log(`Produto ${productToAdd.id} adicionado ao carrinho!`);
      const { totalItems, totalPrice } = calculateCartTotals(updatedItems);
      return { items: updatedItems, totalItems, totalPrice };
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevState) => {
      const updatedItems = prevState.items.filter(
        (item) => item.product.id !== productId
      );
      const { totalItems, totalPrice } = calculateCartTotals(updatedItems);
      return { items: updatedItems, totalItems, totalPrice };
    });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, newQuantity: number) => {
      if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setCart((prevState) => {
        const updatedItems = prevState.items.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        );
        const { totalItems, totalPrice } = calculateCartTotals(updatedItems);
        return { items: updatedItems, totalItems, totalPrice };
      });
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setCart(initialCartState);
  }, []);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};

```


---

## 📄 `src/features/categorias/components/CategoriaFormModal.tsx`

```typescript
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VStack, HStack, Button } from "@chakra-ui/react";
import { AppModal } from "@/components/ui";
import { PizzaInput, PizzaButton } from "@/components/ui";
import { useCategorias } from "../hooks/useCategorias";
import { Categoria } from "@/types/categoria";

const categoriaSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  slug: z
    .string()
    .min(1, "Slug é obrigatório")
    .max(100, "Slug deve ter no máximo 100 caracteres"),
});

type CategoriaFormData = z.infer<typeof categoriaSchema>;

interface CategoriaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoria?: Categoria | null;
}

export const CategoriaFormModal: React.FC<CategoriaFormModalProps> = ({
  isOpen,
  onClose,
  categoria,
}) => {
  const { create, update } = useCategorias();
  const isEditing = !!categoria;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<CategoriaFormData>({
    resolver: zodResolver(categoriaSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  // Preencher formulário quando estiver editando
  React.useEffect(() => {
    if (categoria && isOpen) {
      setValue("name", categoria.name);
      setValue("slug", categoria.slug);
    } else if (!categoria && isOpen) {
      reset();
    }
  }, [categoria, isOpen, setValue, reset]);

  const onSubmit = async (data: CategoriaFormData) => {
    try {
      if (isEditing && categoria) {
        await update(categoria.id, data);
      } else {
        await create(data);
      }
      onClose();
      reset();
    } catch {
      // Error já tratado no hook
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
      .replace(/\s+/g, "-") // Substitui espaços por hífens
      .replace(/-+/g, "-") // Remove hífens consecutivos
      .trim();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = generateSlug(name);
    setValue("name", name);
    setValue("slug", slug);
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Editar Categoria" : "Nova Categoria"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={4} align="stretch">
          <PizzaInput
            label="Nome da Categoria"
            placeholder="Ex: Pizzas Salgadas"
            {...register("name")}
            error={errors.name?.message}
            onChange={handleNameChange}
          />

          <PizzaInput
            label="Slug"
            placeholder="Ex: pizzas-salgadas"
            {...register("slug")}
            error={errors.slug?.message}
          />

          <HStack gap={3} justify="flex-end" pt={4}>
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <PizzaButton
              colorScheme="orange"
              type="submit"
              loading={isSubmitting}
              loadingText={isEditing ? "Salvando..." : "Criando..."}
            >
              {isEditing ? "Salvar" : "Criar"}
            </PizzaButton>
          </HStack>
        </VStack>
      </form>
    </AppModal>
  );
};

```


---

## 📄 `src/features/categorias/components/CategoriasList.tsx`

```typescript
"use client";

import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  useDisclosure,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { PizzaCard, PizzaButton } from "@/components/ui";
import { useCategorias } from "../hooks/useCategorias";
import { CategoriaFormModal } from "./CategoriaFormModal";
import { Categoria } from "@/types/categoria";

export const CategoriasList: React.FC = () => {
  const { categorias, isLoading, error, remove, refreshFromServer } = useCategorias();
  const {
    open: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose,
  } = useDisclosure();
  const {
    open: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(
    null
  );
  const [categoriaToDelete, setCategoriaToDelete] = useState<Categoria | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    onFormOpen();
  };

  const handleCreate = () => {
    setSelectedCategoria(null);
    onFormOpen();
  };

  const handleDeleteClick = (categoria: Categoria) => {
    setCategoriaToDelete(categoria);
    onDeleteOpen();
  };

  const handleDeleteConfirm = async () => {
    if (categoriaToDelete) {
      try {
        setIsDeleting(true);
        await remove(categoriaToDelete.id);
        onDeleteClose();
        setCategoriaToDelete(null);
      } catch {
        // Error já tratado no hook com toast
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleFormClose = () => {
    setSelectedCategoria(null);
    onFormClose();
  };

  if (isLoading) {
    return <Text>Carregando categorias...</Text>;
  }

  if (error) {
    return (
      <Box
        p={4}
        bg="red.50"
        borderRadius="md"
        border="1px solid"
        borderColor="red.200"
      >
        <Text color="red.600">{error}</Text>
      </Box>
    );
  }

  return (
    <VStack gap={6} align="stretch">
      {/* Header */}
      <HStack justify="space-between" align="center">
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            Categorias
          </Text>
          <Text color="gray.600">Gerencie as categorias dos produtos</Text>
        </Box>
        <HStack gap={3}>
          <PizzaButton
            colorScheme="blue"
            variant="outline"
            onClick={refreshFromServer}
            size="sm"
          >
            🔄 Sincronizar
          </PizzaButton>
          <PizzaButton colorScheme="orange" onClick={handleCreate}>
            Nova Categoria
          </PizzaButton>
        </HStack>
      </HStack>

      {/* Lista de Categorias */}
      {categorias.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Text color="gray.500" mb={4}>
            Nenhuma categoria cadastrada ainda.
          </Text>
          <PizzaButton colorScheme="orange" onClick={handleCreate}>
            Criar Primeira Categoria
          </PizzaButton>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          {categorias.map((categoria) => (
            <PizzaCard key={categoria.id}>
              <VStack align="stretch" gap={3}>
                <Box>
                  <HStack justify="space-between" align="start">
                    <Box flex={1}>
                      <Text
                        fontSize="lg"
                        fontWeight="semibold"
                        color="gray.800"
                      >
                        {categoria.name}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        Slug: {categoria.slug}
                      </Text>
                    </Box>
                    <HStack gap={1}>
                      <IconButton
                        size="sm"
                        variant="ghost"
                        colorScheme="blue"
                        aria-label="Editar categoria"
                        onClick={() => handleEdit(categoria)}
                      >
                        <FaEdit />
                      </IconButton>
                      <IconButton
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        aria-label="Deletar categoria"
                        onClick={() => handleDeleteClick(categoria)}
                      >
                        <FaTrash />
                      </IconButton>
                    </HStack>
                  </HStack>
                </Box>

                <Box pt={2} borderTop="1px solid" borderColor="gray.100">
                  <Text fontSize="xs" color="gray.400">
                    Criado em:{" "}
                    {new Date(categoria.createdAt).toLocaleDateString("pt-BR")}
                  </Text>
                  {categoria.updatedAt !== categoria.createdAt && (
                    <Text fontSize="xs" color="gray.400">
                      Atualizado:{" "}
                      {new Date(categoria.updatedAt).toLocaleDateString(
                        "pt-BR"
                      )}
                    </Text>
                  )}
                </Box>
              </VStack>
            </PizzaCard>
          ))}
        </SimpleGrid>
      )}

      {/* Modal de Formulário */}
      <CategoriaFormModal
        isOpen={isFormOpen}
        onClose={handleFormClose}
        categoria={selectedCategoria}
      />

      {/* Modal de Confirmação de Delete */}
      {isDeleteOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.600"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="modal"
          onClick={onDeleteClose}
        >
          <Box
            bg="white"
            _dark={{ bg: "gray.800" }}
            p={6}
            borderRadius="lg"
            maxW="md"
            w="full"
            mx={4}
            onClick={(e) => e.stopPropagation()}
          >
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Deletar Categoria
            </Text>
            <Text mb={4}>
              Tem certeza que deseja deletar a categoria &quot;
              {categoriaToDelete?.name}&quot;? Esta ação não pode ser desfeita.
            </Text>
            <HStack gap={3} justify="flex-end">
              <Button variant="outline" onClick={onDeleteClose} disabled={isDeleting}>
                Cancelar
              </Button>
              <PizzaButton
                colorScheme="red"
                onClick={handleDeleteConfirm}
                loading={isDeleting}
                loadingText="Deletando..."
                disabled={isDeleting}
              >
                Deletar
              </PizzaButton>
            </HStack>
          </Box>
        </Box>
      )}
    </VStack>
  );
};

```


---

## 📄 `src/features/categorias/components/index.ts`

```typescript
export * from './CategoriasList';
export * from './CategoriaFormModal';
```


---

## 📄 `src/features/categorias/contexts/CategoriasContext.tsx`

```typescript
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Categoria, CreateCategoriaData, UpdateCategoriaData } from '@/types/categoria';
import {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria
} from '../services/categoriasService';
import { toaster } from '@/components/ui/toaster';

interface CategoriasContextType {
  categorias: Categoria[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (data: CreateCategoriaData) => Promise<Categoria>;
  update: (id: string, data: UpdateCategoriaData) => Promise<Categoria>;
  remove: (id: string) => Promise<void>;
  getById: (id: string) => Promise<Categoria>;
  refreshFromServer: () => Promise<void>;
}

const CategoriasContext = createContext<CategoriasContextType | undefined>(undefined);

export const useCategoriasContext = () => {
  const context = useContext(CategoriasContext);
  if (context === undefined) {
    throw new Error('useCategoriasContext must be used within a CategoriasProvider');
  }
  return context;
};

interface CategoriasProviderProps {
  children: ReactNode;
}

export const CategoriasProvider: React.FC<CategoriasProviderProps> = ({ children }) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategorias = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getCategorias();
      setCategorias(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar categorias';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreate = useCallback(async (data: CreateCategoriaData): Promise<Categoria> => {
    try {
      const newCategoria = await createCategoria(data);
      setCategorias(prev => [...prev, newCategoria]);
      toaster.success({
        title: "Categoria criada",
        description: `A categoria "${newCategoria.name}" foi criada com sucesso.`,
      });
      return newCategoria;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar categoria';
      toaster.error({
        title: "Erro ao criar categoria",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }, []);

  const handleUpdate = useCallback(async (id: string, data: UpdateCategoriaData): Promise<Categoria> => {
    try {
      const updatedCategoria = await updateCategoria(id, data);
      setCategorias(prev =>
        prev.map(cat => cat.id === id ? updatedCategoria : cat)
      );
      toaster.success({
        title: "Categoria atualizada",
        description: `A categoria "${updatedCategoria.name}" foi atualizada com sucesso.`,
      });
      return updatedCategoria;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar categoria';
      toaster.error({
        title: "Erro ao atualizar categoria",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }, []);

  const handleDelete = useCallback(async (id: string): Promise<void> => {
    try {
      const categoriaToDelete = categorias.find(cat => cat.id === id);
      await deleteCategoria(id);
      setCategorias(prev => prev.filter(cat => cat.id !== id));
      toaster.success({
        title: "Categoria deletada",
        description: `A categoria "${categoriaToDelete?.name || 'Categoria'}" foi deletada com sucesso.`,
      });
    } catch (err) {
      const error = err as Error;
      const errorMessage = error.message || 'Erro ao deletar categoria';

      // Se a categoria não foi encontrada (404), considere como sucesso
      // pois ela já não existe no backend
      if (errorMessage.includes('not found') || errorMessage.includes('404')) {
        setCategorias(prev => prev.filter(cat => cat.id !== id));
        toaster.success({
          title: "Categoria removida",
          description: "A categoria foi removida da lista (já não existia no servidor).",
        });
        return;
      }

      toaster.error({
        title: "Erro ao deletar categoria",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }, [categorias]);

  // Função para recarregar dados do servidor (útil para sincronização)
  const refreshFromServer = useCallback(async () => {
    try {
      const serverData = await getCategorias();
      setCategorias(serverData);
      toaster.info({
        title: "Lista atualizada",
        description: "Dados sincronizados com o servidor.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao sincronizar dados';
      toaster.error({
        title: "Erro na sincronização",
        description: errorMessage,
      });
    }
  }, []);

  const handleGetById = useCallback(async (id: string): Promise<Categoria> => {
    try {
      return await getCategoriaById(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar categoria';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  const value: CategoriasContextType = {
    categorias,
    isLoading,
    error,
    refetch: fetchCategorias,
    create: handleCreate,
    update: handleUpdate,
    remove: handleDelete,
    getById: handleGetById,
    refreshFromServer,
  };

  return (
    <CategoriasContext.Provider value={value}>
      {children}
    </CategoriasContext.Provider>
  );
};
```


---

## 📄 `src/features/categorias/hooks/index.ts`

```typescript
export * from './useCategorias';
```


---

## 📄 `src/features/categorias/hooks/useCategorias.ts`

```typescript
import { useCategoriasContext } from '../contexts/CategoriasContext';

// Re-export para manter compatibilidade
export const useCategorias = useCategoriasContext;
```


---

## 📄 `src/features/categorias/index.ts`

```typescript
// Components
export * from './components';

// Hooks
export * from './hooks';

// Services
export * from './services';

// Types
export * from './types';
```


---

## 📄 `src/features/categorias/services/categoriasService.ts`

```typescript
import { Categoria, CreateCategoriaData, UpdateCategoriaData } from '@/types/categoria';
import { getAuthToken } from '@/utils/cookies';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Listar todas as categorias
export const getCategorias = async (): Promise<Categoria[]> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/categories`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao buscar categorias' }));
    throw new Error(errorData.message || 'Erro ao buscar categorias');
  }

  return response.json();
};

// Buscar categoria por ID
export const getCategoriaById = async (id: string): Promise<Categoria> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao buscar categoria' }));
    throw new Error(errorData.message || 'Erro ao buscar categoria');
  }

  return response.json();
};

// Criar nova categoria
export const createCategoria = async (data: CreateCategoriaData): Promise<Categoria> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao criar categoria' }));
    throw new Error(errorData.message || 'Erro ao criar categoria');
  }

  return response.json();
};

// Atualizar categoria
export const updateCategoria = async (id: string, data: UpdateCategoriaData): Promise<Categoria> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao atualizar categoria' }));
    throw new Error(errorData.message || 'Erro ao atualizar categoria');
  }

  return response.json();
};

// Deletar categoria
export const deleteCategoria = async (id: string): Promise<void> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao deletar categoria' }));

    // Para erros 404, incluir o status na mensagem
    if (response.status === 404) {
      throw new Error(`Category with ID ${id} not found`);
    }

    throw new Error(errorData.message || 'Erro ao deletar categoria');
  }
};
```


---

## 📄 `src/features/categorias/services/index.ts`

```typescript
export * from './categoriasService';
```


---

## 📄 `src/features/categorias/types/index.ts`

```typescript
// Re-export types
export * from '@/types/categoria';
```


---

## 📄 `src/features/dashboard/components/DashboardActions.tsx`

```typescript
"use client";

import { Button, Flex, Icon } from "@chakra-ui/react";
import { Utensils, ClipboardList, Users, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";
import { usePermissions } from "@/hooks/usePermissions";

export const DashboardActions = () => {
  const router = useRouter();
  const { canManageUsers, canManageDeliveryPersons } = usePermissions();

  const secondaryButtonStyle = {
    bg: "background.secondary",
    color: "text.primary",
    _hover: { bg: "background.tertiary" },
  } as const;

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={4}
      w="full"
      flexWrap="wrap"
    >
      {/* Botões Secundários: Usam apenas o secondaryButtonStyle */}
      <Button
        size="lg"
        flex="1"
        minW="200px"
        {...secondaryButtonStyle}
        onClick={() => router.push(ROUTES.APP.PEDIDOS)}
      >
        <Icon as={ClipboardList} mr={2} />
        Ver Pedidos
      </Button>
      <Button
        size="lg"
        flex="1"
        minW="200px"
        {...secondaryButtonStyle}
        onClick={() => router.push(ROUTES.APP.CARDAPIO)}
      >
        <Icon as={Utensils} mr={2} />
        Ver Cardápio
      </Button>

      {/* Botões de Administração - apenas para admin */}
      {canManageUsers() && (
        <Button
          size="lg"
          flex="1"
          minW="200px"
          {...secondaryButtonStyle}
          onClick={() => router.push("/admin/users")}
        >
          <Icon as={Users} mr={2} />
          Gerenciar Usuários
        </Button>
      )}

      {canManageDeliveryPersons() && (
        <Button
          size="lg"
          flex="1"
          minW="200px"
          {...secondaryButtonStyle}
          onClick={() => router.push("/admin/delivery-persons")}
        >
          <Icon as={Truck} mr={2} />
          Gerenciar Entregadores
        </Button>
      )}
    </Flex>
  );
};

```


---

## 📄 `src/features/dashboard/components/DashboardStats.tsx`

```typescript
"use client";

import { PizzaLoading } from "@/components/ui";
import { SimpleGrid, Stat, Flex, Icon, Box } from "@chakra-ui/react";
import { LucideIcon } from "lucide-react"; // Usado para tipar o ícone

// A interface agora espera um array de objetos de estatísticas
interface StatCard {
  label: string;
  value: string;
  icon: LucideIcon;
}

interface DashboardStatsProps {
  stats: StatCard[];
  isLoading: boolean;
}

export const DashboardStats = ({ stats, isLoading }: DashboardStatsProps) => {
  if (isLoading) {
    return <PizzaLoading message="Calculando estatísticas..." />;
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
      {stats.map((stat) => (
        <Stat.Root
          key={stat.label}
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
          bg="background.secondary"
          borderColor="background.tertiary"
        >
          <Flex alignItems="center">
            <Box flex="1">
              <Stat.Label color="text.secondary" fontSize="md">
                {stat.label}
              </Stat.Label>
              <Stat.ValueText fontSize="3xl" fontWeight="bold">
                {stat.value}
              </Stat.ValueText>
            </Box>
            <Flex
              alignItems="center"
              justifyContent="center"
              w={12}
              h={12}
              borderRadius="full"
              bg="background.primary"
            >
              <Icon as={stat.icon} w={6} h={6} color="brand.primary" />
            </Flex>
          </Flex>
        </Stat.Root>
      ))}
    </SimpleGrid>
  );
};

```


---

## 📄 `src/features/dashboard/hooks/useDashboard.ts`

```typescript
"use client";

import { useState, useCallback, useEffect } from "react";

import { ordersService } from "@/features/orders/services/ordersService";
import { formatCurrency } from "@/utils/format";
import { Order } from "@/types/order";
import { toaster } from "@/components/ui/toaster";

interface FormattedDashboardStats {
  faturamentoTotal: string;
  pedidosHoje: string;
  totalDePedidos: string;
  ticketMedio: string;
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<FormattedDashboardStats>({
    faturamentoTotal: formatCurrency(0),
    pedidosHoje: "0",
    totalDePedidos: "0",
    ticketMedio: formatCurrency(0),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAndCalculateStats = useCallback(async () => {
    try {
      setIsLoading(true);
      const todosOsPedidos: Order[] = await ordersService.getWithFilters();
      const hoje = new Date().toISOString().split("T")[0];
      const pedidosDeHoje = todosOsPedidos.filter(
        (p) => p.createdAt.split("T")[0] === hoje
      );
      const faturamentoTotal = todosOsPedidos.reduce(
        (total, p) => total + parseFloat(p.total),
        0
      );
      const totalDePedidos = todosOsPedidos.length;
      const ticketMedio =
        totalDePedidos > 0 ? faturamentoTotal / totalDePedidos : 0;

      setStats({
        faturamentoTotal: formatCurrency(faturamentoTotal),
        pedidosHoje: pedidosDeHoje.length.toString(),
        totalDePedidos: totalDePedidos.toString(),
        ticketMedio: formatCurrency(ticketMedio),
      });
      setError(null);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Falha ao carregar estatísticas.";
      setError(msg);
      toaster.create({ title: "Erro", description: msg, type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndCalculateStats();
  }, [fetchAndCalculateStats]);

  return { stats, isLoading, error, refetch: fetchAndCalculateStats };
};

```


---

## 📄 `src/features/entregadores/components/EntregadoresList.tsx`

```typescript
"use client";

import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  useDisclosure,
  IconButton,
  SimpleGrid,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { FaEdit, FaTrash, FaMotorcycle } from "react-icons/fa";
import { PizzaCard, PizzaButton } from "@/components/ui";
import { useEntregadores } from "../hooks/useEntregadores";
import { EntregadorFormModal } from "./EntregadorFormModal";
import { Entregador } from "@/types/entregador";

export const EntregadoresList: React.FC = () => {
  const { entregadores, isLoading, error, remove } = useEntregadores();
  const {
    open: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose,
  } = useDisclosure();
  const {
    open: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [selectedEntregador, setSelectedEntregador] =
    useState<Entregador | null>(null);
  const [entregadorToDelete, setEntregadorToDelete] =
    useState<Entregador | null>(null);

  const handleEdit = (entregador: Entregador) => {
    setSelectedEntregador(entregador);
    onFormOpen();
  };

  const handleCreate = () => {
    setSelectedEntregador(null);
    onFormOpen();
  };

  const handleDeleteClick = (entregador: Entregador) => {
    setEntregadorToDelete(entregador);
    onDeleteOpen();
  };

  const handleDeleteConfirm = async () => {
    if (entregadorToDelete) {
      try {
        await remove(entregadorToDelete.id);
        onDeleteClose();
        setEntregadorToDelete(null);
      } catch {
        // Error já tratado no hook
      }
    }
  };

  const handleFormClose = () => {
    setSelectedEntregador(null);
    onFormClose();
  };

  const formatPhone = (phone: string) => {
    // Formatar telefone brasileiro
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  if (isLoading) {
    return <Text>Carregando entregadores...</Text>;
  }

  if (error) {
    return (
      <Box
        p={4}
        bg="red.50"
        borderRadius="md"
        border="1px solid"
        borderColor="red.200"
      >
        <Text color="red.600">{error}</Text>
      </Box>
    );
  }

  return (
    <VStack gap={6} align="stretch">
      {/* Header */}
      <HStack justify="space-between" align="center">
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            Entregadores
          </Text>
          <Text color="gray.600">Gerencie os entregadores da pizzaria</Text>
        </Box>
        <PizzaButton colorScheme="orange" onClick={handleCreate}>
          Novo Entregador
        </PizzaButton>
      </HStack>

      {/* Lista de Entregadores */}
      {entregadores.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Text color="gray.500" mb={4}>
            Nenhum entregador cadastrado ainda.
          </Text>
          <PizzaButton colorScheme="orange" onClick={handleCreate}>
            Cadastrar Primeiro Entregador
          </PizzaButton>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          {entregadores.map((entregador) => (
            <PizzaCard key={entregador.id}>
              <VStack align="stretch" gap={3}>
                {/* Avatar e Nome */}
                <HStack gap={3}>
                  <Avatar.Root size="lg">
                    <Avatar.Fallback>
                      <FaMotorcycle />
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <Box flex={1}>
                    <HStack justify="space-between" align="start">
                      <Box flex={1}>
                        <Text
                          fontSize="lg"
                          fontWeight="semibold"
                          color="gray.800"
                        >
                          {entregador.nome}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          {entregador.telefone
                            ? formatPhone(entregador.telefone)
                            : "Telefone não informado"}
                        </Text>
                      </Box>
                      <HStack gap={1}>
                        <IconButton
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
                          aria-label="Editar entregador"
                          onClick={() => handleEdit(entregador)}
                        >
                          <FaEdit />
                        </IconButton>
                        <IconButton
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          aria-label="Deletar entregador"
                          onClick={() => handleDeleteClick(entregador)}
                        >
                          <FaTrash />
                        </IconButton>
                      </HStack>
                    </HStack>
                  </Box>
                </HStack>

                {/* Status */}
                <Box>
                  <Badge colorScheme="green" variant="subtle" fontSize="xs">
                    Ativo
                  </Badge>
                </Box>

                {/* Informações adicionais */}
                <Box pt={2} borderTop="1px solid" borderColor="gray.100">
                  {entregador.createdAt && (
                    <Text fontSize="xs" color="gray.400">
                      Cadastrado em:{" "}
                      {new Date(entregador.createdAt).toLocaleDateString(
                        "pt-BR"
                      )}
                    </Text>
                  )}
                </Box>
              </VStack>
            </PizzaCard>
          ))}
        </SimpleGrid>
      )}

      {/* Modal de Formulário */}
      <EntregadorFormModal
        isOpen={isFormOpen}
        onClose={handleFormClose}
        entregador={selectedEntregador}
      />

      {/* Modal de Confirmação de Delete */}
      {isDeleteOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.600"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="modal"
          onClick={onDeleteClose}
        >
          <Box
            bg="white"
            _dark={{ bg: "gray.800" }}
            p={6}
            borderRadius="lg"
            maxW="md"
            w="full"
            mx={4}
            onClick={(e) => e.stopPropagation()}
          >
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Deletar Entregador
            </Text>
            <Text mb={4}>
              Tem certeza que deseja deletar o entregador &quot;
              {entregadorToDelete?.nome}&quot;? Esta ação não pode ser desfeita.
            </Text>
            <HStack gap={3} justify="flex-end">
              <Button variant="outline" onClick={onDeleteClose}>
                Cancelar
              </Button>
              <PizzaButton colorScheme="red" onClick={handleDeleteConfirm}>
                Deletar
              </PizzaButton>
            </HStack>
          </Box>
        </Box>
      )}
    </VStack>
  );
};

```


---

## 📄 `src/features/entregadores/components/EntregadorFormModal.tsx`

```typescript
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VStack, HStack, Button } from "@chakra-ui/react";
import { AppModal } from "@/components/ui";
import { PizzaInput, PizzaButton } from "@/components/ui";
import { useEntregadores } from "../hooks/useEntregadores";
import { Entregador } from "@/types/entregador";

const entregadorSchema = z.object({
  nome: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  telefone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .regex(
      /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
      "Formato inválido. Use (XX) XXXXX-XXXX"
    ),
});

type EntregadorFormData = z.infer<typeof entregadorSchema>;

interface EntregadorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  entregador?: Entregador | null;
}

export const EntregadorFormModal: React.FC<EntregadorFormModalProps> = ({
  isOpen,
  onClose,
  entregador,
}) => {
  const { create, update } = useEntregadores();
  const isEditing = !!entregador;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<EntregadorFormData>({
    resolver: zodResolver(entregadorSchema),
    defaultValues: {
      nome: "",
      telefone: "",
    },
  });

  // Preencher formulário quando estiver editando
  React.useEffect(() => {
    if (entregador && isOpen) {
      setValue("nome", entregador.nome);
      setValue(
        "telefone",
        entregador.telefone ? formatPhoneForDisplay(entregador.telefone) : ""
      );
    } else if (!entregador && isOpen) {
      reset();
    }
  }, [entregador, isOpen, setValue, reset]);

  const onSubmit = async (data: EntregadorFormData) => {
    try {
      const formattedData = {
        ...data,
        telefone: cleanPhoneNumber(data.telefone),
      };

      if (isEditing && entregador) {
        await update(entregador.id, formattedData);
      } else {
        await create(formattedData);
      }
      onClose();
      reset();
    } catch {
      // Error já tratado no hook
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const cleanPhoneNumber = (phone: string): string => {
    return phone.replace(/\D/g, "");
  };

  const formatPhoneForDisplay = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length <= 11) {
      if (value.length <= 2) {
        value = value;
      } else if (value.length <= 6) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
      }
    }

    setValue("telefone", value);
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Editar Entregador" : "Novo Entregador"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={4} align="stretch">
          <PizzaInput
            label="Nome do Entregador"
            placeholder="Ex: João Silva"
            {...register("nome")}
            error={errors.nome?.message}
          />

          <PizzaInput
            label="Telefone"
            placeholder="(11) 99999-9999"
            {...register("telefone")}
            onChange={handlePhoneChange}
            error={errors.telefone?.message}
            maxLength={15}
          />

          <HStack gap={3} justify="flex-end" pt={4}>
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <PizzaButton
              colorScheme="orange"
              type="submit"
              loading={isSubmitting}
              loadingText={isEditing ? "Salvando..." : "Criando..."}
            >
              {isEditing ? "Salvar" : "Criar"}
            </PizzaButton>
          </HStack>
        </VStack>
      </form>
    </AppModal>
  );
};

```


---

## 📄 `src/features/entregadores/components/index.ts`

```typescript
export * from './EntregadoresList';
export * from './EntregadorFormModal';
```


---

## 📄 `src/features/entregadores/hooks/index.ts`

```typescript
export * from './useEntregadores';
```


---

## 📄 `src/features/entregadores/hooks/useEntregadores.ts`

```typescript
import { useState, useEffect, useCallback } from 'react';
import { Entregador } from '@/types/entregador';
import {
  getEntregadores,
  getEntregadorById,
  createEntregador,
  updateEntregador,
  deleteEntregador
} from '../services/entregadoresService';

interface UseEntregadoresReturn {
  entregadores: Entregador[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (data: { nome: string; telefone: string }) => Promise<Entregador>;
  update: (id: number, data: { nome?: string; telefone?: string }) => Promise<Entregador>;
  remove: (id: number) => Promise<void>;
  getById: (id: number) => Promise<Entregador>;
}

export const useEntregadores = (): UseEntregadoresReturn => {
  const [entregadores, setEntregadores] = useState<Entregador[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntregadores = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getEntregadores();
      setEntregadores(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar entregadores';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreate = useCallback(async (data: { nome: string; telefone: string }): Promise<Entregador> => {
    try {
      const newEntregador = await createEntregador(data);
      setEntregadores(prev => [...prev, newEntregador]);
      return newEntregador;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar entregador';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const handleUpdate = useCallback(async (id: number, data: { nome?: string; telefone?: string }): Promise<Entregador> => {
    try {
      const updatedEntregador = await updateEntregador(id, data);
      setEntregadores(prev =>
        prev.map(ent => ent.id === id ? updatedEntregador : ent)
      );
      return updatedEntregador;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar entregador';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const handleDelete = useCallback(async (id: number): Promise<void> => {
    try {
      await deleteEntregador(id);
      setEntregadores(prev => prev.filter(ent => ent.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar entregador';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const handleGetById = useCallback(async (id: number): Promise<Entregador> => {
    try {
      return await getEntregadorById(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar entregador';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  useEffect(() => {
    fetchEntregadores();
  }, [fetchEntregadores]);

  return {
    entregadores,
    isLoading,
    error,
    refetch: fetchEntregadores,
    create: handleCreate,
    update: handleUpdate,
    remove: handleDelete,
    getById: handleGetById,
  };
};
```


---

## 📄 `src/features/entregadores/index.ts`

```typescript
// Components
export * from './components';

// Hooks
export * from './hooks';

// Services
export * from './services';

// Types
export * from './types';
```


---

## 📄 `src/features/entregadores/services/entregadoresService.ts`

```typescript
import { Entregador } from '@/types/entregador';
import { getAuthToken } from '@/utils/cookies';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Listar todos os entregadores
export const getEntregadores = async (): Promise<Entregador[]> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/entregadores`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao buscar entregadores' }));
    throw new Error(errorData.message || 'Erro ao buscar entregadores');
  }

  return response.json();
};

// Buscar entregador por ID
export const getEntregadorById = async (id: number): Promise<Entregador> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/entregadores/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao buscar entregador' }));
    throw new Error(errorData.message || 'Erro ao buscar entregador');
  }

  return response.json();
};

// Criar novo entregador
export const createEntregador = async (data: { nome: string; telefone: string }): Promise<Entregador> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/entregadores`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao criar entregador' }));
    throw new Error(errorData.message || 'Erro ao criar entregador');
  }

  return response.json();
};

// Atualizar entregador
export const updateEntregador = async (id: number, data: { nome?: string; telefone?: string }): Promise<Entregador> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/entregadores/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao atualizar entregador' }));
    throw new Error(errorData.message || 'Erro ao atualizar entregador');
  }

  return response.json();
};

// Deletar entregador
export const deleteEntregador = async (id: number): Promise<void> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/entregadores/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao deletar entregador' }));
    throw new Error(errorData.message || 'Erro ao deletar entregador');
  }
};
```


---

## 📄 `src/features/entregadores/services/index.ts`

```typescript
export * from './entregadoresService';
```


---

## 📄 `src/features/entregadores/types/index.ts`

```typescript
// Re-export types
export * from '@/types/entregador';
```


---

## 📄 `src/features/mesas/components/AdicionarPedidoModal.tsx`

```typescript
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  VStack,
  HStack,
  Text,
  Button,
  Box,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";
import { AppModal } from "@/components/ui";
import { FaPlus, FaMinus } from "react-icons/fa";
import { PizzaButton } from "@/components/ui";
import { useMesas } from "../hooks/useMesas";
import { useProdutos } from "../../produtos/hooks/useProdutos";
import { Mesa } from "@/types/mesa";
import { Produto } from "@/types/produto";

const pedidoSchema = z.object({
  observacoes: z.string().optional(),
});

type PedidoFormData = z.infer<typeof pedidoSchema>;

interface AdicionarPedidoModalProps {
  isOpen: boolean;
  onClose: () => void;
  mesa: Mesa | null;
  onPedidoAdicionado: () => void;
}

interface ItemPedido {
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
  };
}

export const AdicionarPedidoModal: React.FC<AdicionarPedidoModalProps> = ({
  isOpen,
  onClose,
  mesa,
  onPedidoAdicionado,
}) => {
  const { adicionarPedido } = useMesas();
  const { produtos } = useProdutos();
  const [itensPedido, setItensPedido] = useState<ItemPedido[]>([]);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<PedidoFormData>({
    resolver: zodResolver(pedidoSchema),
  });

  const handleAddProduto = (produto: Produto) => {
    const existingItem = itensPedido.find(
      (item) => item.productId === produto.id
    );

    if (existingItem) {
      setItensPedido((prev) =>
        prev.map((item) =>
          item.productId === produto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setItensPedido((prev) => [
        ...prev,
        {
          productId: produto.id,
          quantity: 1,
          product: {
            id: produto.id,
            name: produto.name,
            price: produto.price,
          },
        },
      ]);
    }
  };

  const handleRemoveItem = (productId: string) => {
    setItensPedido((prev) =>
      prev.filter((item) => item.productId !== productId)
    );
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    setItensPedido((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const onSubmit = async (data: PedidoFormData) => {
    if (!mesa || itensPedido.length === 0) return;

    try {
      const pedidoData = {
        type: "DINE_IN" as const,
        items: itensPedido.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        tableId: mesa.id,
        observations: data.observacoes,
      };

      await adicionarPedido(pedidoData);
      onPedidoAdicionado();
      handleClose();
    } catch (error) {
      console.error("Erro ao adicionar pedido:", error);
    }
  };

  const handleClose = () => {
    setItensPedido([]);
    reset();
    onClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const totalPedido = itensPedido.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Filtrar apenas produtos ativos
  const produtosAtivos = produtos.filter((produto) => produto.active);

  return (
    <AppModal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Adicionar Pedido - Mesa ${mesa?.number}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={6} align="stretch">
          {/* Produtos Disponíveis */}
          <Box>
            <Text fontSize="lg" fontWeight="semibold" mb={4}>
              Produtos Disponíveis
            </Text>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              gap={3}
              maxH="300px"
              overflowY="auto"
            >
              {produtosAtivos.map((produto) => (
                <Box
                  key={produto.id}
                  p={3}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => handleAddProduto(produto)}
                  _hover={{ bg: "gray.50", borderColor: "orange.300" }}
                  transition="all 0.2s"
                >
                  <VStack align="stretch" gap={1}>
                    <Text fontWeight="semibold" fontSize="sm">
                      {produto.name}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      {produto.description}
                    </Text>
                    <Text fontSize="sm" fontWeight="bold" color="orange.500">
                      {formatPrice(produto.price)}
                    </Text>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* Itens do Pedido */}
          {itensPedido.length > 0 && (
            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Itens do Pedido
              </Text>
              <VStack gap={3} align="stretch">
                {itensPedido.map((item) => (
                  <Box
                    key={item.productId}
                    p={3}
                    bg="gray.50"
                    borderRadius="md"
                  >
                    <HStack justify="space-between" align="center">
                      <Box flex={1}>
                        <Text fontWeight="semibold">{item.product.name}</Text>
                        <Text fontSize="sm" color="orange.500">
                          {formatPrice(item.product.price)} cada
                        </Text>
                      </Box>
                      <HStack gap={2} align="center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId,
                              item.quantity - 1
                            )
                          }
                        >
                          <FaMinus size={12} />
                        </Button>
                        <Text
                          fontWeight="semibold"
                          minW="30px"
                          textAlign="center"
                        >
                          {item.quantity}
                        </Text>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId,
                              item.quantity + 1
                            )
                          }
                        >
                          <FaPlus size={12} />
                        </Button>
                        <Text
                          fontWeight="semibold"
                          color="orange.500"
                          minW="80px"
                          textAlign="right"
                        >
                          {formatPrice(item.product.price * item.quantity)}
                        </Text>
                        <Button
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleRemoveItem(item.productId)}
                        >
                          Remover
                        </Button>
                      </HStack>
                    </HStack>
                  </Box>
                ))}

                {/* Total */}
                <Box p={3} bg="orange.50" borderRadius="md">
                  <HStack justify="space-between" align="center">
                    <Text fontSize="lg" fontWeight="bold">
                      Total do Pedido
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color="orange.500">
                      {formatPrice(totalPedido)}
                    </Text>
                  </HStack>
                </Box>
              </VStack>
            </Box>
          )}

          {/* Observações */}
          <Box>
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
              Observações (opcional)
            </Text>
            <Textarea
              {...register("observacoes")}
              placeholder="Ex: Sem cebola, bem passado, etc."
              rows={3}
            />
          </Box>

          {/* Ações */}
          <HStack gap={3} justify="flex-end">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <PizzaButton
              colorScheme="orange"
              type="submit"
              disabled={itensPedido.length === 0}
              loading={isSubmitting}
              loadingText="Adicionando pedido..."
            >
              Adicionar Pedido
            </PizzaButton>
          </HStack>
        </VStack>
      </form>
    </AppModal>
  );
};

```


---

## 📄 `src/features/mesas/components/CriarMesaModal.tsx`

```typescript
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VStack, HStack, Button } from "@chakra-ui/react";
import { AppModal } from "@/components/ui";
import { PizzaInput, PizzaButton } from "@/components/ui";

const criarMesaSchema = z.object({
  number: z
    .number()
    .min(1, "Número deve ser maior que 0")
    .max(999, "Número deve ser menor que 1000"),
});

type CriarMesaFormData = z.infer<typeof criarMesaSchema>;

interface CriarMesaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCriarMesa: (numero: number) => Promise<void>;
  mesasExistentes: number[];
}

export const CriarMesaModal: React.FC<CriarMesaModalProps> = ({
  isOpen,
  onClose,
  onCriarMesa,
  mesasExistentes,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useForm<CriarMesaFormData>({
    resolver: zodResolver(criarMesaSchema),
    defaultValues: {
      number: Math.max(...mesasExistentes, 0) + 1,
    },
  });

  const onSubmit = async (data: CriarMesaFormData) => {
    // Verificar se o número já existe
    if (mesasExistentes.includes(data.number)) {
      setError("number", {
        type: "manual",
        message: `Mesa ${data.number} já existe`,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onCriarMesa(data.number);
      reset();
    } catch {
      // Error já tratado no componente pai
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setValue("number", value);
  };

  return (
    <AppModal isOpen={isOpen} onClose={handleClose} title="Criar Nova Mesa">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={4} align="stretch">
          <PizzaInput
            label="Número da Mesa"
            type="number"
            placeholder="Ex: 5"
            {...register("number", { valueAsNumber: true })}
            onChange={handleNumberChange}
            error={errors.number?.message}
          />

          <HStack gap={3} justify="flex-end" pt={4}>
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <PizzaButton
              colorScheme="orange"
              type="submit"
              loading={isSubmitting}
              loadingText="Criando mesa..."
            >
              Criar Mesa
            </PizzaButton>
          </HStack>
        </VStack>
      </form>
    </AppModal>
  );
};

```


---

## 📄 `src/features/mesas/components/DashboardMesas.tsx`

```typescript
"use client";

import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { FaChair } from "react-icons/fa";
import { PizzaButton } from "@/components/ui";
import { toaster } from "@/components/ui/toaster";
import { useMesas } from "../hooks/useMesas";
import { MesaCard } from "./MesaCard";
import { SessaoDetalhesModal } from "./SessaoDetalhesModal";
import { CriarMesaModal } from "./CriarMesaModal";
import { Mesa } from "@/types/mesa";

export const DashboardMesas: React.FC = () => {
  const { mesas, isLoading, error, create } = useMesas();

  const { open: isOpen, onOpen, onClose } = useDisclosure();
  const {
    open: isCriarOpen,
    onOpen: onCriarOpen,
    onClose: onCriarClose,
  } = useDisclosure();
  const [selectedMesa, setSelectedMesa] = useState<Mesa | null>(null);

  const handleMesaClick = (mesa: Mesa) => {
    setSelectedMesa(mesa);
    onOpen();
  };

  const handleModalClose = () => {
    setSelectedMesa(null);
    onClose();
  };

  const handleCriarMesa = async (numero: number) => {
    try {
      await create({ number: numero });
      toaster.create({
        title: "Mesa criada com sucesso!",
        type: "success",
      });
      onCriarClose();
    } catch (error) {
      toaster.create({
        title: "Erro ao criar mesa",
        description:
          error instanceof Error ? error.message : "Erro desconhecido",
        type: "error",
      });
    }
  };

  if (isLoading) {
    return <Text>Carregando mesas...</Text>;
  }

  if (error) {
    return (
      <Box
        p={4}
        bg="red.50"
        borderRadius="md"
        border="1px solid"
        borderColor="red.200"
      >
        <Text color="red.600">{error}</Text>
      </Box>
    );
  }

  // Estatísticas
  const mesasDisponiveis = mesas.filter((m) => m.status === "AVAILABLE").length;
  const mesasOcupadas = mesas.filter((m) => m.status === "OCCUPIED").length;
  const mesasReservadas = mesas.filter((m) => m.status === "RESERVED").length;

  return (
    <VStack gap={6} align="stretch">
      {/* Header com Estatísticas */}
      <Box>
        <HStack justify="space-between" align="center" mb={4}>
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color="gray.800">
              Controle de Mesas
            </Text>
            <Text color="gray.600">
              Gerencie as mesas e sessões do restaurante
            </Text>
          </Box>
          <PizzaButton colorScheme="orange" onClick={onCriarOpen}>
            Criar Mesa
          </PizzaButton>
        </HStack>

        {/* Cards de Estatísticas */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={6}>
          <Box
            p={4}
            bg="green.50"
            borderRadius="md"
            border="1px solid"
            borderColor="green.200"
          >
            <HStack gap={3}>
              <Box p={2} bg="green.500" borderRadius="md">
                <FaChair color="white" size={20} />
              </Box>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" color="green.600">
                  {mesasDisponiveis}
                </Text>
                <Text fontSize="sm" color="green.600">
                  Mesas Disponíveis
                </Text>
              </Box>
            </HStack>
          </Box>

          <Box
            p={4}
            bg="red.50"
            borderRadius="md"
            border="1px solid"
            borderColor="red.200"
          >
            <HStack gap={3}>
              <Box p={2} bg="red.500" borderRadius="md">
                <FaChair color="white" size={20} />
              </Box>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" color="red.600">
                  {mesasOcupadas}
                </Text>
                <Text fontSize="sm" color="red.600">
                  Mesas Ocupadas
                </Text>
              </Box>
            </HStack>
          </Box>

          <Box
            p={4}
            bg="yellow.50"
            borderRadius="md"
            border="1px solid"
            borderColor="yellow.200"
          >
            <HStack gap={3}>
              <Box p={2} bg="yellow.500" borderRadius="md">
                <FaChair color="white" size={20} />
              </Box>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" color="yellow.600">
                  {mesasReservadas}
                </Text>
                <Text fontSize="sm" color="yellow.600">
                  Mesas Reservadas
                </Text>
              </Box>
            </HStack>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Grid de Mesas */}
      {mesas.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Text color="gray.500" mb={4}>
            Nenhuma mesa cadastrada ainda.
          </Text>
          <Text color="gray.400" fontSize="sm">
            Entre em contato com o administrador para cadastrar mesas.
          </Text>
        </Box>
      ) : (
        <>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6, xl: 8 }} gap={4}>
            {mesas.map((mesa) => (
              <MesaCard
                key={mesa.id}
                mesa={mesa}
                onClick={() => handleMesaClick(mesa)}
              />
            ))}
          </SimpleGrid>
        </>
      )}

      {/* Modal de Detalhes da Sessão */}
      {selectedMesa && (
        <SessaoDetalhesModal
          isOpen={isOpen}
          onClose={handleModalClose}
          mesa={selectedMesa}
        />
      )}

      {/* Modal de Criar Mesa */}
      <CriarMesaModal
        isOpen={isCriarOpen}
        onClose={onCriarClose}
        onCriarMesa={handleCriarMesa}
        mesasExistentes={mesas.map((m) => m.number)}
      />
    </VStack>
  );
};

```


---

## 📄 `src/features/mesas/components/index.ts`

```typescript
export * from "./DashboardMesas";
export * from "./MesaCard";
export * from "./SessaoDetalhesModal";
export * from "./AdicionarPedidoModal";
export * from "./CriarMesaModal";
export * from "./PedidoCard";

```


---

## 📄 `src/features/mesas/components/MesaCard.tsx`

```typescript
"use client";

import React from "react";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { FaChair, FaClock } from "react-icons/fa";
import { MesaStatus, Mesa } from "@/types/mesa";

interface MesaCardProps {
  mesa: Mesa;
  onClick: () => void;
}

export const MesaCard: React.FC<MesaCardProps> = ({ mesa, onClick }) => {
  const getStatusConfig = (status: MesaStatus) => {
    switch (status) {
      case "AVAILABLE":
        return {
          bg: "green.500",
          borderColor: "green.300",
          badgeBg: "green.50",
          badgeColor: "green.600",
          label: "Livre",
        };
      case "OCCUPIED":
        return {
          bg: "red.500",
          borderColor: "red.300",
          badgeBg: "red.50",
          badgeColor: "red.600",
          label: "Ocupada",
        };
      case "RESERVED":
        return {
          bg: "yellow.500",
          borderColor: "yellow.300",
          badgeBg: "yellow.50",
          badgeColor: "yellow.600",
          label: "Reservada",
        };
      default:
        return {
          bg: "gray.500",
          borderColor: "gray.300",
          badgeBg: "gray.50",
          badgeColor: "gray.600",
          label: "Desconhecido",
        };
    }
  };

  const statusConfig = getStatusConfig(mesa.status);

  const formatTime = (dateString: string) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 0) return "N/A";

    if (diffMins < 60) {
      return `${diffMins}min`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      return `${diffHours}h ${diffMins % 60}min`;
    }
  };

  return (
    <Box w="full" aspectRatio="1" position="relative">
      <Button
        w="100%"
        h="100%"
        p={3}
        bg={statusConfig.bg}
        border="2px solid"
        borderColor={statusConfig.borderColor}
        borderRadius="12px"
        color="white"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
        onClick={onClick}
        transition="all 0.2s"
        _hover={{
          transform: "scale(1.05)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          opacity: 0.9,
        }}
        _active={{
          transform: "scale(0.95)",
        }}
      >
        <VStack gap={2} w="full" justify="center" align="center">
          {/* Ícone da cadeira */}
          <Box fontSize="24px">
            <FaChair />
          </Box>

          {/* Número da mesa */}
          <Text fontSize="20px" fontWeight="bold">
            {mesa.number}
          </Text>

          {/* Status Badge */}
          <Box
            bg={statusConfig.badgeBg}
            color={statusConfig.badgeColor}
            fontSize="12px"
            px={2}
            py={1}
            borderRadius="9999px"
            fontWeight="600"
          >
            {statusConfig.label}
          </Box>

          {/* Tempo de ocupação (se ocupada) */}
          {mesa.status === "OCCUPIED" && mesa.sessaoAtiva && (
            <Flex align="center" gap={1} fontSize="12px">
              <FaClock />
              <span>{formatTime(mesa.sessaoAtiva.criadoEm)}</span>
            </Flex>
          )}

          {/* Número de pedidos (se ocupada) */}
          {mesa.status === "OCCUPIED" && mesa.sessaoAtiva && (
            <Box
              bg={statusConfig.badgeBg}
              color={statusConfig.badgeColor}
              fontSize="12px"
              px={2}
              py={1}
              borderRadius="9999px"
              fontWeight="600"
            >
              {mesa.sessaoAtiva.pedidos?.length || 0} pedidos
            </Box>
          )}
        </VStack>
      </Button>
    </Box>
  );
};

```


---

## 📄 `src/features/mesas/components/PedidoCard.tsx`

```typescript
"use client";

import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { PedidoMesa } from "@/types/mesa";

interface PedidoCardProps {
  pedido: PedidoMesa;
  index: number;
}

export const PedidoCard: React.FC<PedidoCardProps> = ({ pedido, index }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <Box key={index} p={3} bg="blackAlpha.400" borderRadius="md">
      <HStack justify="space-between" align="start">
        <Box flex={1}>
          <Text fontSize="sm" color="gray.600">
            {new Date(pedido.criadoEm).toLocaleString("pt-BR")}
          </Text>
          {pedido.observacoes && (
            <Text fontSize="sm" color="gray.500" mt={1}>
              Obs: {pedido.observacoes}
            </Text>
          )}
          <Text fontSize="sm" mt={2}>
            {pedido.itens.map((item, idx) => (
              <span key={idx}>
                {item.quantity}x {item.product?.name || "Produto"}
                {idx < pedido.itens.length - 1 ? ", " : ""}
              </span>
            ))}
          </Text>
        </Box>
        <Text fontWeight="semibold">
          {formatPrice(
            pedido.itens.reduce(
              (total, item) =>
                total + (item.product?.price || 0) * item.quantity,
              0
            )
          )}
        </Text>
      </HStack>
    </Box>
  );
};

```


---

## 📄 `src/features/mesas/components/SessaoDetalhesModal.tsx`

```typescript
"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  VStack,
  HStack,
  Text,
  Badge,
  Box,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { AppModal } from "@/components/ui";
import { FaClock, FaPlus, FaMoneyBillWave } from "react-icons/fa";
import { PizzaButton } from "@/components/ui";
import { PizzaSpinner } from "@/components/ui";
import { useMesas } from "../hooks/useMesas";
import { Mesa, SessaoMesa } from "@/types/mesa";
import { AdicionarPedidoModal } from "./AdicionarPedidoModal";
import { PedidoCard } from "./PedidoCard";

interface SessaoDetalhesModalProps {
  isOpen: boolean;
  onClose: () => void;
  mesa: Mesa | null;
}

export const SessaoDetalhesModal: React.FC<SessaoDetalhesModalProps> = ({
  isOpen,
  onClose,
  mesa,
}) => {
  const { abrirSessao, fecharConta, getSessaoAtiva } = useMesas();
  const {
    open: isPedidoOpen,
    onOpen: onPedidoOpen,
    onClose: onPedidoClose,
  } = useDisclosure();
  const {
    open: isFecharOpen,
    onOpen: onFecharOpen,
    onClose: onFecharClose,
  } = useDisclosure();

  const [sessao, setSessao] = useState<SessaoMesa | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSessao, setIsLoadingSessao] = useState(false);

  const loadSessao = useCallback(async () => {
    if (!mesa) return;

    try {
      const sessaoData = await getSessaoAtiva(mesa.id);
      setSessao(sessaoData);
    } catch (error) {
      console.error("Erro ao carregar sessão:", error);
    } finally {
      setIsLoadingSessao(false);
    }
  }, [mesa, getSessaoAtiva]);

  useEffect(() => {
    if (mesa && isOpen) {
      setIsLoadingSessao(true);
      loadSessao();
    }
  }, [mesa, isOpen, loadSessao]);

  const handleAbrirSessao = async () => {
    if (!mesa) return;

    setIsLoading(true);
    try {
      await abrirSessao(mesa.id);
      await loadSessao();
    } catch (error) {
      console.error("Erro ao abrir sessão:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFecharConta = async () => {
    if (!mesa) return;

    setIsLoading(true);
    try {
      await fecharConta(mesa.id);
      onClose();
      onFecharClose();
    } catch (error) {
      console.error("Erro ao fechar conta:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePedidoAdicionado = () => {
    loadSessao(); // Recarregar sessão após adicionar pedido
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "Data inválida";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Data inválida";

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 0) return "Data futura";

    if (diffMins < 60) {
      return `${diffMins} minutos`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      const remainingMins = diffMins % 60;
      return `${diffHours}h ${remainingMins}min`;
    }
  };

  if (!mesa) return null;

  const isMesaOcupada = mesa.status === "OCCUPIED";
  const totalPedidos = sessao?.pedidos?.length || 0;

  return (
    <>
      <AppModal
        isOpen={isOpen}
        onClose={onClose}
        title={`Mesa ${mesa.number} - ${
          isMesaOcupada ? "Ocupada" : "Disponível"
        }`}
      >
        <VStack gap={6} align="stretch">
          {/* Status da Sessão */}
          {isLoadingSessao ? (
            <Flex justify="center" align="center" py={8} direction="column">
              <PizzaSpinner />
              <Text mt={4} color="gray.500">
                Carregando pedidos...
              </Text>
            </Flex>
          ) : sessao ? (
            <Box>
              <HStack justify="space-between" align="center" mb={4}>
                <HStack gap={2}>
                  <FaClock />
                  <Text fontWeight="semibold">
                    Sessão ativa há {formatTime(sessao.criadoEm)}
                  </Text>
                </HStack>
                <Badge colorScheme="blue" variant="subtle">
                  {totalPedidos} pedido{totalPedidos !== 1 ? "s" : ""}
                </Badge>
              </HStack>

              {/* Lista de Pedidos */}
              <VStack gap={3} align="stretch" maxH="300px" overflowY="auto">
                {sessao.pedidos && sessao.pedidos.length > 0 ? (
                  sessao.pedidos.map((pedido, index) => (
                    <PedidoCard key={index} pedido={pedido} index={index} />
                  ))
                ) : (
                  <Box textAlign="center" py={4}>
                    <Text color="gray.500">
                      Nenhum pedido nesta sessão ainda.
                    </Text>
                  </Box>
                )}
              </VStack>

              <Box my={4} borderTop="1px solid" borderColor="gray.200" />

              {/* Total */}
              <HStack justify="space-between" align="center">
                <Text fontSize="lg" fontWeight="bold">
                  Total da Conta
                </Text>
                <Text fontSize="xl" fontWeight="bold" color="orange.500">
                  {formatPrice(sessao.total)}
                </Text>
              </HStack>
            </Box>
          ) : (
            <Box textAlign="center" py={8}>
              <Text color="gray.500" mb={4}>
                Mesa disponível para novos clientes.
              </Text>
            </Box>
          )}

          {/* Ações */}
          <HStack gap={3} justify="flex-end">
            {!sessao ? (
              <PizzaButton
                colorScheme="orange"
                onClick={handleAbrirSessao}
                loading={isLoading}
                loadingText="Abrindo mesa..."
              >
                Abrir Mesa para Cliente
              </PizzaButton>
            ) : (
              <>
                <Button variant="outline" onClick={onPedidoOpen}>
                  <FaPlus />
                  Adicionar Pedido
                </Button>
                <PizzaButton
                  colorScheme="red"
                  onClick={onFecharOpen}
                  loading={isLoading}
                  loadingText="Fechando conta..."
                >
                  <FaMoneyBillWave />
                  Fechar Conta
                </PizzaButton>
              </>
            )}
          </HStack>
        </VStack>
      </AppModal>

      {/* Modal de Adicionar Pedido */}
      <AdicionarPedidoModal
        isOpen={isPedidoOpen}
        onClose={onPedidoClose}
        mesa={mesa}
        onPedidoAdicionado={handlePedidoAdicionado}
      />

      {/* Confirmação de Fechar Conta */}
      {isFecharOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.600"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="modal"
          onClick={onFecharClose}
        >
          <Box
            bg="white"
            _dark={{ bg: "gray.800" }}
            p={6}
            borderRadius="lg"
            maxW="md"
            w="full"
            mx={4}
            onClick={(e) => e.stopPropagation()}
          >
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Fechar Conta
            </Text>
            <Text mb={4}>
              Tem certeza que deseja fechar a conta da Mesa {mesa.number}? O
              total é de {formatPrice(sessao?.total || 0)}.
            </Text>
            <Text fontSize="sm" color="gray.600" mb={6}>
              Esta ação irá liberar a mesa para novos clientes.
            </Text>
            <HStack gap={3} justify="flex-end">
              <Button variant="outline" onClick={onFecharClose}>
                Cancelar
              </Button>
              <PizzaButton colorScheme="red" onClick={handleFecharConta}>
                Fechar Conta
              </PizzaButton>
            </HStack>
          </Box>
        </Box>
      )}
    </>
  );
};

```


---

## 📄 `src/features/mesas/hooks/index.ts`

```typescript
export * from './useMesas';
```


---

## 📄 `src/features/mesas/hooks/useMesas.ts`

```typescript
import { useState, useEffect, useCallback } from "react";
import {
  Mesa,
  MesaStatus,
  CreateMesaData,
  SessaoMesa,
  AdicionarPedidoMesaData,
} from "@/types/mesa";
import { Order } from "@/types/order";
import {
  getMesas,
  getMesaById,
  createMesa,
  abrirSessaoMesa,
  getSessaoAtiva,
  adicionarPedidoMesa,
  fecharConta,
} from "../services/mesasService";

interface UseMesasReturn {
  mesas: Mesa[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (data: CreateMesaData) => Promise<Mesa>;
  getById: (id: string) => Promise<Mesa>;
  abrirSessao: (mesaId: string) => Promise<SessaoMesa>;
  getSessaoAtiva: (mesaId: string) => Promise<SessaoMesa | null>;
  adicionarPedido: (data: AdicionarPedidoMesaData) => Promise<Order>;
  fecharConta: (mesaId: string) => Promise<void>;
}

export const useMesas = (): UseMesasReturn => {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMesas = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getMesas();
      setMesas(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao carregar mesas";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreate = useCallback(
    async (data: CreateMesaData): Promise<Mesa> => {
      try {
        const newMesa = await createMesa(data);
        setMesas((prev) => [...prev, newMesa]);
        return newMesa;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao criar mesa";
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    []
  );

  const handleGetById = useCallback(async (id: string): Promise<Mesa> => {
    try {
      return await getMesaById(id);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao buscar mesa";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const handleAbrirSessao = useCallback(
    async (mesaId: string): Promise<SessaoMesa> => {
      try {
        const sessao = await abrirSessaoMesa(mesaId);
        // Atualizar mesa com sessão ativa
        setMesas((prev) =>
          prev.map((mesa) =>
            mesa.id === mesaId
              ? { ...mesa, sessaoAtiva: sessao, status: MesaStatus.OCCUPIED }
              : mesa
          )
        );
        return sessao;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao abrir sessão";
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    []
  );

  const handleGetSessaoAtiva = useCallback(
    async (mesaId: string): Promise<SessaoMesa | null> => {
      try {
        return await getSessaoAtiva(mesaId);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao buscar sessão ativa";
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    []
  );

  const handleAdicionarPedido = useCallback(
    async (data: AdicionarPedidoMesaData): Promise<Order> => {
      try {
        const result = await adicionarPedidoMesa(data);
        // Refetch mesas para atualizar dados
        await fetchMesas();
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao adicionar pedido";
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    [fetchMesas]
  );

  const handleFecharConta = useCallback(
    async (mesaId: string): Promise<void> => {
      try {
        await fecharConta(mesaId);
        // Atualizar mesa para liberada
        setMesas((prev) =>
          prev.map((mesa) =>
            mesa.id === mesaId
              ? {
                  ...mesa,
                  sessaoAtiva: undefined,
                  status: MesaStatus.AVAILABLE,
                }
              : mesa
          )
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao fechar conta";
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    []
  );

  useEffect(() => {
    fetchMesas();
  }, [fetchMesas]);

  return {
    mesas,
    isLoading,
    error,
    refetch: fetchMesas,
    create: handleCreate,
    getById: handleGetById,
    abrirSessao: handleAbrirSessao,
    getSessaoAtiva: handleGetSessaoAtiva,
    adicionarPedido: handleAdicionarPedido,
    fecharConta: handleFecharConta,
  };
};

```


---

## 📄 `src/features/mesas/index.ts`

```typescript
// Components
export * from './components';

// Hooks
export * from './hooks';

// Services
export * from './services';

// Types
export * from './types';
```


---

## 📄 `src/features/mesas/services/index.ts`

```typescript
export * from './mesasService';
```


---

## 📄 `src/features/mesas/services/mesasService.ts`

```typescript
import {
  Mesa,
  CreateMesaData,
  SessaoMesa,
  AdicionarPedidoMesaData,
} from "@/types/mesa";
import { Order } from "@/types/order";
import { getAuthToken } from "@/utils/cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Tipos para dados da API
interface ApiPedidoItem {
  productId: string;
  quantity: number;
  price?: string;
  product?: {
    id: string;
    name: string;
    price?: string;
  };
}

interface ApiPedido {
  id: string | number;
  sessionId: string;
  items: ApiPedidoItem[];
  total: string | number;
  createdAt: string;
  observacoes?: string;
}

// Listar todas as mesas
export const getMesas = async (): Promise<Mesa[]> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await fetch(`${API_URL}/tables`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Erro ao buscar mesas" }));
    throw new Error(errorData.message || "Erro ao buscar mesas");
  }

  return response.json();
};

// Buscar mesa por ID
export const getMesaById = async (id: string): Promise<Mesa> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await fetch(`${API_URL}/tables/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Erro ao buscar mesa" }));
    throw new Error(errorData.message || "Erro ao buscar mesa");
  }

  return response.json();
};

// Criar nova mesa
export const createMesa = async (data: CreateMesaData): Promise<Mesa> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await fetch(`${API_URL}/tables`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Erro ao criar mesa" }));
    throw new Error(errorData.message || "Erro ao criar mesa");
  }

  return response.json();
};

// Abrir sessão da mesa
export const abrirSessaoMesa = async (mesaId: string): Promise<SessaoMesa> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await fetch(`${API_URL}/tables/${mesaId}/sessions/open`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Erro ao abrir sessão" }));
    throw new Error(errorData.message || "Erro ao abrir sessão da mesa");
  }

  return response.json();
};

// Ver sessão ativa da mesa
export const getSessaoAtiva = async (
  mesaId: string
): Promise<SessaoMesa | null> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await fetch(`${API_URL}/tables/${mesaId}/sessions/active`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null; // Não há sessão ativa
    }
    const errorData = await response
      .json()
      .catch(() => ({ message: "Erro ao buscar sessão ativa" }));
    throw new Error(errorData.message || "Erro ao buscar sessão ativa");
  }

  // Verificar se há conteúdo na resposta antes de tentar parsear JSON
  const contentLength = response.headers.get("content-length");
  if (contentLength === "0" || contentLength === null) {
    return null; // Resposta vazia significa não há sessão ativa
  }

  const sessaoData = await response.json();

  // Buscar pedidos relacionados à sessão
  try {
    const pedidosResponse = await fetch(`${API_URL}/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (pedidosResponse.ok) {
      const pedidosData = await pedidosResponse.json();
      const todosPedidos = Array.isArray(pedidosData)
        ? pedidosData
        : pedidosData.data || [];

      // Filtrar pedidos que pertencem à sessão atual
      const pedidosSessao = todosPedidos.filter(
        (pedido: ApiPedido) => pedido.sessionId === sessaoData.id
      );

      // Transformar pedidos para o formato esperado pelo componente
      const pedidosMesa = pedidosSessao.map((pedido: ApiPedido) => ({
        id: pedido.id.toString(),
        itens: (pedido.items || []).map((item: ApiPedidoItem) => ({
          productId: item.productId,
          quantity: item.quantity,
          product: item.product
            ? {
                id: item.product.id,
                name: item.product.name,
                price: parseFloat(item.product.price || item.price || "0"),
              }
            : undefined,
        })),
        observacoes: pedido.observacoes || "",
        criadoEm: pedido.createdAt,
      }));

      // Calcular total da sessão baseado nos pedidos
      const totalSessao = pedidosSessao.reduce(
        (total: number, pedido: ApiPedido) =>
          total + parseFloat(pedido.total.toString() || "0"),
        0
      );

      return {
        ...sessaoData,
        criadoEm:
          sessaoData.openedAt || sessaoData.createdAt || sessaoData.criadoEm,
        pedidos: pedidosMesa,
        total: totalSessao,
      };
    }
  } catch (error) {
    console.warn("Erro ao buscar pedidos da sessão:", error);
  }

  // Retornar sessão sem pedidos se houver erro
  return {
    ...sessaoData,
    criadoEm:
      sessaoData.openedAt || sessaoData.createdAt || sessaoData.criadoEm,
    pedidos: [],
    total: 0,
  };
};

// Adicionar pedido à mesa
export const adicionarPedidoMesa = async (
  data: AdicionarPedidoMesaData
): Promise<Order> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Erro ao adicionar pedido" }));
    throw new Error(errorData.message || "Erro ao adicionar pedido à mesa");
  }

  return response.json();
};

// Fechar conta (billing)
export const fecharConta = async (mesaId: string): Promise<void> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await fetch(`${API_URL}/tables/${mesaId}/sessions/close`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Erro ao fechar conta" }));
    throw new Error(errorData.message || "Erro ao fechar conta da mesa");
  }

  // Não retorna dados, apenas confirma que a operação foi bem-sucedida
};

```


---

## 📄 `src/features/mesas/types/index.ts`

```typescript
// Re-export types
export * from '@/types/mesa';
```


---

## 📄 `src/features/orders/hooks/useOrders.ts`

```typescript
/**
 * Hook para gerenciar estado de pedidos
 * @version 1.0.0
 * @since 28/12/2025
 */

import { useState, useCallback, useEffect } from "react";
import type { Order, OrderFilters } from "@/types/order";
import { ordersService } from "../services/ordersService";
import { toaster } from "@/components/ui/toaster";

interface UseOrdersOptions {
  /**
   * Se deve buscar automaticamente na montagem
   */
  autoFetch?: boolean;

  /**
   * Filtros para busca
   */
  filters?: OrderFilters;

  /**
   * Se deve buscar pedidos de admin (todos os pedidos)
   */
  adminMode?: boolean;

  /**
   * Tipo específico de pedido para filtrar
   */
  orderType?: "DELIVERY" | "DINE_IN";
}

interface UseOrdersReturn {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createOrder: typeof ordersService.create;
  updateOrderStatus: typeof ordersService.updateStatus;
}

/**
 * Hook para gerenciar lista de pedidos
 */
export const useOrders = (options: UseOrdersOptions = {}): UseOrdersReturn => {
  const { autoFetch = true, filters, adminMode = false, orderType } = options;

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Busca pedidos
   */
  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      let data: Order[];

      if (orderType === "DELIVERY") {
        data = await ordersService.getDelivery(filters || {});
      } else if (orderType === "DINE_IN") {
        data = await ordersService.getDineIn(filters || {});
      } else {
        // Fallback para comportamento anterior
        data = adminMode
          ? await ordersService.getWithFilters(filters || {})
          : await ordersService.getMy(filters || {});
      }

      setOrders(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao buscar pedidos";
      setError(errorMessage);
      toaster.error({
        title: "Erro ao buscar pedidos",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, [filters, adminMode, orderType]);

  /**
   * Refetch manual
   */
  const refetch = useCallback(async () => {
    await fetchOrders();
  }, [fetchOrders]);

  /**
   * Busca automática na montagem
   */
  useEffect(() => {
    if (autoFetch) {
      fetchOrders();
    }
  }, [autoFetch, fetchOrders]);

  /**
   * Wrapper para criar pedido
   */
  const handleCreateOrder = useCallback(
    async (data: Parameters<typeof ordersService.create>[0]) => {
      try {
        const newOrder = await ordersService.create(data);
        setOrders((prev) => [newOrder, ...prev]);
        toaster.success({
          title: "Pedido criado",
          description: "Seu pedido foi criado com sucesso!",
        });
        return newOrder;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao criar pedido";
        toaster.error({
          title: "Erro ao criar pedido",
          description: errorMessage,
        });
        throw err;
      }
    },
    []
  );

  /**
   * Wrapper para atualizar status
   */
  const handleUpdateOrderStatus = useCallback(
    async (orderId: number, status: string) => {
      try {
        const updatedOrder = await ordersService.updateStatus(orderId, status);
        setOrders((prev) =>
          prev.map((order) => (order.id === orderId ? updatedOrder : order))
        );
        toaster.success({
          title: "Status atualizado",
          description: "Status do pedido foi atualizado com sucesso!",
        });
        return updatedOrder;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao atualizar status";
        toaster.error({
          title: "Erro ao atualizar status",
          description: errorMessage,
        });
        throw err;
      }
    },
    []
  );

  return {
    orders,
    isLoading,
    error,
    refetch,
    createOrder: handleCreateOrder,
    updateOrderStatus: handleUpdateOrderStatus,
  };
};

```


---

## 📄 `src/features/orders/services/ordersService.ts`

```typescript
/**
 * Service para gerenciar pedidos (orders)
 * @version 1.0.0
 * @since 28/12/2025
 */

import type {
  Order,
  CreateOrderDto,
  AddOrderItemDto,
  UpdateOrderItemQuantityDto,
  CancelOrderItemDto,
  OrderFilters,
  OrderItem,
} from "@/types/order";
import { getAuthToken } from "@/utils/cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

/**
 * Erro customizado para operações de pedidos
 */
class OrderServiceError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message);
    this.name = "OrderServiceError";
  }
}

/**
 * Helper para fazer requisições autenticadas
 */
const fetchWithAuth = async (
  endpoint: string,
  options?: RequestInit
): Promise<Response> => {
  const token = getAuthToken();
  if (!token) {
    throw new OrderServiceError("Usuário não autenticado", 401);
  }

  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let errorMessage = "Erro ao processar requisição";
    let details;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
      details = errorData;
    } catch {
      // Se não conseguir parsear JSON, usa mensagem genérica
    }

    throw new OrderServiceError(errorMessage, response.status, details);
  }

  return response;
};

/**
 * Helper para tratar erros da API
 */

/**
 * Cria um novo pedido
 */
export const createOrder = async (data: CreateOrderDto): Promise<Order> => {
  try {
    const response = await fetchWithAuth("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    if (error instanceof OrderServiceError) {
      throw error;
    }
    throw new OrderServiceError("Erro ao criar pedido", 500, error);
  }
};

/**
 * Busca todos os pedidos do usuário logado
 */
export const getMyOrders = async (filters?: OrderFilters): Promise<Order[]> => {
  try {
    const params = new URLSearchParams();

    // Sempre passa pelo menos um parâmetro para evitar problemas de validação
    params.append("limit", "100");

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const endpoint = `/orders?${queryString}`;

    const response = await fetchWithAuth(endpoint);
    return response.json();
  } catch (error) {
    if (error instanceof OrderServiceError) {
      throw error;
    }
    throw new OrderServiceError("Erro ao buscar pedidos", 500, error);
  }
};

/**
 * Busca pedidos de delivery (para Kanban)
 */
export const getDeliveryOrders = async (
  filters?: Omit<OrderFilters, "type">
): Promise<Order[]> => {
  return getOrdersWithFilters({ ...filters, type: "DELIVERY" });
};

/**
 * Busca pedidos de mesa (dine-in)
 */
export const getDineInOrders = async (
  filters?: Omit<OrderFilters, "type">
): Promise<Order[]> => {
  return getOrdersWithFilters({ ...filters, type: "DINE_IN" });
};

/**
 * Busca pedido por ID
 */
export const getOrderById = async (orderId: number): Promise<Order> => {
  try {
    const response = await fetchWithAuth(`/orders/${orderId}`);
    return response.json();
  } catch (error) {
    if (error instanceof OrderServiceError) {
      throw error;
    }
    throw new OrderServiceError("Erro ao buscar pedido", 500, error);
  }
};

/**
 * Adiciona item a um pedido existente
 */
export const addItemToOrder = async (
  orderId: number,
  item: AddOrderItemDto
): Promise<OrderItem> => {
  try {
    const response = await fetchWithAuth(`/orders/${orderId}/items`, {
      method: "POST",
      body: JSON.stringify(item),
    });
    return response.json();
  } catch (error) {
    if (error instanceof OrderServiceError) {
      throw error;
    }
    throw new OrderServiceError("Erro ao adicionar item", 500, error);
  }
};

/**
 * Atualiza quantidade de um item do pedido
 */
export const updateItemQuantity = async (
  orderId: number,
  itemId: string,
  data: UpdateOrderItemQuantityDto
): Promise<OrderItem> => {
  try {
    const response = await fetchWithAuth(`/orders/${orderId}/items/${itemId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    if (error instanceof OrderServiceError) {
      throw error;
    }
    throw new OrderServiceError("Erro ao atualizar quantidade", 500, error);
  }
};

/**
 * Cancela um item do pedido
 */
export const cancelOrderItem = async (
  orderId: number,
  itemId: string,
  data: CancelOrderItemDto
): Promise<void> => {
  try {
    await fetchWithAuth(`/orders/${orderId}/items/${itemId}/cancel`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  } catch (error) {
    if (error instanceof OrderServiceError) {
      throw error;
    }
    throw new OrderServiceError("Erro ao cancelar item", 500, error);
  }
};

/**
 * Busca pedidos com filtros (admin/staff)
 */
export const getOrdersWithFilters = async (
  filters?: OrderFilters
): Promise<Order[]> => {
  try {
    const params = new URLSearchParams();

    // Sempre passa pelo menos um parâmetro para evitar problemas de validação
    params.append("limit", "100");

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const endpoint = `/orders?${queryString}`;

    const response = await fetchWithAuth(endpoint);
    return response.json();
  } catch (error) {
    if (error instanceof OrderServiceError) {
      throw error;
    }
    throw new OrderServiceError(
      "Erro ao buscar pedidos com filtros",
      500,
      error
    );
  }
};

/**
 * Atualiza status do pedido (admin/staff)
 */
export const updateOrderStatus = async (
  orderId: number,
  status: string
): Promise<Order> => {
  try {
    const response = await fetchWithAuth(`/orders/${orderId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    return response.json();
  } catch (error) {
    if (error instanceof OrderServiceError) {
      throw error;
    }
    throw new OrderServiceError("Erro ao atualizar status", 500, error);
  }
};

/**
 * Exporta todas as funções do service
 */
export const ordersService = {
  create: createOrder,
  getMy: getMyOrders,
  getById: getOrderById,
  addItem: addItemToOrder,
  updateItemQuantity,
  cancelItem: cancelOrderItem,
  getWithFilters: getOrdersWithFilters,
  getDelivery: getDeliveryOrders,
  getDineIn: getDineInOrders,
  updateStatus: updateOrderStatus,
};

export default ordersService;

```


---

## 📄 `src/features/payments/components/CreditCardForm.tsx`

```typescript
// src/features/payments/components/CreditCardForm.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, VStack, HStack, Text, Button } from "@chakra-ui/react";
import {
  useStripe as useStripeElements,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import { useStripe } from "../contexts/StripeContext";
import { usePayment } from "../hooks/usePayment";
import { toaster } from "@/components/ui/toaster";
import { DevelopmentCard } from "./DevelopmentCard";

// Componentes Field customizados para Chakra UI 3.x
interface FieldRootProps extends React.ComponentProps<typeof Box> {
  children?: React.ReactNode;
}

interface FieldLabelProps extends React.ComponentProps<typeof Text> {
  children?: React.ReactNode;
}

interface FieldErrorTextProps extends React.ComponentProps<typeof Text> {
  children?: React.ReactNode;
}

const Field = {
  Root: ({ children, ...props }: FieldRootProps) => (
    <Box {...props}>{children}</Box>
  ),
  Label: ({ children, ...props }: FieldLabelProps) => (
    <Text as="label" fontWeight="medium" mb={1} {...props}>
      {children}
    </Text>
  ),
  ErrorText: ({ children, ...props }: FieldErrorTextProps) => (
    <Text color="red.500" fontSize="sm" {...props}>
      {children}
    </Text>
  ),
};

interface CreditCardFormProps {
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  onCancel: () => void;
}

const CreditCardFormContent: React.FC<CreditCardFormProps> = ({
  amount,
  onSuccess,
  onCancel,
}) => {
  const stripe = useStripeElements();
  const elements = useElements();
  const { paymentIntent, isLoading } = usePayment();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !paymentIntent) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      });

      if (error) {
        toaster.create({
          title: "Erro no pagamento",
          description: error.message || "Erro desconhecido",
          type: "error",
        });
      } else {
        toaster.create({
          title: "Pagamento realizado!",
          description: "Seu pagamento foi processado com sucesso.",
          type: "success",
        });
        onSuccess(paymentIntent.id);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      toaster.create({
        title: "Erro no pagamento",
        description: message,
        type: "error",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSimulatePayment = () => {
    // Simulação para desenvolvimento
    const mockPaymentIntentId = `pi_mock_${Date.now()}`;
    toaster.create({
      title: "Pagamento Simulado!",
      description: "Em produção, isso seria processado pelo Stripe.",
      type: "success",
    });
    onSuccess(mockPaymentIntentId);
  };

  return (
    <Box p={6} maxW="600px" mx="auto">
      <VStack gap={6} align="stretch">
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Pagamento com Cartão
          </Text>
          <Text fontSize="lg" color="gray.600">
            Valor: R$ {(amount / 100).toFixed(2)}
          </Text>
        </Box>

        {/* Card de desenvolvimento */}
        <Box display="flex" justifyContent="center">
          <DevelopmentCard />
        </Box>

        {/* Elemento de pagamento seguro do Stripe */}
        <Box as="form" onSubmit={handleSubmit}>
          <VStack gap={4} align="stretch">
            <Field.Root>
              <Field.Label>Informações do Cartão</Field.Label>
              <Box
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                p={4}
                minH="120px"
                bg="white"
                style={{ pointerEvents: "auto" }}
              >
                <PaymentElement
                  options={{
                    layout: "auto",
                  }}
                />
              </Box>
            </Field.Root>

            <Box
              p={4}
              bg="blue.50"
              borderRadius="md"
              border="1px solid"
              borderColor="blue.200"
            >
              <Text fontSize="sm" color="blue.800">
                🔒 Stripe Elements garante que os dados do cartão nunca tocam
                seu servidor. O processamento é feito diretamente com o Stripe.
              </Text>
            </Box>

            <HStack gap={4} pt={4}>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                flex={1}
                disabled={isProcessing || isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                colorScheme="blue"
                flex={1}
                loading={isProcessing || isLoading}
                loadingText="Processando..."
                disabled={!stripe || !paymentIntent}
              >
                Pagar R$ {(amount / 100).toFixed(2)}
              </Button>
              {!paymentIntent && (
                <Button
                  type="button"
                  variant="outline"
                  colorScheme="orange"
                  onClick={handleSimulatePayment}
                  flex={1}
                >
                  Simular Pagamento
                </Button>
              )}
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export const CreditCardForm: React.FC<CreditCardFormProps> = (props) => {
  const { paymentIntent, createPaymentIntent, isLoading } = usePayment();
  const { stripe } = useStripe();
  const hasCreatedIntent = useRef(false);

  // Criar PaymentIntent quando o componente montar (uma única vez)
  useEffect(() => {
    if (!hasCreatedIntent.current && !paymentIntent && !isLoading) {
      hasCreatedIntent.current = true;
      createPaymentIntent(props.amount).catch((error) => {
        console.error("Erro ao criar PaymentIntent:", error);
        toaster.create({
          title: "Erro",
          description:
            "Não foi possível preparar o pagamento. Tente novamente.",
          type: "error",
        });
      });
    }
  }, [paymentIntent, createPaymentIntent, isLoading, props.amount]);

  if (!stripe) {
    return (
      <Box p={6} textAlign="center">
        <Text color="red.500">
          Erro: Stripe não foi inicializado. Verifique a chave
          NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.
        </Text>
      </Box>
    );
  }

  if (!paymentIntent) {
    return (
      <Box p={6} textAlign="center">
        <Text>Preparando pagamento...</Text>
        <Text fontSize="sm" color="gray.500" mt={2}>
          Criando PaymentIntent no servidor...
        </Text>
      </Box>
    );
  }

  return (
    <Elements
      stripe={stripe}
      options={{
        clientSecret: paymentIntent.client_secret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#007bff",
            colorBackground: "#ffffff",
            colorText: "#30313d",
            colorDanger: "#df1b41",
            fontFamily: "Ideal Sans, system-ui, sans-serif",
            spacingUnit: "2px",
            borderRadius: "6px",
          },
        },
        locale: "pt-BR",
      }}
    >
      <CreditCardFormContent {...props} />
    </Elements>
  );
};

```


---

## 📄 `src/features/payments/components/DevelopmentCard.tsx`

```typescript
// src/features/payments/components/DevelopmentCard.tsx

"use client";

import React from "react";
import { Box, Text, VStack, Icon } from "@chakra-ui/react";
import { FaTools } from "react-icons/fa";

/**
 * Componente placeholder para funcionalidades em desenvolvimento
 * Segue os princípios SOLID (Single Responsibility) e Clean Code
 */
export const DevelopmentCard: React.FC = () => {
  return (
    <Box
      w="350px"
      h="220px"
      bg="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      borderRadius="lg"
      p={6}
      color="white"
      position="relative"
      boxShadow="lg"
      border="2px dashed"
      borderColor="whiteAlpha.600"
    >
      <VStack gap={4} align="center" justify="center" h="full">
        <Icon as={FaTools} boxSize="3rem" />
        <VStack gap={1} textAlign="center">
          <Text fontSize="lg" fontWeight="bold">
            Em Desenvolvimento
          </Text>
          <Text fontSize="sm" opacity={0.9}>
            Preview do cartão será implementado em breve
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

```


---

## 📄 `src/features/payments/components/index.ts`

```typescript
// src/features/payments/components/index.ts

export { CreditCardForm } from "./CreditCardForm";
export { DevelopmentCard } from "./DevelopmentCard";

```


---

## 📄 `src/features/payments/contexts/index.ts`

```typescript
// src/features/payments/contexts/index.ts

export { StripeProvider, useStripe } from "./StripeContext";

```


---

## 📄 `src/features/payments/contexts/StripeContext.tsx`

```typescript
// src/features/payments/contexts/StripeContext.tsx

"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";

interface StripeContextType {
  stripe: Stripe | null;
}

const StripeContext = createContext<StripeContextType | undefined>(undefined);

// Stripe promise - será inicializado uma vez
let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

interface StripeProviderProps {
  children: ReactNode;
}

export const StripeProvider = ({ children }: StripeProviderProps) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    getStripe().then(setStripe);
  }, []);

  return (
    <StripeContext.Provider value={{ stripe }}>
      {children}
    </StripeContext.Provider>
  );
};

export const useStripe = () => {
  const context = useContext(StripeContext);
  if (context === undefined) {
    throw new Error("useStripe must be used within a StripeProvider");
  }
  return context;
};

```


---

## 📄 `src/features/payments/hooks/index.ts`

```typescript
// src/features/payments/hooks/index.ts

export { usePayment } from "./usePayment";

```


---

## 📄 `src/features/payments/hooks/usePayment.ts`

```typescript
// src/features/payments/hooks/usePayment.ts

"use client";

import { useState } from "react";
import { useStripe } from "../contexts/StripeContext";
import { stripeService } from "../services/stripeService";
import { PaymentIntent } from "../types/payment";
import { toaster } from "@/components/ui/toaster";

export const usePayment = () => {
  const { stripe } = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(
    null
  );

  /**
   * Cria um Payment Intent para o valor especificado
   */
  const createPaymentIntent = async (amount: number) => {
    setIsLoading(true);
    try {
      const intent = await stripeService.createPaymentIntent(amount);
      setPaymentIntent(intent);
      return intent;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao criar Payment Intent";
      toaster.create({
        title: "Erro",
        description: message,
        type: "error",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Processa o pagamento usando Stripe Elements (melhor prática)
   */
  const processPayment = async (): Promise<{
    success: boolean;
    paymentIntentId?: string;
  }> => {
    if (!stripe || !paymentIntent) {
      throw new Error("Stripe não inicializado ou Payment Intent não criado");
    }

    setIsLoading(true);
    try {
      const { error } = await stripe.confirmPayment({
        clientSecret: paymentIntent.client_secret,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      });

      if (error) {
        throw new Error(error.message || "Erro no processamento do pagamento");
      }

      // Se chegou aqui sem erro, o pagamento foi bem-sucedido
      return { success: true, paymentIntentId: paymentIntent.id };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Erro no processamento do pagamento";
      toaster.create({
        title: "Erro no pagamento",
        description: message,
        type: "error",
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Limpa o estado do pagamento
   */
  const clearPayment = () => {
    setPaymentIntent(null);
  };

  return {
    stripe,
    paymentIntent,
    isLoading,
    createPaymentIntent,
    processPayment,
    clearPayment,
  };
};

```


---

## 📄 `src/features/payments/index.ts`

```typescript
// src/features/payments/index.ts

// Types
export type {
  PaymentIntent,
  CardData,
  PaymentData,
  StripeError,
  CardType,
} from "./types/payment";

// Contexts
export { StripeProvider, useStripe } from "./contexts/StripeContext";

// Services
export { stripeService } from "./services/stripeService";

// Hooks
export { usePayment } from "./hooks/usePayment";

// Components
export { CreditCardForm } from "./components/CreditCardForm";
export { DevelopmentCard } from "./components/DevelopmentCard";

```


---

## 📄 `src/features/payments/services/index.ts`

```typescript
// src/features/payments/services/index.ts

export { stripeService } from "./stripeService";

```


---

## 📄 `src/features/payments/services/stripeService.ts`

```typescript
// src/features/payments/services/stripeService.ts

import { PaymentIntent } from "../types/payment";
import { getAuthToken } from "@/utils/cookies";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const stripeService = {
  /**
   * Cria um Payment Intent no backend
   */
  async createPaymentIntent(amount: number): Promise<PaymentIntent> {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Usuário não autenticado.");
    }

    const response = await fetch(`${API_BASE_URL}/payments/create-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      const error = await response.json().catch(() => ({ message: errorText }));
      throw new Error(error.message || "Erro ao criar Payment Intent");
    }

    const result = await response.json();
    return result;
  },
};

```


---

## 📄 `src/features/payments/types/index.ts`

```typescript
// src/features/payments/types/index.ts

export * from "./payment";

```


---

## 📄 `src/features/payments/types/payment.ts`

```typescript
// src/features/payments/types/payment.ts

export interface PaymentIntent {
  id: string;
  client_secret: string;
  amount: number;
  currency: string;
  status: string;
}

export interface CardData {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
}

export interface PaymentData {
  paymentIntentId: string;
  amount: number;
  currency: string;
}

export interface StripeError {
  type: string;
  code?: string;
  message: string;
}

export type CardType =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "diners"
  | "jcb"
  | "unknown";

```


---

## 📄 `src/features/pedidos/components/index.ts`

```typescript
export { PedidosPageLayout } from "./PedidosPageLayout";
export { PedidosKanban } from "./PedidosKanban";
export { PedidosGrid } from "./PedidosGrid";
export { PedidosFilters } from "./PedidosFilters";
export { PedidoCard } from "./PedidoCard";
export { TablesList } from "./TablesList";

```


---

## 📄 `src/features/pedidos/components/MeusPedidosPageLayout.tsx`

```typescript
"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  Grid,
  Badge,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaClock, FaCheckCircle, FaTruck, FaTimesCircle } from "react-icons/fa";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { PizzaCard, PizzaLoading } from "@/components/ui";
import { formatCurrency } from "@/utils/format";
import type { Order } from "@/types/order";

/**
 * Função simples para formatar data.
 */
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Componente para exibir o status do pedido com ícone e cor apropriados.
 */
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PENDENTE":
        return { color: "yellow", icon: FaClock, label: "Pendente" };
      case "EM_PREPARO":
        return { color: "blue", icon: FaClock, label: "Em Preparo" };
      case "PRONTO":
        return { color: "green", icon: FaCheckCircle, label: "Pronto" };
      case "A_CAMINHO":
        return { color: "purple", icon: FaTruck, label: "A Caminho" };
      case "ENTREGUE":
        return { color: "green", icon: FaCheckCircle, label: "Entregue" };
      case "CANCELADO":
        return { color: "red", icon: FaTimesCircle, label: "Cancelado" };
      default:
        return { color: "gray", icon: FaClock, label: status };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge colorScheme={config.color} variant="subtle" px={3} py={1}>
      <Flex align="center" gap={2}>
        <Icon as={config.icon} />
        <Text>{config.label}</Text>
      </Flex>
    </Badge>
  );
};

/**
 * Componente para exibir um pedido individual.
 */
const PedidoCard = ({ pedido }: { pedido: Order }) => {
  const totalItems = pedido.items?.length || 0;
  const totalValor = parseFloat(pedido.total) || 0;

  return (
    <PizzaCard className="p-6">
      <Flex justify="space-between" align="start" mb={4}>
        <Box>
          <Heading size="md" mb={2}>
            Pedido #{pedido.id}
          </Heading>
          <Text color="gray.600" fontSize="sm">
            {formatDate(pedido.createdAt)}
          </Text>
        </Box>
        <StatusBadge status={pedido.status} />
      </Flex>

      <Box mb={4}>
        <Text fontWeight="medium" mb={2}>
          {totalItems} item{totalItems !== 1 ? "s" : ""}
        </Text>
        <VStack align="start" gap={1}>
          {pedido.items?.map((item, index) => (
            <Text key={index} fontSize="sm" color="gray.600">
              • {item.product.name} (x{item.quantity}) -{" "}
              {formatCurrency(parseFloat(item.subtotal))}
            </Text>
          ))}
        </VStack>
      </Box>

      <Flex justify="space-between" align="center">
        <Box>
          <Text fontSize="sm" color="gray.600">
            Tipo: {pedido.type === "DELIVERY" ? "Entrega" : "Mesa"}
          </Text>
        </Box>
        <Box textAlign="right">
          <Text fontWeight="bold" fontSize="lg">
            {formatCurrency(totalValor)}
          </Text>
        </Box>
      </Flex>
    </PizzaCard>
  );
};

/**
 * Layout principal da página "Meus Pedidos".
 * Mostra o histórico de pedidos do usuário logado.
 */
export const MeusPedidosPageLayout = () => {
  const { orders, isLoading, error } = useOrders();

  if (isLoading) {
    return (
      <Box p={{ base: 4, md: 8 }}>
        <PizzaLoading message="Carregando seus pedidos..." />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={{ base: 4, md: 8 }}>
        <Text color="red.500">Erro ao carregar pedidos: {error}</Text>
      </Box>
    );
  }

  return (
    <Box p={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      <VStack gap={6} align="stretch">
        <Box>
          <Heading as="h1" size="xl" mb={2}>
            Meus Pedidos
          </Heading>
          <Text color="gray.600">
            Acompanhe o status de todos os seus pedidos
          </Text>
        </Box>

        {orders.length === 0 ? (
          <Box textAlign="center" py={12}>
            <Text fontSize="lg" color="gray.500" mb={4}>
              Você ainda não fez nenhum pedido.
            </Text>
            <Text color="gray.400">
              Que tal experimentar uma de nossas deliciosas pizzas?
            </Text>
          </Box>
        ) : (
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            {orders.map((pedido) => (
              <PedidoCard key={pedido.id} pedido={pedido} />
            ))}
          </Grid>
        )}
      </VStack>
    </Box>
  );
};

```


---

## 📄 `src/features/pedidos/components/PedidoCard.tsx`

```typescript
"use client";

import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { Order, OrderStatus } from "@/types/order";

const ORDER_STATUS_VALUES: OrderStatus[] = [
  "PENDENTE",
  "EM_PREPARO",
  "A_CAMINHO",
  "PRONTO",
  "ENTREGUE",
  "CANCELADO",
];

interface PedidoCardProps {
  pedido: Order;
  onUpdateStatus?: (pedidoId: number, status: OrderStatus) => void;
  viewMode?: "kanban" | "grid";
}

export const PedidoCard = ({
  pedido,
  onUpdateStatus,
  viewMode = "kanban",
}: PedidoCardProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      bg="background.primary"
      borderColor="background.tertiary"
      shadow="sm"
      draggable={!!onUpdateStatus}
      onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("text/plain", pedido.id.toString());
      }}
      cursor={onUpdateStatus ? "grab" : "default"}
      _active={{ cursor: onUpdateStatus ? "grabbing" : "default" }}
    >
      <Flex justify="space-between" align="flex-start" gap={3}>
        <Box flex={1}>
          {/* O Heading herdará a cor 'text.primary' do tema global */}
          <Heading size="md">Pedido #{pedido.id}</Heading>
          {/* ALTERADO: Cor do texto secundário */}
          <Text fontSize="sm" color="text.secondary">
            Tipo: {pedido.type === "DELIVERY" ? "Entrega" : "Mesa"}
          </Text>
        </Box>

        {viewMode === "grid" && (
          <Box
            px={3}
            py={2}
            borderRadius="md"
            fontSize="xs"
            fontWeight="700"
            textAlign="center"
            minW="80px"
            bg={
              pedido.status === "PENDENTE"
                ? "#f3e8e8"
                : pedido.status === "EM_PREPARO"
                ? "#fff3e0"
                : pedido.status === "A_CAMINHO"
                ? "#e3f2fd"
                : pedido.status === "PRONTO"
                ? "#e8f5e8"
                : pedido.status === "ENTREGUE"
                ? "#e8f5e9"
                : "#ffebee"
            }
            color={
              pedido.status === "PENDENTE"
                ? "#d32f2f"
                : pedido.status === "EM_PREPARO"
                ? "#f57c00"
                : pedido.status === "A_CAMINHO"
                ? "#1976d2"
                : pedido.status === "PRONTO"
                ? "#388e3c"
                : pedido.status === "ENTREGUE"
                ? "#388e3c"
                : "#c62828"
            }
            border="1px solid"
            borderColor={
              pedido.status === "PENDENTE"
                ? "#ef5350"
                : pedido.status === "EM_PREPARO"
                ? "#ffb74d"
                : pedido.status === "A_CAMINHO"
                ? "#64b5f6"
                : pedido.status === "ENTREGUE"
                ? "#81c784"
                : "#ef5350"
            }
          >
            {pedido.status}
          </Box>
        )}
      </Flex>

      <Box mt={3}>
        {pedido.items.map((item) => (
          // O texto dos itens também herdará a cor correta
          <Text key={item.id} fontSize="sm">
            - {item.product.name}
          </Text>
        ))}
      </Box>

      {onUpdateStatus && viewMode === "grid" && (
        <Box mt={3}>
          <select
            value={pedido.status}
            onChange={(e) =>
              onUpdateStatus(pedido.id, e.target.value as OrderStatus)
            }
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.375rem",
              border: "1px solid #4b5563",
              backgroundColor: "#2d3748",
              fontSize: "0.875rem",
              color: "#e2e8f0",
              fontFamily: "Roboto, sans-serif",
              transition: "all 0.2s",
            }}
          >
            {ORDER_STATUS_VALUES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </Box>
      )}
    </Box>
  );
};

```


---

## 📄 `src/features/pedidos/components/PedidosFilters.tsx`

```typescript
"use client";

import { Box, Input, Flex, Button, HStack } from "@chakra-ui/react";
import { OrderStatus } from "@/types/order";
import { X } from "lucide-react";

interface PedidosFiltersProps {
  statusFilters: OrderStatus[];
  clienteFilter: string;
  pedidoFilter: string;
  onStatusChange: (statuses: OrderStatus[]) => void;
  onClienteChange: (nome: string) => void;
  onPedidoChange: (numero: string) => void;
}

const statusConfig: Record<
  OrderStatus,
  { label: string; bgColor: string; borderColor: string; activeBgColor: string }
> = {
  PENDENTE: {
    label: "Pendente",
    bgColor: "#f5f5f5",
    borderColor: "#e0e0e0",
    activeBgColor: "#fff3e0",
  },
  EM_PREPARO: {
    label: "Em Preparo",
    bgColor: "#f5f5f5",
    borderColor: "#e0e0e0",
    activeBgColor: "#fff3e0",
  },
  A_CAMINHO: {
    label: "A Caminho",
    bgColor: "#f5f5f5",
    borderColor: "#e0e0e0",
    activeBgColor: "#e3f2fd",
  },
  PRONTO: {
    label: "Pronto",
    bgColor: "#f5f5f5",
    borderColor: "#e0e0e0",
    activeBgColor: "#e8f5e9",
  },
  ENTREGUE: {
    label: "Entregue",
    bgColor: "#f5f5f5",
    borderColor: "#e0e0e0",
    activeBgColor: "#e8f5e9",
  },
  CANCELADO: {
    label: "Cancelado",
    bgColor: "#f5f5f5",
    borderColor: "#e0e0e0",
    activeBgColor: "#ffebee",
  },
};

export const PedidosFilters = ({
  statusFilters,
  clienteFilter,
  pedidoFilter,
  onStatusChange,
  onClienteChange,
  onPedidoChange,
}: PedidosFiltersProps) => {
  const handleStatusToggle = (status: OrderStatus) => {
    if (statusFilters.includes(status)) {
      onStatusChange(statusFilters.filter((s) => s !== status));
    } else {
      onStatusChange([...statusFilters, status]);
    }
  };

  const handleSelectAllStatuses = () => {
    const allStatuses = [
      "PENDENTE",
      "EM_PREPARO",
      "A_CAMINHO",
      "ENTREGUE",
      "CANCELADO",
    ] as unknown as OrderStatus[];
    onStatusChange(allStatuses);
  };

  const handleClearFilters = () => {
    onStatusChange([]);
    onClienteChange("");
    onPedidoChange("");
  };

  const hasActiveFilters =
    statusFilters.length > 0 || clienteFilter || pedidoFilter;

  return (
    <Box
      mb={6}
      p={4}
      bg="background.secondary"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="background.tertiary"
    >
      {/* Filtro por Status - Badges Selecionáveis */}
      <Box mb={4}>
        <label
          style={{
            fontSize: "0.875rem",
            color: "#757575",
            display: "block",
            marginBottom: "0.5rem",
          }}
        >
          Status
        </label>
        <HStack gap={2} flexWrap="wrap">
          {(Object.keys(statusConfig) as OrderStatus[]).map((status) => {
            const isSelected = statusFilters.includes(status);
            const config = statusConfig[status];
            return (
              <Button
                key={status}
                size="sm"
                onClick={() => handleStatusToggle(status)}
                bg={isSelected ? config.activeBgColor : config.bgColor}
                borderWidth="1px"
                borderColor={isSelected ? "brand.500" : config.borderColor}
                color={isSelected ? "brand.600" : "#424242"}
                _hover={{
                  borderColor: "brand.400",
                  bg: isSelected ? config.activeBgColor : "#fafafa",
                }}
                fontWeight={isSelected ? "600" : "500"}
                transition="all 0.2s"
              >
                {config.label}
              </Button>
            );
          })}
        </HStack>
        <HStack gap={2} mt={2}>
          <Button
            size="xs"
            variant="ghost"
            onClick={handleSelectAllStatuses}
            fontSize="0.75rem"
          >
            Selecionar Todos
          </Button>
          {statusFilters.length > 0 && (
            <Button
              size="xs"
              variant="ghost"
              onClick={() => onStatusChange([])}
              fontSize="0.75rem"
            >
              Remover Filtro Status
            </Button>
          )}
        </HStack>
      </Box>

      <Flex gap={4} flexWrap="wrap" align="flex-end">
        {/* Filtro por Número do Pedido */}
        <Box minW="120px">
          <label style={{ fontSize: "0.875rem", color: "#757575" }}>
            Pedido #
          </label>
          <Input
            placeholder="Nº do pedido"
            value={pedidoFilter}
            onChange={(e) => onPedidoChange(e.target.value)}
            mt={1}
            size="sm"
            type="number"
            bg="background.primary"
            borderColor="background.tertiary"
            color="text.primary"
            _placeholder={{ color: "text.secondary" }}
          />
        </Box>

        {/* Filtro por Nome do Cliente */}
        <Box flex={1} minW="200px">
          <label style={{ fontSize: "0.875rem", color: "#757575" }}>
            Cliente
          </label>
          <Input
            placeholder="Digite o nome do cliente..."
            value={clienteFilter}
            onChange={(e) => onClienteChange(e.target.value)}
            mt={1}
            size="sm"
            bg="background.primary"
            borderColor="background.tertiary"
            color="text.primary"
            _placeholder={{ color: "text.secondary" }}
          />
        </Box>

        {hasActiveFilters && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleClearFilters}
            colorScheme="brand"
          >
            <Flex align="center" gap={2}>
              <X size={16} />
              Limpar Tudo
            </Flex>
          </Button>
        )}
      </Flex>
    </Box>
  );
};

```


---

## 📄 `src/features/pedidos/components/PedidosGrid.tsx`

```typescript
"use client";

import { SimpleGrid, Box } from "@chakra-ui/react";
import { Order, OrderStatus } from "@/types/order";
import { PedidoCard } from "./PedidoCard";

interface PedidosGridProps {
  pedidos?: Order[];
  onUpdateStatus?: (pedidoId: number, status: OrderStatus) => void;
}

export const PedidosGrid = ({
  pedidos = [],
  onUpdateStatus,
}: PedidosGridProps) => {
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap="4">
        {pedidos.map((pedido) => (
          <PedidoCard
            key={pedido.id}
            pedido={pedido}
            onUpdateStatus={onUpdateStatus}
            viewMode="grid"
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

```


---

## 📄 `src/features/pedidos/components/PedidosKanban.tsx`

```typescript
"use client";

import {
  Box,
  Heading,
  SimpleGrid,
  Flex,
  VStack,
  TagRoot,
} from "@chakra-ui/react";
import { useState } from "react";
import { Order, OrderStatus } from "@/types/order";
import { PedidoCard } from "./PedidoCard";

interface PedidosKanbanProps {
  pedidos?: Order[];
  onUpdateStatus?: (pedidoId: number, status: OrderStatus) => void;
}

const KanbanColumn = ({
  title,
  status,
  pedidos,
  onUpdateStatus,
}: {
  title: string;
  status: OrderStatus;
  pedidos: Order[];
  onUpdateStatus?: (pedidoId: number, status: OrderStatus) => void;
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <Box
      bg="background.secondary"
      p={4}
      borderRadius="lg"
      minH="400px"
      borderWidth="1px"
      borderColor="background.tertiary"
      transition="all 0.2s"
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={(e: React.DragEvent<HTMLDivElement>) => {
        // Verificar se está saindo realmente da coluna
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsDragOver(false);
        }
      }}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        if (onUpdateStatus) {
          const pedidoId = parseInt(e.dataTransfer.getData("text/plain"), 10);
          onUpdateStatus(pedidoId, status);
        }
      }}
    >
      <Flex align="center" mb={4}>
        <TagRoot size="lg" variant="solid" colorScheme="blue">
          {pedidos.length}
        </TagRoot>

        <Heading size="md" color="text.primary" ml={3}>
          {title}
        </Heading>
      </Flex>
      <VStack gap="4" align="stretch">
        {pedidos.map((pedido) => (
          <PedidoCard
            key={pedido.id}
            pedido={pedido}
            onUpdateStatus={onUpdateStatus}
            viewMode="kanban"
          />
        ))}
        {isDragOver && (
          <Box
            borderWidth="2px"
            borderRadius="lg"
            p={4}
            borderColor="brand.primary"
            borderStyle="dashed"
            bg="background.primary"
            minH="80px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="brand.primary"
            fontSize="sm"
            fontWeight="600"
            transition="all 0.2s"
          >
            Solte aqui para mover
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export const PedidosKanban = ({
  pedidos = [],
  onUpdateStatus,
}: PedidosKanbanProps) => {
  const pedidosPorStatus = (status: OrderStatus) =>
    pedidos.filter((p) => p.status === status);

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="5">
        <KanbanColumn
          title="Pendentes"
          status="PENDENTE"
          pedidos={pedidosPorStatus("PENDENTE")}
          onUpdateStatus={onUpdateStatus}
        />
        <KanbanColumn
          title="Em Preparo"
          status="EM_PREPARO"
          pedidos={pedidosPorStatus("EM_PREPARO")}
          onUpdateStatus={onUpdateStatus}
        />
        <KanbanColumn
          title="A Caminho"
          status="A_CAMINHO"
          pedidos={pedidosPorStatus("A_CAMINHO")}
          onUpdateStatus={onUpdateStatus}
        />
        <KanbanColumn
          title="Entregues"
          status="ENTREGUE"
          pedidos={pedidosPorStatus("ENTREGUE")}
          onUpdateStatus={onUpdateStatus}
        />
      </SimpleGrid>
    </Box>
  );
};

```


---

## 📄 `src/features/pedidos/components/PedidosPageLayout.tsx`

```typescript
"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LayoutGrid, KanbanSquare } from "lucide-react";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { usePermissions } from "@/hooks/usePermissions";
import { PedidosKanban } from "./PedidosKanban";
import { PedidosGrid } from "./PedidosGrid";
import { PedidosFilters } from "./PedidosFilters";
import { PizzaLoading } from "@/components/ui";
import { Order, OrderStatus } from "@/types/order";

type ViewMode = "kanban" | "grid";

/**
 * Componente "Container" ou "Layout" da página de Pedidos.
 * Responsabilidade Única: Orquestrar a lógica da página e passar os dados
 * do hook para os componentes de UI.
 * Usa o hook correto baseado nas permissões do usuário.
 */
export const PedidosPageLayout = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("kanban");
  const [statusFilters, setStatusFilters] = useState<OrderStatus[]>([]);
  const [clienteFilter, setClienteFilter] = useState<string>("");
  const [pedidoFilter, setPedidoFilter] = useState<string>("");
  const { canViewAllOrders } = usePermissions();

  // Usa o hook unificado com filtro para delivery quando admin
  const ordersHook = useOrders({
    adminMode: canViewAllOrders(),
    orderType: canViewAllOrders() ? "DELIVERY" : undefined,
  });

  const { orders, isLoading } = ordersHook;

  // handleUpdateStatus só existe para funcionários/admins
  const handleUpdateStatus = canViewAllOrders()
    ? ordersHook.updateOrderStatus
    : undefined;

  // Filtrar pedidos baseado nos filtros ativos
  const filteredPedidos = orders.filter((pedido: Order) => {
    const statusMatch =
      statusFilters.length === 0 || statusFilters.includes(pedido.status);
    const clienteMatch = !clienteFilter || true; // TODO: Implementar filtragem por cliente quando houver API
    const pedidoMatch =
      !pedidoFilter || pedido.id.toString().includes(pedidoFilter);

    return statusMatch && clienteMatch && pedidoMatch;
  });

  return (
    <VStack w="full" p={{ base: 4, md: 8 }} gap={6} align="stretch">
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="xl">
          {canViewAllOrders() ? "Gestão de Pedidos" : "Meus Pedidos"}
        </Heading>
        <Flex gap={2}>
          <Button
            onClick={() => setViewMode("kanban")}
            variant={viewMode === "kanban" ? "solid" : "outline"}
          >
            <Flex align="center" gap="2">
              <Icon as={KanbanSquare} />
              <Text>Kanban</Text>
            </Flex>
          </Button>
          {/* CORREÇÃO: Ícone colocado dentro do botão */}
          <Button
            onClick={() => setViewMode("grid")}
            variant={viewMode === "grid" ? "solid" : "outline"}
          >
            <Flex align="center" gap="2">
              <Icon as={LayoutGrid} />
              <Text>Grade</Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>

      {isLoading ? (
        <PizzaLoading message="Carregando pedidos..." />
      ) : (
        <>
          <PedidosFilters
            statusFilters={statusFilters}
            clienteFilter={clienteFilter}
            pedidoFilter={pedidoFilter}
            onStatusChange={setStatusFilters}
            onClienteChange={setClienteFilter}
            onPedidoChange={setPedidoFilter}
          />

          {filteredPedidos.length === 0 ? (
            <Box textAlign="center" py={8}>
              <Text color="text.secondary">
                Nenhum pedido encontrado com os filtros aplicados
              </Text>
            </Box>
          ) : (
            <Box>
              {viewMode === "kanban" ? (
                <PedidosKanban
                  pedidos={filteredPedidos}
                  onUpdateStatus={handleUpdateStatus}
                />
              ) : (
                <PedidosGrid
                  pedidos={filteredPedidos}
                  onUpdateStatus={handleUpdateStatus}
                />
              )}
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

```


---

## 📄 `src/features/pedidos/components/TablesList.tsx`

```typescript
"use client";

import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Card,
  Badge,
  Heading,
} from "@chakra-ui/react";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { PizzaLoading } from "@/components/ui";
import { Order } from "@/types/order";

/**
 * Componente para exibir pedidos de mesa (DINE_IN)
 * Mostra pedidos agrupados por mesa
 */
export const TablesList: React.FC = () => {
  const { orders, isLoading } = useOrders({
    adminMode: true,
    orderType: "DINE_IN",
  });

  // Agrupar pedidos por mesa
  const ordersByTable = orders.reduce((acc, order) => {
    const tableNumber = order.session?.table?.number || 0;
    if (!acc[tableNumber]) {
      acc[tableNumber] = [];
    }
    acc[tableNumber].push(order);
    return acc;
  }, {} as Record<number, Order[]>);

  if (isLoading) {
    return <PizzaLoading message="Carregando pedidos de mesa..." />;
  }

  return (
    <VStack w="full" p={{ base: 4, md: 8 }} gap={6} align="stretch">
      <Heading as="h1" size="xl">
        🍽️ Pedidos de Mesa
      </Heading>

      {Object.keys(ordersByTable).length === 0 ? (
        <Box textAlign="center" py={8}>
          <Text color="text.secondary">Nenhum pedido de mesa encontrado</Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {Object.entries(ordersByTable).map(([tableNumber, tableOrders]) => (
            <Card.Root key={tableNumber} size="sm">
              <Card.Header>
                <HStack justify="space-between">
                  <Heading size="md">Mesa {tableNumber}</Heading>
                  <Badge colorScheme="blue">
                    {tableOrders.length} pedido
                    {tableOrders.length !== 1 ? "s" : ""}
                  </Badge>
                </HStack>
              </Card.Header>
              <Card.Body>
                <VStack gap={3} align="stretch">
                  {tableOrders.map((order) => (
                    <Box
                      key={order.id}
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                      bg="background.secondary"
                    >
                      <HStack justify="space-between" mb={2}>
                        <Text fontWeight="bold">Pedido #{order.id}</Text>
                        <Badge
                          colorScheme={
                            order.status === "PENDENTE"
                              ? "gray"
                              : order.status === "EM_PREPARO"
                              ? "yellow"
                              : order.status === "PRONTO"
                              ? "green"
                              : "red"
                          }
                        >
                          {order.status}
                        </Badge>
                      </HStack>

                      <Text fontSize="sm" color="text.secondary" mb={2}>
                        👤 {order.user?.nome || "Cliente"}
                      </Text>

                      <VStack gap={1} align="stretch" mb={2}>
                        {order.items.map((item) => (
                          <Text key={item.id} fontSize="sm">
                            {item.quantity}x {item.product.name}
                          </Text>
                        ))}
                      </VStack>

                      <Text fontWeight="bold" color="brand.primary">
                        Total: R$ {order.total}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </Card.Body>
            </Card.Root>
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};

```


---

## 📄 `src/features/produtos/components/index.ts`

```typescript
export * from "./ProdutosList";
export * from "./ProdutoFormModal";
export * from "./ProdutoCard";

```


---

## 📄 `src/features/produtos/components/ProductCard.tsx`

```typescript
"use client";

import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import type { Product } from "@/types/product";
import { parseProductPrice, formatProductPrice } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  isLoading?: boolean;
}

/**
 * Card para exibir produto no catálogo
 */
export const ProductCard = ({
  product,
  onAddToCart,
  isLoading = false,
}: ProductCardProps) => {
  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  const price = parseProductPrice(product.price);

  return (
    <Box
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      border="1px solid"
      borderColor="gray.200"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "lg",
        transform: "translateY(-2px)",
        borderColor: "orange.300",
      }}
    >
      {/* Imagem do produto */}
      <Box position="relative" h="200px" bg="gray.100">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            w="full"
            h="full"
            objectFit="cover"
          />
        ) : (
          <Box
            w="full"
            h="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="gray.200"
            color="gray.500"
          >
            Sem imagem
          </Box>
        )}

        {/* Badge de categoria */}
        <Badge
          position="absolute"
          top="2"
          right="2"
          bg="orange.500"
          color="white"
          fontSize="xs"
          px="2"
          py="1"
          borderRadius="md"
        >
          {product.category.name}
        </Badge>
      </Box>

      {/* Conteúdo */}
      <VStack p="4" align="stretch" gap="3">
        <VStack align="start" gap="1">
          <Text fontSize="lg" fontWeight="semibold" color="gray.800">
            {product.name}
          </Text>

          {product.description && (
            <Text fontSize="sm" color="gray.600" minH="2.5rem">
              {product.description}
            </Text>
          )}
        </VStack>

        {/* Preço e botão */}
        <HStack justify="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold" color="orange.600">
            R$ {formatProductPrice(price)}
          </Text>

          <Button
            size="sm"
            bg="orange.500"
            color="white"
            _hover={{ bg: "orange.600" }}
            onClick={handleAddToCart}
            loading={isLoading}
            loadingText="Adicionando..."
          >
            <HStack gap="1">
              <Plus size={16} />
              <Text>Adicionar</Text>
            </HStack>
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

```


---

## 📄 `src/features/produtos/components/ProdutoCard.tsx`

```typescript
"use client";

import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { FaEdit, FaTrash, FaImage } from "react-icons/fa";
import { PizzaCard } from "@/components/ui";
import { Produto } from "@/types/produto";

interface ProdutoCardProps {
  produto: Produto;
  onEdit: (produto: Produto) => void;
  onDelete: (produto: Produto) => void;
}

/**
 * Componente responsável por renderizar um card de produto.
 * Segue o princípio da Responsabilidade Única (SRP) ao focar apenas na apresentação.
 */
export const ProdutoCard: React.FC<ProdutoCardProps> = ({
  produto,
  onEdit,
  onDelete,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <PizzaCard>
      <VStack align="stretch" gap={3}>
        {/* Imagem */}
        <Box position="relative">
          {produto.image ? (
            <Image
              src={produto.image}
              alt={produto.name}
              borderRadius="md"
              w="full"
              h="150px"
              objectFit="cover"
            />
          ) : (
            <Box
              w="full"
              h="150px"
              bg="gray.100"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FaImage size={32} color="#A0AEC0" />
            </Box>
          )}
        </Box>

        {/* Conteúdo */}
        <Box>
          <HStack justify="space-between" align="start">
            <Box flex={1}>
              <Text fontSize="lg" fontWeight="semibold" color="gray.800">
                {produto.name}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {produto.description}
              </Text>
              <Text fontSize="lg" fontWeight="bold" color="orange.500" mt={1}>
                {formatPrice(produto.price)}
              </Text>
            </Box>
            <HStack gap={1}>
              <IconButton
                size="sm"
                variant="ghost"
                colorScheme="blue"
                aria-label="Editar produto"
                onClick={() => onEdit(produto)}
              >
                <FaEdit />
              </IconButton>
              <IconButton
                size="sm"
                variant="ghost"
                colorScheme="red"
                aria-label="Deletar produto"
                onClick={() => onDelete(produto)}
              >
                <FaTrash />
              </IconButton>
            </HStack>
          </HStack>

          {/* Categoria e Status */}
          <HStack justify="space-between" align="center" mt={3}>
            <Badge colorScheme="blue" variant="subtle" fontSize="xs">
              {produto.category?.name || "Sem categoria"}
            </Badge>
            <Badge
              colorScheme={produto.active ? "green" : "red"}
              variant="subtle"
              fontSize="xs"
            >
              {produto.active ? "Ativo" : "Inativo"}
            </Badge>
          </HStack>
        </Box>

        {/* Data de criação */}
        <Box pt={2} borderTop="1px solid" borderColor="gray.100">
          <Text fontSize="xs" color="gray.400">
            Criado em: {new Date(produto.createdAt).toLocaleDateString("pt-BR")}
          </Text>
        </Box>
      </VStack>
    </PizzaCard>
  );
};

```


---

## 📄 `src/features/produtos/components/ProdutoFormModal.tsx`

```typescript
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VStack, HStack, Button, Box } from "@chakra-ui/react";
import { AppModal } from "@/components/ui";
import {
  PizzaInput,
  PizzaTextarea,
  PizzaButton,
  PizzaSelect,
} from "@/components/ui";
import { useProdutos } from "../hooks/useProdutos";
import { useCategorias } from "../../categorias/hooks/useCategorias";
import { Produto } from "@/types/produto";

const produtoSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  description: z
    .string()
    .min(1, "Descrição é obrigatória")
    .max(500, "Descrição deve ter no máximo 500 caracteres"),
  price: z.number().min(0.01, "Preço deve ser maior que zero"),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  active: z.boolean(),
});

type ProdutoFormData = z.infer<typeof produtoSchema>;

interface ProdutoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  produto?: Produto | null;
}

export const ProdutoFormModal: React.FC<ProdutoFormModalProps> = ({
  isOpen,
  onClose,
  produto,
}) => {
  const { create, update } = useProdutos();
  const { categorias } = useCategorias();
  const isEditing = !!produto;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ProdutoFormData>({
    resolver: zodResolver(produtoSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      active: true,
    },
  });

  // Preencher formulário quando estiver editando
  React.useEffect(() => {
    if (produto && isOpen) {
      setValue("name", produto.name);
      setValue("description", produto.description);
      setValue("price", produto.price);
      setValue("categoryId", produto.categoryId);
      setValue("active", produto.active);
    } else if (!produto && isOpen) {
      reset();
    }
  }, [produto, isOpen, setValue, reset]);

  const onSubmit = async (data: ProdutoFormData) => {
    try {
      if (isEditing && produto) {
        await update(produto.id, data);
      } else {
        await create(data);
      }
      onClose();
      reset();
    } catch {
      // Error já tratado no hook
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setValue("price", value);
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Editar Produto" : "Novo Produto"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={4} align="stretch">
          <PizzaInput
            label="Nome do Produto"
            placeholder="Ex: Pizza Calabresa"
            {...register("name")}
            error={errors.name?.message}
          />

          <PizzaTextarea
            label="Descrição"
            placeholder="Descrição detalhada do produto"
            {...register("description")}
            error={errors.description?.message}
          />

          <HStack gap={4}>
            <PizzaInput
              label="Preço"
              type="number"
              step="0.01"
              placeholder="0,00"
              onChange={handlePriceChange}
              value={watch("price") || ""}
              error={errors.price?.message}
            />

            <Box flex={1}>
              <PizzaSelect
                label="Categoria"
                {...register("categoryId")}
                error={errors.categoryId?.message}
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.name}
                  </option>
                ))}
              </PizzaSelect>
            </Box>
          </HStack>

          <HStack gap={4}>
            <Box flex={1}>
              <PizzaSelect
                label="Status"
                {...register("active")}
                defaultValue="true"
              >
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </PizzaSelect>
            </Box>
          </HStack>

          <HStack gap={3} justify="flex-end" pt={4}>
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <PizzaButton
              colorScheme="orange"
              type="submit"
              loading={isSubmitting}
              loadingText={isEditing ? "Salvando..." : "Criando..."}
            >
              {isEditing ? "Salvar" : "Criar"}
            </PizzaButton>
          </HStack>
        </VStack>
      </form>
    </AppModal>
  );
};

```


---

## 📄 `src/features/produtos/components/ProdutosList.tsx`

```typescript
"use client";

import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  useDisclosure,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { PizzaButton } from "@/components/ui";
import { useProdutos } from "../hooks/useProdutos";
import { ProdutoFormModal, ProdutoCard } from "./index";
import { Produto } from "@/types/produto";

export const ProdutosList: React.FC = () => {
  const { produtos, isLoading, error, remove } = useProdutos();
  const {
    open: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose,
  } = useDisclosure();
  const {
    open: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [produtoToDelete, setProdutoToDelete] = useState<Produto | null>(null);

  const handleEdit = (produto: Produto) => {
    setSelectedProduto(produto);
    onFormOpen();
  };

  const handleCreate = () => {
    setSelectedProduto(null);
    onFormOpen();
  };

  const handleDelete = (produto: Produto) => {
    setProdutoToDelete(produto);
    onDeleteOpen();
  };

  const handleDeleteConfirm = async () => {
    if (produtoToDelete) {
      try {
        await remove(produtoToDelete.id);
        onDeleteClose();
        setProdutoToDelete(null);
      } catch {
        // Error já tratado no hook
      }
    }
  };

  const handleFormClose = () => {
    setSelectedProduto(null);
    onFormClose();
  };

  if (isLoading) {
    return <Text>Carregando produtos...</Text>;
  }

  if (error) {
    return (
      <Box
        p={4}
        bg="red.50"
        borderRadius="md"
        border="1px solid"
        borderColor="red.200"
      >
        <Text color="red.600">{error}</Text>
      </Box>
    );
  }

  return (
    <VStack gap={6} align="stretch">
      {/* Header */}
      <HStack justify="space-between" align="center">
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            Produtos
          </Text>
          <Text color="gray.600">Gerencie os produtos do cardápio</Text>
        </Box>
        <PizzaButton colorScheme="orange" icon={FaPlus} onClick={handleCreate}>
          Novo Produto
        </PizzaButton>
      </HStack>

      {/* Lista de Produtos */}
      {produtos.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Text color="gray.500" mb={4}>
            Nenhum produto cadastrado ainda.
          </Text>
          <PizzaButton
            colorScheme="orange"
            icon={FaPlus}
            onClick={handleCreate}
          >
            Criar Primeiro Produto
          </PizzaButton>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          {produtos.map((produto) => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </SimpleGrid>
      )}

      {/* Modal de Formulário */}
      <ProdutoFormModal
        isOpen={isFormOpen}
        onClose={handleFormClose}
        produto={selectedProduto}
      />

      {/* Modal de Confirmação de Delete */}
      {isDeleteOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.600"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="modal"
          onClick={onDeleteClose}
        >
          <Box
            bg="white"
            _dark={{ bg: "gray.800" }}
            p={6}
            borderRadius="lg"
            maxW="md"
            w="full"
            mx={4}
            onClick={(e) => e.stopPropagation()}
          >
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Deletar Produto
            </Text>
            <Text mb={4}>
              Tem certeza que deseja deletar o produto &quot;
              {produtoToDelete?.name}&quot;? Esta ação não pode ser desfeita.
            </Text>
            <HStack gap={3} justify="flex-end">
              <Button variant="outline" onClick={onDeleteClose}>
                Cancelar
              </Button>
              <PizzaButton colorScheme="red" onClick={handleDeleteConfirm}>
                Deletar
              </PizzaButton>
            </HStack>
          </Box>
        </Box>
      )}
    </VStack>
  );
};

```


---

## 📄 `src/features/produtos/hooks/index.ts`

```typescript
export * from './useProdutos';
```


---

## 📄 `src/features/produtos/hooks/useProducts.ts`

```typescript
/**
 * Hook para gerenciar estado de produtos
 * @version 1.0.0
 * @since 28/12/2025
 */

import { useState, useCallback, useEffect } from "react";
import type {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from "@/types/product";
import { productsService } from "../services/productsService";
import { toaster } from "@/components/ui/toaster";

interface UseProductsOptions {
  /**
   * Se deve buscar automaticamente na montagem
   */
  autoFetch?: boolean;

  /**
   * ID da categoria para filtrar produtos
   */
  categoryId?: string;

  /**
   * Filtros adicionais
   */
  filters?: {
    active?: boolean;
    search?: string;
  };
}

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createProduct: (data: CreateProductDto) => Promise<Product>;
  updateProduct: (id: string, data: UpdateProductDto) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
}

/**
 * Hook para gerenciar produtos
 */
export const useProducts = (
  options: UseProductsOptions = {}
): UseProductsReturn => {
  const { autoFetch = true, categoryId, filters } = options;

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Busca produtos
   */
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      let data: Product[];

      if (categoryId) {
        data = await productsService.getByCategory(categoryId);
      } else {
        data = await productsService.getWithFilters(filters);
      }

      setProducts(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao buscar produtos";
      setError(errorMessage);
      toaster.error({
        title: "Erro ao buscar produtos",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, filters]);

  /**
   * Refetch manual
   */
  const refetch = useCallback(async () => {
    await fetchProducts();
  }, [fetchProducts]);

  /**
   * Busca automática na montagem
   */
  useEffect(() => {
    if (autoFetch) {
      fetchProducts();
    }
  }, [autoFetch, fetchProducts]);

  /**
   * Wrapper para criar produto
   */
  const handleCreateProduct = useCallback(
    async (data: CreateProductDto): Promise<Product> => {
      try {
        const newProduct = await productsService.create(data);
        setProducts((prev) => [...prev, newProduct]);
        toaster.success({
          title: "Produto criado",
          description: "Produto foi criado com sucesso!",
        });
        return newProduct;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao criar produto";
        toaster.error({
          title: "Erro ao criar produto",
          description: errorMessage,
        });
        throw err;
      }
    },
    []
  );

  /**
   * Wrapper para atualizar produto
   */
  const handleUpdateProduct = useCallback(
    async (productId: string, data: UpdateProductDto): Promise<Product> => {
      try {
        const updatedProduct = await productsService.update(productId, data);
        setProducts((prev) =>
          prev.map((product) =>
            product.id === productId ? updatedProduct : product
          )
        );
        toaster.success({
          title: "Produto atualizado",
          description: "Produto foi atualizado com sucesso!",
        });
        return updatedProduct;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao atualizar produto";
        toaster.error({
          title: "Erro ao atualizar produto",
          description: errorMessage,
        });
        throw err;
      }
    },
    []
  );

  /**
   * Wrapper para deletar produto
   */
  const handleDeleteProduct = useCallback(
    async (productId: string): Promise<void> => {
      try {
        await productsService.delete(productId);
        setProducts((prev) =>
          prev.filter((product) => product.id !== productId)
        );
        toaster.success({
          title: "Produto deletado",
          description: "Produto foi deletado com sucesso!",
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao deletar produto";
        toaster.error({
          title: "Erro ao deletar produto",
          description: errorMessage,
        });
        throw err;
      }
    },
    []
  );

  return {
    products,
    isLoading,
    error,
    refetch,
    createProduct: handleCreateProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
  };
};

```


---

## 📄 `src/features/produtos/hooks/useProdutos.ts`

```typescript
import { useState, useEffect, useCallback } from 'react';
import { Produto, CreateProdutoData, UpdateProdutoData } from '@/types/produto';
import {
  getProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto
} from '../services/produtosService';

interface UseProdutosReturn {
  produtos: Produto[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (data: CreateProdutoData) => Promise<Produto>;
  update: (id: string, data: UpdateProdutoData) => Promise<Produto>;
  remove: (id: string) => Promise<void>;
  getById: (id: string) => Promise<Produto>;
}

export const useProdutos = (): UseProdutosReturn => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProdutos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProdutos();
      setProdutos(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar produtos';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreate = useCallback(async (data: CreateProdutoData): Promise<Produto> => {
    try {
      const newProduto = await createProduto(data);
      setProdutos(prev => [...prev, newProduto]);
      return newProduto;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar produto';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const handleUpdate = useCallback(async (id: string, data: UpdateProdutoData): Promise<Produto> => {
    try {
      const updatedProduto = await updateProduto(id, data);
      setProdutos(prev =>
        prev.map(prod => prod.id === id ? updatedProduto : prod)
      );
      return updatedProduto;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar produto';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const handleDelete = useCallback(async (id: string): Promise<void> => {
    try {
      await deleteProduto(id);
      setProdutos(prev => prev.filter(prod => prod.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar produto';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const handleGetById = useCallback(async (id: string): Promise<Produto> => {
    try {
      return await getProdutoById(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar produto';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  useEffect(() => {
    fetchProdutos();
  }, [fetchProdutos]);

  return {
    produtos,
    isLoading,
    error,
    refetch: fetchProdutos,
    create: handleCreate,
    update: handleUpdate,
    remove: handleDelete,
    getById: handleGetById,
  };
};
```


---

## 📄 `src/features/produtos/index.ts`

```typescript
// Components
export * from './components';

// Hooks
export * from './hooks';

// Services
export * from './services';

// Types
export * from './types';
```


---

## 📄 `src/features/produtos/services/index.ts`

```typescript
export * from './produtosService';
```


---

## 📄 `src/features/produtos/services/productsService.ts`

```typescript
/**
 * Service para gerenciar produtos
 * @version 1.0.0
 * @since 28/12/2025
 */

import type {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from "@/types/product";
import { fetchWithFormData, fetchWithAuth } from "@/utils/fetchHelpers";

/**
 * Erro customizado para operações de produtos
 */
class ProductServiceError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message);
    this.name = "ProductServiceError";
  }
}

/**
 * Cria FormData a partir de CreateProductDto ou UpdateProductDto
 */
const createFormData = (
  data: Partial<CreateProductDto | UpdateProductDto>
): FormData => {
  const formData = new FormData();

  // Adiciona campos de texto
  if (data.name !== undefined) formData.append("name", data.name);
  if (data.description !== undefined)
    formData.append("description", data.description);
  if (data.categoryId !== undefined)
    formData.append("categoryId", data.categoryId);

  // Adiciona campo active apenas se existir (UpdateProductDto)
  if ("active" in data && data.active !== undefined) {
    formData.append("active", data.active.toString());
  }

  // Converte preço para string se for número
  if (data.price !== undefined) {
    const priceStr =
      typeof data.price === "number" ? data.price.toString() : data.price;
    formData.append("price", priceStr);
  }

  // Adiciona arquivo de imagem
  if (data.image) {
    formData.append("image", data.image);
  }

  return formData;
};

/**
 * Busca todos os produtos
 */
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    return await fetchWithAuth("/products");
  } catch (error) {
    if (error instanceof Error && error.name === "FetchError") {
      throw error;
    }
    throw new ProductServiceError("Erro ao buscar produtos", 500, error);
  }
};

/**
 * Busca produtos por categoria
 */
export const getProductsByCategory = async (
  categoryId: string
): Promise<Product[]> => {
  try {
    return await fetchWithAuth(
      `/products?categoryId=${encodeURIComponent(categoryId)}`
    );
  } catch (error) {
    if (error instanceof Error && error.name === "FetchError") {
      throw error;
    }
    throw new ProductServiceError(
      "Erro ao buscar produtos por categoria",
      500,
      error
    );
  }
};

/**
 * Busca produto por ID
 */
export const getProductById = async (productId: string): Promise<Product> => {
  try {
    return await fetchWithAuth(`/products/${productId}`);
  } catch (error) {
    if (error instanceof Error && error.name === "FetchError") {
      throw error;
    }
    throw new ProductServiceError("Erro ao buscar produto", 500, error);
  }
};

/**
 * Cria um novo produto
 */
export const createProduct = async (
  data: CreateProductDto
): Promise<Product> => {
  try {
    const formData = createFormData(data);
    return await fetchWithFormData("/products", formData, "POST");
  } catch (error) {
    if (error instanceof ProductServiceError) {
      throw error;
    }
    throw new ProductServiceError("Erro ao criar produto", 500, error);
  }
};

/**
 * Atualiza um produto
 */
export const updateProduct = async (
  productId: string,
  data: UpdateProductDto
): Promise<Product> => {
  try {
    const formData = createFormData(data);
    return await fetchWithFormData(`/products/${productId}`, formData, "PATCH");
  } catch (error) {
    if (error instanceof ProductServiceError) {
      throw error;
    }
    throw new ProductServiceError("Erro ao atualizar produto", 500, error);
  }
};

/**
 * Deleta um produto
 */
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await fetchWithAuth(`/products/${productId}`, { method: "DELETE" });
  } catch (error) {
    if (error instanceof Error && error.name === "FetchError") {
      throw error;
    }
    throw new ProductServiceError("Erro ao deletar produto", 500, error);
  }
};

/**
 * Busca produtos com filtros
 */
export const getProductsWithFilters = async (filters?: {
  categoryId?: string;
  active?: boolean;
  search?: string;
}): Promise<Product[]> => {
  try {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ""}`;

    return await fetchWithAuth(endpoint);
  } catch (error) {
    if (error instanceof Error && error.name === "FetchError") {
      throw error;
    }
    throw new ProductServiceError(
      "Erro ao buscar produtos com filtros",
      500,
      error
    );
  }
};

/**
 * Exporta todas as funções do service
 */
export const productsService = {
  getAll: getAllProducts,
  getByCategory: getProductsByCategory,
  getById: getProductById,
  create: createProduct,
  update: updateProduct,
  delete: deleteProduct,
  getWithFilters: getProductsWithFilters,
};

export default productsService;

```


---

## 📄 `src/features/produtos/services/produtosService.ts`

```typescript
import { Produto, CreateProdutoData, UpdateProdutoData } from '@/types/produto';
import { getAuthToken } from '@/utils/cookies';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Listar todos os produtos
export const getProdutos = async (): Promise<Produto[]> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/products`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao buscar produtos' }));
    throw new Error(errorData.message || 'Erro ao buscar produtos');
  }

  return response.json();
};

// Buscar produto por ID
export const getProdutoById = async (id: string): Promise<Produto> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao buscar produto' }));
    throw new Error(errorData.message || 'Erro ao buscar produto');
  }

  return response.json();
};

// Criar novo produto
export const createProduto = async (data: CreateProdutoData): Promise<Produto> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao criar produto' }));
    throw new Error(errorData.message || 'Erro ao criar produto');
  }

  return response.json();
};

// Atualizar produto
export const updateProduto = async (id: string, data: UpdateProdutoData): Promise<Produto> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao atualizar produto' }));
    throw new Error(errorData.message || 'Erro ao atualizar produto');
  }

  return response.json();
};

// Deletar produto
export const deleteProduto = async (id: string): Promise<void> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao deletar produto' }));
    throw new Error(errorData.message || 'Erro ao deletar produto');
  }
};
```


---

## 📄 `src/features/produtos/types/index.ts`

```typescript
// Re-export types
export * from '@/types/produto';
```


---

## 📄 `src/features/profile/components/EditProfileModal.tsx`

```typescript
"use client";

import { Box, Text, VStack, HStack, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { FaSave, FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import { AppModal, PizzaButton } from "@/components/ui";
import type { User } from "@/types/users";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSave: (userData: Partial<User>) => Promise<void>;
}

export const EditProfileModal = ({
  isOpen,
  onClose,
  user,
  onSave,
}: EditProfileModalProps) => {
  const [formData, setFormData] = useState({
    nome: user.nome || "",
    email: user.email || "",
    telefone: user.telefone || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar perfil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <AppModal isOpen={isOpen} onClose={onClose} title="Editar Perfil">
      <Box p={6}>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <VStack gap={4} align="stretch">
            {/* Nome */}
            <Box>
              <HStack gap={2} mb={2}>
                <FaUser color="#666" />
                <Text color="gray.300" fontSize="sm">
                  Nome Completo
                </Text>
              </HStack>
              <Input
                placeholder="Digite seu nome completo"
                value={formData.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                required
                bg="gray.700"
                borderColor="gray.600"
                color="white"
                _placeholder={{ color: "gray.400" }}
                _focus={{
                  borderColor: "brand.primary",
                  boxShadow: "0 0 0 1px #D92B2B",
                }}
              />
            </Box>

            {/* Email */}
            <Box>
              <HStack gap={2} mb={2}>
                <FaEnvelope color="#666" />
                <Text color="gray.300" fontSize="sm">
                  E-mail
                </Text>
              </HStack>
              <Input
                type="email"
                placeholder="Digite seu e-mail"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                bg="gray.700"
                borderColor="gray.600"
                color="white"
                _placeholder={{ color: "gray.400" }}
                _focus={{
                  borderColor: "brand.primary",
                  boxShadow: "0 0 0 1px #D92B2B",
                }}
              />
            </Box>

            {/* Telefone */}
            <Box>
              <HStack gap={2} mb={2}>
                <FaPhone color="#666" />
                <Text color="gray.300" fontSize="sm">
                  Telefone
                </Text>
              </HStack>
              <Input
                placeholder="(00) 00000-0000"
                value={formData.telefone}
                onChange={(e) => handleChange("telefone", e.target.value)}
                bg="gray.700"
                borderColor="gray.600"
                color="white"
                _placeholder={{ color: "gray.400" }}
                _focus={{
                  borderColor: "brand.primary",
                  boxShadow: "0 0 0 1px #D92B2B",
                }}
              />
            </Box>

            {/* Error Message */}
            {error && (
              <Box
                bg="red.900"
                border="1px solid"
                borderColor="red.400"
                borderRadius="md"
                p={3}
              >
                <Text color="red.400" fontSize="sm">
                  {error}
                </Text>
              </Box>
            )}

            {/* Actions */}
            <HStack gap={3} justify="end" mt={6}>
              <Button
                variant="ghost"
                onClick={onClose}
                disabled={isLoading}
                color="gray.400"
                _hover={{ color: "white", bg: "gray.700" }}
              >
                Cancelar
              </Button>
              <PizzaButton
                type="submit"
                icon={FaSave}
                loading={isLoading}
                variant="solid"
                colorScheme="red"
              >
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </PizzaButton>
            </HStack>
          </VStack>
        </form>
      </Box>
    </AppModal>
  );
};

```


---

## 📄 `src/features/profile/components/EnderecoCard.tsx`

```typescript
"use client";

import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { FaEdit, FaTrash, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import type { Endereco } from "@/types/endereco";

interface EnderecoCardProps {
  endereco: Endereco;
  onEdit: () => void;
  onDelete: () => void;
  onSetPrincipal?: () => void;
}

export const EnderecoCard = ({
  endereco,
  onEdit,
  onDelete,
  onSetPrincipal,
}: EnderecoCardProps) => {
  return (
    <Box
      bg="gray.800"
      borderColor="gray.700"
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      position="relative"
      _hover={{ borderColor: "gray.600" }}
      transition="all 0.2s"
    >
      {/* Header com tipo e principal */}
      <Flex justify="space-between" align="center" mb={3}>
        <HStack gap={2}>
          <FaMapMarkerAlt color="#666" />
          <Text color="white" fontWeight="semibold" textTransform="capitalize">
            {endereco.tipo}
          </Text>
          {endereco.principal && (
            <Badge colorScheme="yellow" variant="solid" size="sm">
              <HStack gap={1}>
                <FaStar size={10} />
                <Text fontSize="xs">Principal</Text>
              </HStack>
            </Badge>
          )}
        </HStack>

        {/* Actions */}
        <HStack gap={1}>
          {!endereco.principal && onSetPrincipal && (
            <IconButton
              aria-label="Definir como principal"
              size="sm"
              variant="ghost"
              color="gray.400"
              _hover={{ color: "yellow.400" }}
              onClick={onSetPrincipal}
            >
              <FaStar />
            </IconButton>
          )}
          <IconButton
            aria-label="Editar endereço"
            size="sm"
            variant="ghost"
            color="gray.400"
            _hover={{ color: "blue.400" }}
            onClick={onEdit}
          >
            <FaEdit />
          </IconButton>
          <IconButton
            aria-label="Excluir endereço"
            size="sm"
            variant="ghost"
            color="gray.400"
            _hover={{ color: "red.400" }}
            onClick={onDelete}
          >
            <FaTrash />
          </IconButton>
        </HStack>
      </Flex>

      {/* Endereço completo */}
      <VStack align="start" gap={1}>
        <Text color="gray.300" fontSize="sm">
          {endereco.logradouro}, {endereco.numero}
          {endereco.complemento && ` - ${endereco.complemento}`}
        </Text>
        <Text color="gray.400" fontSize="sm">
          {endereco.bairro}, {endereco.cidade} - {endereco.estado}
        </Text>
        <Text color="gray.400" fontSize="sm">
          CEP: {endereco.cep}
        </Text>
      </VStack>
    </Box>
  );
};

```


---

## 📄 `src/features/profile/components/EnderecoModal.tsx`

```typescript
"use client";

import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaSave, FaMapMarkerAlt } from "react-icons/fa";
import { AppModal, PizzaButton, PizzaInput, PizzaSelect, PizzaCheckbox } from "@/components/ui";
import type { Endereco } from "@/types/endereco";

interface EnderecoModalProps {
  isOpen: boolean;
  onClose: () => void;
  endereco?: Endereco;
  onSave: (data: {
    cep: string;
    tipo: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    complemento?: string;
    principal: boolean;
  }) => Promise<void>;
}

export const EnderecoModal = ({
  isOpen,
  onClose,
  endereco,
  onSave,
}: EnderecoModalProps) => {
  const [formData, setFormData] = useState({
    cep: "",
    tipo: "residencial",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    complemento: "",
    principal: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(endereco);

  useEffect(() => {
    if (endereco) {
      setFormData({
        cep: endereco.cep || "",
        tipo: endereco.tipo || "residencial",
        logradouro: endereco.logradouro || "",
        numero: endereco.numero || "",
        bairro: endereco.bairro || "",
        cidade: endereco.cidade || "",
        estado: endereco.estado || "",
        complemento: endereco.complemento || "",
        principal: endereco.principal || false,
      });
    } else {
      setFormData({
        cep: "",
        tipo: "residencial",
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        complemento: "",
        principal: false,
      });
    }
  }, [endereco, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isEditing) {
        await onSave(formData);
      } else {
        await onSave(formData);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar endereço");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Editar Endereço" : "Novo Endereço"}
    >
      <Box p={6}>
        <form onSubmit={handleSubmit}>
          <VStack gap={4} align="stretch">
            {/* Tipo e CEP */}
            <Grid templateColumns="1fr 1fr" gap={4}>
              <GridItem>
                <HStack gap={2} mb={2}>
                  <FaMapMarkerAlt color="#666" />
                  <Text color="gray.300" fontSize="sm">
                    Tipo
                  </Text>
                </HStack>
                <PizzaSelect
                  value={formData.tipo}
                  onChange={(e) => handleChange("tipo", e.target.value)}
                  required
                >
                  <option
                    value="residencial"
                    style={{ backgroundColor: "#2D3748", color: "white" }}
                  >
                    Residencial
                  </option>
                  <option
                    value="trabalho"
                    style={{ backgroundColor: "#2D3748", color: "white" }}
                  >
                    Trabalho
                  </option>
                  <option
                    value="comercial"
                    style={{ backgroundColor: "#2D3748", color: "white" }}
                  >
                    Comercial
                  </option>
                  <option
                    value="outro"
                    style={{ backgroundColor: "#2D3748", color: "white" }}
                  >
                    Outro
                  </option>
                </PizzaSelect>
              </GridItem>

              <GridItem>
                <PizzaInput
                  label="CEP"
                  placeholder="00000-000"
                  value={formData.cep}
                  onChange={(e) => handleChange("cep", e.target.value)}
                  required
                />
              </GridItem>
            </Grid>

            {/* Logradouro e Número */}
            <Grid templateColumns="2fr 1fr" gap={4}>
              <GridItem>
                <PizzaInput
                  label="Logradouro"
                  placeholder="Rua, Avenida, etc."
                  value={formData.logradouro}
                  onChange={(e) => handleChange("logradouro", e.target.value)}
                  required
                />
              </GridItem>

              <GridItem>
                <PizzaInput
                  label="Número"
                  placeholder="123"
                  value={formData.numero}
                  onChange={(e) => handleChange("numero", e.target.value)}
                  required
                />
              </GridItem>
            </Grid>

            {/* Bairro e Complemento */}
            <Grid templateColumns="1fr 1fr" gap={4}>
              <GridItem>
                <PizzaInput
                  label="Bairro"
                  placeholder="Nome do bairro"
                  value={formData.bairro}
                  onChange={(e) => handleChange("bairro", e.target.value)}
                  required
                />
              </GridItem>

              <GridItem>
                <PizzaInput
                  label="Complemento"
                  placeholder="Apto, sala, etc. (opcional)"
                  value={formData.complemento}
                  onChange={(e) => handleChange("complemento", e.target.value)}
                />
              </GridItem>
            </Grid>

            {/* Cidade e Estado */}
            <Grid templateColumns="2fr 1fr" gap={4}>
              <GridItem>
                <PizzaInput
                  label="Cidade"
                  placeholder="Nome da cidade"
                  value={formData.cidade}
                  onChange={(e) => handleChange("cidade", e.target.value)}
                  required
                />
              </GridItem>

              <GridItem>
                <PizzaInput
                  label="Estado"
                  placeholder="SP"
                  value={formData.estado}
                  onChange={(e) => handleChange("estado", e.target.value)}
                  required
                  maxLength={2}
                />
              </GridItem>
            </Grid>

            {/* Principal */}
            <PizzaCheckbox
              label="Definir como endereço principal"
              checked={formData.principal}
              onChange={(e) => handleChange("principal", e.target.checked)}
            />

            {/* Error Message */}
            {error && (
              <Box
                bg="red.900"
                border="1px solid"
                borderColor="red.400"
                borderRadius="md"
                p={3}
              >
                <Text color="red.400" fontSize="sm">
                  {error}
                </Text>
              </Box>
            )}

            {/* Actions */}
            <HStack gap={3} justify="end" mt={6}>
              <Button
                variant="ghost"
                onClick={onClose}
                disabled={isLoading}
                color="gray.400"
                _hover={{ color: "white", bg: "gray.700" }}
              >
                Cancelar
              </Button>
              <PizzaButton
                type="submit"
                icon={FaSave}
                loading={isLoading}
                variant="solid"
                colorScheme="red"
              >
                {isLoading
                  ? "Salvando..."
                  : isEditing
                  ? "Atualizar"
                  : "Adicionar"}
              </PizzaButton>
            </HStack>
          </VStack>
        </form>
      </Box>
    </AppModal>
  );
};

```


---

## 📄 `src/features/profile/components/EnderecoSelectionModal.tsx`

```typescript
"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Separator,
  Spinner,
} from "@chakra-ui/react";
import { FaPlus, FaMapMarkerAlt, FaCheck } from "react-icons/fa";
import { AppModal } from "@/components/ui";
import { EnderecoModal } from "./EnderecoModal";
import { getEnderecos, createEndereco } from "../services/enderecoService";
import { toaster } from "@/components/ui/toaster";
import type { Endereco } from "@/types/endereco";

interface EnderecoSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (endereco: Endereco) => void;
  selectedEnderecoId?: number;
}

export const EnderecoSelectionModal: React.FC<EnderecoSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedEnderecoId,
}) => {
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEndereco, setSelectedEndereco] = useState<Endereco | null>(
    null
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const loadEnderecos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getEnderecos();
      setEnderecos(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao carregar endereços";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Buscar endereços quando o modal abrir
  useEffect(() => {
    if (isOpen) {
      loadEnderecos();
    }
  }, [isOpen, loadEnderecos]);

  // Definir endereço padrão após carregar endereços
  useEffect(() => {
    if (enderecos.length > 0 && !selectedEndereco) {
      const enderecoPadrao = enderecos.find((e) => e.principal) || enderecos[0];
      setSelectedEndereco(enderecoPadrao);
    }
  }, [enderecos, selectedEndereco]);

  // Atualizar seleção quando selectedEnderecoId mudar
  useEffect(() => {
    if (selectedEnderecoId && enderecos.length > 0) {
      const endereco = enderecos.find((e) => e.id === selectedEnderecoId);
      if (endereco) {
        setSelectedEndereco(endereco);
      }
    }
  }, [selectedEnderecoId, enderecos]);

  // Buscar endereços quando o modal abrir
  useEffect(() => {
    if (isOpen) {
      loadEnderecos();
    }
  }, [isOpen, loadEnderecos]);

  const handleSelect = () => {
    if (!selectedEndereco) {
      toaster.create({
        title: "Seleção obrigatória",
        description: "Selecione um endereço para entrega.",
        type: "warning",
      });
      return;
    }

    onSelect(selectedEndereco);
    onClose();
  };

  const handleCreateEndereco = async (data: {
    cep: string;
    tipo: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    complemento?: string;
    principal: boolean;
  }) => {
    try {
      const novoEndereco = await createEndereco(data);
      toaster.create({
        title: "Endereço criado!",
        description: "Novo endereço adicionado com sucesso.",
        type: "success",
      });

      // Recarregar lista de endereços
      await loadEnderecos();

      // Selecionar o novo endereço automaticamente
      setSelectedEndereco(novoEndereco);

      // Fechar modal de criação
      setIsCreateModalOpen(false);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao criar endereço";
      throw new Error(message);
    }
  };

  const formatEndereco = (endereco: Endereco) => {
    return `${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade}/${endereco.estado}`;
  };

  return (
    <>
      <AppModal
        isOpen={isOpen}
        onClose={onClose}
        title="Selecionar Endereço de Entrega"
      >
        <VStack align="stretch" gap={4}>
          {error && (
            <Box
              p={4}
              bg="red.50"
              borderRadius="md"
              border="1px"
              borderColor="red.200"
            >
              <Text color="red.600" fontSize="sm">
                {error}
              </Text>
            </Box>
          )}

          {isLoading ? (
            <Box textAlign="center" py={8}>
              <Spinner size="lg" color="green.500" />
              <Text mt={2}>Carregando endereços...</Text>
            </Box>
          ) : enderecos.length === 0 ? (
            <Box textAlign="center" py={8}>
              <FaMapMarkerAlt
                size={48}
                style={{ color: "gray", margin: "0 auto" }}
              />
              <Text mt={4} color="gray.600">
                Nenhum endereço cadastrado
              </Text>
              <Text fontSize="sm" color="gray.500" mb={4}>
                Adicione um endereço para continuar
              </Text>
              <Button
                colorScheme="green"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <HStack gap={2}>
                  <FaPlus />
                  <Text>Criar Primeiro Endereço</Text>
                </HStack>
              </Button>
            </Box>
          ) : (
            <>
              <Text fontWeight="medium" color="gray.700">
                Selecione o endereço de entrega:
              </Text>

              <VStack align="stretch" gap={3}>
                {enderecos.map((endereco) => (
                  <Box
                    key={endereco.id}
                    p={4}
                    borderWidth="2px"
                    borderRadius="md"
                    borderColor={
                      selectedEndereco?.id === endereco.id
                        ? "green.300"
                        : "gray.200"
                    }
                    bg={
                      selectedEndereco?.id === endereco.id
                        ? "green.50"
                        : "white"
                    }
                    cursor="pointer"
                    onClick={() => setSelectedEndereco(endereco)}
                    transition="all 0.2s"
                    _hover={{ borderColor: "green.300", bg: "green.50" }}
                  >
                    <HStack align="start" gap={3}>
                      <Box mt={1}>
                        {selectedEndereco?.id === endereco.id ? (
                          <FaCheck color="green" />
                        ) : (
                          <Box
                            w={4}
                            h={4}
                            borderRadius="full"
                            border="2px"
                            borderColor="gray.300"
                          />
                        )}
                      </Box>
                      <VStack align="start" gap={1} flex={1}>
                        <HStack gap={2}>
                          <FaMapMarkerAlt style={{ color: "green" }} />
                          <Text fontWeight="medium">
                            {endereco.tipo}{" "}
                            {endereco.principal && "(Principal)"}
                          </Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          {formatEndereco(endereco)}
                        </Text>
                        {endereco.complemento && (
                          <Text fontSize="sm" color="gray.500">
                            Complemento: {endereco.complemento}
                          </Text>
                        )}
                        <Text
                          fontSize="sm"
                          color="green.600"
                          fontWeight="medium"
                        >
                          CEP: {endereco.cep}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>

              <Separator />

              <Button
                variant="outline"
                colorScheme="green"
                onClick={() => setIsCreateModalOpen(true)}
                w="full"
              >
                <HStack gap={2}>
                  <FaPlus />
                  <Text>Adicionar Novo Endereço</Text>
                </HStack>
              </Button>

              <HStack gap={3} pt={4}>
                <Button variant="outline" onClick={onClose} flex={1}>
                  Cancelar
                </Button>
                <Button
                  colorScheme="green"
                  onClick={handleSelect}
                  flex={1}
                  disabled={!selectedEndereco}
                >
                  Confirmar Endereço
                </Button>
              </HStack>
            </>
          )}
        </VStack>
      </AppModal>

      <EnderecoModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateEndereco}
      />
    </>
  );
};

```


---

## 📄 `src/features/profile/components/ProfilePageLayout.tsx`

```typescript
"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  Avatar,
  Grid,
  GridItem,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { updateBasicProfile } from "../services/profileService";
import { createEndereco, updateEndereco } from "../services/enderecoService";
import { PizzaLoading, PizzaButton } from "@/components/ui";
import { EditProfileModal } from "./EditProfileModal";
import { EnderecoModal } from "./EnderecoModal";
import { EnderecoCard } from "./EnderecoCard";
import {
  FaEdit,
  FaPlus,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import type { User } from "@/types/users";
import type { Endereco } from "@/types/endereco";

/**
 * Componente visual principal para a página de perfil.
 * Ele usa o hook 'useProfile' para buscar e exibir os dados.
 */
export const ProfilePageLayout = () => {
  const { user, isLoading, error, refetch } = useProfile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEnderecoModalOpen, setIsEnderecoModalOpen] = useState(false);
  const [selectedEndereco, setSelectedEndereco] = useState<
    Endereco | undefined
  >(undefined);

  const handleSaveProfile = async (userData: Partial<User>) => {
    if (!user?.id) throw new Error("ID do usuário não encontrado");

    try {
      await updateBasicProfile(user.id, {
        nome: userData.nome || "",
        email: userData.email || "",
        telefone: userData.telefone || "",
      });
      // Refresh profile data after successful update
      await refetch();
    } catch (err) {
      throw err; // Re-throw to be handled by the modal
    }
  };

  const handleEditEndereco = (endereco: Endereco) => {
    setSelectedEndereco(endereco);
    setIsEnderecoModalOpen(true);
  };

  const handleDeleteEndereco = async (enderecoId: number) => {
    if (confirm("Tem certeza que deseja excluir este endereço?")) {
      // TODO: Implementar quando backend tiver rota DELETE /enderecos/:id
      console.log("Delete endereco:", enderecoId);
    }
  };

  const handleSetPrincipal = async (endereco: Endereco) => {
    // TODO: Implementar quando backend tiver rota PATCH /enderecos/:id
    console.log("Set principal endereco:", endereco.id);
  };

  const handleAddEndereco = () => {
    setSelectedEndereco(undefined);
    setIsEnderecoModalOpen(true);
  };

  const closeEnderecoModal = () => {
    setIsEnderecoModalOpen(false);
    setSelectedEndereco(undefined);
  };

  const handleSaveEndereco = async (data: {
    cep: string;
    tipo: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    complemento?: string;
    principal: boolean;
  }) => {
    try {
      if (selectedEndereco) {
        // Editando endereço existente
        await updateEndereco(selectedEndereco.id, data);
      } else {
        // Criando novo endereço
        await createEndereco(data);
      }
      // Recarregar dados do perfil para refletir as mudanças
      await refetch();
      closeEnderecoModal();
    } catch (err) {
      console.error("Erro ao salvar endereço:", err);
      // TODO: Mostrar toast de erro para o usuário
    }
  };

  if (isLoading) {
    return <PizzaLoading message="Carregando seu perfil..." />;
  }

  if (error) {
    return (
      <Flex justify="center" align="center" h="100%" minH="400px">
        <Box textAlign="center" p={8}>
          <Text color="red.400" fontSize="lg" mb={4}>
            Erro ao carregar o perfil
          </Text>
          <Text color="gray.400">{error}</Text>
        </Box>
      </Flex>
    );
  }

  if (!user) {
    return (
      <Flex justify="center" align="center" h="100%" minH="400px">
        <Text color="gray.400">Usuário não encontrado</Text>
      </Flex>
    );
  }

  return (
    <Box w="full" maxW="6xl" mx="auto">
      {/* Header da página */}
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h1" size="2xl" color="white" fontFamily="heading">
          Meu Perfil
        </Heading>
        <PizzaButton variant="outline" onClick={() => setIsEditModalOpen(true)}>
          <HStack gap={2}>
            <FaEdit />
            <Text>Editar Perfil</Text>
          </HStack>
        </PizzaButton>
      </Flex>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 2fr" }} gap={8}>
        {/* Card do Perfil */}
        <GridItem>
          <Box
            bg="gray.800"
            borderColor="gray.700"
            borderWidth="1px"
            borderRadius="lg"
            p={6}
          >
            <VStack align="center" gap={4}>
              <Avatar.Root size="2xl">
                <Avatar.Image src={user.avatar || undefined} alt={user.nome} />
                <Avatar.Fallback
                  bg="brand.primary"
                  color="white"
                  fontSize="2xl"
                  fontWeight="bold"
                >
                  {user.nome.charAt(0).toUpperCase()}
                </Avatar.Fallback>
              </Avatar.Root>

              <VStack align="center" gap={2}>
                <Heading size="lg" color="white" textAlign="center">
                  {user.nome}
                </Heading>
                <Badge colorScheme="green" variant="solid">
                  Cliente Ativo
                </Badge>
              </VStack>

              <VStack align="stretch" gap={3} w="full" mt={4}>
                <HStack gap={3} color="gray.300">
                  <FaEnvelope />
                  <Text fontSize="sm">{user.email}</Text>
                </HStack>

                {user.telefone && (
                  <HStack gap={3} color="gray.300">
                    <FaPhone />
                    <Text fontSize="sm">{user.telefone}</Text>
                  </HStack>
                )}
              </VStack>
            </VStack>
          </Box>
        </GridItem>

        {/* Card dos Endereços */}
        <GridItem>
          <Box
            bg="gray.800"
            borderColor="gray.700"
            borderWidth="1px"
            borderRadius="lg"
          >
            {/* Header do Card */}
            <Box p={6} borderBottomWidth="1px" borderBottomColor="gray.700">
              <Flex justify="space-between" align="center">
                <Heading size="lg" color="white">
                  Meus Endereços
                </Heading>
                <PizzaButton
                  variant="outline"
                  size="sm"
                  onClick={handleAddEndereco}
                >
                  <HStack gap={2}>
                    <FaPlus />
                    <Text>Adicionar</Text>
                  </HStack>
                </PizzaButton>
              </Flex>
            </Box>

            {/* Body do Card */}
            <Box p={6}>
              {user.enderecos && user.enderecos.length > 0 ? (
                <VStack align="stretch" gap={4}>
                  {user.enderecos.map((endereco: Endereco) => (
                    <EnderecoCard
                      key={endereco.id}
                      endereco={endereco}
                      onEdit={() => handleEditEndereco(endereco)}
                      onDelete={() => handleDeleteEndereco(endereco.id)}
                      onSetPrincipal={() => handleSetPrincipal(endereco)}
                    />
                  ))}
                </VStack>
              ) : (
                <Box textAlign="center" py={8}>
                  <Box mb={4}>
                    <FaMapMarkerAlt size={48} color="#4A5568" />
                  </Box>
                  <Text color="gray.400" mb={6}>
                    Nenhum endereço cadastrado
                  </Text>
                  <PizzaButton onClick={handleAddEndereco}>
                    <HStack gap={2}>
                      <FaPlus />
                      <Text>Adicionar Primeiro Endereço</Text>
                    </HStack>
                  </PizzaButton>
                </Box>
              )}
            </Box>
          </Box>
        </GridItem>
      </Grid>

      {/* Modal de Edição de Perfil */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSave={handleSaveProfile}
      />

      {/* Modal de Endereço */}
      <EnderecoModal
        isOpen={isEnderecoModalOpen}
        onClose={closeEnderecoModal}
        endereco={selectedEndereco}
        onSave={handleSaveEndereco}
      />
    </Box>
  );
};

```


---

## 📄 `src/features/profile/hooks/useEnderecos.ts`

```typescript
"use client";

import { useState, useCallback, useEffect } from "react";
import type { Endereco } from "@/types/endereco";
import {
  getEnderecos,
  createEndereco,
  updateEndereco,
  deleteEndereco,
  CreateEnderecoData,
  UpdateEnderecoData,
} from "../services/enderecoService";
import { toaster } from "@/components/ui/toaster";

export const useEnderecos = () => {
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnderecos = useCallback(async () => {
    try {
      setIsLoading(true);
      const enderecosData = await getEnderecos();
      setEnderecos(enderecosData);
      setError(null);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Falha ao carregar endereços.";
      setError(msg);
      toaster.create({ title: "Erro", description: msg, type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addEndereco = useCallback(async (data: CreateEnderecoData) => {
    try {
      const novoEndereco = await createEndereco(data);
      setEnderecos((prev) => [...prev, novoEndereco]);
      toaster.create({
        title: "Sucesso",
        description: "Endereço adicionado com sucesso!",
        type: "success",
      });
      return novoEndereco;
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Falha ao adicionar endereço.";
      toaster.create({ title: "Erro", description: msg, type: "error" });
      throw err;
    }
  }, []);

  const editEndereco = useCallback(
    async (enderecoId: number, data: UpdateEnderecoData) => {
      try {
        const enderecoAtualizado = await updateEndereco(enderecoId, data);
        setEnderecos((prev) =>
          prev.map((endereco) =>
            endereco.id === enderecoId ? enderecoAtualizado : endereco
          )
        );
        toaster.create({
          title: "Sucesso",
          description: "Endereço atualizado com sucesso!",
          type: "success",
        });
        return enderecoAtualizado;
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Falha ao atualizar endereço.";
        toaster.create({ title: "Erro", description: msg, type: "error" });
        throw err;
      }
    },
    []
  );

  const removeEndereco = useCallback(async (enderecoId: number) => {
    try {
      await deleteEndereco(enderecoId);
      setEnderecos((prev) =>
        prev.filter((endereco) => endereco.id !== enderecoId)
      );
      toaster.create({
        title: "Sucesso",
        description: "Endereço removido com sucesso!",
        type: "success",
      });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Falha ao remover endereço.";
      toaster.create({ title: "Erro", description: msg, type: "error" });
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchEnderecos();
  }, [fetchEnderecos]);

  return {
    enderecos,
    isLoading,
    error,
    refetch: fetchEnderecos,
    addEndereco,
    editEndereco,
    removeEndereco,
  };
};

```


---

## 📄 `src/features/profile/hooks/useProfile.ts`

```typescript
"use client";

import { useState, useCallback, useEffect } from "react";
import { User } from "@/types/users";
import { getMyProfile } from "../services/profileService";
import { toaster } from "@/components/ui/toaster";

export const useProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const profileData = await getMyProfile();
      setUser(profileData);
      setError(null);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Falha ao carregar o perfil.";
      setError(msg);
      toaster.create({ title: "Erro", description: msg, type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    user,
    isLoading,
    error,
    refetch: fetchProfile,
  };
};

```


---

## 📄 `src/features/profile/services/enderecoService.ts`

```typescript
import { getAuthToken } from "@/utils/cookies";
import type { Endereco } from "@/types/endereco";
import { getMyProfile } from "./profileService";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:10000";

/**
 * Interface para criação de endereço
 */
export interface CreateEnderecoData {
  cep: string;
  tipo: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento?: string;
  principal: boolean;
}

/**
 * Interface para atualização de endereço
 */
export interface UpdateEnderecoData {
  cep?: string;
  tipo?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  complemento?: string;
  principal?: boolean;
}

/**
 * Busca todos os endereços do usuário
 */
export const getEnderecos = async (): Promise<Endereco[]> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/enderecos`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    // Fallback: se a rota /enderecos não existir, busca via /me
    if (response.status === 404) {
      try {
        const profile = await getMyProfile();
        return profile.enderecos || [];
      } catch {
        throw new Error("Falha ao buscar endereços.");
      }
    }
    throw new Error("Falha ao buscar endereços.");
  }
  const result = await response.json();
  return result.data; // Extrair apenas o array de endereços
};

/**
 * Busca um endereço específico por ID (simulado a partir dos endereços do usuário)
 */
export const getEnderecoById = async (
  enderecoId: number
): Promise<Endereco> => {
  try {
    const enderecos = await getEnderecos();
    const endereco = enderecos.find((e) => e.id === enderecoId);
    if (!endereco) {
      throw new Error("Endereço não encontrado.");
    }
    return endereco;
  } catch {
    throw new Error("Falha ao buscar endereço.");
  }
};

/**
 * Cria um novo endereço
 */
export const createEndereco = async (
  data: CreateEnderecoData
): Promise<Endereco> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  // Usar a rota correta do backend /enderecos
  const response = await fetch(`${API_URL}/enderecos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Falha ao criar endereço.");
  }

  return response.json();
};

/**
 * Atualiza um endereço existente
 */
export const updateEndereco = async (
  enderecoId: number,
  data: UpdateEnderecoData
): Promise<Endereco> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/enderecos/${enderecoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Falha ao atualizar endereço.");
  }

  return response.json();
};

/**
 * Remove um endereço
 */
export const deleteEndereco = async (enderecoId: number): Promise<void> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/enderecos/${enderecoId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Falha ao remover endereço.");
  }
};

```


---

## 📄 `src/features/profile/services/profileService.ts`

```typescript
import { User } from "@/types/users";
import { getAuthToken } from "@/utils/cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:10000";

/**
 * Busca os dados do perfil do usuário logado.
 */
export const getMyProfile = async (): Promise<User> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Falha ao buscar os dados do perfil.");
  }
  return response.json();
};

/**
 * Atualiza os dados básicos do perfil do usuário (nome, email, telefone)
 */
export const updateBasicProfile = async (
  userId: number,
  data: { nome: string; email: string; telefone: string }
): Promise<User> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Falha ao atualizar o perfil.");
  }

  return response.json();
};

/**
 * Interface para dados de atualização do perfil
 */
export interface UpdateProfileData {
  nome: string;
  telefone: string;
  enderecos: Array<{
    id?: number;
    cep: string;
    tipo: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    complemento?: string;
    principal: boolean;
  }>;
}

/**
 * Atualiza os dados do perfil do usuário
 */
export const updateUserProfile = async (
  data: UpdateProfileData
): Promise<User> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/users/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Falha ao atualizar o perfil.");
  }

  return response.json();
};

/**
 * Adiciona um novo endereço
 */
export const addAddress = async (
  addressData: Omit<UpdateProfileData["enderecos"][0], "id">
) => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/users/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(addressData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Falha ao adicionar endereço.");
  }

  return response.json();
};

```


---

## 📄 `src/features/upload/components/FileUploader.tsx`

```typescript
"use client";

import React, { useRef, useState } from "react";
import { Box, VStack, Text, Icon } from "@chakra-ui/react";
import { FaCloudUploadAlt, FaTrash, FaFile, FaImage } from "react-icons/fa";
import { PizzaButton } from "@/components/ui";
import { useFileUpload } from "../hooks/useFileUpload";
import { UploadResult } from "@/types/upload";
import Image from "next/image";

interface FileUploaderProps {
  onUploadComplete?: (result: UploadResult) => void;
  onError?: (error: string) => void;
  pizzaId?: string; // Para upload específico de pizza
  accept?: string;
  maxSizeText?: string;
  currentImageUrl?: string; // Para mostrar imagem atual
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onUploadComplete,
  onError,
  pizzaId,
  accept = "image/*",
  maxSizeText = "Máx: 5MB",
  currentImageUrl,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl || null
  );

  const { upload, isUploading, progress, error, reset } =
    useFileUpload();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    // Criar preview para imagens
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const result = await upload(selectedFile, pizzaId);
      onUploadComplete?.(result);
      setSelectedFile(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro no upload";
      onError?.(errorMessage);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(currentImageUrl || null);
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFileIcon = () => {
    if (previewUrl && selectedFile?.type.startsWith("image/")) {
      return <FaImage />;
    }
    return <FaFile />;
  };

  return (
    <VStack gap={4} align="stretch">
      {/* Área de drop/upload */}
      <Box
        border="2px dashed"
        borderColor={selectedFile ? "orange.300" : "gray.300"}
        borderRadius="md"
        p={6}
        textAlign="center"
        bg={selectedFile ? "orange.50" : "gray.50"}
        cursor="pointer"
        onClick={() => fileInputRef.current?.click()}
        transition="all 0.2s"
        _hover={{ borderColor: "orange.400", bg: "orange.25" }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />

        {previewUrl ? (
          <Box>
            <Image
              src={previewUrl}
              alt="Preview"
              width={200}
              height={200}
              style={{
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            />
            <Text fontSize="sm" color="gray.600">
              Clique para alterar
            </Text>
          </Box>
        ) : (
          <VStack gap={2}>
            <Icon as={FaCloudUploadAlt} boxSize="24px" color="gray.500" />
            <Text fontWeight="medium">
              Arraste uma imagem ou clique para selecionar
            </Text>
            <Text fontSize="sm" color="gray.500">
              {accept} • {maxSizeText}
            </Text>
          </VStack>
        )}
      </Box>

      {/* Arquivo selecionado */}
      {selectedFile && (
        <Box
          p={3}
          bg="blue.50"
          borderRadius="md"
          border="1px solid"
          borderColor="blue.200"
        >
          <VStack gap={2} align="stretch">
            <Box display="flex" alignItems="center" gap={2}>
              <Icon as={getFileIcon} color="blue.500" />
              <Text fontSize="sm" fontWeight="medium" flex={1}>
                {selectedFile.name}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </Text>
            </Box>

            {/* Progress bar */}
            {isUploading && progress && (
              <Box
                w="100%"
                h="4px"
                bg="gray.200"
                borderRadius="md"
                overflow="hidden"
              >
                <Box
                  h="100%"
                  bg="orange.500"
                  width={`${progress.percentage}%`}
                  transition="width 0.3s"
                />
              </Box>
            )}

            {/* Ações */}
            <Box display="flex" gap={2} justifyContent="flex-end">
              <PizzaButton
                size="sm"
                variant="outline"
                onClick={handleRemove}
                disabled={isUploading}
              >
                <FaTrash />
              </PizzaButton>
              <PizzaButton
                size="sm"
                colorScheme="orange"
                onClick={handleUpload}
                loading={isUploading}
                loadingText="Enviando..."
              >
                Enviar
              </PizzaButton>
            </Box>
          </VStack>
        </Box>
      )}

      {/* Erro */}
      {error && (
        <Text color="red.500" fontSize="sm" textAlign="center">
          {error}
        </Text>
      )}
    </VStack>
  );
};

```


---

## 📄 `src/features/upload/components/index.ts`

```typescript
export * from './FileUploader';
```


---

## 📄 `src/features/upload/hooks/index.ts`

```typescript
export * from './useFileUpload';
```


---

## 📄 `src/features/upload/hooks/useFileUpload.ts`

```typescript
import { useState, useCallback } from "react";
import { UploadResult, UploadProgress } from "@/types/upload";
import { uploadPizzaImage, uploadFile } from "../services/uploadService";

interface UseFileUploadReturn {
  upload: (file: File, pizzaId?: string) => Promise<UploadResult>;
  isUploading: boolean;
  progress: UploadProgress | null;
  error: string | null;
  reset: () => void;
}

export const useFileUpload = (): UseFileUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setIsUploading(false);
    setProgress(null);
    setError(null);
  }, []);

  const upload = useCallback(
    async (file: File, pizzaId?: string): Promise<UploadResult> => {
      setIsUploading(true);
      setError(null);

      try {
        if (pizzaId) {
          // Upload para pizza específica
          const result = await uploadPizzaImage(pizzaId, file);
          return result;
        } else {
          // Upload genérico (futuro)
          const result = await uploadFile(file, "/upload");
          return result;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro desconhecido no upload";
        setError(errorMessage);
        throw err;
      } finally {
        setIsUploading(false);
      }
    },
    []
  );

  return {
    upload,
    isUploading,
    progress,
    error,
    reset,
  };
};

```


---

## 📄 `src/features/upload/index.ts`

```typescript
// Components
export * from './components';

// Hooks
export * from './hooks';

// Services
export * from './services';

// Types
export * from './types';
```


---

## 📄 `src/features/upload/services/index.ts`

```typescript
export * from './uploadService';
```


---

## 📄 `src/features/upload/services/uploadService.ts`

```typescript
import { UploadResult, FileValidationResult } from "@/types/upload";
import { getAuthToken } from "@/utils/cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Validar arquivo
export const validateFile = (
  file: File,
  options: { maxSize?: number; acceptedTypes?: string[] } = {}
): FileValidationResult => {
  const {
    maxSize = 5 * 1024 * 1024,
    acceptedTypes = ["image/jpeg", "image/png", "image/webp"],
  } = options;

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `Arquivo muito grande. Tamanho máximo: ${Math.round(
        maxSize / 1024 / 1024
      )}MB`,
    };
  }

  if (!acceptedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Tipo de arquivo não suportado. Use: ${acceptedTypes.join(", ")}`,
    };
  }

  return { isValid: true };
};

// Upload de imagem para pizza
export const uploadPizzaImage = async (
  pizzaId: string,
  file: File
): Promise<UploadResult> => {
  // Validar arquivo
  const validation = validateFile(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const formData = new FormData();
  formData.append("image", file);

  const token = getAuthToken();
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const response = await fetch(`${API_URL}/pizzas/${pizzaId}/upload-image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Erro no upload" }));
      throw new Error(errorData.message || "Erro no upload da imagem");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro no upload:", error);
    throw error;
  }
};

// Upload genérico (futuro)
export const uploadFile = async (
  file: File,
  endpoint: string
): Promise<UploadResult> => {
  const validation = validateFile(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const formData = new FormData();
  formData.append("file", file);

  const token = getAuthToken();
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Erro no upload" }));
      throw new Error(errorData.message || "Erro no upload do arquivo");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro no upload:", error);
    throw error;
  }
};

```


---

## 📄 `src/features/upload/types/index.ts`

```typescript
// Re-export types
export * from '@/types/upload';
```


---

## 📄 `src/features/users/components/UserFilters.tsx`

```typescript
// src/features/users/components/UserFilters.tsx

"use client";

import { Box, HStack, Input, Text, Button } from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";
import { Role } from "@/types/users";
import { UserFilters as UserFiltersType } from "../types/userManagement";

interface UserFiltersProps {
  filters: UserFiltersType;
  onFiltersChange: (filters: UserFiltersType) => void;
  onSearch: () => void;
}

/**
 * Componente de filtros para usuários
 * Permite filtrar por role e buscar por nome/email
 */
export const UserFilters = ({ filters, onFiltersChange, onSearch }: UserFiltersProps) => {
  const handleRoleChange = (role: string) => {
    const newFilters = {
      ...filters,
      role: role === "all" ? undefined : role as Role,
    };
    onFiltersChange(newFilters);
  };

  const handleSearchChange = (search: string) => {
    const newFilters = {
      ...filters,
      search: search || undefined,
    };
    onFiltersChange(newFilters);
  };

  return (
    <Box
      p={4}
      bg="background.secondary"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="background.tertiary"
    >
      <HStack gap={4} align="flex-end" flexWrap="wrap">
        <Box flex="1" minW="200px">
          <Text mb={2} fontSize="sm" fontWeight="medium">
            Buscar
          </Text>
          <Input
            placeholder="Nome ou email (mín. 3 caracteres)..."
            value={filters.search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {filters.search && filters.search.length > 0 && filters.search.length < 3 && (
            <Text fontSize="xs" color="orange.500" mt={1}>
              Digite pelo menos 3 caracteres para buscar
            </Text>
          )}
        </Box>

        <Box minW="150px">
          <Text mb={2} fontSize="sm" fontWeight="medium">
            Função
          </Text>
          <select
            value={filters.role || "all"}
            onChange={(e) => handleRoleChange(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #E2E8F0",
              borderRadius: "6px",
              fontSize: "14px",
              backgroundColor: "white",
            }}
          >
            <option value="all">Todas</option>
            <option value={Role.CLIENTE}>Clientes</option>
            <option value={Role.FUNCIONARIO}>Funcionários</option>
            <option value={Role.ADMIN}>Administradores</option>
          </select>
        </Box>

        <Button
          onClick={onSearch}
          colorScheme="blue"
          variant="outline"
          disabled={Boolean(filters.search && filters.search.length > 0 && filters.search.length < 3)}
        >
          <FaFilter style={{ marginRight: "8px" }} />
          Filtrar
        </Button>
      </HStack>
    </Box>
  );
};
```


---

## 📄 `src/features/users/components/UserFormModal.tsx`

```typescript
// src/features/users/components/UserFormModal.tsx

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, VStack, HStack, Button } from "@chakra-ui/react";
import { User } from "@/types/users";
import {
  PizzaInput,
  PizzaButton,
  AppModal,
  PizzaSelect,
} from "@/components/ui";
import { Role } from "@/types/users";
import { UserCreationData } from "../types/userManagement";

interface UserFormModalProps {
  isOpen: boolean;
  user?: User | null; // null = criar, User = editar
  onSubmit: (data: UserCreationData) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}

/**
 * Modal para criar/editar usuários
 * Usa react-hook-form + zod para validação
 * Segue padrão visual do projeto
 */
export const UserFormModal = ({
  isOpen,
  user,
  onSubmit,
  onClose,
  isLoading,
}: UserFormModalProps) => {
  // Schema de validação com Zod - criado dinamicamente baseado no modo
  const userFormSchema = z
    .object({
      nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
      email: z.string().email("Email deve ter um formato válido"),
      telefone: z
        .string()
        .regex(
          /^\(\d{2}\) \d{4,5}-\d{4}$/,
          "Telefone deve estar no formato (99) 99999-9999"
        ),
      role: z.nativeEnum(Role),
      password: z.string().optional(),
      confirmPassword: z.string().optional(),
    })
    .refine(
      (data) => {
        // Senha obrigatória apenas na criação
        if (!data.password && !user) {
          return false;
        }
        // Se senha fornecida, deve ter pelo menos 6 caracteres
        if (data.password && data.password.length < 6) {
          return false;
        }
        // Se confirmPassword fornecida, deve coincidir com password
        if (data.confirmPassword && data.password !== data.confirmPassword) {
          return false;
        }
        return true;
      },
      {
        message: "Validação de senha falhou",
        path: ["password"],
      }
    );

  type UserFormData = z.infer<typeof userFormSchema>;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      role: Role.FUNCIONARIO, // Default para criação
      password: "",
    },
  });

  // Preencher formulário quando editar
  useEffect(() => {
    if (user) {
      setValue("nome", user.nome);
      setValue("email", user.email);
      setValue("telefone", user.telefone);
      setValue("role", user.role);
      // Não preenche senha na edição
    } else {
      reset({
        nome: "",
        email: "",
        telefone: "",
        role: Role.FUNCIONARIO,
        password: "",
      });
    }
  }, [user, setValue, reset]);

  const onFormSubmit = async (data: UserFormData) => {
    const submitData: UserCreationData = {
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      role: data.role,
      password: data.password || "", // Senha obrigatória na criação
    };

    await onSubmit(submitData);
  };

  const title = user ? "Editar Usuário" : "Criar Usuário";
  const submitLabel = user ? "Salvar Alterações" : "Criar Usuário";

  return (
    <AppModal isOpen={isOpen} onClose={onClose} title={title}>
      <Box as="form" onSubmit={handleSubmit(onFormSubmit)}>
        <VStack gap={4} align="stretch">
          <PizzaInput
            label="Nome Completo"
            {...register("nome")}
            error={errors.nome?.message}
            placeholder="Digite o nome completo"
          />

          <PizzaInput
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            placeholder="Digite o email"
          />

          <PizzaInput
            label="Telefone"
            {...register("telefone")}
            error={errors.telefone?.message}
            placeholder="(99) 99999-9999"
          />

          <PizzaSelect
            label="Função"
            {...register("role")}
            error={errors.role?.message}
          >
            <option value={Role.FUNCIONARIO}>Funcionário</option>
            <option value={Role.ADMIN}>Administrador</option>
            {user?.role === Role.CLIENTE && (
              <option value={Role.CLIENTE}>Cliente</option>
            )}
          </PizzaSelect>

          {!user && (
            <PizzaInput
              label="Senha"
              type="password"
              {...register("password")}
              error={errors.password?.message}
              placeholder="Digite uma senha"
            />
          )}

          <HStack justify="flex-end" gap={3} pt={4}>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <PizzaButton type="submit" loading={isLoading}>
              {submitLabel}
            </PizzaButton>
          </HStack>
        </VStack>
      </Box>
    </AppModal>
  );
};

```


---

## 📄 `src/features/users/components/UsersTable.tsx`

```typescript
// src/features/users/components/UsersTable.tsx

"use client";

import { Box, Table, IconButton, Badge, Text, VStack } from "@chakra-ui/react";
import { FaEdit, FaTrash, FaUser, FaUserTie, FaUserShield } from "react-icons/fa";
import { User } from "@/types/users";
import { PizzaLoading } from "@/components/ui";
import { Role } from "@/types/users";

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

/**
 * Componente de tabela para exibir usuários
 * Segue o padrão visual do projeto com Chakra UI
 */
export const UsersTable = ({ users, isLoading, onEdit, onDelete }: UsersTableProps) => {
  // Função para renderizar badge do role
  const renderRoleBadge = (role: Role) => {
    const roleConfig = {
      [Role.CLIENTE]: {
        label: "Cliente",
        colorScheme: "green" as const,
        icon: FaUser,
      },
      [Role.FUNCIONARIO]: {
        label: "Funcionário",
        colorScheme: "blue" as const,
        icon: FaUserTie,
      },
      [Role.ADMIN]: {
        label: "Administrador",
        colorScheme: "red" as const,
        icon: FaUserShield,
      },
    };

    const config = roleConfig[role];
    const IconComponent = config.icon;

    return (
      <Badge colorScheme={config.colorScheme} variant="subtle" px={2} py={1}>
        <IconComponent style={{ display: "inline", marginRight: "4px" }} />
        {config.label}
      </Badge>
    );
  };

  if (isLoading) {
    return <PizzaLoading message="Carregando usuários..." />;
  }

  if (users.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="text.secondary">Nenhum usuário encontrado.</Text>
      </Box>
    );
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="background.secondary"
      borderColor="background.tertiary"
    >
      <Table.Root size="md" variant="outline">
        <Table.Header bg="background.primary">
          <Table.Row>
            <Table.ColumnHeader>Nome</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Telefone</Table.ColumnHeader>
            <Table.ColumnHeader>Função</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center" width="120px">
              Ações
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell fontWeight="medium">{user.nome}</Table.Cell>
              <Table.Cell color="text.secondary">{user.email}</Table.Cell>
              <Table.Cell>{user.telefone}</Table.Cell>
              <Table.Cell>{renderRoleBadge(user.role)}</Table.Cell>
              <Table.Cell textAlign="center">
                <VStack gap={1}>
                  <IconButton
                    size="sm"
                    variant="ghost"
                    colorScheme="blue"
                    aria-label="Editar usuário"
                    onClick={() => onEdit(user)}
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    aria-label="Remover usuário"
                    onClick={() => onDelete(user.id)}
                  >
                    <FaTrash />
                  </IconButton>
                </VStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};
```


---

## 📄 `src/features/users/hooks/useUsers.ts`

```typescript
// src/features/users/hooks/useUsers.ts

"use client";

import { useState, useCallback, useEffect } from "react";
import { User } from "@/types/users";
import { toaster } from "@/components/ui/toaster";
import { getUsers, createUser, updateUser, deleteUser } from "../services/usersService";
import { UserFilters, UserCreationData } from "../types/userManagement";

export interface UseUsersReturn {
  // Estado
  users: User[];
  filters: UserFilters;
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
  selectedUser: User | null;

  // Ações
  setFilters: (filters: UserFilters) => void;
  fetchUsers: () => Promise<void>;
  createUser: (data: UserCreationData) => Promise<void>;
  updateUser: (id: number, data: Partial<UserCreationData>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;

  // Handlers UI
  handleCreate: () => void;
  handleEdit: (user: User) => void;
  handleDelete: (id: number) => Promise<void>;
  onCloseModal: () => void;
}

/**
 * Hook principal para gerenciamento de usuários
 * Segue padrão dos outros hooks do projeto (usePizzas, useProfile)
 */
export const useUsers = (): UseUsersReturn => {
  // Estado da listagem
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<UserFilters>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado do modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Buscar usuários (usado pelos filtros)
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Se temos busca com menos de 3 caracteres, buscar todos e filtrar localmente
      if (filters?.search && filters.search.length < 3) {
        const allUsers = await getUsers({ ...filters, search: undefined });
        const filteredUsers = allUsers.filter(user =>
          user.nome.toLowerCase().includes(filters.search!.toLowerCase()) ||
          user.email.toLowerCase().includes(filters.search!.toLowerCase())
        );
        setUsers(filteredUsers);
      } else {
        // Busca normal via API
        const data = await getUsers(filters);
        setUsers(data);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao carregar usuários.";
      setError(message);
      toaster.create({
        title: "Erro",
        description: message,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Buscar usuários iniciais (sem filtros)
  const fetchInitialUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getUsers(); // Sem filtros na carga inicial
      setUsers(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao carregar usuários.";
      setError(message);
      toaster.create({
        title: "Erro",
        description: message,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carregar usuários apenas na montagem inicial
  useEffect(() => {
    fetchInitialUsers();
  }, [fetchInitialUsers]);

  // Criar usuário
  const handleCreateUser = useCallback(async (data: UserCreationData) => {
    try {
      setIsLoading(true);
      await createUser(data);
      toaster.create({
        title: "Sucesso",
        description: "Usuário criado com sucesso!",
        type: "success",
      });
      await fetchUsers(); // Recarregar lista
      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao criar usuário.";
      toaster.create({
        title: "Erro",
        description: message,
        type: "error",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchUsers]);

  // Atualizar usuário
  const handleUpdateUser = useCallback(async (id: number, data: Partial<UserCreationData>) => {
    try {
      setIsLoading(true);
      await updateUser(id, data);
      toaster.create({
        title: "Sucesso",
        description: "Usuário atualizado com sucesso!",
        type: "success",
      });
      await fetchUsers(); // Recarregar lista
      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao atualizar usuário.";
      toaster.create({
        title: "Erro",
        description: message,
        type: "error",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchUsers]);

  // Deletar usuário
  const handleDeleteUser = useCallback(async (id: number) => {
    try {
      setIsLoading(true);
      await deleteUser(id);
      toaster.create({
        title: "Sucesso",
        description: "Usuário removido com sucesso!",
        type: "success",
      });
      await fetchUsers(); // Recarregar lista
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao remover usuário.";
      toaster.create({
        title: "Erro",
        description: message,
        type: "error",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchUsers]);

  // Handlers para UI
  const handleCreate = useCallback(() => {
    setSelectedUser(null);
    setIsModalOpen(true);
  }, []);

  const handleEdit = useCallback((user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    if (window.confirm("Tem certeza que deseja remover este usuário?")) {
      await handleDeleteUser(id);
    }
  }, [handleDeleteUser]);

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedUser(null);
  }, []);

  return {
    // Estado
    users,
    filters,
    isLoading,
    error,
    isModalOpen,
    selectedUser,

    // Ações
    setFilters,
    fetchUsers,
    createUser: handleCreateUser,
    updateUser: handleUpdateUser,
    deleteUser: handleDeleteUser,

    // Handlers UI
    handleCreate,
    handleEdit,
    handleDelete,
    onCloseModal,
  };
};
```


---

## 📄 `src/features/users/index.ts`

```typescript
// src/features/users/index.ts

// Hooks
export { useUsers } from "./hooks/useUsers";

// Services
export { getUsers, createUser, updateUser, deleteUser } from "./services/usersService";

// Components
export { UsersTable } from "./components/UsersTable";
export { UserFormModal } from "./components/UserFormModal";
export { UserFilters as UserFiltersComponent } from "./components/UserFilters";

// Types
export type { UserFilters, UserFormData, UserCreationData } from "./types/userManagement";
```


---

## 📄 `src/features/users/services/usersService.ts`

```typescript
// src/features/users/services/usersService.ts

import { User } from "@/types/users";
import { getAuthToken } from "@/utils/cookies";
import { UserCreationData, UserFilters } from "../types/userManagement";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Helper para criar cabeçalhos de autenticação
 */
const getAuthHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Busca todos os usuários com filtros opcionais
 */
export const getUsers = async (filters?: UserFilters): Promise<User[]> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const queryParams = new URLSearchParams();
  if (filters?.role) queryParams.append("role", filters.role);
  if (filters?.search) queryParams.append("search", filters.search);

  const url = `${API_URL}/users${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao buscar usuários.");
  }

  const result = await response.json();
  return result.data || result; // Ajustar conforme resposta da API
};

/**
 * Busca um usuário específico por ID
 */
export const getUserById = async (id: number): Promise<User> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/users/${id}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao buscar usuário.");
  }

  const result = await response.json();
  return result.data || result;
};

/**
 * Cria um novo usuário (apenas ADMIN)
 */
export const createUser = async (data: UserCreationData): Promise<User> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao criar usuário.");
  }

  const result = await response.json();
  return result.data || result;
};

/**
 * Atualiza um usuário existente
 */
export const updateUser = async (id: number, data: Partial<UserCreationData>): Promise<User> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao atualizar usuário.");
  }

  const result = await response.json();
  return result.data || result;
};

/**
 * Remove um usuário (apenas ADMIN)
 */
export const deleteUser = async (id: number): Promise<void> => {
  const token = getAuthToken();
  if (!token) throw new Error("Usuário não autenticado.");

  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao deletar usuário.");
  }
};
```


---

## 📄 `src/features/users/types/userManagement.ts`

```typescript
// src/features/users/types/userManagement.ts

import { Role, User } from "@/types/users";

export interface UserFilters {
  role?: Role;
  search?: string;
  status?: 'active' | 'inactive';
}

export interface UserFormData {
  nome: string;
  email: string;
  telefone: string;
  role: Role;
}

export interface UserCreationData extends UserFormData {
  password: string;
}

export interface UsersListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export interface UserTableItem {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  role: Role;
  createdAt: string;
}
```


---

## 📄 `src/hooks/usePermissions.ts`

```typescript
"use client";

import { useAuth } from "@/features/auth/contexts/AuthContext";
import { Role } from "@/types/users";

/**
 * Hook para gerenciar permissões baseado em roles
 * Seguindo os princípios de SOLID e Clean Code
 */
export const usePermissions = () => {
  const { user, isAuthenticated } = useAuth();

  /**
   * Verifica se o usuário tem uma role específica
   */
  const hasRole = (role: Role | Role[]): boolean => {
    if (!isAuthenticated || !user) return false;

    if (Array.isArray(role)) {
      return role.includes(user.role);
    }

    return user.role === role;
  };

  /**
   * Verifica se o usuário é cliente
   */
  const isCliente = (): boolean => hasRole(Role.CLIENTE);

  /**
   * Verifica se o usuário é funcionário
   */
  const isFuncionario = (): boolean => hasRole(Role.FUNCIONARIO);

  /**
   * Verifica se o usuário é admin
   */
  const isAdmin = (): boolean => hasRole(Role.ADMIN);

  /**
   * Verifica se o usuário tem permissões de staff (funcionário ou admin)
   */
  const isStaff = (): boolean => hasRole([Role.FUNCIONARIO, Role.ADMIN]);

  /**
   * Verifica se o usuário pode acessar recursos administrativos
   */
  const canAccessAdmin = (): boolean => isAdmin();

  /**
   * Verifica se o usuário pode gerenciar pedidos
   */
  const canManageOrders = (): boolean => isStaff();

  /**
   * Verifica se o usuário pode gerenciar pizzas/cardápio
   */
  const canManagePizzas = (): boolean => isAdmin();

  /**
   * Verifica se o usuário pode gerenciar usuários
   */
  const canManageUsers = (): boolean => isAdmin();

  /**
   * Verifica se o usuário pode gerenciar entregadores
   */
  const canManageDeliveryPersons = (): boolean => isAdmin();

  /**
   * Verifica se o usuário pode visualizar todos os pedidos
   */
  const canViewAllOrders = (): boolean => isStaff();

  /**
   * Verifica se o usuário pode atualizar status de pedidos
   */
  const canUpdateOrderStatus = (): boolean => isStaff();

  return {
    // Métodos básicos
    hasRole,
    isCliente,
    isFuncionario,
    isAdmin,
    isStaff,

    // Métodos específicos por recurso
    canAccessAdmin,
    canManageOrders,
    canManagePizzas,
    canManageUsers,
    canManageDeliveryPersons,
    canViewAllOrders,
    canUpdateOrderStatus,

    // Informações do usuário
    user,
    isAuthenticated,
    userRole: user?.role,
  };
};

```


---

## 📄 `src/hooks/useTranslation.ts`

```typescript
"use client";

import { useCallback } from "react";
import ptBR from "@/locales/pt-BR.json";

type TranslationKey = string;
type TranslationParams = Record<string, string | number>;

/**
 * Hook para internacionalização (i18n)
 * Fornece traduções baseadas em chaves e parâmetros
 */
export const useTranslation = () => {
  /**
   * Obtém uma tradução baseada em uma chave
   * @param key Chave no formato "namespace.key" ou "namespace.nested.key"
   * @param params Parâmetros para substituição no texto
   * @returns Texto traduzido
   */
  const t = useCallback((key: TranslationKey, params?: TranslationParams): string => {
    // Divide a chave por pontos para navegar no objeto
    const keys = key.split(".");
    let value: unknown = ptBR;

    // Navega pelo objeto de tradução
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Retorna a chave original se não encontrar a tradução
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    // Se o valor final não for uma string, converte para string
    let result = typeof value === "string" ? value : String(value);

    // Substitui parâmetros no formato {param}
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        result = result.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(paramValue));
      });
    }

    return result;
  }, []);

  return { t };
};

/**
 * Tipo para as chaves de tradução disponíveis
 */
export type TranslationKeys = 
  | `common.${keyof typeof ptBR.common}`
  | `auth.${keyof typeof ptBR.auth}`
  | `cart.${keyof typeof ptBR.cart}`
  | `menu.${keyof typeof ptBR.menu}`
  | `admin.${keyof typeof ptBR.admin}`
  | `validation.${keyof typeof ptBR.validation}`;

```


---

## 📄 `src/middleware.ts`

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface UserProfile {
  id: number;
  role: "CLIENTE" | "FUNCIONARIO" | "ADMIN";
}

/**
 * Função para validar token e obter perfil do usuário
 */
async function validateTokenAndGetUser(
  token: string
): Promise<UserProfile | null> {
  try {
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!API_URL) return null;

    const response = await fetch(`${API_URL}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const userData = await response.json();
      return {
        id: userData.id,
        role: userData.role,
      };
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Verifica se o usuário tem as roles necessárias
 */
function hasRequiredRole(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole);
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Log apenas em desenvolvimento
  if (process.env.NODE_ENV !== "production") {
    console.log(`[MIDDLEWARE] Processing request for: ${pathname}`);
  }

  // Arquivos estáticos não precisam de autenticação
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".gif") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".js")
  ) {
    return NextResponse.next();
  }

  // Páginas públicas que não precisam de autenticação
  const publicPages = [
    "/",
    "/login",
    "/register",
    "/access-denied",
    "/welcome",
    "/auth-callback",
  ];

  // Rotas protegidas por roles específicos
  const roleProtectedRoutes: Record<string, string[]> = {
    "/dashboard": ["CLIENTE", "FUNCIONARIO", "ADMIN"], // Todos podem acessar dashboard básico
    "/pedidos": ["CLIENTE", "FUNCIONARIO", "ADMIN"], // Todos podem ver pedidos
    "/profile": ["CLIENTE", "FUNCIONARIO", "ADMIN"], // Todos podem ver perfil
    "/admin": ["ADMIN"], // Apenas admin
    "/staff": ["FUNCIONARIO", "ADMIN"], // Funcionários e admin
  };

  if (publicPages.includes(pathname)) {
    // Permitir acesso direto ao auth-callback
    if (pathname === "/auth-callback") {
      if (process.env.NODE_ENV !== "production") {
        console.log(`[MIDDLEWARE] Allowing access to auth-callback`);
      }
      return NextResponse.next();
    }

    // Se usuário está logado e tenta acessar login/register, redirecionar para dashboard
    const token = request.cookies.get("authToken")?.value;
    if (token) {
      const user = await validateTokenAndGetUser(token);
      if (user) {
        if (process.env.NODE_ENV !== "production") {
          console.log(`[MIDDLEWARE] Valid token, redirecting to /cardapio`);
        }
        return NextResponse.redirect(new URL("/cardapio", request.url));
      } else {
        if (process.env.NODE_ENV !== "production") {
          console.log(
            `[MIDDLEWARE] Invalid token, allowing access to ${pathname}`
          );
        }
      }
    }
    return NextResponse.next();
  }

  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[MIDDLEWARE] No token, redirecting to login`);
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = await validateTokenAndGetUser(token);

  if (!user) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[MIDDLEWARE] Invalid token, redirecting to login`);
    }
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("authToken");
    return response;
  }

  // Verificar se a rota requer roles específicos
  for (const [routePrefix, allowedRoles] of Object.entries(
    roleProtectedRoutes
  )) {
    if (pathname.startsWith(routePrefix)) {
      if (!hasRequiredRole(user.role, allowedRoles)) {
        if (process.env.NODE_ENV !== "production") {
          console.log(
            `[MIDDLEWARE] User role ${user.role} not allowed for ${pathname}, redirecting to access-denied`
          );
        }
        return NextResponse.redirect(new URL("/access-denied", request.url));
      }
      break;
    }
  }

  if (process.env.NODE_ENV !== "production") {
    console.log(
      `[MIDDLEWARE] Access granted to ${pathname} for user role ${user.role}`
    );
  }
  return NextResponse.next();
}

// Matcher mais simples
export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};

```


---

## 📄 `src/theme/system.ts`

```typescript
import { pizzaTheme } from "@/theme/theme";
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    // Precisamos incluir os tokens E as recipes do seu tema
    tokens: pizzaTheme.tokens,
    recipes: pizzaTheme.recipes,
  },
});

export const pizzaExpressSystem = createSystem(defaultConfig, config);

```


---

## 📄 `src/theme/theme.ts`

```typescript
// src/theme/theme.ts

export const pizzaTheme = {
  tokens: {
    colors: {
      brand: {
        primary: { value: "#D92B2B" }, // Vermelho principal
        secondary: { value: "#2E7D32" }, // Verde
        accent: { value: "#FFC107" }, // Amarelo/Mostarda
      },
      white: { value: "#FFFFFF" },
      background: { value: "#F5F5F5" },
      surface: { value: "#FFFFFF" },
      textPrimary: { value: "#212121" },
      textSecondary: { value: "#757575" },
      success: { value: "#2E7D32" },
      warning: { value: "#ECC94B" },
      error: { value: "#D92B2B" },
    },
    fonts: {
      heading: { value: "'Roboto Slab', serif" },
      body: { value: "'Roboto', sans-serif" },
    },
    zIndex: {
      sticky: { value: 10 },
      popover: { value: 20 },
      modal: { value: 1400 },
      modalOnTop: { value: 1401 },
    },
  },
  recipes: {
    button: {
      className: "button",
      description: "The styles for the Button component",
      base: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "600",
        borderRadius: "lg",
        transition: "all 0.2s ease",
        cursor: "pointer",
        fontFamily: "body",
        _disabled: { opacity: 0.6, cursor: "not-allowed" },
      },
      variants: {
        variant: {
          solid: {
            bg: "brand.primary",
            color: "white",
            _hover: {
              bg: "#C62828", // Vermelho mais escuro para o hover
            },
          },
          // Variante adicionada para botões com borda no tema escuro
          outline: {
            borderWidth: "1px",
            borderColor: "brand.primary",
            color: "brand.primary",
            _hover: {
              bg: "rgba(217, 43, 43, 0.1)",
            },
          },
          accent: {
            bg: "brand.accent",
            color: "textPrimary",
            _hover: {
              bg: "#FFB300",
            },
          },
          ghost: {
            bg: "transparent",
            color: "gray.600",
            _hover: { bg: "rgba(217, 43, 43, 0.1)" },
          },
        },
        size: {
          md: { px: 4, h: 10, fontSize: "md" },
          lg: { px: 6, h: 12, fontSize: "lg" },
          sm: { px: 2, h: 8, fontSize: "sm" },
        },
      },
    },
  },
};
```


---

## 📄 `src/types/cart.ts`

```typescript
import { Product } from "./product";

/**
 * @interface CartItem
 * @description Interface para um item dentro do carrinho de compras.
 * @property {Product} product - O objeto completo do produto.
 * @property {number} quantity - A quantidade deste produto no carrinho.
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * @interface Cart
 * @description Interface para o estado geral do carrinho de compras.
 * @property {CartItem[]} items - Uma lista de itens no carrinho.
 * @property {number} totalItems - O número total de pizzas no carrinho (soma das quantidades).
 * @property {number} totalPrice - O preço total de todos os itens no carrinho.
 */
export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

```


---

## 📄 `src/types/categoria.ts`

```typescript
// Types para Categorias
export interface Categoria {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoriaData {
  name: string;
  slug: string;
}

export interface UpdateCategoriaData {
  name?: string;
  slug?: string;
}
```


---

## 📄 `src/types/endereco.ts`

```typescript
// src/types/endereco.ts

export interface Endereco {
  id: number;
  cep: string;
  tipo: string;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string | null;
  cidade: string;
  estado: string;
  principal: boolean;
}

```


---

## 📄 `src/types/entregador.ts`

```typescript
export interface Entregador {
  id: number;
  nome: string;
  telefone: string | null;
  createdAt: string;
  updatedAt: string;
}

```


---

## 📄 `src/types/index.ts`

```typescript
// Types para upload de imagem
export interface UploadImageData {
  imagem: File;
}

// Types para Usuário
export interface User {
  userId: number;
  email: string;
  nome?: string;
  telefone?: string;
  endereco?: string;
}

// Types para Autenticação
export interface AuthResponse {
  access_token: string;
  user: User;
}

// Types para API Response
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Types para Componentes
export interface NavItemProps {
  href: string;
  label: string;
  icon?: React.ComponentType;
}

export interface LayoutProps {
  children: React.ReactNode;
}

// Types para Dashboard
export interface DashboardStats {
  label: string;
  value: string;
  helpText: string;
  icon: React.ComponentType;
  color: string;
  bgGradient: string;
}

// Exporta todos os tipos relacionados a pizza
// export * from "./pizza"; // Removido porque o módulo não existe

// Exporta todos os tipos do sistema

// Auth
export * from "./users";

// Products (substitui pizzas)
export * from "./product";
export * from "./categoria";

// Orders (substitui pedidos)
export * from "./order";

// Others
export * from "./endereco";
export * from "./entregador";
export * from "./mesa";
export * from "./upload";
export * from "./cart";

```


---

## 📄 `src/types/mesa.ts`

```typescript
// Types para Mesas e Sessões
export interface Mesa {
  id: string;
  number: number;
  status: MesaStatus;
  sessaoAtiva?: SessaoMesa;
  createdAt: string;
  updatedAt: string;
}

export enum MesaStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED'
}

export interface SessaoMesa {
  id: string;
  mesaId: string;
  pedidos: PedidoMesa[];
  total: number;
  status: 'ATIVA' | 'FECHADA';
  criadoEm: string;
  fechadoEm?: string;
}

export interface PedidoMesa {
  id: string;
  itens: ItemPedido[];
  observacoes?: string;
  criadoEm: string;
}

export interface ItemPedido {
  productId: string;
  quantity: number;
  product?: {
    id: string;
    name: string;
    price: number;
  };
}

export interface CreateMesaData {
  number: number;
}

export interface AbrirSessaoData {
  mesaId: string;
}

export interface AdicionarPedidoMesaData {
  type: 'DINE_IN';
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  tableId: string;
  observations?: string;
}

export interface FecharContaData {
  mesaId: string;
}
```


---

## 📄 `src/types/order.ts`

```typescript
/**
 * Tipos para o sistema de pedidos moderno
 * @version 1.0.0
 * @since 28/12/2025
 */

import type { Endereco } from "./endereco";

/**
 * Tipo de pedido
 */
export type OrderType = "DELIVERY" | "DINE_IN";

/**
 * Status do pedido
 */
export type OrderStatus =
  | "PENDENTE" // Aguardando confirmação
  | "EM_PREPARO" // Em preparação
  | "A_CAMINHO" // A caminho (delivery)
  | "PRONTO" // Pronto para retirada (dine-in)
  | "ENTREGUE" // Entregue
  | "CANCELADO"; // Cancelado

/**
 * Status do item do pedido
 */
export type OrderItemStatus =
  | "PENDING" // Aguardando confirmação
  | "CONFIRMED" // Confirmado
  | "PREPARING" // Em preparação
  | "READY" // Pronto
  | "CANCELLED"; // Cancelado

/**
 * Item de um pedido
 */
export interface OrderItem {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: string;
    imageUrl?: string;
  };
  quantity: number;
  price: string; // Preço unitário no momento do pedido
  subtotal: string; // quantity * price
  status: OrderItemStatus;
  notes?: string;
  cancelReason?: string;
  createdAt: string;
  updatedAt?: string;
}

/**
 * Pedido completo
 */
export interface Order {
  id: number;
  type: OrderType;
  status: OrderStatus;
  total: string; // Total calculado
  deliveryFee?: string; // Taxa de entrega (se aplicável)
  userId?: number;
  user?: {
    id: number;
    nome: string;
    email: string;
  };
  addressId?: number;
  address?: Endereco;
  sessionId?: string; // Para pedidos DINE_IN
  session?: {
    id: string;
    table: {
      id: string;
      number: number;
    };
  };
  items: OrderItem[];
  canModify: boolean; // Se ainda pode modificar itens
  createdAt: string;
  updatedAt?: string;
}

/**
 * DTO para criar pedido
 */
export interface CreateOrderDto {
  type: OrderType;
  addressId?: number; // Obrigatório para DELIVERY
  sessionId?: string; // Obrigatório para DINE_IN
  items: {
    productId: string;
    quantity: number;
    notes?: string;
  }[];
  observations?: string;
}

/**
 * DTO para adicionar item ao pedido
 */
export interface AddOrderItemDto {
  productId: string;
  quantity: number;
  notes?: string;
}

/**
 * DTO para atualizar quantidade do item
 */
export interface UpdateOrderItemQuantityDto {
  quantity: number;
}

/**
 * DTO para cancelar item
 */
export interface CancelOrderItemDto {
  reason: string;
}

/**
 * DTO para filtros de busca de pedidos
 */
export interface OrderFilters {
  status?: OrderStatus;
  type?: OrderType;
  userId?: number;
  dateFrom?: string;
  dateTo?: string;
}

/**
 * Helper para calcular total do pedido
 */
export const calculateOrderTotal = (items: OrderItem[]): number => {
  return items.reduce((sum, item) => {
    const subtotal = parseFloat(item.subtotal);
    return sum + (isNaN(subtotal) ? 0 : subtotal);
  }, 0);
};

/**
 * Helper para verificar se pedido pode ser modificado
 */
export const canModifyOrder = (order: Order): boolean => {
  return (
    order.canModify &&
    (order.status === "PENDENTE" || order.status === "EM_PREPARO")
  );
};

/**
 * Helper para verificar se pedido é delivery
 */
export const isDeliveryOrder = (order: Order): boolean => {
  return order.type === "DELIVERY";
};

/**
 * Helper para verificar se pedido é dine-in
 */
export const isDineInOrder = (order: Order): boolean => {
  return order.type === "DINE_IN";
};

/**
 * Helper para obter status display do pedido
 */
export const getOrderStatusDisplay = (
  status: OrderStatus
): { label: string; colorScheme: string } => {
  const statusMap: Record<OrderStatus, { label: string; colorScheme: string }> =
    {
      PENDENTE: { label: "Pendente", colorScheme: "gray" },
      EM_PREPARO: { label: "Em Preparo", colorScheme: "yellow" },
      A_CAMINHO: { label: "A Caminho", colorScheme: "blue" },
      PRONTO: { label: "Pronto", colorScheme: "green" },
      ENTREGUE: { label: "Entregue", colorScheme: "green" },
      CANCELADO: { label: "Cancelado", colorScheme: "red" },
    };

  return statusMap[status] || { label: status, colorScheme: "gray" };
};

/**
 * Helper para obter status display do item
 */
export const getOrderItemStatusDisplay = (
  status: OrderItemStatus
): { label: string; colorScheme: string } => {
  const statusMap: Record<
    OrderItemStatus,
    { label: string; colorScheme: string }
  > = {
    PENDING: { label: "Pendente", colorScheme: "gray" },
    CONFIRMED: { label: "Confirmado", colorScheme: "blue" },
    PREPARING: { label: "Preparando", colorScheme: "yellow" },
    READY: { label: "Pronto", colorScheme: "green" },
    CANCELLED: { label: "Cancelado", colorScheme: "red" },
  };

  return statusMap[status] || { label: status, colorScheme: "gray" };
};

```


---

## 📄 `src/types/product.ts`

```typescript
/**
 * Tipos para o sistema de produtos (substitui pizzas)
 * @version 1.0.0
 * @since 28/12/2025
 */

/**
 * Produto do catálogo
 */
export interface Product {
  id: string; // UUID do backend
  name: string;
  description?: string;
  price: string; // Decimal como string (backend)
  imageUrl?: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

/**
 * Categoria de produtos
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

/**
 * DTO para criação de produto
 */
export interface CreateProductDto {
  name: string;
  description?: string;
  price: number; // Será convertido para string no backend
  categoryId: string;
  image?: File;
}

/**
 * DTO para atualização de produto
 */
export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number; // Será convertido para string no backend
  categoryId?: string;
  active?: boolean;
  image?: File;
}

/**
 * Helper para converter Product.price (string) para number
 */
export const parseProductPrice = (priceString: string): number => {
  const price = parseFloat(priceString);
  if (isNaN(price)) {
    throw new Error(`Preço inválido: ${priceString}`);
  }
  return price;
};

/**
 * Helper para formatar número como price string
 */
export const formatProductPrice = (priceNumber: number): string => {
  return priceNumber.toFixed(2);
};

/**
 * Helper para validar se produto está ativo
 */
export const isProductActive = (product: Product): boolean => {
  return product.active;
};

/**
 * Helper para obter URL da imagem do produto
 */
export const getProductImageUrl = (product: Product): string | null => {
  return product.imageUrl || null;
};

```


---

## 📄 `src/types/produto.ts`

```typescript
// Types para Produtos
export interface Produto {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  image?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProdutoData {
  name: string;
  description: string;
  price: number;
  categoryId: string;
}

export interface UpdateProdutoData {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  active?: boolean;
}
```


---

## 📄 `src/types/upload.ts`

```typescript
// Types para Upload de Arquivos
export interface UploadResult {
  url: string;
  publicId: string;
  filename: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface UploadOptions {
  onProgress?: (progress: UploadProgress) => void;
  maxSize?: number;
  acceptedTypes?: string[];
}

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}
```


---

## 📄 `src/types/users.ts`

```typescript
// src/types/users.ts

import { Endereco } from "./endereco";

export enum Role {
  CLIENTE = "CLIENTE",
  FUNCIONARIO = "FUNCIONARIO",
  ADMIN = "ADMIN",
}

export interface User {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  avatar: string | null;
  role: Role;
  enderecos?: Endereco[];
}

```


---

## 📄 `src/utils/cookies.ts`

```typescript
// src/utils/cookies.ts
"use client";

import Cookies from "js-cookie";

// A chave que usamos para armazenar o token de autenticação
const AUTH_TOKEN_KEY = "authToken";

/**
 * Salva o token de autenticação nos cookies com configurações de segurança.
 * @param token O token a ser salvo.
 * @param options Opções adicionais para o cookie (ex: expiração).
 */
export const setCookie = (
  token: string,
  options?: Cookies.CookieAttributes
): void => {
  const isProduction = process.env.NODE_ENV === "production";
  
  Cookies.set(AUTH_TOKEN_KEY, token, {
    expires: 30, // Expira em 30 dias por padrão
    path: "/",
    secure: isProduction, // Apenas HTTPS em produção
    sameSite: "strict", // Proteção contra CSRF
    ...options,
  });
};

/**
 * Busca o token de autenticação dos cookies.
 * @returns O token, se existir, ou undefined.
 */
export const getAuthToken = (): string | undefined => {
  return Cookies.get(AUTH_TOKEN_KEY);
};

/**
 * Remove o token de autenticação dos cookies.
 */
export const deleteCookie = (): void => {
  Cookies.remove(AUTH_TOKEN_KEY, { path: "/" });
};

```


---

## 📄 `src/utils/fetchHelpers.ts`

```typescript
/**
 * Helpers reutilizáveis para fetch
 * @version 1.0.0
 * @since 28/12/2025
 */

import { getAuthToken } from "./cookies";

/**
 * Erro customizado para requisições
 */
export class FetchError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message);
    this.name = "FetchError";
  }
}

/**
 * Headers padrão para requisições JSON
 */
export const getJsonHeaders = (): HeadersInit => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Headers para FormData (sem Content-Type)
 */
export const getFormDataHeaders = (): HeadersInit => {
  const token = getAuthToken();
  const headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Trata erros da API
 */
export const handleFetchError = async (response: Response): Promise<never> => {
  let message = "Erro ao processar requisição";
  let details: unknown;

  try {
    const errorData = await response.json();
    message = errorData.message || message;
    details = errorData;
  } catch {
    // Se não conseguir parsear JSON, usa mensagem genérica
  }

  throw new FetchError(message, response.status, details);
};

/**
 * Faz requisição autenticada com JSON
 */
export const fetchWithAuth = async <T = unknown>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const token = getAuthToken();
  if (!token) {
    throw new FetchError("Usuário não autenticado", 401);
  }

  const fullUrl = `${
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
  }${url}`;
  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      ...getJsonHeaders(),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  return response.json();
};

/**
 * Faz requisição autenticada com FormData
 */
export const fetchWithFormData = async <T = unknown>(
  url: string,
  formData: FormData,
  method: "POST" | "PATCH" = "POST"
): Promise<T> => {
  const token = getAuthToken();
  if (!token) {
    throw new FetchError("Usuário não autenticado", 401);
  }

  const fullUrl = `${
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
  }${url}`;
  const response = await fetch(fullUrl, {
    method,
    headers: getFormDataHeaders(),
    body: formData,
  });

  if (!response.ok) {
    await handleFetchError(response);
  }

  return response.json();
};

```


---

## 📄 `src/utils/format.ts`

```typescript
const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });


export { formatCurrency };
```


---

## 📄 `src/utils/validation.ts`

```typescript
/**
 * Schemas de validação com Zod
 * @version 1.0.0
 * @since 28/12/2025
 */

import { z } from "zod";
import {
  FILE_SIZE_LIMITS,
  ACCEPTED_IMAGE_TYPES,
  VALIDATION_RULES,
} from "@/constants/validation";

/**
 * Schema para validação de imagem
 */
const imageSchema = z
  .instanceof(File, { message: "Arquivo inválido" })
  .refine(
    (file) => file.size <= FILE_SIZE_LIMITS.IMAGE,
    `Tamanho máximo de 5MB.`
  )
  .refine(
    (file) =>
      ACCEPTED_IMAGE_TYPES.includes(
        file.type as (typeof ACCEPTED_IMAGE_TYPES)[number]
      ),
    "Apenas formatos .jpg, .jpeg, .png e .webp são suportados."
  );

/**
 * Schema para formulário de produto
 */
export const productFormSchema = z.object({
  name: z
    .string()
    .min(VALIDATION_RULES.PRODUCT_NAME.MIN_LENGTH, {
      message: "O nome deve ter no mínimo 3 caracteres.",
    })
    .max(VALIDATION_RULES.PRODUCT_NAME.MAX_LENGTH, {
      message: "O nome deve ter no máximo 100 caracteres.",
    }),
  description: z
    .string()
    .min(VALIDATION_RULES.PRODUCT_DESCRIPTION.MIN_LENGTH, {
      message: "A descrição deve ter no mínimo 10 caracteres.",
    })
    .max(VALIDATION_RULES.PRODUCT_DESCRIPTION.MAX_LENGTH, {
      message: "A descrição deve ter no máximo 500 caracteres.",
    }),
  price: z.coerce
    .number()
    .refine((val) => !isNaN(val), {
      message: "O preço deve ser um número válido.",
    })
    .min(VALIDATION_RULES.PRODUCT_PRICE.MIN, {
      message: "O preço deve ser maior que R$ 0,00.",
    })
    .max(VALIDATION_RULES.PRODUCT_PRICE.MAX, {
      message: "O preço deve ser menor que R$ 999.999,99.",
    }),
  categoryId: z.string().min(1, { message: "Categoria é obrigatória." }),
  image: imageSchema.optional(),
});

/**
 * Tipo inferido do schema de produto
 */
export type ProductFormData = z.infer<typeof productFormSchema>;

/**
 * Schema para formulário de pedido
 */
export const orderFormSchema = z.object({
  type: z.enum(["DELIVERY", "DINE_IN"]),
  addressId: z.number().optional(),
  sessionId: z.string().optional(),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, "Produto é obrigatório"),
        quantity: z.number().min(1, "Quantidade deve ser maior que 0"),
        notes: z.string().optional(),
      })
    )
    .min(1, "Pedido deve ter pelo menos um item"),
  observations: z.string().max(500, "Máximo de 500 caracteres").optional(),
});

/**
 * Tipo inferido do schema de pedido
 */
export type OrderFormData = z.infer<typeof orderFormSchema>;

/**
 * Schema legado para compatibilidade (remover após migração)
 */
export const pizzaFormSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
  descricao: z
    .string()
    .min(10, { message: "A descrição deve ter no mínimo 10 caracteres." }),
  preco: z.coerce
    .number()
    .refine((val) => !isNaN(val), {
      message: "O preço deve ser um número válido.",
    })
    .min(0.01, {
      message: "O preço deve ser maior que R$ 0,00.",
    }),
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= FILE_SIZE_LIMITS.IMAGE,
      `Tamanho máximo de 5MB.`
    )
    .refine(
      (file) =>
        !file ||
        ACCEPTED_IMAGE_TYPES.includes(
          file.type as (typeof ACCEPTED_IMAGE_TYPES)[number]
        ),
      "Apenas formatos .jpg, .jpeg, .png e .webp são suportados."
    ),
});

export type PizzaFormOutputData = z.output<typeof pizzaFormSchema>;
export type PizzaFormInputData = z.input<typeof pizzaFormSchema>;

```


---

## 📄 `__tests__/home.test.js`

```javascript
import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";

// Mock para o Next.js useRouter
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock para o AuthContext - usando caminho relativo
jest.mock("../src/features/auth/contexts/AuthContext", () => ({
  useAuth: () => ({
    isAuthenticated: false,
    isLoading: false,
  }),
}));

// Mock para o Chakra UI
jest.mock("@chakra-ui/react", () => {
  const originalModule = jest.requireActual("@chakra-ui/react");
  return {
    __esModule: true,
    ...originalModule,
    // Mocks simples para os componentes Chakra usados na Home
    Box: ({ children, ...props }) => (
      <div data-testid="box" {...props}>
        {children}
      </div>
    ),
    Flex: ({ children, ...props }) => (
      <div data-testid="flex" {...props}>
        {children}
      </div>
    ),
    Heading: ({ children, ...props }) => (
      <h1 data-testid="heading" {...props}>
        {children}
      </h1>
    ),
    Text: ({ children, ...props }) => (
      <p data-testid="text" {...props}>
        {children}
      </p>
    ),
    Button: ({ children, ...props }) => (
      <button data-testid="button" {...props}>
        {children}
      </button>
    ),
    VStack: ({ children, ...props }) => (
      <div data-testid="vstack" {...props}>
        {children}
      </div>
    ),
    Icon: ({ as: Component, ...props }) => (
      <span data-testid="icon" {...props}>
        {Component && <Component />}
      </span>
    ),
    Image: ({ src, alt, ...props }) => (
      <img data-testid="image" src={src} alt={alt} {...props} />
    ),
  };
});

// Mock para react-icons
jest.mock("react-icons/fa", () => ({
  FaPizzaSlice: () => <span data-testid="fa-pizza-slice" />,
  FaLeaf: () => <span data-testid="fa-leaf" />,
  FaFire: () => <span data-testid="fa-fire" />,
}));

// Mock para componentes UI - usando caminho relativo
jest.mock("../src/components/ui", () => ({
  PizzaBadge: ({ children, ...props }) => (
    <span data-testid="pizza-badge" {...props}>
      {children}
    </span>
  ),
  PizzaText: ({ children, ...props }) => (
    <span data-testid="pizza-text" {...props}>
      {children}
    </span>
  ),
}));

describe("Home Page", () => {
  // Silencia erros do console durante os testes
  let consoleError;
  beforeAll(() => {
    consoleError = console.error;
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = consoleError;
  });

  it("renders the page title", () => {
    render(<Home />);
    // O título está em um PizzaText com variant="heading"
    const pizzaTexts = screen.getAllByTestId("pizza-text");
    const pageTitle = pizzaTexts.find(text => 
      text.textContent && text.textContent.includes("Bem-vindo à Pizzaria Express")
    );
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle?.textContent).toContain("Bem-vindo à Pizzaria Express");
  });

  it("renders the menu button", () => {
    render(<Home />);
    const menuButton = screen.getByTestId("button");
    expect(menuButton).toBeInTheDocument();
    expect(menuButton.textContent).toContain("Explorar Cardápio");
  });
});

describe("Basic Test", () => {
  it("renders a div", () => {
    const { container } = render(<div>Test</div>);
    expect(container.firstChild).toHaveTextContent("Test");
  });
});

```


---

## 📄 `package.json`

```json
{
  "name": "pizza-express-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest"
  },
  "dependencies": {
    "@chakra-ui/react": "^3.24.2",
    "@chakra-ui/theme": "^3.4.6",
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@hookform/resolvers": "^5.2.1",
    "@stripe/react-stripe-js": "^4.0.2",
    "@stripe/stripe-js": "^7.9.0",
    "credit-card-type": "^10.1.0",
    "framer-motion": "^12.23.12",
    "js-cookie": "^3.0.5",
    "jsonwebtoken": "^9.0.2",
    "lucide-react": "^0.525.0",
    "next": "^15.5.9",
    "next-themes": "^0.4.6",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.62.0",
    "react-icons": "^5.5.0",
    "zod": "^4.0.16"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@swc/jest": "^0.2.38",
    "@testing-library/jest-dom": "^5.0.0",
    "@testing-library/react": "^16.3.0",
    "@types/js-cookie": "^3.0.6",
    "@types/jsonwebtoken": "^9.0.10",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.3.4",
    "identity-obj-proxy": "^3.0.0",
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0",
    "ts-jest": "^29.4.0",
    "typescript": "^5"
  }
}

```


---

## 📄 `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```


---

## 📄 `next.config.mjs`

```javascript
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pizza-express-backend.vercel.app",
        port: "",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
  },
};

export default nextConfig;

```


---

## 📊 Estatísticas

| Métrica | Valor |
|---------|-------|
| **Tamanho do snapshot** | 420K |
| **Gerado em** | 28/12/2025 17:23:43 |

---

## 🔍 PONTOS DE VERIFICAÇÃO

### ✅ O que deve ter sido implementado:

#### 1. Services (src/services/ ou src/api/)
- [ ] `orderService.ts` atualizado
- [ ] Função `getDeliveryOrders()` implementada
- [ ] Função `getDineInOrders()` implementada
- [ ] Filtro `?type=DELIVERY` sendo usado
- [ ] POST /orders com campo `type`

#### 2. Types (src/types/ ou interfaces/)
- [ ] Interface `Order` com campo `type: OrderType`
- [ ] Type `OrderType = 'DELIVERY' | 'DINE_IN'`
- [ ] Interface `Product` (substitui Pizza)

#### 3. Components
- [ ] Kanban usando `getDeliveryOrders()`
- [ ] Badge visual para tipo de pedido
- [ ] Componente de Mesas criado
- [ ] Formulário com seletor de tipo

#### 4. Endpoints
- [ ] Remoção de `/pedidos`
- [ ] Uso de `/orders`
- [ ] Remoção de `/pizzas`
- [ ] Uso de `/products`

---

> **Pronto para análise de implementação!**

