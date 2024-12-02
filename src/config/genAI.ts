import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export type Model =
  | 'gemini-1.5-flash'
  | 'gemini-1.5-flash-8b'
  | 'gemini-1.5-pro'
  | 'text-embedding-004';

export const getGemAIModel = (model: Model = 'gemini-1.5-flash') =>
  genAI.getGenerativeModel({ model });
