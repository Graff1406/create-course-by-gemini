import { gTTS, Option } from '@services/googleTTS';
import { removeNonPunctuation } from '@utils/index';
import { InputFile } from 'grammy';

export const getAudioFileByText = async (
  text: string,
  options?: Option,
): Promise<InputFile | undefined> => {
  try {
    const audioBase64 =
      (await gTTS.getAllAudioBase64(removeNonPunctuation(text), options)) || [];
    const combinedBase64 = audioBase64.map((item) => item.base64).join('');
    const audioBuffer = Buffer.from(combinedBase64, 'base64');
    const file = new InputFile(audioBuffer, 'audio.mp3');
    return file;
  } catch (err) {
    console.log(err);
  }
};
