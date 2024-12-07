export const removeNonPunctuation = (text: string): string => {
  return text.replace(/[*#@$/^+-=&`~><{}[]\'\"\№]/g, '');
};
