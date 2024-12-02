module.exports = {
  parser: "@typescript-eslint/parser", // Tells ESLint to use the TypeScript parser
  parserOptions: {
    project: "./tsconfig.json", // Tells ESLint about your project's TypeScript configuration
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"], // Use the TypeScript plugin
  extends: [
    "eslint:recommended", // Use recommended ESLint rules
    "plugin:@typescript-eslint/recommended", // Use recommended TypeScript rules
    "plugin:@typescript-eslint/recommended-requiring-type-checking", // Enables type-aware linting
  ],
  rules: {
    // Add any custom rules or override recommended rules here.
  },
};
