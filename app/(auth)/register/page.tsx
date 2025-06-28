"use client";

import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        <Box
          bg="white"
          p={8}
          rounded="lg"
          shadow="md"
          w="full"
          maxW="400px"
          borderTop="4px"
          borderTopColor="blue.600"
        >
          <VStack gap={6}>
            <Heading color="blue.600" size="lg" textAlign="center">
              Criar Conta
            </Heading>

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
                <Box w="full">
                  <Text
                    color="gray.600"
                    mb={2}
                    fontSize="sm"
                    fontWeight="medium"
                  >
                    Nome Completo
                  </Text>
                  <Input
                    type="text"
                    value={formData.nome}
                    onChange={handleInputChange("nome")}
                    placeholder="Seu nome completo"
                    bg="white"
                    color="gray.700"
                    border="1px"
                    borderColor={errors.nome ? "red.300" : "gray.300"}
                    _placeholder={{ color: "gray.500" }}
                    _focus={{
                      borderColor: errors.nome ? "red.500" : "blue.600",
                      boxShadow: `0 0 0 1px ${
                        errors.nome ? "red.500" : "blue.600"
                      }`,
                    }}
                  />
                  {errors.nome && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.nome}
                    </Text>
                  )}
                </Box>

                {/* Email */}
                <Box w="full">
                  <Text
                    color="gray.600"
                    mb={2}
                    fontSize="sm"
                    fontWeight="medium"
                  >
                    Email
                  </Text>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    placeholder="seu@email.com"
                    bg="white"
                    color="gray.700"
                    border="1px"
                    borderColor={errors.email ? "red.300" : "gray.300"}
                    _placeholder={{ color: "gray.500" }}
                    _focus={{
                      borderColor: errors.email ? "red.500" : "blue.600",
                      boxShadow: `0 0 0 1px ${
                        errors.email ? "red.500" : "blue.600"
                      }`,
                    }}
                  />
                  {errors.email && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.email}
                    </Text>
                  )}
                </Box>

                {/* Telefone */}
                <Box w="full">
                  <Text
                    color="gray.600"
                    mb={2}
                    fontSize="sm"
                    fontWeight="medium"
                  >
                    Telefone (Opcional)
                  </Text>
                  <Input
                    type="tel"
                    value={formData.telefone}
                    onChange={handleInputChange("telefone")}
                    placeholder="(11) 99999-9999 ou texto livre"
                    bg="white"
                    color="gray.700"
                    border="1px"
                    borderColor={errors.telefone ? "red.300" : "gray.300"}
                    _placeholder={{ color: "gray.500" }}
                    _focus={{
                      borderColor: errors.telefone
                        ? "red.500"
                        : "blue.600",
                      boxShadow: `0 0 0 1px ${
                        errors.telefone ? "red.500" : "blue.600"
                      }`,
                    }}
                  />
                  {errors.telefone && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.telefone}
                    </Text>
                  )}
                </Box>

                {/* Endereço */}
                <Box w="full">
                  <Text
                    color="gray.600"
                    mb={2}
                    fontSize="sm"
                    fontWeight="medium"
                  >
                    Endereço
                  </Text>
                  <Input
                    type="text"
                    value={formData.endereco}
                    onChange={handleInputChange("endereco")}
                    placeholder="Rua, número, bairro, cidade"
                    bg="white"
                    color="gray.700"
                    border="1px"
                    borderColor={errors.endereco ? "red.300" : "gray.300"}
                    _placeholder={{ color: "gray.500" }}
                    _focus={{
                      borderColor: errors.endereco
                        ? "red.500"
                        : "blue.600",
                      boxShadow: `0 0 0 1px ${
                        errors.endereco ? "red.500" : "blue.600"
                      }`,
                    }}
                  />
                  {errors.endereco && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.endereco}
                    </Text>
                  )}
                </Box>

                {/* Senha */}
                <Box w="full">
                  <Text
                    color="gray.600"
                    mb={2}
                    fontSize="sm"
                    fontWeight="medium"
                  >
                    Senha
                  </Text>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange("password")}
                    placeholder="Mínimo 6 caracteres"
                    bg="white"
                    color="gray.700"
                    border="1px"
                    borderColor={errors.password ? "red.300" : "gray.300"}
                    _placeholder={{ color: "gray.500" }}
                    _focus={{
                      borderColor: errors.password
                        ? "red.500"
                        : "blue.600",
                      boxShadow: `0 0 0 1px ${
                        errors.password ? "red.500" : "blue.600"
                      }`,
                    }}
                  />
                  {errors.password && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.password}
                    </Text>
                  )}
                </Box>

                {/* Confirmar Senha */}
                <Box w="full">
                  <Text
                    color="gray.600"
                    mb={2}
                    fontSize="sm"
                    fontWeight="medium"
                  >
                    Confirmar Senha
                  </Text>
                  <Input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange("confirmPassword")}
                    placeholder="Digite a senha novamente"
                    bg="white"
                    color="gray.700"
                    border="1px"
                    borderColor={
                      errors.confirmPassword ? "red.300" : "gray.300"
                    }
                    _placeholder={{ color: "gray.500" }}
                    _focus={{
                      borderColor: errors.confirmPassword
                        ? "red.500"
                        : "blue.600",
                      boxShadow: `0 0 0 1px ${
                        errors.confirmPassword ? "red.500" : "blue.600"
                      }`,
                    }}
                  />
                  {errors.confirmPassword && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                </Box>

                <Button
                  type="submit"
                  bg="blue.600"
                  color="white"
                  size="lg"
                  w="full"
                  loading={loading}
                  _hover={{ bg: "brand.accent" }}
                  _disabled={{ opacity: 0.6, cursor: "not-allowed" }}
                  disabled={loading}
                >
                  {loading ? "Criando conta..." : "Criar Conta"}
                </Button>
              </VStack>
            </Box>

            <Box textAlign="center">
              <Text color="gray.600" fontSize="sm">
                Já tem uma conta?{" "}
                <Link href="/login" passHref>
                  <ChakraLink color="blue.600" fontWeight="semibold">
                    Fazer login
                  </ChakraLink>
                </Link>
              </Text>
            </Box>
          </VStack>
        </Box>
      </motion.div>
    </Box>
  );
};

export default RegisterPage;
