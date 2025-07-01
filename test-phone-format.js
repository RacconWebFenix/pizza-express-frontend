// Teste simples para verificar a formatação de telefone
function formatPhoneNumber(value) {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "");

  // Aplica a formatação baseada na quantidade de dígitos
  if (numbers.length <= 2) {
    return numbers.length > 0 ? `(${numbers}` : "";
  } else if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  } else if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(
      6
    )}`;
  } else {
    // Suporta tanto 10 quanto 11 dígitos (com 9 na frente)
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
      7,
      11
    )}`;
  }
}

// Testes
console.log("Teste de formatação de telefone:");
console.log('"":', formatPhoneNumber(""));
console.log('"1":', formatPhoneNumber("1"));
console.log('"11":', formatPhoneNumber("11"));
console.log('"119":', formatPhoneNumber("119"));
console.log('"1199":', formatPhoneNumber("1199"));
console.log('"11999":', formatPhoneNumber("11999"));
console.log('"119999":', formatPhoneNumber("119999"));
console.log('"1199999":', formatPhoneNumber("1199999"));
console.log('"11999999":', formatPhoneNumber("11999999"));
console.log('"119999999":', formatPhoneNumber("119999999"));
console.log('"1199999999":', formatPhoneNumber("1199999999"));
console.log('"11999999999":', formatPhoneNumber("11999999999"));
console.log('"119999999999":', formatPhoneNumber("119999999999"));

// Testes com caracteres especiais
console.log("\nTestes com caracteres especiais:");
console.log('"(11) 99999-9999":', formatPhoneNumber("(11) 99999-9999"));
console.log('"11.99999.9999":', formatPhoneNumber("11.99999.9999"));
console.log('"11-99999-9999":', formatPhoneNumber("11-99999-9999"));
