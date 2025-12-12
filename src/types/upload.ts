// Types para Upload de Arquivos
export interface UploadResult {
  url: string;
  publicId: string;
  filename: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface UploadOptions {
  onProgress?: (progress: UploadProgress) => void;
  maxSize?: number;
  acceptedTypes?: string[];
}

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}