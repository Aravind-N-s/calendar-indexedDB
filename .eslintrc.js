module.exports = {
  env: {
    browser: true,
    es2021: true,
    "cypress/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:cypress/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "cypress"],
  rules: {
    "@typescript-eslint/ban-ts-comment": 0,
    "operator-linebreak": ["error", "before", { overrides: { "=": "after" } }],
    indent: ["error", "tab"],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double", { avoidEscape: true }],
    semi: ["error", "always"],
    "no-console": 1,
  },
};
