import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import user from "models/user.js";
import session from "models/session";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const sessionToken = request.cookies.session_id;

  // 1. Tenta buscar a sessão
  const sessionObject = await session.findOneValidByToken(sessionToken);

  // 2. Se a sessão não for encontrada ou for inválida, limpa o cookie (correção para o teste)
  if (!sessionObject) {
    response.setHeader(
      "Set-Cookie",
      "session_id=invalid; HttpOnly; Max-Age=-1; Path=/",
    );
    return response.status(401).end();
  }

  // 3. Se chegou aqui, a sessão é válida, então renovamos
  const renewedSessionObject = await session.renew(sessionObject.id);
  controller.setSessionCookie(renewedSessionObject.token, response);

  const userFound = await user.findOneById(sessionObject.user_id);

  response.setHeader(
    "Cache-Control",
    "no-store, no-cache, max-age=0, must-revalidate",
  );

  return response.status(200).json(userFound);
}
