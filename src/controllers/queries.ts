import { bot, getCourseStructure, getAudioFileByText } from '@providers/index';
import {
  RESPONSE_LANG,
  INFO_REQUIRED,
  UNEXPECTED_SITUATION,
} from '@prompts/index';
import { generateText } from '@services/generators';
import { escapeSpecialCharacters } from '@utils/index';
import { getQueryButtonFromChat, Result } from '@models/index';

bot.callbackQuery('create-course', async (ctx) => {
  const matchString = Array.isArray(ctx.match) ? ctx.match[0] : ctx.match;
  const chatId = ctx.chatId ?? 0;
  const query = getQueryButtonFromChat(chatId, matchString);

  if (query?.data === undefined) {
    ctx.reply(UNEXPECTED_SITUATION);
    return;
  }

  const { data, status } = await getCourseStructure(query.data);

  if (status === 200) {
    await ctx
      .reply(escapeSpecialCharacters(data.combinedSegments), {
        parse_mode: 'MarkdownV2',
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const segments = data.course.segments;

  let preTopic = '';

  for (const segment of segments) {
    const { title, topics } = segment;
    for (const topic of topics) {
      const topicResult: Result = await generateText({
        prompt: `${RESPONSE_LANG}.
                ${INFO_REQUIRED}.
                Conditions: exclude from the answer anything related to the previous topic.
                Previous topic: ${preTopic}
                Title of topic: ${title}
                Topic for reply: ${topic}`,
      });

      preTopic = topicResult.data;

      const file = await getAudioFileByText(topicResult.data, {
        lang: data.language,
      });

      if (file) {
        await ctx
          .replyWithVoice(file, {
            caption: topic,
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
});
