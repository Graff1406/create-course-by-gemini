export const escapeMarkdownV2 = (text: string): string => {
  return text
    .replace(/\* \*\*/g, '*')
    .replace(/\*\*/g, '*')
    .replace(/([_\[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
};
