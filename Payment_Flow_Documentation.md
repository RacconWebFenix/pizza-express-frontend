# 🍕 Pizza Express - Fluxo Completo de Pagamentos

## 💳 Sistema de Pagamentos com Stripe

### 📋 Visão Geral
O sistema utiliza Stripe para processamento de pagamentos com Payment Intents e webhooks para confirmação automática.

### 🔄 Fluxo Completo de Pedido e Pagamento

#### 1. **Cliente faz login e seleciona itens**
```bash
POST /auth/login
{
  "email": "cliente@email.com",
  "password": "123456"
}
# Retorna: JWT token
```

#### 2. **Cliente obtém catálogo de pizzas**
```bash
GET /pizzas
# Retorna: Lista de pizzas com preços
```

#### 3. **Cliente calcula total e cria Payment Intent**
```bash
POST /payments/create-intent
Authorization: Bearer JWT_TOKEN
{
  "amount": 7500  // R$ 75,00 em centavos
}
# Retorna: { "client_secret": "pi_test_..." }
```

#### 4. **Frontend processa pagamento com Stripe**
```javascript
// No frontend (React/Next.js)
const stripe = await stripePromise;
const { error } = await stripe.confirmPayment({
  clientSecret: clientSecret,
  confirmParams: {
    return_url: 'http://localhost:3000/success',
  },
});
```

#### 5. **Cliente cria pedido com paymentIntentId**
```bash
POST /pedidos
Authorization: Bearer JWT_TOKEN
{
  "clienteId": 1,
  "enderecoId": 1,
  "pizzasIds": [1, 2],
  "paymentIntentId": "pi_test_payment_intent_abc123",
  "observacoes": "Sem cebola"
}
# Status inicial: PENDENTE
```

#### 6. **Stripe confirma pagamento via Webhook**
```bash
POST /payments/webhook
# Headers: stripe-signature
{
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_test_payment_intent_abc123",
      "status": "succeeded",
      "amount": 7500
    }
  }
}
# Sistema atualiza pedido para: EM_PREPARO
```

#### 7. **Restaurante processa pedido**
```bash
PATCH /pedidos/123/status
Authorization: Bearer JWT_TOKEN
{
  "status": "EM_PREPARO"
}

PATCH /pedidos/123/status
Authorization: Bearer JWT_TOKEN
{
  "status": "A_CAMINHO"
}

PATCH /pedidos/123
Authorization: Bearer JWT_TOKEN
{
  "entregadorId": 1
}
```

#### 8. **Entregador atualiza localização em tempo real**
```javascript
// WebSocket connection
const socket = new WebSocket('ws://localhost:10000/entregadores-location');

// Enviar localização
socket.send(JSON.stringify({
  event: 'updateLocation',
  data: {
    entregadorId: 1,
    latitude: -23.5505,
    longitude: -46.6333,
    pedidoId: 123
  }
}));
```

#### 9. **Pedido é entregue**
```bash
PATCH /pedidos/123/status
Authorization: Bearer JWT_TOKEN
{
  "status": "ENTREGUE"
}
```

### 🔧 Configuração do Stripe

#### Variáveis de Ambiente Necessárias:
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### Webhook Events Configurados:
- `payment_intent.succeeded` - Pagamento confirmado
- `payment_intent.payment_failed` - Pagamento falhou

### 📊 Estados do Pedido
1. **PENDENTE** - Pedido criado, aguardando pagamento
2. **EM_PREPARO** - Pagamento confirmado, restaurante preparando
3. **A_CAMINHO** - Pedido saiu para entrega
4. **ENTREGUE** - Pedido finalizado com sucesso
5. **CANCELADO** - Pedido cancelado

### 🛡️ Segurança
- JWT obrigatório em todos os endpoints (exceto webhook)
- Webhook validado com assinatura Stripe
- Rate limiting implementado
- Logs de auditoria para pagamentos

### 🧪 Testes
```bash
# Testar Payment Intent
POST /payments/create-intent
{
  "amount": 1000
}

# Simular webhook (Stripe CLI)
stripe listen --forward-to localhost:10000/payments/webhook
stripe trigger payment_intent.succeeded
```

---

**Fluxo implementado e testado! 🎉**