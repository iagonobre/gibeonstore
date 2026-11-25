const produtoRepository = require('../db/produtoRepository');
const { conflict } = require('../errors/AppError');
const { requireInteiroPositivo, requireLista, requireProduto } = require('../validation/validators');
const { arredondar } = require('../utils/dinheiro');

// Fase 1 (400): valida o formato de TODOS os itens antes de tocar no banco.
function validarItens(itens) {
  requireLista(itens, 'itens');
  itens.forEach((item, i) => {
    requireInteiroPositivo(item?.codigo, `itens[${i}].codigo`);
    requireInteiroPositivo(item?.quantidade, `itens[${i}].quantidade`);
  });
  return itens;
}

function realizarVenda({ itens } = {}) {
  validarItens(itens);

  return produtoRepository.emTransacao(() => {
    // Fase 2 (404): todos os produtos precisam existir antes de qualquer baixa.
    itens.forEach((item) => requireProduto(produtoRepository.buscarPorCodigo(item.codigo), item.codigo));

    // Fase 3 (409 + baixa): item a item, relendo o produto (códigos repetidos acumulam a baixa).
    const itensVendidos = itens.map((item) => {
      const produto = produtoRepository.buscarPorCodigo(item.codigo);
      if (item.quantidade > produto.estoque) {
        throw conflict(`Estoque insuficiente para o produto ${item.codigo}`);
      }
      const atualizado = produtoRepository.atualizarEstoque(item.codigo, produto.estoque - item.quantidade);
      return {
        codigo: item.codigo,
        quantidade: item.quantidade,
        subtotal: arredondar(produto.preco * item.quantidade),
        estoque: atualizado.estoque,
      };
    });

    const total = arredondar(itensVendidos.reduce((soma, item) => soma + item.subtotal, 0));
    return { total, itens: itensVendidos };
  });
}

module.exports = { validarItens, realizarVenda };
