# Telegram Course Creation Bot with Gemini AI

This project is a **Telegram bot** that allows users to create personalized courses on topics they define. The bot uses the **Grammy framework** for interacting with Telegram, and the **Gemini AI** model for course generation.

The bot follows a multi-step process:

1. **Course Structure Generation**: The bot first generates a structure based on the user's topic.
2. **Subtopics Generation**: After that, it generates subtopics related to the course.
3. **Content Generation**: Then, for each subtopic, the bot generates content under specific headings.
4. **Voice Conversion**: The generated text is converted into speech using AI-powered text-to-speech (TTS) technology.
5. **Voice Message**: Finally, the bot sends the generated content as a voice message to the user.

## Features:

- Telegram integration using the **Grammy framework**.
- AI-powered course content generation using **Gemini AI**.
- Text-to-speech (TTS) conversion to voice messages.
- Automated content creation process from structure to subtopics to detailed course content.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory to store your environment variables (e.g., Telegram bot API token, Gemini API key, etc.).

4. Start the bot:
   - For development:
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

## Technologies Used:

- **Grammy**: A powerful Telegram Bot framework for building bots.
- **Gemini AI**: AI service for generating course content.
- **Google TTS**: Converts generated text into voice messages.
- **TypeScript**: The bot is written in TypeScript to provide better code quality and maintainability.
- **Express**: A web framework used for routing and handling HTTP requests.

## Project Structure:

- **`src`**: Contains the source code of the bot.
  - **`controllers`**: Handles interactions with Telegram and processes user input.
  - **`models`**: Contains data structures for the bot (e.g., chat and course models).
  - **`providers`**: External services (e.g., AI and TTS integrations).
  - **`services`**: Business logic for generating courses and interacting with APIs.
  - **`utils`**: Utility functions (e.g., text escaping, text formatting).
  - **`prompts`**: Holds the prompts sent to Gemini AI to generate course content.
  - **`config`**: Configuration files for the bot and services.
- **`public`**: Public files (e.g., media files like `audio.mp3`).
- **`server.ts`**: Main entry point for starting the bot server.

## Dependencies:

- **Grammy**: Telegram bot framework.
- **Google TTS API**: Converts text into speech.
- **dotenv**: Manages environment variables.
- **express**: Web framework for handling HTTP requests.
- **@google/generative-ai**: Gemini AI API for course content generation.

## Example Workflow:

1. The user starts a conversation with the bot and specifies the topic for the course.
2. The bot generates a course structure and breaks it into subtopics.
3. The bot generates content for each subtopic.
4. The generated content is converted to speech and sent as a voice message to the user.

## Development Scripts:

- `npm run build`: Compiles the TypeScript code into JavaScript.
- `npm run start`: Starts the application in production mode.
- `npm run dev`: Starts the application in development mode with hot-reloading.

## License:

This project is licensed under the ISC License.
