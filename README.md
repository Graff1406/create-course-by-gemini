# init-bot-with-gemini

A TypeScript-based bot framework integrating AI capabilities with modern development tools. This project serves as a foundation for building intelligent bots using technologies like [Grammy](https://grammy.dev) and Google's Generative AI API.

---

## Features

- **TypeScript Support**: Leverages strong typing for robust and maintainable code.
- **AI Integration**: Integrates with Google's Generative AI via `@google/generative-ai` package.
- **Modular Structure**: Organized file system for better scalability and maintainability.
- **Development Tools**:
  - Live reload using `nodemon`
  - Path aliasing with `module-alias` and `tsconfig-paths`
  - Pre-configured ESLint and Prettier for code quality

---

## Getting Started

### Prerequisites

- Node.js >= 16.0
- npm or yarn installed
- A Google Generative AI API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/init-bot-with-gemini.git
   cd init-bot-with-gemini
   ```
2. Install dependencies of the project:

   ```
   npm install
   ```

3. Command for the build of the project:

   ```
   npm build
   ```
4. Kickstart the project by launching it on your local server!:

   ```
   npm dev
   ```

**Create a .env.local file to store environment variables. Add your Google API key and Telegram Bot token:**

`
- GOOGLE_API_KEY=your-google-api-key
- GOOGLE_API_KEY=your-telegram-bot-token
`


## Project Structure

**The project is organized into various directories for better modularization and scalability:**

`src/

- ├── config/ # Environment and configuration files
- ├── controllers/ # Handlers for bot commands and messages
- ├── models/ # TypeScript models and schemas
- ├── modules/ # Modularized features and utilities
- ├── providers/ # Services and API integrations
- ├── services/ # Business logic and AI integrations
- │ ├── generates/ # Text generation logic (e.g.,`generateText.ts`)
- ├── utils/ # Helper functions and shared utilities
- ├── index.ts # Application entry point
  `

## Path Aliases

**To simplify imports, the following path aliases are configured in tsconfig.json and \_moduleAliases:**
`

- @config → src/config
- @controllers → src/controllers
- @models → src/models
- @modules → src/modules
- @providers → src/providers
- @services → src/services
- @utils → src/utils
- `import { generateText } from "@services/generates/generateText";`
  `
