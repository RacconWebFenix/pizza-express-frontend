"use client";

import { useEffect, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    pizzaFormSchema,
    PizzaFormInputData,
    PizzaFormOutputData,
} from "@/utils/validation";
import { PizzaFormPresentation } from "@/components/ui/PizzaFormPresentation";
import { CreatePizzaWithImageData, Pizza } from "@/types/pizzas";
import { AppModal } from "@/components/ui/AppModal";

interface CreatePizzaContainerProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: CreatePizzaWithImageData, pizzaId?: number) => void;
    pizzaToEdit: Pizza | null;
    isLoading?: boolean;
    apiError: string | null;
}

export const CreatePizzaContainer = ({
    isOpen,
    onClose,
    onSuccess,
    pizzaToEdit,
    isLoading,
    apiError,
}: CreatePizzaContainerProps) => {
    // Use generic arguments for useForm to allow type transformation between input and output
    const form = useForm<PizzaFormInputData, unknown, PizzaFormOutputData>({
        resolver: zodResolver(pizzaFormSchema),
        mode: "onChange",
        defaultValues: {
            nome: "",
            descricao: "",
            preco: "",
            // image defaulted to undefined
        },
    });

    const { reset, watch, formState } = form;
    const { isSubmitting } = formState;

    // Reset form when modal opens or pizzaToEdit changes
    useEffect(() => {
        if (isOpen) {
            if (pizzaToEdit) {
                reset({
                    nome: pizzaToEdit.nome,
                    descricao: pizzaToEdit.descricao || "",
                    preco: String(pizzaToEdit.preco),
                    // image kept undefined for edit mode
                });
            } else {
                reset({
                    nome: "",
                    descricao: "",
                    preco: "",
                    image: undefined
                });
            }
        }
    }, [isOpen, pizzaToEdit, reset]);

    const processSubmit: SubmitHandler<PizzaFormOutputData> = async (data) => {
        // data is PizzaFormOutputData (preco is number)

        // Validate that image matches expectation. 
        // Schema defines image as specific refine logic. output is passed through.
        // If output.image is an array (from PizzaFileField logic), we take first element.
        // We use 'as unknown' to safely inspect the shape without assuming incorrect types from loose inference.
        // We know PizzaFileField populates it as File[] usually, but schema output typing might say 'any'.
        // We identify the image manually to ensure type safety.

        const outputImage = data.image as unknown;

        let imageFile: File | undefined = undefined;

        if (Array.isArray(outputImage) && outputImage.length > 0 && outputImage[0] instanceof File) {
            imageFile = outputImage[0];
        } else if (outputImage instanceof FileList && outputImage.length > 0) {
            imageFile = outputImage[0];
        }

        const dataToSend: CreatePizzaWithImageData = {
            ...data,
            image: imageFile,
        };

        if (onSuccess) { // Check if defined (it is required but good practice)
            await onSuccess(dataToSend, pizzaToEdit?.id);
        }
    };

    // Preview Logic
    const watchedValues = watch();

    const previewPizza: Pizza = useMemo(() => {
        const precoVal = watchedValues.preco; // string | number | undefined

        // Handle coercion safely
        let precoStr = "0";
        if (typeof precoVal === 'number') {
            precoStr = String(precoVal);
        } else if (typeof precoVal === 'string') {
            precoStr = precoVal;
        }

        const preco = parseFloat(precoStr);

        // Handle image preview
        let imagePreview: string | null = null;
        const imgVal = watchedValues.image as unknown;

        if (Array.isArray(imgVal) && imgVal.length > 0) {
            const file = imgVal[0];
            if (file instanceof File) {
                imagePreview = URL.createObjectURL(file);
            }
        } else if (pizzaToEdit?.image) {
            imagePreview = pizzaToEdit.image;
        }

        return {
            id: pizzaToEdit?.id || 0,
            nome: watchedValues.nome || "Nome da Pizza",
            descricao: watchedValues.descricao || "Descrição da pizza aparecerá aqui...",
            preco: isNaN(preco) ? 0 : preco,
            image: imagePreview,
            createdAt: pizzaToEdit?.createdAt || new Date().toISOString(),
            updatedAt: pizzaToEdit?.updatedAt || new Date().toISOString(),
        };
    }, [watchedValues, pizzaToEdit]);

    return (
        <AppModal
            isOpen={isOpen}
            onClose={onClose}
            title={pizzaToEdit ? "Editar Pizza" : "Nova Pizza"}
        >
            <PizzaFormPresentation
                form={form}
                onSubmit={processSubmit}
                isSubmitting={isSubmitting || !!isLoading}
                apiError={apiError}
                previewPizza={previewPizza}
                onCancel={onClose}
                isEditing={!!pizzaToEdit}
            />
        </AppModal>
    );
};
