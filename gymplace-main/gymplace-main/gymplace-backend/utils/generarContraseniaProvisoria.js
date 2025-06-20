export const generarContraseniaProvisoria = () => {
  const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const minusculas = "abcdefghijklmnopqrstuvwxyz";
  const numeros = "0123456789";
  const especiales = "!@#$%&*()-_=+<>?";

  const todos = mayusculas + minusculas + numeros + especiales;
  const caracteres = [];

  // Asegurar al menos uno de cada tipo
  caracteres.push(mayusculas[Math.floor(Math.random() * mayusculas.length)]);
  caracteres.push(numeros[Math.floor(Math.random() * numeros.length)]);
  caracteres.push(especiales[Math.floor(Math.random() * especiales.length)]);

  while (caracteres.length < 8) {
    caracteres.push(todos[Math.floor(Math.random() * todos.length)]);
  }

  return caracteres.sort(() => Math.random() - 0.5).join(""); // Mezclar
};
