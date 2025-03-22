import { jest } from "@jest/globals";
import orchestrator from "../../../../../tests/orchestrator";

beforeAll(async () => {
  jest.setTimeout(10000);
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.waitForAllServices();
}, 30000);

describe("GET /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retrieving pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);
    });
  });
});
