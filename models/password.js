// models/password.js
import bcryptjs from "bcryptjs";

function getNumberOfRounds() {
  // Você precisa garantir que esta função esteja definida ou seja importada.
  // Por exemplo, pode ser uma variável de ambiente ou uma constante.
  return parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
}

export async function hash(password) {
  // <-- Adicione 'export' aqui!
  const rounds = getNumberOfRounds();
  return await bcryptjs.hash(password, rounds);
}

// Se você tiver uma função para comparar, também a exporte:
// export async function compare(password, hash) {
//   return await bcryptjs.compare(password, hash);
// }
