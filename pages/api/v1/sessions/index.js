import { createRouter } from "next-connect";
import * as cookie from "cookie";
import controller from "infra/controller.js";
import authentication from "models/authentication.js";
import session from "models/session.js";
import { UnauthorizedError } from "infra/errors"; // 👈 Import necessário para o DELETE

const router = createRouter();

// --- ROTEAMENTO ---
router.post(postHandler);
router.delete(deleteHandler); // 👈 Adicionando o roteamento DELETE

export default router.handler(controller.errorHandlers);

// --- HANDLER POST (LOGIN) ---
async function postHandler(request, response) {
  const userInputValues = request.body;

  const authenticatedUser = await authentication.getAuthenticatedUser(
    userInputValues.email,
    userInputValues.password,
  );

  const newSession = await session.create(authenticatedUser.id);

  const setCookie = cookie.serialize("session_id", newSession.token, {
    path: "/",
    maxAge: session.EXPIRATION_IN_MILLISECONDS / 1000,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
  response.setHeader("Set-Cookie", setCookie);

  return response.status(201).json(newSession);
}

// --- HANDLER DELETE (LOGOUT) ---
async function deleteHandler(request, response) {
  // 1. Pegar o token do cookie (o teste de logout vai enviar 'session_id')
  const sessionToken = request.cookies.session_id;

  if (!sessionToken) {
    // Caso de sessão inexistente (Expected: 401)
    throw new UnauthorizedError({
      message: "Usuário não possui sessão ativa.",
      action: "O token de sessão não foi encontrado.",
    });
  }

  // 2. Encontrar e validar a sessão pelo token.
  // Se o token for inválido/expirado, `findOneValidByToken` lançará UnauthorizedError (401),
  // que será capturado pelo `controller.errorHandlers`.
  const sessionObject = await session.findOneValidByToken(sessionToken);

  // 3. Expirar a sessão no banco de dados (logout)
  await session.expireById(sessionObject.id);

  // 4. Limpar o cookie no navegador
  // O nome do cookie deve ser o mesmo usado no login: 'session_id'
  response.setHeader(
    "Set-Cookie",
    cookie.serialize("session_id", "deleted", {
      path: "/",
      maxAge: 0, // Expira imediatamente
      expires: new Date(0), // Data no passado
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    }),
  );

  // 5. Retornar 200 OK (Expected: 200)
  return response.status(200).json({
    message: "Sessão encerrada com sucesso.",
  });
}
