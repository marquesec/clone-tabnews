import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import { UnauthorizedError } from "infra/errors"; // Importe os erros personalizados
import session from "models/session.js";
import user from "models/user.js";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  // 1. Obter o token do cookie
  const sessionToken = request.cookies.session_id;

  // 2. Procurar uma sessão válida pelo token
  const sessionObject = await session.findOneValidByToken(sessionToken);

  // 3. Se a sessão for inválida/inexistente, lançar erro 401
  if (!sessionObject) {
    throw new UnauthorizedError({
      message: "Usuário não possui sessão ativa.",
      action: "Faça o login e tente novamente.",
    });
  }

  // 4. Buscar os dados do usuário usando o user_id da sessão
  const userObject = await user.findById(sessionObject.user_id);

  // 5. Responder com os dados do usuário (200 OK)
  // Certifique-se de que o user.findById ou o userObject retornado está
  // com a senha (password) removida por segurança.
  return response.status(200).json(userObject);
}
