// jest.config.mjs
import nextJest from "next/jest.js";

// 1. Configuração básica do Next.js para Jest
const createJestConfig = nextJest({
  dir: "./", // Diretório base do Next.js
});

// 2. Configurações personalizadas do Jest
const customJestConfig = {
  testEnvironment: "jsdom", // Ambiente de teste para componentes web
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Arquivo de setup
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Mapeamento de aliases (se usar TypeScript/JavaScript com aliases)
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"], // Ignorar pastas
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }], // Configuração do Babel
  },
  moduleDirectories: ["node_modules", "<rootDir>"], // Diretórios para resolver módulos
  testTimeout: 60000, // Tempo limite dos testes
};

// 3. Exportar a configuração combinada
export default createJestConfig({
  testEnvironment: "jest-environment-jsdom", // Nome completo do pacote
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
});
