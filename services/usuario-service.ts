import { CreateUsuarioData, CreateUsuarioResponse } from "@/types";

// Serviço para cadastro de usuários (APENAS POST)
export class UsuarioService {
  private static baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  /**
   * Cadastra um novo usuário
   * Método: POST
   * Endpoint: /usuarios
   *
   * IMPORTANTE: O endereço NÃO deve ser enviado na rota de cadastro.
   * O endereço será solicitado apenas em uma rota específica para cadastro/edição de endereço.
   */
  static async cadastrarUsuario(
    data: CreateUsuarioData
  ): Promise<CreateUsuarioResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erro ao cadastrar usuário: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erro no cadastro de usuário:", error);
      throw error;
    }
  }
}
