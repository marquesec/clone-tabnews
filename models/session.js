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
;`,
      values: [sessionId, expiresAt],
    }); // <-- Correção: Adicionados o '}' e o ')' faltantes.

    return results.rows[0];
  }
}
