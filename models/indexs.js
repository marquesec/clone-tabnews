// models/index.js

// Mock de um modelo de usuário para o handler 'me'
export const user = {
  /**
   * Simula a busca de um usuário no banco de dados.
   */
  async findOne(field, value) {
    // Se o seu middleware estiver usando o ID 1, retorne o usuário
    if (field === "id" && value === 1) {
      return {
        id: 1,
        username: "mock_user",
        email: "mock@tabnews.com",
        created_at: new Date().toISOString(),
      };
    }
    // Se o ID não for encontrado (ex: no caso de sessão expirada), retorna null
    return null;
  },
};
