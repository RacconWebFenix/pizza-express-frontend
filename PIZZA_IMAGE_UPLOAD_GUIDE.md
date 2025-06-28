# Upload de Imagens para Pizzas - Frontend

Este documento explica como usar as novas funcionalidades de upload de imagem para pizzas no frontend.

## 🚀 Funcionalidades Implementadas

### 1. Serviços da API (`/services/pizza-service.ts`)

- **`createPizzaWithImage(data)`** - Criar pizza com imagem
- **`uploadImageToPizza(id, image)`** - Adicionar/atualizar imagem de pizza existente
- **`createPizza(data)`** - Criar pizza sem imagem (existente)
- **`updatePizza(id, data)`** - Atualizar pizza (existente)
- **`deletePizza(id)`** - Deletar pizza (existente)

### 2. Hook Personalizado (`/hooks/usePizzaActions.ts`)

O hook `usePizzaActions` fornece:

- **Estados**: `isLoading`, `error`
- **Ações**: `createWithImage`, `uploadImage`, `create`, `update`, `remove`
- **Utilitários**: `validateImage`, `validateData`, `clearError`

### 3. Validações (`/utils/validation.ts`)

- **`validateImageFile(file)`** - Valida tipo e tamanho do arquivo
- **`validatePizzaData(data)`** - Valida dados da pizza

### 4. Tipos TypeScript (`/types/index.ts`)

- **`Pizza`** - Interface atualizada com `imagemUrl`
- **`CreatePizzaWithImageData`** - Dados para criar pizza com imagem
- **`UploadImageData`** - Dados para upload de imagem
- **`FileValidation`** - Resultado da validação de arquivo

## 📝 Exemplos de Uso

### Exemplo 1: Criar Pizza com Imagem

```tsx
import { usePizzaActions } from "@/hooks/usePizzaActions";

function CreatePizzaForm() {
  const { createWithImage, isLoading, error } = usePizzaActions();
  
  const handleSubmit = async (formData) => {
    try {
      const result = await createWithImage({
        nome: "Pizza Margherita",
        descricao: "Molho de tomate, mussarela e manjericão",
        preco: 25.90,
        imagem: selectedFile // File object
      });
      
      console.log("Pizza criada:", result);
    } catch (err) {
      console.error("Erro:", err);
    }
  };
  
  return (
    // Seu JSX aqui
  );
}
```

### Exemplo 2: Fazer Upload de Imagem para Pizza Existente

```tsx
import { usePizzaActions } from "@/hooks/usePizzaActions";

function UploadImageForm({ pizzaId }) {
  const { uploadImage, isLoading, error } = usePizzaActions();
  
  const handleUpload = async (imageFile) => {
    try {
      const result = await uploadImage(pizzaId, imageFile);
      console.log("Imagem enviada:", result);
    } catch (err) {
      console.error("Erro:", err);
    }
  };
  
  return (
    // Seu JSX aqui
  );
}
```

### Exemplo 3: Validação de Arquivo

```tsx
import { validateImageFile } from "@/utils/validation";

function ImageInput({ onImageSelect }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const validation = validateImageFile(file);
      
      if (!validation.isValid) {
        alert(validation.error);
        return;
      }
      
      onImageSelect(file);
    }
  };
  
  return (
    <input
      type="file"
      accept="image/jpeg,image/jpg,image/png,image/webp"
      onChange={handleFileChange}
    />
  );
}
```

## 🔧 Configurações

### Validações de Arquivo

- **Tipos permitidos**: JPG, JPEG, PNG, WEBP
- **Tamanho máximo**: 5MB
- **Validação automática** no hook `usePizzaActions`

### Validações de Dados

- **Nome**: 2-100 caracteres
- **Descrição**: 10-500 caracteres  
- **Preço**: Número positivo

## 📋 Endpoints da API Backend

### 1. Criar Pizza com Imagem
```
POST /pizzas/with-image
Content-Type: multipart/form-data
Authorization: Bearer <token>

Body (form-data):
- nome: string
- descricao: string
- preco: number
- imagem: File
```

### 2. Upload de Imagem para Pizza Existente
```
POST /pizzas/:id/upload-image
Content-Type: multipart/form-data
Authorization: Bearer <token>

Body (form-data):
- imagem: File
```

### 3. Criar Pizza Sem Imagem
```
POST /pizzas
Content-Type: application/json
Authorization: Bearer <token>

Body (JSON):
{
  "nome": "string",
  "descricao": "string", 
  "preco": number,
  "imagemUrl": "string" (opcional)
}
```

## 🎨 Componentes de Exemplo

### 1. Formulário Completo
Veja: `/components/examples/CreatePizzaWithImageForm.tsx`

### 2. Upload para Pizza Existente
Veja: `/components/examples/UploadImageToPizza.tsx`

## 🔒 Autenticação

Todas as rotas requerem JWT token:
- Token é automaticamente incluído pelos serviços
- Redirecionamento automático para `/access-denied` se não autenticado

## 🐛 Tratamento de Erros

O hook `usePizzaActions` trata automaticamente:
- **Validação de arquivo** (tipo e tamanho)
- **Validação de dados** (campos obrigatórios)
- **Erros de rede** (conectividade, timeout)
- **Erros de API** (400, 401, 403, 500)
- **Estados de loading** (para UX)

## 📱 Responsividade

Os componentes de exemplo são responsivos e seguem as práticas do Tailwind CSS.

## 🚀 Deploy

As imagens são automaticamente:
- **Enviadas para Cloudinary** (configurado no backend)
- **Convertidas para WEBP** (otimização automática)  
- **Redimensionadas** para 800x600px
- **Otimizadas** para qualidade automática

## 💡 Dicas de Uso

1. **Preview de Imagem**: Use `FileReader` para mostrar preview antes do upload
2. **Validação Antecipada**: Valide arquivos no cliente antes de enviar
3. **UX**: Mostre loading states durante upload
4. **Error Handling**: Use o sistema de erros do hook
5. **Performance**: Use lazy loading para listas de pizzas com muitas imagens
