"use client";

import { Box, VStack, Heading, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PizzaButton, PizzaInput, PizzaLoading } from "@/components/ui";
import { FaSignInAlt } from "react-icons/fa";

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  nome?: string;
  telefone?: string;
  // endereco removido - não será coletado no cadastro conforme documentação
}

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefone: "",
    // endereco removido - não será coletado no cadastro conforme documentação
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const validateForm = (): boolean => {
    // ... (toda a sua lógica de validação continua a mesma)
    const newErrors: FormErrors = {};

    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    else if (formData.nome.trim().length < 2)
      newErrors.nome = "Nome deve ter pelo menos 2 caracteres";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Email é obrigatório";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Email deve ter um formato válido";

    if (!formData.password) newErrors.password = "Senha é obrigatória";
    else if (formData.password.length < 6)
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Senhas não coincidem";

    if (!formData.telefone.trim())
      newErrors.telefone = "Telefone é obrigatório";
    else {
      const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
      if (!phoneRegex.test(formData.telefone))
        newErrors.telefone = "Telefone deve estar no formato (99) 9999-9999";
    }

    // Endereço removido - não será validado no cadastro conforme documentação

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (value: string): string => {
    // ... (sua função de formatação continua a mesma)
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers.length > 0 ? `(${numbers}` : "";
    if (numbers.length <= 6)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(
        6
      )}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
      7,
      11
    )}`;
  };

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      if (field === "telefone") value = formatPhoneNumber(value);
      setFormData({ ...formData, [field]: value });
      if (errors[field as keyof FormErrors])
        setErrors({ ...errors, [field]: undefined });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    // ... (sua lógica de submit continua a mesma)
    e.preventDefault();
    setErrorMessage("");
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: formData.nome.trim(),
            email: formData.email.toLowerCase().trim(),
            password: formData.password,
            telefone: formData.telefone.trim(),
            // endereco removido - não será enviado no cadastro conforme documentação
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => router.push("/login"), 3000);
      } else {
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
        setLoading(false);
      }
    } catch {
      setErrorMessage("Erro inesperado. Tente novamente mais tarde.");
      setLoading(false);
    }
  };

  if (loading) {
    return <PizzaLoading isVisible={true} message="Processando cadastro..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: "100%", maxWidth: "420px" }}
    >
      <Box
        bg="white"
        p={{ base: 4, md: 6, lg: 8 }}
        borderRadius="xl"
        boxShadow="xl"
        w="full"
        maxW="420px"
        mx="auto"
        borderTop="4px solid"
        borderColor={showSuccess ? "green.500" : "brand.primary"}
        _dark={{
          bg: "gray.800",
          borderColor: showSuccess ? "green.400" : "brand.secondary",
        }}
        maxH="90vh"
        overflowY="auto"
      >
        {showSuccess ? (
          <VStack gap={4} textAlign="center" py={6}>
            <Text fontSize="4xl">✅</Text>
            <Heading size="lg" color="green.600">
              Cadastro Realizado!
            </Heading>
            <Text color="gray.600" _dark={{ color: "gray.300" }}>
              Sua conta foi criada com sucesso. Estamos redirecionando você para
              o login.
            </Text>
          </VStack>
        ) : (
          <VStack as="form" onSubmit={handleSubmit} gap={{ base: 3, md: 4, lg: 4 }} align="stretch">
            <Heading
              size={{ base: "md", md: "lg" }}
              color="gray.700"
              textAlign="center"
              _dark={{ color: "white" }}
            >
              Crie sua Conta
            </Heading>

            {errorMessage && (
              <Box
                bg="red.50"
                color="red.800"
                p={3}
                rounded="md"
                border="1px"
                borderColor="red.200"
              >
                <Text fontWeight="medium">❌ {errorMessage}</Text>
              </Box>
            )}

            <PizzaInput
              label="Nome Completo"
              type="text"
              value={formData.nome}
              onChange={handleInputChange("nome")}
              error={errors.nome}
              required
            />
            <PizzaInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              error={errors.email}
              required
            />
            <PizzaInput
              label="Telefone"
              type="tel"
              value={formData.telefone}
              onChange={handleInputChange("telefone")}
              placeholder="(11) 99999-9999"
              error={errors.telefone}
              maxLength={15}
              required
            />
            {/* Campo endereço removido - não será coletado no cadastro conforme documentação */}
            <PizzaInput
              label="Senha"
              type="password"
              value={formData.password}
              onChange={handleInputChange("password")}
              error={errors.password}
              required
            />
            <PizzaInput
              label="Confirmar Senha"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange("confirmPassword")}
              error={errors.confirmPassword}
              required
            />

            <PizzaButton
              type="submit"
              variant="solid"
              w="full"
              size={{ base: "md", md: "lg" }}
              disabled={loading}
              mt={2}
            >
              Cadastrar
            </PizzaButton>

            <Box textAlign="center" mt={2}>
              <Text
                fontSize="sm"
                color="gray.600"
                _dark={{ color: "gray.300" }}
              >
                Já tem uma conta?{" "}
                <Link href="/login">
                  <PizzaButton variant="outline" size={{ base: "xs", md: "sm" }} icon={FaSignInAlt} mx="auto" display="block">
                    Fazer login
                  </PizzaButton>
                </Link>
              </Text>
            </Box>
          </VStack>
        )}
      </Box>
    </motion.div>
  );
};

export default RegisterPage;
