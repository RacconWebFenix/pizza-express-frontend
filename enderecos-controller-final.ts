// enderecos.controller.ts
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
  BadRequestException,
  ParseIntPipe,
} from "@nestjs/common";
import { EnderecosService } from "./enderecos.service";
import { CreateEnderecoDto } from "../users/dto/create-endereco.dto";
import { UpdateEnderecoDto } from "../users/dto/update-endereco.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

// Interface para usuário autenticado
interface AuthenticatedUser {
  userId?: number;
  id?: number;
}

interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

@Controller("enderecos")
@UseGuards(JwtAuthGuard)
export class EnderecosController {
  constructor(private readonly enderecosService: EnderecosService) {}

  @Get()
  async findUserEnderecos(@Request() req: AuthenticatedRequest) {
    const userId = req.user?.userId ?? req.user?.id;

    if (!userId) {
      throw new BadRequestException("Usuário não identificado no token");
    }

    return this.enderecosService.findByUserId(userId);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.enderecosService.findOne(id);
  }

  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() dto: CreateEnderecoDto
  ) {
    console.log("User from token:", req.user);

    const userId = req.user?.userId ?? req.user?.id;
    console.log("User ID:", userId);

    if (!userId) {
      throw new BadRequestException("Usuário não identificado no token");
    }

    return this.enderecosService.create({ ...dto, userId });
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateEnderecoDto
  ) {
    return this.enderecosService.update(id, dto);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.enderecosService.remove(id);
  }
}
