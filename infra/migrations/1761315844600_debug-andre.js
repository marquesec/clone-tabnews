/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
// CORREÇÃO: Removendo o argumento 'pgm' completamente se ele não for usado.
exports.up = () => {};

/**
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
// CORREÇÃO: Removendo o argumento 'pgm' completamente se ele não for usado.
exports.down = () => {};
