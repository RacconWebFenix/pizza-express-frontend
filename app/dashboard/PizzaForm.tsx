// "use client";

// import { useState, useEffect } from "react";

// import { validatePizzaData, validateImageFile } from "../../utils/validation";
// import { createPizza, updatePizza } from "../../services/pizza-service";
// import { Pizza, CreatePizzaWithImageData } from "../../types";


// interface PizzaFormProps {
//   pizzaToEdit?: Pizza | null;
//   onSuccess: (pizza: Pizza) => void;
//   onCancel: () => void;
// }

// export const PizzaForm = ({
//   pizzaToEdit,
//   onSuccess,
//   onCancel,
// }: PizzaFormProps) => {
//   const [formData, setFormData] = useState({
//     nome: "",
//     descricao: "",
//     preco: "",
//   });
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [errors, setErrors] = useState({
//     nome: "",
//     descricao: "",
//     preco: "",
//     imagem: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [apiError, setApiError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const isEditing = !!pizzaToEdit;

//   useEffect(() => {
//     if (isEditing && pizzaToEdit) {
//       setFormData({
//         nome: pizzaToEdit.nome,
//         descricao: pizzaToEdit.descricao,
//         preco: String(pizzaToEdit.preco),
//       });
//       setImagePreview(pizzaToEdit.imagemUrl || pizzaToEdit.imagem || null);
//     }
//   }, [isEditing, pizzaToEdit]);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (file: File | null) => {
//     if (file) {
//       const validation = validateImageFile(file);
//       if (!validation.isValid) {
//         setErrors((prev) => ({
//           ...prev,
//           imagem: validation.error || "Imagem inválida",
//         }));
//         return;
//       }
//       setSelectedImage(file);
//       setImagePreview(URL.createObjectURL(file));
//       setErrors((prev) => ({ ...prev, imagem: "" }));
//     } else {
//       setSelectedImage(null);
//       setImagePreview(null);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setApiError(null);

//     const pizzaDataForValidation = {
//       nome: formData.nome,
//       descricao: formData.descricao,
//       preco: parseFloat(formData.preco.replace(",", ".")),
//     };

//     const { isValid, errors: validationErrors } = validatePizzaData(
//       pizzaDataForValidation
//     );

//     let imageError = "";
//     if (!isEditing && !selectedImage) {
//       imageError = "Uma imagem é obrigatória para criar uma nova pizza.";
//     }

//     if (!isValid || imageError) {
//       setErrors({
//         nome:
//           validationErrors.find((err) => err.toLowerCase().includes("nome")) ||
//           "",
//         descricao:
//           validationErrors.find((err) =>
//             err.toLowerCase().includes("descri")
//           ) || "",
//         preco:
//           validationErrors.find((err) => err.toLowerCase().includes("preço")) ||
//           "",
//         imagem: imageError,
//       });
//       setIsLoading(false);
//       return;
//     }

//     try {
//       let resultPizza;
//       if (isEditing && pizzaToEdit) {
//         const dataToUpdate: Partial<CreatePizzaWithImageData> = {
//           ...pizzaDataForValidation,
//         };
//         if (selectedImage) dataToUpdate.imagem = selectedImage;
//         resultPizza = await updatePizza(pizzaToEdit.id, dataToUpdate);
//       } else {
//         resultPizza = await createPizza({
//           ...pizzaDataForValidation,
//           imagem: selectedImage!,
//         });
//       }
//       onSuccess(resultPizza);
//     } catch (error) {
//       setApiError(
//         error instanceof Error ? error.message : "Ocorreu um erro desconhecido."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <PizzaFormPresentation
//       formData={formData}
//       errors={errors}
//       selectedImage={selectedImage}
//       imagePreview={imagePreview}
//       isModalOpen={isModalOpen}
//       isLoading={isLoading}
//       error={apiError}
//       onInputChange={handleInputChange}
//       onImageChange={handleImageChange}
//       onSubmit={handleSubmit}
//       onModalOpen={() => setIsModalOpen(true)}
//       onModalClose={() => setIsModalOpen(false)}
//       onImageRemove={() => {
//         setSelectedImage(null);
//         setImagePreview(null);
//       }}
//       onCancel={onCancel}
//     />
//   );
// };
