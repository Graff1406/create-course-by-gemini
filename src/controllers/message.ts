import bot from '@providers/bot';
import { generateText } from '@services/generates';
bot.on('message', async (ctx) => {
  const message = ctx.message.text || '';
  const result = await generateText(message);

  ctx.reply(result.text, {
    parse_mode: 'Markdown',
  });
});
