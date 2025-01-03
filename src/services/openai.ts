import OpenAI from 'openai';
import { OPENAI_API_KEY, SYSTEM_PROMPT } from '../config/openai';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
  baseURL: 'https://api.openai.com/v1'
});

export async function analyzeFoodImage(base64Image: string) {
  const imageContent = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Updated to use GPT-3.5-turbo
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: `Analyze this food image and provide nutritional information. Image: data:image/jpeg;base64,${imageContent}`
        }
      ],
      max_tokens: 500
    });

    if (!response.choices[0]?.message?.content) {
      throw new Error('No response content from OpenAI');
    }

    const result = JSON.parse(response.choices[0].message.content);
    return result;
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    throw new Error(error.message || 'Error analyzing image');
  }
}