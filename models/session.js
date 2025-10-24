async function renew(sessionId) {
  const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS);

  const renewedSessionObject = await runUpdateQuery(sessionId, expiresAt);
  return renewedSessionObject;

  async function runUpdateQuery(sessionId, expiresAt) {
    const results = await database.query({
      text: `
        UPDATE
          sessions
        SET
          expires_at = $2,
          updated_at = NOW()
        WHERE
          id = $1
        RETURNING
          *
        ;`, // Linhas 71 a 82
      values: [sessionId, expiresAt], // Linha 83 (a linha de erro)
    }); // <--- PROVAVELMENTE FALTOU UM FECHAMENTO AQUI

    return results.rows[0];
  }
}
