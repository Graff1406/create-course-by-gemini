export const escapeSpecialCharacters = (text: string): string => {
  return text.replace(/[_[\]()~`>#+\-=|{}.!]/g, '\\$1');
};
