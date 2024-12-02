import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export const getGemAIModel = (
  model: Model = 'gemini-1.5-flash',
  options?: ModelOptions,
) => genAI.getGenerativeModel({ model, generationConfig: options });

interface ModelOptions {
  maxOutputTokens: number;
  temperature: ValidTemperatureNumber;
}

type Model =
  | 'gemini-1.5-flash'
  | 'gemini-1.5-flash-8b'
  | 'gemini-1.5-pro'
  | 'text-embedding-004';

type ValidTemperatureNumber =
  | 0.1
  | 0.2
  | 0.3
  | 0.4
  | 0.5
  | 0.6
  | 0.7
  | 0.8
  | 0.9
  | 1.0
  | 1.1
  | 1.2
  | 1.3
  | 1.4
  | 1.5
  | 1.6
  | 1.7
  | 1.8
  | 1.9
  | 2.0;
