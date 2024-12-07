interface MessagePart {
  text: string;
}

interface Chat {
  id: number;
  messages: { role: string; parts: MessagePart[] }[];
  queryButtons: {
    queryId: string;
    data: string;
  }[];
}

export const chats: Chat[] = [];

// Chats

export const addChat = (id: number): void => {
  if (chats.find((chat) => chat.id === id)) {
    console.error('Chat with this ID already exists.');
    return;
  }
  chats.push({
    id,
    messages: [],
    queryButtons: [],
  });
};

export const getChatById = (chatId: number): Chat | undefined => {
  return chats.find((c) => c.id === chatId);
};

export const deleteChat = (chatId: number): void => {
  const index = chats.findIndex((chat) => chat.id === chatId);
  if (index === -1) {
    console.error('Chat not found.');
    return;
  }
  chats.splice(index, 1);
};

export const listChatIds = (): number[] => {
  return chats.map((chat) => chat.id);
};

export const resetChats = (): void => {
  chats.length = 0;
  console.log('All chats have been reset.');
};

// Messages

export const addMessage = (
  chatId: number,
  role: string,
  message: string,
): void => {
  const chat = chats.find((chat) => chat.id === chatId);
  if (!chat) {
    console.error('Chat not found.');
    return;
  }

  const messageParts = [{ text: message }];
  chat.messages.push({ role, parts: messageParts });
};

export const getMessages = (
  chatId: number,
): { role: string; parts: MessagePart[] }[] | undefined => {
  const chat = chats.find((chat) => chat.id === chatId);
  if (!chat) {
    console.error('Chat not found.');
    return;
  }
  return chat.messages;
};

export const removeMessageFromChat = (
  chatId: number,
  messageIndex: number,
): void => {
  const chat = chats.find((c) => c.id === chatId);
  if (chat && chat.messages[messageIndex]) {
    chat.messages.splice(messageIndex, 1);
  } else {
    console.error(`Chat or message not found for chat ID ${chatId}`);
  }
};

// Query Buttons

export const addQueryButtonToChat = (
  chatId: number,
  queryId: string,
  data: string,
): void => {
  console.error(`Chat with ID ${chatId} not found`);
  const chat = chats.find((c) => c.id === chatId);
  if (chat) {
    chat.queryButtons.push({ queryId, data });
  } else {
    console.error(`Chat with ID ${chatId} not found`);
  }
};

export const getQueryButtonFromChat = (
  chatId: number,
  queryId: string,
): { queryId: string; data: string } | undefined => {
  const chat = chats.find((c) => c.id === chatId);
  if (chat) {
    return chat.queryButtons.find((button) => button.queryId === queryId);
  }
  return undefined;
};

export const deleteQueryButtonFromChat = (
  chatId: number,
  queryId: string,
): void => {
  const chat = chats.find((c) => c.id === chatId);
  if (chat) {
    const buttonIndex = chat.queryButtons.findIndex(
      (button) => button.queryId === queryId,
    );
    if (buttonIndex !== -1) {
      chat.queryButtons.splice(buttonIndex, 1);
    } else {
      console.error(`Button with queryId ${queryId} not found`);
    }
  } else {
    console.error(`Chat with ID ${chatId} not found`);
  }
};

const USER_DATA_TIMEOUT = 1 * 24 * 60 * 60 * 1000; // a day
setInterval(resetChats, USER_DATA_TIMEOUT);
