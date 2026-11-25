const { requireInteiroPositivo, requireLista } = require('../validation/validators');

// Fase 1 (400): valida o formato de TODOS os itens antes de tocar no banco.
function validarItens(itens) {
  requireLista(itens, 'itens');
  itens.forEach((item, i) => {
    requireInteiroPositivo(item?.codigo, `itens[${i}].codigo`);
    requireInteiroPositivo(item?.quantidade, `itens[${i}].quantidade`);
  });
  return itens;
}

module.exports = { validarItens };
