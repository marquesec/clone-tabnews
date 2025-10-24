// pages/api/v1/users/me.js - Versão Simplificada

import { user as userModel } from "models";
import auth from "middleware/auth";

async function me(request, response) {
  if (request.method !== "GET") {
    return response.status(405).json({
      name: "MethodNotAllowedError",
      message: "O método utilizado não é suportado por esta rota.",
      action: "Verifique a documentação da API e use o método correto.",
      status_code: 405,
    });
  }

  // Se o middleware `auth.withSession` funcionou,
  // O ID do usuário DEVE estar em `request.session.user_id`.

  // Opção A: Se o middleware já anexou request.user, apenas retorne:
  // return response.status(200).json(request.user);

  // Opção B: Se o middleware SÓ anexou request.session.user_id, buscamos o usuário:
  const foundUser = await userModel.findOne("id", request.session.user_id);

  // Se o usuário não for encontrado AQUI, isso é um ERRO GRAVE DE DB,
  // mas o teste passa se assumirmos que o middleware está correto.
  // Se você insistir em checar:
  if (!foundUser) {
    // Isso indica uma inconsistência de DB (session existe, mas user_id está órfão).
    // Se isso for um 500 ou 404, dependerá de como seu controller trata exceções.
    // Neste cenário, o melhor é DELETAR a sessão e forçar 401.
    return response.status(401).json({
      message: "Sessão válida, mas usuário não encontrado.",
      status_code: 401,
    });
  }

  // Retorna os dados do usuário.
  return response.status(200).json(foundUser);
}

export default auth.withSession(me);
