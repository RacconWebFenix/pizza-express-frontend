"use client";

import { Box, VStack, Link as ChakraLink } from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PizzaButton, PizzaCard, PizzaText, PizzaInput } from "@/components/ui";

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  nome?: string;
  telefone?: string;
  endereco?: string;
}

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefone: "",
    endereco: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validação do nome
    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = "Nome deve ter pelo menos 2 caracteres";
    }

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email deve ter um formato válido";
    }

    // Validação da senha
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    // Validação da confirmação de senha
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem";
    }

    // Validação do telefone (opcional - string)
    // O telefone é opcional, então não há validação específica se estiver vazio

    // Validação do endereço
    if (!formData.endereco.trim()) {
      newErrors.endereco = "Endereço é obrigatório";
    } else if (formData.endereco.trim().length < 5) {
      newErrors.endereco = "Endereço deve ter pelo menos 5 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
      // Limpa o erro do campo quando o usuário começa a digitar
      if (errors[field as keyof FormErrors]) {
        setErrors({ ...errors, [field]: undefined });
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: formData.nome.trim(),
            email: formData.email.toLowerCase().trim(),
            password: formData.password,
            telefone: formData.telefone.trim() || undefined, // Opcional como string
            endereco: formData.endereco.trim(),
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setSuccessMessage(
          "Cadastro realizado com sucesso! Redirecionando para o login..."
        );

        // Aguarda 2 segundos antes de redirecionar
        setTimeout(() => {
          // Use window.location para garantir redirecionamento em produção
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          } else {
            router.push("/login");
          }
        }, 2000);
      } else {
        // Trata diferentes tipos de erro
        if (response.status === 409) {
          setErrorMessage("Este email já está cadastrado. Tente fazer login.");
        } else if (responseData.message) {
          setErrorMessage(
            Array.isArray(responseData.message)
              ? responseData.message.join(", ")
              : responseData.message
          );
        } else {
          setErrorMessage("Erro ao realizar cadastro. Tente novamente.");
        }
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      setErrorMessage(
        "Erro inesperado. Por favor, tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      bg="gray.50"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PizzaCard
          variant="default"
          w="full"
          maxW="400px"
          borderTopColor="brand.primary"
        >
          <VStack gap={6}>
            <PizzaText
              variant="heading"
              color="brand.primary"
              textAlign="center"
            >
              Criar Conta
            </PizzaText>

            {successMessage && (
              <Box
                bg="green.50"
                color="green.800"
                p={3}
                rounded="md"
                border="1px"
                borderColor="green.200"
              >
                ✅ {successMessage}
              </Box>
            )}

            {errorMessage && (
              <Box
                bg="red.50"
                color="red.800"
                p={3}
                rounded="md"
                border="1px"
                borderColor="red.200"
              >
                ❌ {errorMessage}
              </Box>
            )}

            <Box as="form" onSubmit={handleSubmit} w="full">
              <VStack gap={4}>
                {/* Nome */}
                <PizzaInput
                  label="Nome Completo"
                  type="text"
                  value={formData.nome}
                  onChange={handleInputChange("nome")}
                  placeholder="Seu nome completo"
                  error={errors.nome}
                  required
                />

                {/* Email */}
                <PizzaInput
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  placeholder="seu@email.com"
                  error={errors.email}
                  required
                />

                {/* Telefone */}
                <PizzaInput
                  label="Telefone (Opcional)"
                  type="tel"
                  value={formData.telefone}
                  onChange={handleInputChange("telefone")}
                  placeholder="(11) 99999-9999 ou texto livre"
                  error={errors.telefone}
                />

                {/* Endereço */}
                <PizzaInput
                  label="Endereço"
                  type="text"
                  value={formData.endereco}
                  onChange={handleInputChange("endereco")}
                  placeholder="Rua, número, bairro, cidade"
                  error={errors.endereco}
                  required
                />

                {/* Senha */}
                <PizzaInput
                  label="Senha"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  placeholder="Mínimo 6 caracteres"
                  error={errors.password}
                  required
                />

                {/* Confirmar Senha */}
                <PizzaInput
                  label="Confirmar Senha"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange("confirmPassword")}
                  placeholder="Digite a senha novamente"
                  error={errors.confirmPassword}
                  required
                />

                <PizzaButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  w="full"
                  disabled={loading}
                >
                  {loading ? "Criando conta..." : "Criar Conta"}
                </PizzaButton>
              </VStack>
            </Box>

            <Box textAlign="center">
              <PizzaText color="gray.800" fontSize="sm">
                Já tem uma conta?{" "}
                <Link href="/login" passHref>
                  <ChakraLink color="brand.primary" fontWeight="semibold">
                    Fazer login
                  </ChakraLink>
                </Link>
              </PizzaText>
            </Box>
          </VStack>
        </PizzaCard>
      </motion.div>
    </Box>
  );
};

export default RegisterPage;
