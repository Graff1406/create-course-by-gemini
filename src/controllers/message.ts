import { bot, createInlineKeyboard } from '@providers/index';
import {
  RESPONSE_LANG,
  AVOID_FORMAT_MARKDOWN_V2,
  UNEXPECTED_SITUATION,
  DETECT_COURSE_REQUEST_PROMPT,
} from '@prompts/index';
import { generateText, generateTextChatMode } from '@services/generators';
import { escapeSpecialCharacters } from '@utils/index';
import {
  addChat,
  addMessage,
  getMessages,
  addQueryButtonToChat,
  Result,
} from '@models/index';

import { SchemaType } from '@google/generative-ai';

// Import necessary types for type annotations
import { Context } from 'grammy';

// Function to handle incoming messages
const handleMessage = async (ctx: Context): Promise<void> => {
  const message: string = ctx?.message?.text ?? ''; // Extract the text message
  const chatId: number = ctx?.chatId ?? 0;

  addChat(chatId);
  addMessage(chatId, 'user', message);

  try {
    // Generate a response based on the user's message
    const result = await generateResponse(chatId, message);

    // Check if the response status is successful
    if (result.status === 200) {
      await handleSuccessfulResponse(ctx, chatId, result);
    } else {
      ctx.reply(UNEXPECTED_SITUATION);
    }
  } catch (err) {
    await handleError(ctx, message, err);
  }
};

// Function to generate a response from the model
const generateResponse = async (
  chatId: number,
  message: string,
): Promise<GenerateTextChatModeResponse> => {
  const ResponseSchema = {
    required: ['response', 'language', 'courseTopic'],
    type: SchemaType.OBJECT,
    properties: {
      language: { type: SchemaType.STRING },
      response: { type: SchemaType.STRING },
      courseTopic: { type: SchemaType.STRING, nullable: true },
    },
  };

  // Call the generateTextChatMode function with the appropriate parameters
  const result = await generateTextChatMode<GenerateTextChatModeResponse>({
    prompt: `${RESPONSE_LANG}\n\n${DETECT_COURSE_REQUEST_PROMPT}\n\n${message}`,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: ResponseSchema,
    },
    history: getMessages(chatId),
  });

  // Return the data in the expected format
  return result.data;
};

// Function to handle successful responses
const handleSuccessfulResponse = async (
  ctx: Context,
  chatId: number,
  result: GenerateTextChatModeResponse,
): Promise<void> => {
  addMessage(chatId, 'model', result.data.response);

  const courseTopicIsCreated: boolean = Boolean(result.data.courseTopic);
  if (courseTopicIsCreated) {
    addQueryButtonToChat(chatId, 'create-course', result.data.courseTopic);
  }

  await ctx
    .reply(escapeSpecialCharacters(result.data.response), {
      parse_mode: 'MarkdownV2',
      reply_markup: courseTopicIsCreated
        ? createInlineKeyboard([['Create Course', 'create-course']])
        : undefined,
    })
    .catch((err) => console.log(err));
};

// Function to handle errors
const handleError = async (
  ctx: Context,
  message: string,
  err: { error_code: number } | any,
): Promise<void> => {
  if (err?.error_code === 400) {
    setTimeout(async () => {
      try {
        const result: Result = await generateText({
          prompt: `${AVOID_FORMAT_MARKDOWN_V2}\n\n${message}`,
        });
        ctx.reply(escapeSpecialCharacters(result.data.text));
      } catch (error) {
        console.log(error);
      }
    }, 500);
  } else {
    console.log(err);
    ctx.reply(UNEXPECTED_SITUATION);
  }
};

// Main message handler for the bot
bot.on('message', handleMessage);

export interface GenerateTextChatModeResponse extends Result {
  response: string;
  language: string;
  courseTopic: string | null;
}
