import { UploadResult, FileValidationResult } from "@/types/upload";
import { getAuthToken } from "@/utils/cookies";
import { API_BASE_URL } from "@/config/api";

const API_URL = API_BASE_URL;

// Validar arquivo
export const validateFile = (
  file: File,
  options: { maxSize?: number; acceptedTypes?: string[] } = {}
): FileValidationResult => {
  const {
    maxSize = 5 * 1024 * 1024,
    acceptedTypes = ["image/jpeg", "image/png", "image/webp"],
  } = options;

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `Arquivo muito grande. Tamanho máximo: ${Math.round(
        maxSize / 1024 / 1024
      )}MB`,
    };
  }

  if (!acceptedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Tipo de arquivo não suportado. Use: ${acceptedTypes.join(", ")}`,
    };
  }

  return { isValid: true };
};

// Upload de imagem para pizza
export const uploadPizzaImage = async (
  pizzaId: string,
  file: File
): Promise<UploadResult> => {
  // Validar arquivo
  const validation = validateFile(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const formData = new FormData();
  formData.append("image", file);

  const token = getAuthToken();
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const response = await fetch(`${API_URL}/pizzas/${pizzaId}/upload-image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Erro no upload" }));
      throw new Error(errorData.message || "Erro no upload da imagem");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

// Upload genérico (futuro)
export const uploadFile = async (
  file: File,
  endpoint: string
): Promise<UploadResult> => {
  const validation = validateFile(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const formData = new FormData();
  formData.append("file", file);

  const token = getAuthToken();
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Erro no upload" }));
      throw new Error(errorData.message || "Erro no upload do arquivo");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
