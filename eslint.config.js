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
    },
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    ignores: ["**/*.config.js"], //  Make sure this matches your .eslintignore or desired ignored files.
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
  },
  {
    plugins: {
      jest: require("eslint-plugin-jest"),
    },
    extends: ["plugin:jest/recommended"],
    files: ["**/*.spec.js", "**/*.test.js"], // Adjust the file pattern for your test files
  },
];
