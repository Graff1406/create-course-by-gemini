export * from './courseSchema';

export const AVOID_FORMAT_MARKDOWN_V2 =
  'Make sure that your response does not include any MarkdownV2 formatting, such as special characters or markup.';

export const PROVIDE_DETAILED_ANSWER =
  'When providing answers, always strive to be as detailed and comprehensive as possible. Ensure that the response is thorough, addresses the question fully, and includes any relevant context or examples. This field must not be left empty and should contain meaningful and relevant information.';

export const UNEXPECTED_SITUATION =
  'Well, an unexpected situation has occurred. Please repeat your last request!';

export const RESPONSE_LANG =
  'Respond in the language specified by the "language" property, regardless of the language of the query. Ensure that your response matches the language code provided.';

export const NATIONALITY_LANGUAGE_CODE =
  "Identify the national language code based on the text provided in a specific language. Analyze the language of the given text and return its corresponding ISO 639-1 code (e.g., 'en' for English, 'es' for Spanish, 'fr' for French). Ensure the code accurately represents the primary language of the text";
