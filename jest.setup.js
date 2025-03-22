// jest.setup.js
import "@testing-library/jest-dom";
import { TextEncoder } from "util";

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}

export default {
  extensionsToTreatAsEsm: [".js"], // Trata arquivos .js como ESM
  testEnvironment: "node", // Ambiente de testes (Node.js)
  transform: {}, // Desativa transformações padrão
};
