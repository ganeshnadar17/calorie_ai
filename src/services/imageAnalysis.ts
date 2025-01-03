import { HfInference } from '@huggingface/inference';
import { HF_TOKEN, MODEL_ID } from '../config/huggingface';
import { estimateMacros } from './macroEstimator';

const hf = new HfInference(HF_TOKEN);

export async function analyzeFoodImage(base64Image: string) {
  try {
    const response = await fetch(base64Image);
    const blob = await response.blob();

    const result = await hf.imageToText({
      model: MODEL_ID,
      data: blob,
    });

    const description = result.generated_text;
    const macros = estimateMacros(description);

    return {
      description,
      macros
    };
  } catch (error: any) {
    console.error('Hugging Face API Error:', error);
    throw new Error(error.message || 'Error analyzing image');
  }
}