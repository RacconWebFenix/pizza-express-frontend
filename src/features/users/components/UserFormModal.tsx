// src/features/users/components/UserFormModal.tsx

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  VStack,
  HStack,
  Button,
  Text,
} from "@chakra-ui/react";
import { User } from "@/types/users";
import { PizzaInput, PizzaButton, AppModal } from "@/components/ui";
import { Role } from "@/types/users";
import { UserCreationData } from "../types/userManagement";

interface UserFormModalProps {
  isOpen: boolean;
  user?: User | null; // null = criar, User = editar
  onSubmit: (data: UserCreationData) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}

/**
 * Modal para criar/editar usuários
 * Usa react-hook-form + zod para validação
 * Segue padrão visual do projeto
 */
export const UserFormModal = ({
  isOpen,
  user,
  onSubmit,
  onClose,
  isLoading,
}: UserFormModalProps) => {
  // Schema de validação com Zod - criado dinamicamente baseado no modo
  const userFormSchema = z.object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email deve ter um formato válido"),
    telefone: z.string().regex(
      /^\(\d{2}\) \d{4,5}-\d{4}$/,
      "Telefone deve estar no formato (99) 99999-9999"
    ),
    role: z.nativeEnum(Role),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  }).refine((data) => {
    // Senha obrigatória apenas na criação
    if (!data.password && !user) {
      return false;
    }
    // Se senha fornecida, deve ter pelo menos 6 caracteres
    if (data.password && data.password.length < 6) {
      return false;
    }
    // Se confirmPassword fornecida, deve coincidir com password
    if (data.confirmPassword && data.password !== data.confirmPassword) {
      return false;
    }
    return true;
  }, {
    message: "Validação de senha falhou",
    path: ["password"],
  });

  type UserFormData = z.infer<typeof userFormSchema>;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      role: Role.FUNCIONARIO, // Default para criação
      password: "",
    },
  });

  // Preencher formulário quando editar
  useEffect(() => {
    if (user) {
      setValue("nome", user.nome);
      setValue("email", user.email);
      setValue("telefone", user.telefone);
      setValue("role", user.role);
      // Não preenche senha na edição
    } else {
      reset({
        nome: "",
        email: "",
        telefone: "",
        role: Role.FUNCIONARIO,
        password: "",
      });
    }
  }, [user, setValue, reset]);

  const onFormSubmit = async (data: UserFormData) => {
    const submitData: UserCreationData = {
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      role: data.role,
      password: data.password || "", // Senha obrigatória na criação
    };

    await onSubmit(submitData);
  };

  const title = user ? "Editar Usuário" : "Criar Usuário";
  const submitLabel = user ? "Salvar Alterações" : "Criar Usuário";

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <Box as="form" onSubmit={handleSubmit(onFormSubmit)}>
        <VStack gap={4} align="stretch">
          <PizzaInput
            label="Nome Completo"
            {...register("nome")}
            error={errors.nome?.message}
            placeholder="Digite o nome completo"
          />

          <PizzaInput
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            placeholder="Digite o email"
          />

          <PizzaInput
            label="Telefone"
            {...register("telefone")}
            error={errors.telefone?.message}
            placeholder="(99) 99999-9999"
          />

          <Box>
            <Text mb={2} fontSize="sm" fontWeight="medium">
              Função
            </Text>
            <select
              {...register("role")}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #E2E8F0",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "white",
              }}
            >
              <option value={Role.FUNCIONARIO}>Funcionário</option>
              <option value={Role.ADMIN}>Administrador</option>
              {user?.role === Role.CLIENTE && (
                <option value={Role.CLIENTE}>Cliente</option>
              )}
            </select>
            {errors.role && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {errors.role.message}
              </Text>
            )}
          </Box>

          {!user && (
            <PizzaInput
              label="Senha"
              type="password"
              {...register("password")}
              error={errors.password?.message}
              placeholder="Digite uma senha"
            />
          )}

          <HStack justify="flex-end" gap={3} pt={4}>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <PizzaButton type="submit" loading={isLoading}>
              {submitLabel}
            </PizzaButton>
          </HStack>
        </VStack>
      </Box>
    </AppModal>
  );
};