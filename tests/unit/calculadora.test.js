const calculadora = require("../../models/calculadora");

test("somar 2 + 2 deveria retornar 4", () => {
  const resultado = calculadora.somar(2, 2);
  //se quiser logar console.log(resultado);
  expect(resultado).toBe(4);
});

test("somar 5 + 100 deveria retornar 105", () => {
  const resultado = calculadora.somar(5, 100);
  //se quiser logar console.log(resultado);
  expect(resultado).toBe(105);
});

test("espero que 1 seja 1", () => {
  expect(1).toBe(1);
});

test("somar 'banana' + 100 deveria retornar 'Erro'", () => {
  const resultado = calculadora.somar("banana", 100);
  //se quiser logar console.log(resultado);
  expect(resultado).toBe("Erro");
});
