import { Bot, InlineKeyboard } from 'grammy';

export const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN || '');

bot.start();

export const createInlineKeyboard = (buttons: string[][]) => {
  const labelDataPairs = buttons;
  const buttonRow = labelDataPairs.map(([label, data]) =>
    InlineKeyboard.text(label, data),
  );
  const keyboard = InlineKeyboard.from([buttonRow]);
  return keyboard;
};
