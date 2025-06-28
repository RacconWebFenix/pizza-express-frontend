/* 
  EXEMPLO DE USO - Componente para criar pizza com imagem
  
  Este arquivo demonstra como usar as novas funcionalidades de upload de imagem
  para pizzas. Pode ser usado como referência para implementar formulários.
*/

"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { usePizzaActions } from "@/hooks/usePizzaActions";
import type { Pizza } from "@/types";

// Exemplo de interface para o componente
interface CreatePizzaWithImageFormProps {
  onSuccess?: (pizza: Pizza) => void;
  onCancel?: () => void;
}

export const CreatePizzaWithImageForm: React.FC<
  CreatePizzaWithImageFormProps
> = ({ onSuccess, onCancel }) => {
  const { createWithImage, isLoading, error, clearError } = usePizzaActions();

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpar erro quando usuário começar a digitar
    if (error) clearError();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedImage(file);

      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setImagePreview(null);
    }

    // Limpar erro quando usuário selecionar arquivo
    if (error) clearError();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedImage) {
      alert("Por favor, selecione uma imagem");
      return;
    }

    try {
      const pizzaData = {
        nome: formData.nome,
        descricao: formData.descricao,
        preco: parseFloat(formData.preco),
        imagem: selectedImage,
      };

      const result = await createWithImage(pizzaData);

      if (result) {
        alert("Pizza criada com sucesso!");

        // Resetar formulário
        setFormData({ nome: "", descricao: "", preco: "" });
        setSelectedImage(null);
        setImagePreview(null);

        // Callback de sucesso
        if (onSuccess) onSuccess(result);
      }
    } catch (err) {
      console.error("Erro ao criar pizza:", err);
      // O erro já é tratado pelo hook usePizzaActions
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Criar Pizza com Imagem
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Nome */}
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nome da Pizza*
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Pizza Margherita"
          />
        </div>

        {/* Campo Descrição */}
        <div>
          <label
            htmlFor="descricao"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Descrição*
          </label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descreva os ingredientes e características da pizza"
          />
        </div>

        {/* Campo Preço */}
        <div>
          <label
            htmlFor="preco"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Preço (R$)*
          </label>
          <input
            type="number"
            id="preco"
            name="preco"
            value={formData.preco}
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="25.90"
          />
        </div>

        {/* Campo Imagem */}
        <div>
          <label
            htmlFor="imagem"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Imagem da Pizza*
          </label>
          <input
            type="file"
            id="imagem"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleImageChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Formatos aceitos: JPG, PNG, WEBP. Tamanho máximo: 5MB
          </p>
        </div>

        {/* Preview da Imagem */}
        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
            <div className="relative w-full h-48 rounded-md border overflow-hidden">
              <Image
                src={imagePreview}
                alt="Preview da pizza"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Botões */}
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Criando..." : "Criar Pizza"}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

/* 
  EXEMPLO DE USO DO COMPONENTE:

  import { CreatePizzaWithImageForm } from './CreatePizzaWithImageForm';

  function MyPage() {
    const handleSuccess = (pizza) => {
      console.log('Pizza criada:', pizza);
      // Redirecionar, atualizar lista, etc.
    };

    const handleCancel = () => {
      // Voltar para lista, fechar modal, etc.
    };

    return (
      <CreatePizzaWithImageForm 
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    );
  }
*/
