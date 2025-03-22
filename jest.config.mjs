// jest.config.mjs
import nextJest from "next/jest.js";

// 1. Configuração básica do Next.js para Jest
const createJestConfig = nextJest({
  dir: "./", // Diretório base do Next.js
});

// 2. Configurações personalizadas do Jest
const customJestConfig = {
  testEnvironment: "jest-environment-jsdom", // Ambiente de teste para componentes web (nome completo)
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

// 3. Exportar a configuração combinada
export default createJestConfig(customJestConfig);
