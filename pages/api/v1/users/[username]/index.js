// pages/api/v1/users/[username]/index.js

import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import user from "models/user.js";
import auth from "middleware/auth"; // Assumindo que você usa este middleware

const router = createRouter();

// 1. GET para buscar o perfil (sem autenticação)
router.get(getHandler);

// 2. PATCH para atualizar o perfil (necessita de autenticação)
// O middleware 'auth.withSession' garante que você tenha um usuário logado
router.patch(auth.withSession(patchHandler));

export default router.handler(controller.errorHandlers);

// --- HANDLERS ---

async function getHandler(request, response) {
  // A rota é /api/v1/users/[username], então o username está em request.query
  const { username } = request.query;

  const foundUser = await user.findOne("username", username);

  if (!foundUser) {
    return response.status(404).json({
      name: "NotFoundError",
      message: "Usuário não encontrado.",
      action: "Verifique se o nome de usuário está correto.",
      status_code: 404,
    });
  }

  // Retorna apenas os dados públicos do usuário
  return response.status(200).json(foundUser);
}

async function patchHandler(request, response) {
  // Este handler só é executado se 'auth.withSession' validar o usuário
  const userToUpdate = request.user; // O usuário autenticado
  const updateData = request.body;

  // Implementação da lógica de validação e atualização do usuário aqui.
  // ... Seu código de validação e atualização deve vir aqui ...

  // Se o usuário não for o dono do perfil que está sendo atualizado, retorne 403.
  if (userToUpdate.username !== request.query.username) {
    return response.status(403).json({
      name: "ForbiddenError",
      message: "Você não tem permissão para atualizar este perfil.",
      status_code: 403,
    });
  }

  const updatedUser = await user.update(userToUpdate.id, updateData);

  // Retorna 200 OK com os dados atualizados
  return response.status(200).json(updatedUser);
}
