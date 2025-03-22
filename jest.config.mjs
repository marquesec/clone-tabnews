// jest.config.mjs
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./", // Diretório base do Next.js
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom", // Ambiente de teste para componentes web
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Arquivo de setup
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Mapeamento de aliases (ex.: @/components)
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"], // Ignorar pastas
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }], // Transformação com Babel e preset do Next.js
  },
  moduleDirectories: ["node_modules", "<rootDir>"], // Diretórios para resolver módulos
  testTimeout: 60000, // Tempo limite dos testes (60 segundos)
};

// Exporta a configuração combinada, sobrescrevendo o testTimeout para 40000 ms
export default createJestConfig({
  ...customJestConfig,
  testTimeout: 40000,
});
