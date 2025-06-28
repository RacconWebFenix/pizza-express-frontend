/* 
  EXEMPLO DE USO - Componente para fazer upload de imagem para pizza existente
  
  Este arquivo demonstra como usar a funcionalidade de upload de imagem
  para pizzas que já existem no sistema.
*/

"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { usePizzaActions } from "@/hooks/usePizzaActions";
import type { Pizza } from "@/types";

interface UploadImageToPizzaProps {
  pizza: Pizza;
  onSuccess?: (updatedPizza: Pizza) => void;
  onCancel?: () => void;
}

export const UploadImageToPizza: React.FC<UploadImageToPizzaProps> = ({
  pizza,
  onSuccess,
  onCancel,
}) => {
  const { uploadImage, isLoading, error, clearError, validateImage } =
    usePizzaActions();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Validar arquivo antes de continuar
      const validation = validateImage(file);
      if (!validation.isValid) {
        alert(validation.error);
        return;
      }

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

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Por favor, selecione uma imagem");
      return;
    }

    try {
      const result = await uploadImage(pizza.id, selectedImage);

      if (result) {
        alert("Imagem enviada com sucesso!");

        // Resetar seleção
        setSelectedImage(null);
        setImagePreview(null);

        // Callback de sucesso
        if (onSuccess) onSuccess(result);
      }
    } catch (err) {
      console.error("Erro ao fazer upload:", err);
      // O erro já é tratado pelo hook usePizzaActions
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Adicionar Imagem</h2>

      {/* Informações da Pizza */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-lg">{pizza.nome}</h3>
        <p className="text-gray-600 text-sm mt-1">{pizza.descricao}</p>
        <p className="text-green-600 font-semibold mt-2">
          R$ {pizza.preco.toFixed(2)}
        </p>

        {/* Imagem atual */}
        {pizza.imagemUrl && (
          <div className="mt-3">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Imagem atual:
            </p>
            <div className="relative w-full h-32 rounded-md border overflow-hidden">
              <Image
                src={pizza.imagemUrl}
                alt={pizza.nome}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Seleção de Arquivo */}
      <div className="space-y-4">
        <div>
          <label
            htmlFor="imagem"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nova Imagem*
          </label>
          <input
            type="file"
            id="imagem"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Formatos aceitos: JPG, PNG, WEBP. Tamanho máximo: 5MB
          </p>
        </div>

        {/* Preview da Nova Imagem */}
        {imagePreview && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Nova imagem:
            </p>
            <div className="relative w-full h-48 rounded-md border overflow-hidden">
              <Image
                src={imagePreview}
                alt="Preview da nova imagem"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Botões */}
        <div className="flex space-x-3 pt-4">
          <button
            onClick={handleUpload}
            disabled={isLoading || !selectedImage}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Enviando..." : "Enviar Imagem"}
          </button>

          {onCancel && (
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* 
  EXEMPLO DE USO DO COMPONENTE:

  import { UploadImageToPizza } from './UploadImageToPizza';

  function MyPage() {
    const pizza = {
      id: "1",
      nome: "Pizza Margherita",
      descricao: "Molho de tomate, mussarela e manjericão",
      preco: 25.90,
      imagemUrl: "https://exemplo.com/imagem-atual.jpg" // opcional
    };

    const handleSuccess = (updatedPizza) => {
      console.log('Imagem atualizada:', updatedPizza);
      // Atualizar estado, redirecionar, etc.
    };

    const handleCancel = () => {
      // Voltar para lista, fechar modal, etc.
    };

    return (
      <UploadImageToPizza 
        pizza={pizza}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    );
  }
*/
