# INSTRUÇÕES PARA CORRIGIR O BACKEND - ENDEREÇOS

## ❌ Problemas Identificados

1. **EnderecosModule não existe** - Controller criado mas não registrado
2. **Falta importar no AppModule** 
3. **Falta rota GET /enderecos** para listar endereços do usuário
4. **Falta autenticação** no controller

## ✅ Solução - Arquivos para Criar/Editar

### 1. Criar: `src/enderecos/enderecos.module.ts`
```typescript
import { Module } from '@nestjs/common';
import { EnderecosController } from './enderecos.controller';
import { EnderecosService } from './enderecos.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [EnderecosController],
  providers: [EnderecosService, PrismaService],
  exports: [EnderecosService],
})
export class EnderecosModule {}
```

### 2. Editar: `src/app.module.ts`
```typescript
import { EnderecosModule } from './enderecos/enderecos.module'; // ADD

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          limit: 20,
          ttl: 60,
        },
      ],
    }),
    CommonModule,
    PizzasModule,
    PedidosModule,
    UsersModule,
    EntregadoresModule,
    AuthModule,
    EnderecosModule, // ADD ESTA LINHA
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### 3. Editar: `src/enderecos/enderecos.controller.ts`
```typescript
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { CreateEnderecoDto } from '../users/dto/create-endereco.dto';
import { UpdateEnderecoDto } from '../users/dto/update-endereco.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Ajuste o caminho se necessário

@Controller('enderecos')
@UseGuards(JwtAuthGuard) // ADD - Proteger rotas
export class EnderecosController {
  constructor(private readonly enderecosService: EnderecosService) {}

  // ADD - Nova rota para listar endereços do usuário
  @Get()
  async findUserEnderecos(@Request() req) {
    return this.enderecosService.findByUserId(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.enderecosService.findOne(Number(id));
  }

  @Post()
  async create(@Request() req, @Body() dto: CreateEnderecoDto) {
    // ADD - usar req.user.id automaticamente
    return this.enderecosService.create({ ...dto, userId: req.user.id });
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateEnderecoDto) {
    return this.enderecosService.update(Number(id), dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.enderecosService.remove(Number(id));
  }
}
```

### 4. Editar: `src/enderecos/enderecos.service.ts`
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEnderecoDto } from '../users/dto/create-endereco.dto';
import { Endereco } from '@prisma/client';
import { UpdateEnderecoDto } from '../users/dto/update-endereco.dto';

@Injectable()
export class EnderecosService {
  constructor(private readonly prisma: PrismaService) {}

  // ADD - Novo método para buscar por usuário
  async findByUserId(userId: number): Promise<Endereco[]> {
    return this.prisma.endereco.findMany({ 
      where: { userId },
      orderBy: { principal: 'desc' } // Endereço principal primeiro
    });
  }

  async findOne(id: number): Promise<Endereco | null> {
    return this.prisma.endereco.findUnique({ where: { id } });
  }

  async create(dto: CreateEnderecoDto) {
    if (!dto.userId) throw new Error('Campo userId é obrigatório');
    const { userId, ...data } = dto;
    
    // Se for principal, remover principal dos outros endereços do usuário
    if (data.principal) {
      await this.prisma.endereco.updateMany({
        where: { userId },
        data: { principal: false }
      });
    }
    
    return this.prisma.endereco.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
  }

  async update(id: number, dto: UpdateEnderecoDto) {
    const { ...data } = dto;
    
    // Se for marcar como principal, remover principal dos outros
    if (data.principal) {
      const endereco = await this.findOne(id);
      if (endereco) {
        await this.prisma.endereco.updateMany({
          where: { userId: endereco.userId, id: { not: id } },
          data: { principal: false }
        });
      }
    }
    
    return this.prisma.endereco.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.endereco.delete({ where: { id } });
  }
}
```

## 🚀 Passos para Aplicar

1. **Criar** o arquivo `enderecos.module.ts`
2. **Editar** o `app.module.ts` adicionando `EnderecosModule`
3. **Editar** o `enderecos.controller.ts` com as mudanças
4. **Editar** o `enderecos.service.ts` com o novo método
5. **Reiniciar** o servidor NestJS

## 🧪 Testar

Após aplicar as mudanças, teste:

```bash
# Listar endereços (precisa de token)
curl -X GET http://localhost:10000/enderecos \
  -H "Authorization: Bearer SEU_TOKEN"

# Criar endereço
curl -X POST http://localhost:10000/enderecos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "cep": "04567-890",
    "tipo": "trabalho", 
    "logradouro": "Rua do Trabalho",
    "numero": "500",
    "bairro": "Vila Olímpia",
    "cidade": "São Paulo",
    "estado": "SP",
    "principal": false
  }'
```

## ✅ Resultado Esperado

- ✅ GET `/enderecos` - Lista endereços do usuário
- ✅ POST `/enderecos` - Cria endereço
- ✅ PATCH `/enderecos/:id` - Atualiza endereço  
- ✅ DELETE `/enderecos/:id` - Remove endereço
- ✅ Autenticação funcionando
- ✅ Frontend funcionando com as rotas

Precisa de ajuda com algum passo específico?
