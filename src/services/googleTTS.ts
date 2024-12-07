import * as googleTTS from 'google-tts-api';

const defaultOptions: Option = {
  lang: 'ru',
  slow: false,
  host: 'https://translate.google.com',
  timeout: 30000,
};

const getAudioBase64 = async (text: string, options = {}): Promise<string> => {
  try {
    return await googleTTS.getAudioBase64(text, options);
  } catch (err) {
    throw new Error(String(err));
  }
};

const getAllAudioBase64 = async (
  text: string,
  options = defaultOptions,
): Promise<GetAllAudioBase64[]> => {
  try {
    return await googleTTS.getAllAudioBase64(text, {
      ...defaultOptions,
      ...options,
    });
  } catch (err) {
    console.log(err);
    throw new Error(String(err));
  }
};

export const gTTS = {
  getAudioBase64,
  getAllAudioBase64,
};

export interface Option {
  lang?: string;
  slow?: false;
  host?: string;
  timeout?: number;
}

interface GetAllAudioBase64 {
  shortText: string;
  base64: string;
}
