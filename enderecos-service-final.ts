// enderecos.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateEnderecoDto } from "../users/dto/create-endereco.dto";
import { Endereco } from "@prisma/client";
import { UpdateEnderecoDto } from "../users/dto/update-endereco.dto";

@Injectable()
export class EnderecosService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Busca todos os endereços de um usuário
   */
  async findByUserId(userId: number): Promise<Endereco[]> {
    return this.prisma.endereco.findMany({
      where: { userId },
      orderBy: { principal: "desc" }, // Endereço principal primeiro
    });
  }

  /**
   * Busca um endereço específico por ID
   */
  async findOne(id: number): Promise<Endereco | null> {
    return this.prisma.endereco.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, nome: true, email: true },
        },
      },
    });
  }

  /**
   * Cria um novo endereço
   */
  async create(dto: CreateEnderecoDto & { userId: number }): Promise<Endereco> {
    if (!dto.userId) {
      throw new Error("Campo userId é obrigatório");
    }

    const { userId, ...data } = dto;

    // Se for principal, remover principal dos outros endereços do usuário
    if (data.principal) {
      await this.prisma.endereco.updateMany({
        where: { userId },
        data: { principal: false },
      });
    }

    return this.prisma.endereco.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
  }

  /**
   * Atualiza um endereço existente
   */
  async update(id: number, dto: UpdateEnderecoDto): Promise<Endereco> {
    const { ...data } = dto;

    // Se for marcar como principal, remover principal dos outros
    if (data.principal) {
      const endereco = await this.findOne(id);
      if (endereco) {
        await this.prisma.endereco.updateMany({
          where: {
            userId: endereco.userId,
            id: { not: id },
          },
          data: { principal: false },
        });
      }
    }

    return this.prisma.endereco.update({
      where: { id },
      data,
    });
  }

  /**
   * Remove um endereço
   */
  async remove(id: number): Promise<Endereco> {
    // Verificar se o endereço existe antes de deletar
    const endereco = await this.findOne(id);
    if (!endereco) {
      throw new Error("Endereço não encontrado");
    }

    return this.prisma.endereco.delete({
      where: { id },
    });
  }
}
