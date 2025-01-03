import { MAX_IMAGE_SIZE, SUPPORTED_FORMATS } from '../config/huggingface';

export function validateImage(file: File): void {
  if (!SUPPORTED_FORMATS.includes(file.type)) {
    throw new Error('Unsupported file format. Please upload a JPEG or PNG image.');
  }
  
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('Image size too large. Maximum size is 10MB.');
  }
}