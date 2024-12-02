import bot from '../config/bot';
import { generateText } from '../providers/generates';
bot.on('message', async (ctx) => {
  const message = ctx.message.text || '';
  const result = await generateText(message);

  ctx.reply(result.text, {
    parse_mode: 'Markdown',
  });
});
