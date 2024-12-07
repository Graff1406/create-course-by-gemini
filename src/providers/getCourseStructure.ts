import { generateText } from '@services/generators';
import { Result } from '@models/index';

import {
  RESPONSE_LANG,
  NATIONALITY_LANGUAGE_CODE,
  DESCRIPTION_SEGMENTS,
} from '@prompts/index';
import { SchemaType } from '@google/generative-ai';

const ResponseSchema = {
  type: SchemaType.OBJECT,
  required: ['course', 'language'],
  properties: {
    language: {
      type: SchemaType.STRING,
      description: NATIONALITY_LANGUAGE_CODE,
      nullable: false,
    },
    course: {
      type: SchemaType.OBJECT,
      nullable: false,
      required: ['title', 'segments'],
      properties: {
        title: {
          type: SchemaType.STRING,
          nullable: false,
        },
        segments: {
          type: SchemaType.ARRAY,
          nullable: false,
          items: {
            type: SchemaType.OBJECT,
            required: ['title', 'topics'],
            properties: {
              title: {
                type: SchemaType.STRING,
                nullable: false,
              },
              topics: {
                type: SchemaType.ARRAY,
                nullable: false,
                items: {
                  type: SchemaType.STRING,
                  nullable: false,
                },
              },
            },
          },
        },
      },
    },
  },
};

function formatSegmentsToMarkdownV2(
  segments: { title: string; topics: string[] }[],
): string {
  return segments
    .map((segment) => {
      const formattedTitle = `\n\*${escapeMarkdown(segment.title)}\*\n`;

      const formattedTopics = segment.topics
        .sort()
        .map((topic, i) => `${++i} ${escapeMarkdown(topic)}\n`)
        .join('\n');

      return `${formattedTitle}\n${formattedTopics}`;
    })
    .join('\n\n');
}

function escapeMarkdown(text: string): string {
  const specialChars = /[_*[\]()~`>#+-=|{}!]/g;
  return text.replace(specialChars, (match) => `\\${match}`);
}

export const getCourseStructure = async (message: string): Promise<Schema> => {
  try {
    const result = await generateText<ResultBySchema>({
      prompt: RESPONSE_LANG + '\n\n' + DESCRIPTION_SEGMENTS + '\n\n' + message,
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: ResponseSchema,
      },
    });

    const segments = result.data.course.segments;
    const combinedSegments = formatSegmentsToMarkdownV2(segments);

    return {
      ...result,
      data: {
        ...result.data,
        combinedSegments,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      data: error,
      status: 500,
    };
  }
};

type Schema = (ResultBySchema & Result) | Result;

interface ResultBySchema {
  language: string;
  course: { title: string; segments: [{ title: string; topics: string[] }] };
  combinedSegments: string;
}
