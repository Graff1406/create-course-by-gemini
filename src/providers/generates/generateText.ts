import { getGemAIModel } from '../../config/genAI';

const model = getGemAIModel();

export default async (prompt: string): Promise<Result> => {
  try {
    const result = await model.generateContent(prompt);
    return {
      text: result.response.text(),
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      text: 'Something went wrong',
      status: 500,
    };
  }
};

// Types

type Result = {
  text: string;
  status: number;
};
