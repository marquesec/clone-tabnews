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
      // "eslint:recommended",  // No need to include this; it's already in js.configs.recommended.
      // "plugin:jest/recommended", //  Requires installing eslint-plugin-jest and configuring test file patterns.
      // "next/core-web-vitals"    //  Covered by nextPlugin.configs.recommended.rules
    },
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    ignores: ["**/*.config.js"], //  Make sure this matches your .eslintignore or desired ignored files.
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
  },
    If you want to add Jest support, include this:
   {
     plugins: {
       jest: require('eslint-plugin-jest'),
     },
     extends: ['plugin:jest/recommended'],
     files: ["**/*.spec.js", "**/*.test.js"], // Adjust the file pattern for your test files
   },
];
