import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { UsuarioService } from "@/services/usuario-service";
import { CreateUsuarioData } from "@/types";

interface FormData {
  nome: string;
  email: string;
  password: string;
  confirmPassword: string;
  telefone: string;
  // endereco removido - não deve ser enviado no cadastro conforme documentação
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  nome?: string;
  telefone?: string;
  // endereco removido
}

interface UseRegisterReturn {
  formData: FormData;
  loading: boolean;
  errors: FormErrors;
  successMessage: string;
  errorMessage: string;
  handleInputChange: (field: keyof FormData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearMessages: () => void;
}

export const useRegister = (): UseRegisterReturn => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefone: "",
    // endereco removido - não deve ser enviado no cadastro conforme documentação
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Validação do nome
    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = "Nome deve ter pelo menos 2 caracteres";
    }

    // Validação do email
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    // Validação da senha
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    // Validação da confirmação da senha
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    // Validação do telefone
    if (!formData.telefone.trim()) {
      newErrors.telefone = "Telefone é obrigatório";
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.telefone)) {
      newErrors.telefone = "Telefone deve estar no formato (XX) XXXX-XXXX";
    }

    // Endereço removido - não validado no cadastro conforme documentação

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Limpa erros ao digitar
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }

      // Limpa mensagens de erro/sucesso
      if (errorMessage) setErrorMessage("");
      if (successMessage) setSuccessMessage("");
    },
    [errors, errorMessage, successMessage]
  );

  const clearMessages = useCallback(() => {
    setSuccessMessage("");
    setErrorMessage("");
    setErrors({});
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      try {
        // Preparar dados do usuário conforme documentação (sem endereço)
        const usuarioData: CreateUsuarioData = {
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
        };

        // Cadastrar usuário usando o serviço
        await UsuarioService.cadastrarUsuario(usuarioData);

        // Ainda precisamos fazer o registro de autenticação separadamente
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nome: formData.nome,
              email: formData.email,
              password: formData.password,
              telefone: formData.telefone,
              // endereco removido conforme documentação
            }),
          }
        );

        const responseData = await response.json();

        if (response.ok) {
          setSuccessMessage(
            "Conta criada com sucesso! Redirecionando para login..."
          );

          setTimeout(() => {
            if (typeof window !== "undefined") {
              window.location.href = "/login";
            } else {
              router.push("/login");
            }
          }, 2000);
        } else {
          setErrorMessage(
            responseData.message || "Erro ao criar conta. Tente novamente."
          );
        }
      } catch {
        setErrorMessage(
          "Erro de conexão. Verifique sua internet e tente novamente."
        );
      } finally {
        setLoading(false);
      }
    },
    [formData, validateForm, router]
  );

  return {
    formData,
    loading,
    errors,
    successMessage,
    errorMessage,
    handleInputChange,
    handleSubmit,
    clearMessages,
  };
};
