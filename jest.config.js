const dotenv = require("dotenv");
dotenv.config({
  path: ".env.development",
});

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: ".",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  // Aumentado de 18000 para 30000 milissegundos (30 segundos)
  testTimeout: 30000, 
});

module.exports = jestConfig;