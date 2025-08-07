"use client";

import { useState, useEffect } from "react";
import { PizzaModal } from "../ui/PizzaModal";
import { PizzaFormCard } from "./PizzaFormCard";
import { validatePizzaData, validateImageFile } from "../../utils/validation";
import { createPizza, updatePizza } from "../../services/pizza-service";
import { Pizza, CreatePizzaWithImageData } from "../../types";

interface PizzaFormContainerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (pizza: Pizza) => void;
  pizzaToEdit?: Pizza | null;
}

export const PizzaFormContainer = ({
  isOpen,
  onClose,
  onSuccess,
  pizzaToEdit,
}: PizzaFormContainerProps) => {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const isEditing = !!pizzaToEdit;

  useEffect(() => {
    if (isOpen) {
      if (isEditing && pizzaToEdit) {
        setFormData({
          nome: pizzaToEdit.nome,
          descricao: pizzaToEdit.descricao,
          preco: String(pizzaToEdit.preco).replace(".", ","),
        });
        setImagePreview(pizzaToEdit.imagemUrl || null);
      } else {
        setFormData({ nome: "", descricao: "", preco: "" });
        setImagePreview(null);
      }
      setSelectedImage(null);
      setErrors({});
      setApiError(null);
    }
  }, [pizzaToEdit, isEditing, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file: File | null) => {
    setErrors((prev) => ({ ...prev, imagem: "" }));
    if (file) {
      const validation = validateImageFile(file);
      if (!validation.isValid) {
        setErrors((prev) => ({
          ...prev,
          imagem: validation.error || "Imagem inválida",
        }));
        return;
      }
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null); // <<<-- CORREÇÃO APLICADA AQUI
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setErrors({});

    const precoNumerico = parseFloat(formData.preco.replace(",", "."));
    const pizzaData = {
      nome: formData.nome,
      descricao: formData.descricao,
      preco: isNaN(precoNumerico) ? 0 : precoNumerico,
    };
    const validation = validatePizzaData(pizzaData);
    const imageError =
      !isEditing && !selectedImage ? "Uma imagem é obrigatória." : "";

    if (!validation.isValid || imageError) {
      const newErrors: { [key: string]: string } = {};
      validation.errors.forEach((err) => {
        newErrors[err.path as string] = err.message;
      });
      if (imageError) newErrors.imagem = imageError;
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      let result: Pizza;
      if (isEditing && pizzaToEdit) {
        const payload: Partial<CreatePizzaWithImageData> = pizzaData;
        if (selectedImage) payload.imagem = selectedImage;
        result = await updatePizza(pizzaToEdit.id, payload);
      } else {
        result = await createPizza({ ...pizzaData, imagem: selectedImage! });
      }
      onSuccess(result);
      onClose();
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "Ocorreu um erro desconhecido."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PizzaModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Editar Pizza" : "Cadastrar Nova Pizza"}
    >
      <PizzaFormCard
        formData={formData}
        errors={errors}
        imagePreview={imagePreview}
        isLoading={isLoading}
        apiError={apiError}
        isEditing={isEditing}
        onInputChange={handleInputChange}
        onImageChange={handleImageChange}
        onSubmit={handleSubmit}
        onImageRemove={handleRemoveImage}
        onCancel={onClose}
      />
    </PizzaModal>
  );
};
