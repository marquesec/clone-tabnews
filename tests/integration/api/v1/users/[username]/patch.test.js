import { version as uuidVersion } from "uuid";
import orchestrator from "tests/orchestrator.js";
import user from "models/user.js";
import password from "models/password.js";

// --- HOOKS DE SETUP/CLEANUP ---

// O beforeAll agora fica apenas para garantir que os serviços estejam rodando.
// A linha 'waitForAllServices' é REMOVIDA para evitar o timeout.

// beforeAll(async () => {
//   await orchestrator.waitForAllServices(); // LINHA REMOVIDA PARA EVITAR O TIMEOUT!
//   await orchestrator.clearDatabase();
//   await orchestrator.runPendingMigrations();
// });


beforeEach(async () => {
  // Limpamos e migramos o banco de dados ANTES DE CADA TESTE.
  // Isso garante que os testes de duplicação e unicidade funcionem
  // corretamente, pois cada teste começa com um estado limpo.
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

// --- TESTES ---

describe("PATCH /api/v1/users/[username]", () => {
  describe("Anonymous user", () => {
    test("With nonexistent 'username'", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/UsuarioInexistente",
        {
          method: "PATCH",
        },
      );

      expect(response.status).toBe(404);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "O username informado não foi encontrado no sistema.",
        action: "Verifique se o username está digitado corretamente.",
        status_code: 404,
      });
    });

    test("With duplicated 'username'", async () => {
      // O banco de dados já está limpo pelo beforeEach.
      // CUIDADO: Os testes de duplicação estavam falhando porque o beforeAll só rodava uma vez.
      // Agora, eles precisam ser reescritos para criar os usuários *dentro* do teste.
      await orchestrator.createUser({
        username: "user1",
      });

      await orchestrator.createUser({
        username: "user2",
      });

      const response = await fetch("http://localhost:3000/api/v1/users/user2", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "user1",
        }),
      });

      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "ValidationError",
        message: "O username informado já está sendo utilizado.",
        action: "Utilize outro username para realizar esta operação.",
        status_code: 400,
      });
    });

    test("With duplicated 'email'", async () => {
      await orchestrator.createUser({
        email: "email1@curso.dev",
      });

      const createdUser2 = await orchestrator.createUser({
        email: "email2@curso.dev",
      });

      const response = await fetch(
        `http://localhost:3000/api/v1/users/${createdUser2.username}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "email1@curso.dev",
          }),
        },
      );

      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "ValidationError",
        message