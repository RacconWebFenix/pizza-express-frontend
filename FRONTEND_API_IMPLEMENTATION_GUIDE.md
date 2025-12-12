# 🚀 Frontend API Implementation Guide - Pizza Express Backend

## 📋 Overview for AI Implementation

This document provides a complete technical specification for implementing the Pizza Express Backend API in a Next.js frontend. It contains ALL available endpoints, authentication requirements, request/response formats, and implementation examples.

**Target**: AI Assistant to implement complete API integration in Next.js frontend
**Backend**: NestJS + TypeScript + Prisma + PostgreSQL
**Authentication**: JWT + Role-Based Access Control (RBAC)
**Payment**: Stripe Integration
**Real-time**: WebSocket for delivery tracking

---

## 🔐 Authentication System

### **Available Roles**
```typescript
enum Role {
  CLIENTE = "CLIENTE",       // Regular customer
  FUNCIONARIO = "FUNCIONARIO", // Employee
  ADMIN = "ADMIN"            // Administrator
}
```

### **JWT Token Usage**
```typescript
// Include in all authenticated requests
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

---

## 🌐 Complete API Endpoints Reference

### **1. Authentication Routes**

#### **POST /auth/login**
**Purpose**: User login
**Auth Required**: ❌ No
**Body**:
```typescript
{
  "email": "string",
  "password": "string"
}
```
**Response**:
```typescript
{
  "access_token": "string",
  "user": {
    "id": number,
    "email": "string",
    "role": "CLIENTE" | "FUNCIONARIO" | "ADMIN"
  }
}
```

#### **POST /auth/register**
**Purpose**: User registration
**Auth Required**: ❌ No
**Body**:
```typescript
{
  "nome": "string",
  "email": "string",
  "password": "string",
  "telefone": "string",
  "role": "CLIENTE" | "FUNCIONARIO" | "ADMIN" // Optional, defaults to CLIENTE
}
```
**Response**: Same as login

#### **GET /auth/google**
**Purpose**: Initiate Google OAuth login
**Auth Required**: ❌ No
**Response**: Redirects to Google OAuth

#### **GET /auth/google/callback**
**Purpose**: Google OAuth callback
**Auth Required**: ❌ No
**Response**: Redirects with JWT token

#### **GET /auth/config**
**Purpose**: Get authentication configuration
**Auth Required**: ❌ No
**Response**:
```typescript
{
  "environment": "development" | "production",
  "frontendUrl": "string",
  "googleCallbackUrl": "string",
  "corsOrigins": ["string"]
}
```

---

### **2. User Profile Routes**

#### **GET /me**
**Purpose**: Get current user profile with addresses and orders
**Auth Required**: ✅ Yes (any authenticated user)
**Response**:
```typescript
{
  "id": number,
  "nome": "string",
  "email": "string",
  "telefone": "string",
  "role": "CLIENTE" | "FUNCIONARIO" | "ADMIN",
  "enderecos": [
    {
      "id": number,
      "rua": "string",
      "numero": "string",
      "bairro": "string",
      "cidade": "string",
      "estado": "string",
      "cep": "string"
    }
  ],
  "pedidos": [
    {
      "id": number,
      "status": "PENDENTE" | "CONFIRMADO" | "PREPARANDO" | "PRONTO" | "ENTREGANDO" | "ENTREGUE" | "CANCELADO",
      "total": number,
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

---

### **3. Pizza Management Routes**

#### **GET /pizzas**
**Purpose**: Get all pizzas (public catalog)
**Auth Required**: ❌ No
**Response**:
```typescript
{
  "statusCode": 200,
  "message": "Pizzas listadas com sucesso",
  "data": [
    {
      "id": number,
      "nome": "string",
      "descricao": "string",
      "preco": number,
      "image": "string", // URL or null
      "categoria": "string",
      "ingredientes": ["string"],
      "disponivel": boolean,
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

#### **GET /pizzas/:id**
**Purpose**: Get specific pizza details
**Auth Required**: ❌ No
**Parameters**: `id` (number)
**Response**: Single pizza object

#### **POST /pizzas**
**Purpose**: Create new pizza
**Auth Required**: ✅ Yes (ADMIN only)
**Body**:
```typescript
{
  "nome": "string",
  "descricao": "string",
  "preco": number,
  "categoria": "string",
  "ingredientes": ["string"],
  "disponivel": boolean,
  "image": "string" // Optional
}
```

#### **POST /pizzas/with-image**
**Purpose**: Create pizza with image upload
**Auth Required**: ✅ Yes (ADMIN only)
**Content-Type**: `multipart/form-data`
**Body**:
```
FormData:
- image: File (image file)
- nome: string
- descricao: string
- preco: number
- categoria: string
- ingredientes: string[] (JSON string)
- disponivel: boolean
```

#### **POST /pizzas/:id/upload-image**
**Purpose**: Upload image for existing pizza
**Auth Required**: ✅ Yes (ADMIN only)
**Parameters**: `id` (number)
**Content-Type**: `multipart/form-data`
**Body**:
```
FormData:
- image: File (required)
```

#### **PATCH /pizzas/:id**
**Purpose**: Update pizza
**Auth Required**: ✅ Yes (ADMIN only)
**Parameters**: `id` (number)
**Body**: Partial pizza object (same as create)

#### **DELETE /pizzas/:id**
**Purpose**: Delete pizza
**Auth Required**: ✅ Yes (ADMIN only)
**Parameters**: `id` (number)

---

### **4. Order Management Routes**

#### **POST /pedidos**
**Purpose**: Create new order
**Auth Required**: ✅ Yes (any authenticated user)
**Body**:
```typescript
{
  "enderecoId": number,
  "itens": [
    {
      "pizzaId": number,
      "quantidade": number,
      "observacoes": "string" // Optional
    }
  ],
  "observacoes": "string" // Optional
}
```
**Response**:
```typescript
{
  "statusCode": 201,
  "message": "Pedido criado com sucesso",
  "data": {
    "id": number,
    "status": "PENDENTE",
    "total": number,
    "endereco": { /* address object */ },
    "itens": [
      {
        "id": number,
        "pizza": { /* pizza object */ },
        "quantidade": number,
        "precoUnitario": number,
        "observacoes": "string"
      }
    ],
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

#### **GET /pedidos**
**Purpose**: Get all orders (staff/admin only)
**Auth Required**: ✅ Yes (FUNCIONARIO or ADMIN only)
**Response**: Array of all orders with full details

#### **GET /pedidos/meus-pedidos**
**Purpose**: Get current user's orders
**Auth Required**: ✅ Yes (any authenticated user)
**Response**: Array of user's orders

#### **GET /pedidos/:id**
**Purpose**: Get specific order details
**Auth Required**: ✅ Yes (order owner or ADMIN)
**Parameters**: `id` (number)
**Response**: Single order with full details

#### **PATCH /pedidos/:id**
**Purpose**: Update order (staff/admin only)
**Auth Required**: ✅ Yes (FUNCIONARIO or ADMIN only)
**Parameters**: `id` (number)
**Body**:
```typescript
{
  "status": "PENDENTE" | "CONFIRMADO" | "PREPARANDO" | "PRONTO" | "ENTREGANDO" | "ENTREGUE" | "CANCELADO",
  "observacoes": "string"
}
```

#### **PATCH /pedidos/:id/status**
**Purpose**: Update order status (admin only)
**Auth Required**: ✅ Yes (ADMIN only)
**Parameters**: `id` (number)
**Body**:
```typescript
{
  "status": "PENDENTE" | "CONFIRMADO" | "PREPARANDO" | "PRONTO" | "ENTREGANDO" | "ENTREGUE" | "CANCELADO"
}
```

#### **DELETE /pedidos/:id**
**Purpose**: Cancel order
**Auth Required**: ✅ Yes (order owner only)
**Parameters**: `id` (number)

---

### **5. Address Management Routes**

#### **GET /enderecos**
**Purpose**: Get user's addresses
**Auth Required**: ✅ Yes (any authenticated user)
**Response**: Array of user's addresses

#### **GET /enderecos/:id**
**Purpose**: Get specific address
**Auth Required**: ✅ Yes (address owner only)
**Parameters**: `id` (number)

#### **POST /enderecos**
**Purpose**: Create new address
**Auth Required**: ✅ Yes (any authenticated user)
**Body**:
```typescript
{
  "rua": "string",
  "numero": "string",
  "bairro": "string",
  "cidade": "string",
  "estado": "string",
  "cep": "string",
  "complemento": "string" // Optional
}
```

#### **PATCH /enderecos/:id**
**Purpose**: Update address
**Auth Required**: ✅ Yes (address owner only)
**Parameters**: `id` (number)
**Body**: Partial address object

#### **DELETE /enderecos/:id**
**Purpose**: Delete address
**Auth Required**: ✅ Yes (address owner only)
**Parameters**: `id` (number)

---

### **6. User Management Routes (Admin Only)**

#### **POST /users**
**Purpose**: Create user
**Auth Required**: ✅ Yes (ADMIN only)
**Body**: Same as registration

#### **GET /users**
**Purpose**: Get all users
**Auth Required**: ✅ Yes (ADMIN only)
**Query Params**: `?email=string` (optional filter)
**Response**: Array of users (without passwords)

#### **GET /users/:id**
**Purpose**: Get specific user
**Auth Required**: ✅ Yes (ADMIN only)
**Parameters**: `id` (number)

#### **PATCH /users/:id**
**Purpose**: Update user
**Auth Required**: ✅ Yes (ADMIN or resource owner)
**Parameters**: `id` (number)
**Body**: Partial user object

#### **DELETE /users/:id**
**Purpose**: Delete user
**Auth Required**: ✅ Yes (ADMIN only)
**Parameters**: `id` (number)

---

### **7. Delivery Person Management Routes**

#### **POST /entregadores**
**Purpose**: Create delivery person
**Auth Required**: ✅ Yes (ADMIN only)
**Body**:
```typescript
{
  "nome": "string",
  "email": "string",
  "telefone": "string",
  "veiculo": "string",
  "placa": "string",
  "disponivel": boolean
}
```

#### **GET /entregadores**
**Purpose**: Get all delivery persons
**Auth Required**: ✅ Yes (FUNCIONARIO or ADMIN)
**Response**: Array of delivery persons

#### **GET /entregadores/:id**
**Purpose**: Get specific delivery person
**Auth Required**: ✅ Yes (FUNCIONARIO or ADMIN)
**Parameters**: `id` (number)

#### **PATCH /entregadores/:id**
**Purpose**: Update delivery person
**Auth Required**: ✅ Yes (ADMIN only)
**Parameters**: `id` (number)
**Body**: Partial delivery person object

#### **DELETE /entregadores/:id**
**Purpose**: Delete delivery person
**Auth Required**: ✅ Yes (ADMIN only)
**Parameters**: `id` (number)

---

### **8. Payment Routes**

#### **POST /payments/create-intent**
**Purpose**: Create Stripe payment intent
**Auth Required**: ✅ Yes (any authenticated user)
**Body**:
```typescript
{
  "amount": number // Amount in cents (e.g., 5000 = $50.00)
}
```
**Response**:
```typescript
{
  "clientSecret": "string", // Stripe client secret
  "paymentIntentId": "string"
}
```

#### **POST /payments/webhook**
**Purpose**: Stripe webhook handler
**Auth Required**: ❌ No (internal webhook)
**Headers**: `stripe-signature`
**Body**: Raw webhook data from Stripe

---

## 🔌 WebSocket Events

### **Entregadores Location Gateway**
**Namespace**: Default (`/`)
**CORS**: Enabled

#### **Client → Server**
```typescript
socket.emit('updateLocation', {
  entregadorId: number,
  latitude: number,
  longitude: number
});
```

#### **Server → Clients**
```typescript
socket.on('locationUpdate', (data) => {
  // data: { entregadorId, latitude, longitude }
  console.log('Delivery person location updated:', data);
});
```

---

## 📝 TypeScript Interfaces

### **Core Types**
```typescript
interface User {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  role: 'CLIENTE' | 'FUNCIONARIO' | 'ADMIN';
  enderecos?: Address[];
  pedidos?: Order[];
}

interface Address {
  id: number;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento?: string;
  userId: number;
}

interface Pizza {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  image?: string;
  categoria: string;
  ingredientes: string[];
  disponivel: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Order {
  id: number;
  status: 'PENDENTE' | 'CONFIRMADO' | 'PREPARANDO' | 'PRONTO' | 'ENTREGANDO' | 'ENTREGUE' | 'CANCELADO';
  total: number;
  endereco: Address;
  itens: OrderItem[];
  observacoes?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  id: number;
  pizza: Pizza;
  quantidade: number;
  precoUnitario: number;
  observacoes?: string;
}

interface DeliveryPerson {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  veiculo: string;
  placa: string;
  disponivel: boolean;
  latitude?: number;
  longitude?: number;
}
```

### **API Response Types**
```typescript
interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

---

## 🔧 Implementation Examples

### **1. Authentication Service**
```typescript
class AuthService {
  private token: string | null = null;
  private user: User | null = null;

  async login(email: string, password: string): Promise<User> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    this.token = data.access_token;
    this.user = data.user;

    localStorage.setItem('token', this.token);
    localStorage.setItem('user', JSON.stringify(this.user));

    return this.user;
  }

  async register(userData: RegisterData): Promise<User> {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    this.token = data.access_token;
    this.user = data.user;

    return this.user;
  }

  async getProfile(): Promise<User> {
    const response = await fetch('/api/me', {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });

    const user = await response.json();
    this.user = user;
    return user;
  }

  logout(): void {
    this.token = null;
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  getUser(): User | null {
    if (!this.user) {
      const stored = localStorage.getItem('user');
      this.user = stored ? JSON.parse(stored) : null;
    }
    return this.user;
  }

  hasRole(role: string | string[]): boolean {
    const user = this.getUser();
    if (!user) return false;

    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  }
}
```

### **2. API Client**
```typescript
class ApiClient {
  private baseURL: string;
  private authService: AuthService;

  constructor(baseURL: string, authService: AuthService) {
    this.baseURL = baseURL;
    this.authService = authService;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.authService.getToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Pizzas
  async getPizzas(): Promise<Pizza[]> {
    const response = await this.request<ApiResponse<Pizza[]>>('/pizzas');
    return response.data;
  }

  async getPizza(id: number): Promise<Pizza> {
    const response = await this.request<ApiResponse<Pizza>>(`/pizzas/${id}`);
    return response.data;
  }

  // Orders
  async createOrder(orderData: CreateOrderData): Promise<Order> {
    const response = await this.request<ApiResponse<Order>>('/pedidos', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
    return response.data;
  }

  async getMyOrders(): Promise<Order[]> {
    const response = await this.request<ApiResponse<Order[]>>('/pedidos/meus-pedidos');
    return response.data;
  }

  async getAllOrders(): Promise<Order[]> {
    const response = await this.request<ApiResponse<Order[]>>('/pedidos');
    return response.data;
  }

  // Addresses
  async getAddresses(): Promise<Address[]> {
    const response = await this.request<ApiResponse<Address[]>>('/enderecos');
    return response.data;
  }

  async createAddress(addressData: CreateAddressData): Promise<Address> {
    const response = await this.request<ApiResponse<Address>>('/enderecos', {
      method: 'POST',
      body: JSON.stringify(addressData)
    });
    return response.data;
  }

  // Admin functions
  async getUsers(): Promise<User[]> {
    const response = await this.request<ApiResponse<User[]>>('/users');
    return response.data;
  }

  async createPizza(pizzaData: CreatePizzaData): Promise<Pizza> {
    const response = await this.request<ApiResponse<Pizza>>('/pizzas', {
      method: 'POST',
      body: JSON.stringify(pizzaData)
    });
    return response.data;
  }

  async getDeliveryPersons(): Promise<DeliveryPerson[]> {
    const response = await this.request<ApiResponse<DeliveryPerson[]>>('/entregadores');
    return response.data;
  }
}
```

### **3. WebSocket Client**
```typescript
import io, { Socket } from 'socket.io-client';

class WebSocketService {
  private socket: Socket | null = null;
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  connect(): void {
    const token = this.authService.getToken();
    if (!token) return;

    this.socket = io('/', {
      auth: { token }
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });

    this.socket.on('locationUpdate', (data) => {
      // Handle delivery person location updates
      console.log('Location update:', data);
      // Update map or UI with new location
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  updateLocation(entregadorId: number, latitude: number, longitude: number): void {
    if (this.socket) {
      this.socket.emit('updateLocation', {
        entregadorId,
        latitude,
        longitude
      });
    }
  }

  onLocationUpdate(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on('locationUpdate', callback);
    }
  }
}
```

### **4. Payment Service**
```typescript
class PaymentService {
  private stripe: Stripe | null = null;

  constructor(stripePublishableKey: string) {
    if (typeof window !== 'undefined') {
      this.stripe = window.Stripe(stripePublishableKey);
    }
  }

  async createPaymentIntent(amount: number): Promise<{ clientSecret: string }> {
    const response = await fetch('/api/payments/create-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ amount })
    });

    return response.json();
  }

  async confirmPayment(clientSecret: string, paymentMethod: any): Promise<any> {
    if (!this.stripe) throw new Error('Stripe not initialized');

    return this.stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod
    });
  }
}
```

---

## 🎯 Implementation Checklist

### **Phase 1: Core Setup**
- [ ] Create AuthService with login/register/logout
- [ ] Create ApiClient with all HTTP methods
- [ ] Set up environment variables (API URL, Stripe keys)
- [ ] Create TypeScript interfaces for all data types

### **Phase 2: Authentication Flow**
- [ ] Implement login/register forms
- [ ] Create protected route wrapper
- [ ] Add JWT token persistence
- [ ] Handle token refresh and expiration

### **Phase 3: Public Features**
- [ ] Pizza catalog (GET /pizzas)
- [ ] User registration
- [ ] Public pages (home, menu, etc.)

### **Phase 4: User Features**
- [ ] User profile (GET /me)
- [ ] Address management (GET/POST/PATCH/DELETE /enderecos)
- [ ] Order creation (POST /pedidos)
- [ ] Order history (GET /pedidos/meus-pedidos)

### **Phase 5: Staff Features**
- [ ] Order management (GET /pedidos, PATCH /pedidos/:id)
- [ ] Delivery person list (GET /entregadores)
- [ ] Order status updates

### **Phase 6: Admin Features**
- [ ] User management (GET/POST/PATCH/DELETE /users)
- [ ] Pizza management (all /pizzas routes)
- [ ] Delivery person management (all /entregadores routes)
- [ ] System overview dashboard

### **Phase 7: Real-time Features**
- [ ] WebSocket connection for delivery tracking
- [ ] Location updates for delivery persons
- [ ] Real-time order status updates

### **Phase 8: Payment Integration**
- [ ] Stripe payment intent creation
- [ ] Payment confirmation flow
- [ ] Webhook handling (if needed on frontend)

### **Phase 9: Error Handling & UX**
- [ ] Global error handling for API calls
- [ ] Loading states for all async operations
- [ ] Role-based UI rendering
- [ ] Unauthorized access handling

---

## 🚨 Important Notes

1. **Role-Based Access**: Always check user roles before showing admin/staff features
2. **Resource Ownership**: Some endpoints require ownership verification
3. **File Uploads**: Use `FormData` for image uploads, not JSON
4. **WebSocket**: Only delivery persons should emit location updates
5. **Payments**: Handle Stripe securely, never expose secret keys
6. **Error Handling**: Backend returns structured error responses
7. **CORS**: Backend has CORS configured for frontend URLs

This guide contains everything needed to implement a complete frontend for the Pizza Express Backend API. Follow the phases sequentially and test each feature thoroughly.