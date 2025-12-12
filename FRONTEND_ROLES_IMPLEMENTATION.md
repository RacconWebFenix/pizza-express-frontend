# 🔐 Frontend Implementation Guide - Role-Based Access Control

## 📋 Context for AI Implementation

This document provides comprehensive technical specifications for implementing Role-Based Access Control (RBAC) in a Next.js frontend application that consumes the Pizza Express Backend API.

**Target**: AI Assistant to implement RBAC system in Next.js frontend
**Backend API**: Pizza Express Backend (NestJS + TypeScript)
**Frontend**: Next.js with TypeScript

---

## 🏗️ Backend Role System Overview

### **Available Roles**
```typescript
enum Role {
  CLIENTE = "CLIENTE",       // Regular customer
  FUNCIONARIO = "FUNCIONARIO", // Employee
  ADMIN = "ADMIN"            // Administrator
}
```

### **Role Hierarchy & Permissions**
```typescript
// Permission Matrix
const PERMISSIONS = {
  CLIENTE: [
    'view_pizzas',
    'create_pedido',
    'view_own_pedidos',
    'manage_own_addresses',
    'view_own_profile'
  ],
  FUNCIONARIO: [
    ...CLIENTE_PERMISSIONS,
    'view_all_pedidos',
    'update_pedido_status',
    'view_entregadores',
    'manage_pizzas'
  ],
  ADMIN: [
    ...FUNCIONARIO_PERMISSIONS,
    'manage_users',
    'manage_entregadores',
    'view_analytics',
    'system_settings'
  ]
};
```

### **Backend Endpoints & Role Requirements**
```typescript
// API Endpoints with Required Roles
const API_ENDPOINTS = {
  // PUBLIC (No auth required)
  'GET /pizzas': 'PUBLIC',
  'GET /pizzas/:id': 'PUBLIC',
  
  // AUTHENTICATED USER (Any logged user)
  'GET /me': 'AUTHENTICATED',
  'GET /pedidos/meus-pedidos': 'AUTHENTICATED',
  'POST /pedidos': 'AUTHENTICATED',
  'GET /enderecos': 'AUTHENTICATED',
  'POST /enderecos': 'AUTHENTICATED',
  'PATCH /enderecos/:id': 'RESOURCE_OWNER',
  'DELETE /enderecos/:id': 'RESOURCE_OWNER',
  
  // FUNCIONARIO OR ADMIN
  'GET /pedidos': ['FUNCIONARIO', 'ADMIN'],
  'PATCH /pedidos/:id': ['FUNCIONARIO', 'ADMIN'],
  'GET /entregadores': ['FUNCIONARIO', 'ADMIN'],
  
  // ADMIN ONLY
  'POST /pizzas': 'ADMIN',
  'PATCH /pizzas/:id': 'ADMIN',
  'DELETE /pizzas/:id': 'ADMIN',
  'POST /entregadores': 'ADMIN',
  'PATCH /entregadores/:id': 'ADMIN',
  'DELETE /entregadores/:id': 'ADMIN',
  'GET /users': 'ADMIN',
  'POST /users': 'ADMIN',
  'PATCH /users/:id': ['ADMIN', 'RESOURCE_OWNER'],
  'DELETE /users/:id': 'ADMIN',
  'PATCH /pedidos/:id/status': 'ADMIN'
};
```

---

## 🔧 Implementation Requirements

### **1. Authentication Context**
Create a context to manage authentication state and user roles.

**File**: `contexts/AuthContext.tsx`
```typescript
interface User {
  id: number;
  nome: string;
  email: string;
  role: 'CLIENTE' | 'FUNCIONARIO' | 'ADMIN';
  telefone?: string;
  avatar?: string;
  enderecos?: Address[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  hasRole: (role: string | string[]) => boolean;
  hasPermission: (permission: string) => boolean;
  isResourceOwner: (resourceUserId: number) => boolean;
}
```

### **2. Role-Based Components**
Implement conditional rendering components for role-based UI.

**File**: `components/auth/RoleGuard.tsx`
```typescript
interface RoleGuardProps {
  roles?: string | string[];
  permissions?: string | string[];
  resourceOwner?: boolean;
  resourceUserId?: number;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

// Usage examples:
// <RoleGuard roles="ADMIN">Admin only content</RoleGuard>
// <RoleGuard roles={["FUNCIONARIO", "ADMIN"]}>Staff content</RoleGuard>
// <RoleGuard permissions="manage_pizzas">Pizza management</RoleGuard>
// <RoleGuard resourceOwner resourceUserId={userId}>Own content</RoleGuard>
```

### **3. Navigation Guards**
Implement route protection based on roles.

**File**: `hooks/useRouteGuard.ts`
```typescript
interface RouteGuard {
  path: string;
  roles?: string[];
  permissions?: string[];
  redirectTo?: string;
}

const PROTECTED_ROUTES: RouteGuard[] = [
  {
    path: '/admin',
    roles: ['ADMIN'],
    redirectTo: '/unauthorized'
  },
  {
    path: '/dashboard',
    roles: ['FUNCIONARIO', 'ADMIN'],
    redirectTo: '/login'
  },
  {
    path: '/pedidos/manage',
    permissions: ['view_all_pedidos'],
    redirectTo: '/pedidos'
  }
];
```

### **4. API Service with Role Awareness**
Create API service that handles role-based requests.

**File**: `services/api.ts`
```typescript
interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

class ApiService {
  private baseURL: string;
  private token: string | null;
  
  // Methods to implement:
  // - get<T>(endpoint: string): Promise<ApiResponse<T>>
  // - post<T>(endpoint: string, data: any): Promise<ApiResponse<T>>
  // - patch<T>(endpoint: string, data: any): Promise<ApiResponse<T>>
  // - delete<T>(endpoint: string): Promise<ApiResponse<T>>
  // - checkPermission(endpoint: string, method: string): boolean
}
```

---

## 📱 UI Components to Implement

### **1. Admin Dashboard**
```typescript
// components/admin/AdminDashboard.tsx
// Should include:
// - User management table
// - Pizza management
// - Entregadores management
// - Order status management
// - Analytics overview

// Required roles: ADMIN only
// API endpoints: GET /users, GET /pizzas, GET /entregadores, GET /pedidos
```

### **2. Staff Dashboard**
```typescript
// components/staff/StaffDashboard.tsx
// Should include:
// - Order management
// - Pizza inventory
// - Entregadores list
// - Order status updates

// Required roles: FUNCIONARIO, ADMIN
// API endpoints: GET /pedidos, GET /entregadores, PATCH /pedidos/:id
```

### **3. Customer Dashboard**
```typescript
// components/customer/CustomerDashboard.tsx
// Should include:
// - My orders history
// - Address management
// - Profile settings
// - Order tracking

// Required roles: CLIENTE, FUNCIONARIO, ADMIN
// API endpoints: GET /pedidos/meus-pedidos, GET /enderecos
```

### **4. Navigation Menu**
```typescript
// components/layout/Navigation.tsx
// Should conditionally show menu items based on user role:

const MENU_ITEMS = [
  // Always visible
  { label: 'Cardápio', path: '/pizzas', roles: [] },
  
  // Authenticated users
  { label: 'Meus Pedidos', path: '/pedidos', roles: ['AUTHENTICATED'] },
  { label: 'Endereços', path: '/enderecos', roles: ['AUTHENTICATED'] },
  
  // Staff and Admin
  { label: 'Gerenciar Pedidos', path: '/admin/pedidos', roles: ['FUNCIONARIO', 'ADMIN'] },
  { label: 'Entregadores', path: '/admin/entregadores', roles: ['FUNCIONARIO', 'ADMIN'] },
  
  // Admin only
  { label: 'Usuários', path: '/admin/users', roles: ['ADMIN'] },
  { label: 'Pizzas', path: '/admin/pizzas', roles: ['ADMIN'] },
  { label: 'Dashboard', path: '/admin', roles: ['ADMIN'] }
];
```

---

## 🔗 API Integration Examples

### **Login & Role Detection**
```typescript
// Login flow that saves user role
const login = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const { access_token } = await response.json();
  
  // Get user profile with role
  const userResponse = await fetch('/api/me', {
    headers: { 'Authorization': `Bearer ${access_token}` }
  });
  
  const userData = await userResponse.json();
  
  // Save token and user data (including role)
  localStorage.setItem('token', access_token);
  localStorage.setItem('user', JSON.stringify(userData.data));
};
```

### **Role-Based API Calls**
```typescript
// Example: Create pizza (ADMIN only)
const createPizza = async (pizzaData: CreatePizzaDto) => {
  // Check if user has permission before API call
  if (!hasRole('ADMIN')) {
    throw new Error('Unauthorized: Admin role required');
  }
  
  const response = await api.post('/pizzas', pizzaData);
  return response.data;
};

// Example: Update order status (ADMIN only)
const updateOrderStatus = async (orderId: number, status: string) => {
  if (!hasRole('ADMIN')) {
    throw new Error('Unauthorized: Admin role required');
  }
  
  const response = await api.patch(`/pedidos/${orderId}/status`, { status });
  return response.data;
};

// Example: View all orders (FUNCIONARIO or ADMIN)
const getAllOrders = async () => {
  if (!hasRole(['FUNCIONARIO', 'ADMIN'])) {
    throw new Error('Unauthorized: Staff role required');
  }
  
  const response = await api.get('/pedidos');
  return response.data;
};
```

---

## 🎨 UI/UX Considerations

### **Role-Based Styling**
```typescript
// Different themes/colors for different roles
const ROLE_THEMES = {
  CLIENTE: {
    primaryColor: '#ff6b35', // Orange
    navColor: '#2c3e50'
  },
  FUNCIONARIO: {
    primaryColor: '#3498db', // Blue
    navColor: '#34495e'
  },
  ADMIN: {
    primaryColor: '#e74c3c', // Red
    navColor: '#2c3e50'
  }
};
```

### **Conditional Form Fields**
```typescript
// Example: User form with role-based fields
const UserForm = () => {
  const { user, hasRole } = useAuth();
  
  return (
    <form>
      <input name="nome" />
      <input name="email" />
      
      {/* Only admin can change roles */}
      {hasRole('ADMIN') && (
        <select name="role">
          <option value="CLIENTE">Cliente</option>
          <option value="FUNCIONARIO">Funcionário</option>
          <option value="ADMIN">Admin</option>
        </select>
      )}
      
      {/* Only admin can see all users' data */}
      {hasRole('ADMIN') && (
        <input name="password" placeholder="Nova senha" />
      )}
    </form>
  );
};
```

---

## 🛡️ Security Considerations

### **Client-Side Security Rules**
```typescript
// IMPORTANT: These are UI-only restrictions
// Always validate permissions on the backend

const SECURITY_RULES = {
  // Never expose sensitive admin routes in client bundle for non-admins
  LAZY_LOAD_ADMIN: true,
  
  // Always validate API responses
  VALIDATE_API_RESPONSES: true,
  
  // Hide sensitive information based on role
  HIDE_SENSITIVE_DATA: {
    'user.email': ['FUNCIONARIO'], // Hide other users' emails from staff
    'user.password': ['ALL'],      // Never show passwords
    'payment.details': ['FUNCIONARIO'] // Hide payment details from staff
  },
  
  // Rate limiting on frontend
  API_RATE_LIMITS: {
    'GET': 100,  // requests per minute
    'POST': 20,
    'PATCH': 20,
    'DELETE': 10
  }
};
```

### **Error Handling**
```typescript
// Handle role-based errors gracefully
const handleApiError = (error: any) => {
  if (error.status === 403) {
    // Insufficient permissions
    toast.error('Você não tem permissão para esta ação');
    router.push('/unauthorized');
  } else if (error.status === 401) {
    // Not authenticated
    toast.error('Sessão expirada. Faça login novamente');
    logout();
    router.push('/login');
  }
};
```

---

## 📋 Implementation Checklist

### **Phase 1: Authentication Foundation**
- [ ] Create AuthContext with role management
- [ ] Implement login/logout functionality
- [ ] Add token persistence and refresh
- [ ] Create role checking utilities

### **Phase 2: Route Protection**
- [ ] Implement route guards
- [ ] Create protected route wrapper
- [ ] Add unauthorized page
- [ ] Handle role-based redirects

### **Phase 3: UI Components**
- [ ] Create RoleGuard component
- [ ] Implement conditional navigation
- [ ] Add role-based form fields
- [ ] Create role-specific dashboards

### **Phase 4: API Integration**
- [ ] Implement role-aware API service
- [ ] Add permission checking before API calls
- [ ] Handle role-based API errors
- [ ] Add loading states for role checks

### **Phase 5: Testing & Polish**
- [ ] Test all role combinations
- [ ] Verify unauthorized access blocks
- [ ] Test role switching scenarios
- [ ] Add loading skeletons for protected content

---

## 🚀 Example Pages Structure

```
pages/
├── index.tsx                    # Public pizza catalog
├── login.tsx                    # Login page
├── register.tsx                 # Registration
├── unauthorized.tsx             # 403 error page
├── pedidos/
│   ├── index.tsx               # My orders (AUTHENTICATED)
│   └── [id].tsx                # Order details (OWNER/ADMIN)
├── enderecos/
│   ├── index.tsx               # Address list (AUTHENTICATED)
│   └── new.tsx                 # Add address (AUTHENTICATED)
├── admin/
│   ├── index.tsx               # Admin dashboard (ADMIN)
│   ├── users/
│   │   ├── index.tsx           # User management (ADMIN)
│   │   └── [id].tsx            # Edit user (ADMIN)
│   ├── pizzas/
│   │   ├── index.tsx           # Pizza management (ADMIN)
│   │   └── new.tsx             # Add pizza (ADMIN)
│   ├── pedidos/
│   │   ├── index.tsx           # Order management (FUNCIONARIO/ADMIN)
│   │   └── [id].tsx            # Order details (FUNCIONARIO/ADMIN)
│   └── entregadores/
│       ├── index.tsx           # Delivery management (FUNCIONARIO/ADMIN)
│       └── new.tsx             # Add delivery person (ADMIN)
└── dashboard.tsx               # Role-based dashboard redirect
```

---

## 💡 Implementation Tips for AI

1. **Start with AuthContext** - This is the foundation for everything else
2. **Use TypeScript interfaces** - Ensure type safety for roles and permissions
3. **Implement progressive enhancement** - Show basic UI first, then add role-specific features
4. **Cache user role** - Avoid repeated API calls to check permissions
5. **Handle loading states** - Role checking can be async, show appropriate loading UI
6. **Test edge cases** - What happens when token expires during role-protected action?
7. **Use React.memo** - Optimize role-based components to avoid unnecessary re-renders
8. **Add error boundaries** - Gracefully handle role-checking failures

---

## 🔗 Backend API Endpoints Reference

```typescript
// Complete endpoint reference with roles
const BACKEND_ENDPOINTS = {
  // Authentication
  'POST /auth/login': { auth: false },
  'POST /auth/register': { auth: false },
  'GET /auth/google': { auth: false },
  'GET /me': { auth: true },
  
  // Pizzas
  'GET /pizzas': { auth: false },
  'GET /pizzas/:id': { auth: false },
  'POST /pizzas': { roles: ['ADMIN'] },
  'POST /pizzas/with-image': { roles: ['ADMIN'] },
  'POST /pizzas/:id/upload-image': { roles: ['ADMIN'] },
  'PATCH /pizzas/:id': { roles: ['ADMIN'] },
  'DELETE /pizzas/:id': { roles: ['ADMIN'] },
  
  // Orders
  'GET /pedidos': { roles: ['FUNCIONARIO', 'ADMIN'] },
  'GET /pedidos/meus-pedidos': { auth: true },
  'GET /pedidos/:id': { resourceOwner: true },
  'POST /pedidos': { auth: true },
  'PATCH /pedidos/:id': { roles: ['FUNCIONARIO', 'ADMIN'] },
  'PATCH /pedidos/:id/status': { roles: ['ADMIN'] },
  'DELETE /pedidos/:id': { resourceOwner: true },
  
  // Users
  'GET /users': { roles: ['ADMIN'] },
  'GET /users/:id': { roles: ['ADMIN'] },
  'POST /users': { roles: ['ADMIN'] },
  'PATCH /users/:id': { resourceOwner: true },
  'DELETE /users/:id': { roles: ['ADMIN'] },
  
  // Delivery persons
  'GET /entregadores': { roles: ['FUNCIONARIO', 'ADMIN'] },
  'GET /entregadores/:id': { roles: ['FUNCIONARIO', 'ADMIN'] },
  'POST /entregadores': { roles: ['ADMIN'] },
  'PATCH /entregadores/:id': { roles: ['ADMIN'] },
  'DELETE /entregadores/:id': { roles: ['ADMIN'] },
  
  // Addresses
  'GET /enderecos': { auth: true },
  'GET /enderecos/:id': { resourceOwner: true },
  'POST /enderecos': { auth: true },
  'PATCH /enderecos/:id': { resourceOwner: true },
  'DELETE /enderecos/:id': { resourceOwner: true },
  
  // Payments
  'POST /payments/create-intent': { auth: true },
  'POST /payments/webhook': { auth: false }, // Internal
};
```

---

This documentation provides everything an AI needs to implement a complete role-based access control system in the Next.js frontend. The implementation should be done incrementally, starting with authentication and progressively adding role-based features.