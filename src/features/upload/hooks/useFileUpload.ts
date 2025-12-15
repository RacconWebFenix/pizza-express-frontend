import { useState, useCallback } from "react";
import { UploadResult, UploadProgress, UploadOptions } from "@/types/upload";
import { uploadPizzaImage, uploadFile } from "../services/uploadService";

interface UseFileUploadReturn {
  upload: (file: File, pizzaId?: string) => Promise<UploadResult>;
  isUploading: boolean;
  progress: UploadProgress | null;
  error: string | null;
  reset: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useFileUpload = (
  _options: UploadOptions = {}
): UseFileUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setIsUploading(false);
    setProgress(null);
    setError(null);
  }, []);

  const upload = useCallback(
    async (file: File, pizzaId?: string): Promise<UploadResult> => {
      setIsUploading(true);
      setError(null);

      try {
        if (pizzaId) {
          // Upload para pizza específica
          const result = await uploadPizzaImage(pizzaId, file);
          return result;
        } else {
          // Upload genérico (futuro)
          const result = await uploadFile(file, "/upload");
          return result;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro desconhecido no upload";
        setError(errorMessage);
        throw err;
      } finally {
        setIsUploading(false);
      }
    },
    []
  );

  return {
    upload,
    isUploading,
    progress,
    error,
    reset,
  };
};
