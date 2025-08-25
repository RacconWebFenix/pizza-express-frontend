# Gerenciamento de Endereços - Análise de Abordagens

## Situação Atual

Atualmente, os endereços estão sendo retornados como parte do perfil do usuário através da rota `/me`, mas tentamos usar rotas específicas de endereços que não existem no backend.

## Abordagem 1: Endereços como parte do perfil (IMPLEMENTADA)

### Como funciona:
- GET `/me` - retorna o usuário com seus endereços
- PUT `/users/:id` - atualiza o usuário, incluindo endereços

### Vantagens:
- ✅ **Simples de implementar** - menos rotas no backend
- ✅ **Menos requests** - endereços vêm junto com o perfil
- ✅ **Já funciona** - backend já retorna endereços em `/me`

### Desvantagens:
- ❌ **Menos granular** - para alterar um endereço, precisa mandar todos os dados do usuário
- ❌ **Menos RESTful** - mistura recursos diferentes (usuário + endereços)
- ❌ **Mais complexo para operações específicas** - como marcar endereço como principal

### Estrutura atual no frontend:
```typescript
// user.enderecos já vem populated da rota /me
const { user } = useProfile();
const enderecos = user?.enderecos || [];
```

## Abordagem 2: Endereços como recurso independente (RECOMENDADA)

### Como deveria funcionar:
```
GET    /enderecos          # Lista endereços do usuário logado
POST   /enderecos          # Cria novo endereço
GET    /enderecos/:id      # Busca endereço específico
PATCH  /enderecos/:id      # Atualiza endereço
DELETE /enderecos/:id      # Remove endereço
```

### Vantagens:
- ✅ **Mais RESTful** - cada recurso tem suas rotas específicas
- ✅ **Operações granulares** - alterar só o que precisa
- ✅ **Melhor performance** - não precisa carregar usuário inteiro para alterar endereço
- ✅ **Mais escalável** - fácil adicionar funcionalidades específicas
- ✅ **Melhor UX** - operações mais rápidas e específicas

### Desvantagens:
- ❌ **Mais complexo** - requer mais rotas no backend
- ❌ **Mais requests** - uma requisição para usuário, outra para endereços

### Payload examples:

#### POST /enderecos
```json
{
  "cep": "04567-890",
  "tipo": "trabalho",
  "logradouro": "Rua do Trabalho",
  "numero": "500",
  "bairro": "Vila Olímpia",
  "cidade": "São Paulo",
  "estado": "SP",
  "complemento": "Sala 1001",
  "principal": false
}
```

#### PATCH /enderecos/:id
```json
{
  "complemento": "Sala 1002 - Atualizado",
  "principal": true
}
```

## Recomendação

Para uma aplicação robusta, recomendo a **Abordagem 2** com rotas específicas para endereços.

### Benefícios específicos para o Pizza Express:

1. **Operação "Marcar como Principal"**: 
   - Atual: Precisa enviar todos os endereços
   - Ideal: `PATCH /enderecos/:id { "principal": true }`

2. **Adicionar novo endereço**:
   - Atual: Precisa recarregar perfil inteiro
   - Ideal: `POST /enderecos` + atualiza lista local

3. **Remover endereço**:
   - Atual: Precisa filtrar no frontend e enviar lista completa
   - Ideal: `DELETE /enderecos/:id`

4. **Performance na seleção de endereço no checkout**:
   - Pode carregar só endereços sem dados do usuário

### Implementação no Backend

```typescript
// enderecos.controller.ts
@Controller('enderecos')
@UseGuards(JwtAuthGuard)
export class EnderecosController {
  
  @Get()
  async findUserEnderecos(@Request() req) {
    return this.enderecosService.findByUserId(req.user.id);
  }

  @Post()
  async create(@Request() req, @Body() createEnderecoDto: CreateEnderecoDto) {
    return this.enderecosService.create(req.user.id, createEnderecoDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEnderecoDto: UpdateEnderecoDto) {
    return this.enderecosService.update(+id, updateEnderecoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.enderecosService.remove(+id);
  }
}
```

## Próximos Passos

1. **Opção A (Continuar com atual)**: 
   - Implementar update de endereços via PUT /users/:id
   - Manter funcionalidade atual
   
2. **Opção B (Implementar rotas específicas)**:
   - Criar rotas CRUD para endereços no backend
   - Migrar frontend para usar novas rotas
   - Melhor UX e performance

**Qual abordagem você prefere implementar?**
