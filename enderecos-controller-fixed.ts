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
} from "@nestjs/common";
import { EnderecosService } from "./enderecos.service";
import { CreateEnderecoDto } from "../users/dto/create-endereco.dto";
import { UpdateEnderecoDto } from "../users/dto/update-endereco.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

// Use a MESMA interface do MeController
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
    return this.enderecosService.findByUserId(userId);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.enderecosService.findOne(Number(id));
  }

  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() dto: CreateEnderecoDto
  ) {
    // Debug: verificar se o user está sendo passado corretamente
    console.log("User from token:", req.user);

    // Use a mesma lógica do MeController
    const userId = req.user?.userId ?? req.user?.id;
    console.log("User ID:", userId);

    if (!userId) {
      throw new Error("Usuário não identificado no token");
    }

    // Passar o userId correto
    return this.enderecosService.create({ ...dto, userId });
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateEnderecoDto) {
    return this.enderecosService.update(Number(id), dto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.enderecosService.remove(Number(id));
  }
}
