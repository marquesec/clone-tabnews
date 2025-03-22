import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  js.configs.recommended,
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      //"eslint:recommended",
      //"plugin:jest/recommended",
      //"next/core-web-vitals"
    },
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    ignores: ["**/*.config.js"], // Substitua pelo seu .eslintignore
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
  },
];
