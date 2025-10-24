import session from "models/session"; // Ajuste o caminho conforme a sua estrutura de pastas
import { UnauthorizedError } from "infra/errors";
import { default as handler } from "pages/api/v1/sessions"; // Importa o handler principal para usar o 'POST'

/**
 * Funções que implementam a lógica para cada método HTTP.
 * O método DELETE realiza o LOGOUT (expirar a sessão).
 */

async function handleDELETE(request, response) {
  // 1. Pegar o token da sessão a partir do cookie (ou header de Autorização)
  const sessionToken = request.cookies.session_token; // Assumindo que o token está no cookie

  if (!sessionToken) {
    // Se não há token, o usuário já está deslogado ou a requisição é inválida.
    // Retornamos 401 para atender aos casos de teste 'nonexistent session' e 'expired session'.
    throw new UnauthorizedError({
      message: "Não foi encontrado um token de sessão válido.",
      action: "Por favor, faça login novamente.",
    });
  }

  // 2. Encontrar a sessão para obter o ID (necessário para expireById)
  // Nota: findOneValidByToken lançará UnauthorizedError se a sessão for inválida/expirada,
  // o que nos dará o status 401 esperado para o teste 'expired session'.
  let sessionObject;
  try {
    sessionObject = await session.findOneValidByToken(sessionToken);
  } catch (error) {
    // Se o findOneValidByToken falhar (ex: UnauthorizedError), retorna a falha (401)
    throw error;
  }

  // 3. Expirar a sessão
  await session.expireById(sessionObject.id);

  // 4. Limpar o cookie no navegador para completar o logout
  response.setHeader(
    "Set-Cookie",
    `session_token=deleted; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`,
  );

  // 5. Retornar 200 OK para o logout bem-sucedido
  return response
    .status(200)
    .json({ message: "Logout realizado com sucesso." });
}

export default async function sessionsHandler(request, response) {
  try {
    // Roteamento dos métodos HTTP
    switch (request.method) {
      case "POST":
        // Supondo que você já tem o POST (login) implementado
        return handler.handlePOST(request, response);

      case "DELETE":
        // Chama a nova função para DELETE (logout)
        return await handleDELETE(request, response);

      default:
        // Retorna 405 se o método não for POST nem DELETE
        response.setHeader("Allow", ["POST", "DELETE"]);
        return response.status(405).end(`Method ${request.method} Not Allowed`);
    }
  } catch (error) {
    // Lógica para tratamento de erros
    if (error instanceof UnauthorizedError) {
      return response.status(401).json({
        error: { message: error.message, action: error.action },
      });
    }

    // Erros internos
    console.error(error);
    return response.status(500).json({
      error: {
        message: "Ocorreu um erro interno no servidor.",
        action: "Tente novamente mais tarde.",
      },
    });
  }
}
