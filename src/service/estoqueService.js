const produtoRepository = require('../db/produtoRepository');
const { requireInteiroPositivo, requireProduto } = require('../validation/validators');

function entradaEstoque(codigo, { quantidade } = {}) {
  requireInteiroPositivo(codigo, 'codigo');
  requireInteiroPositivo(quantidade, 'quantidade');
  const produto = requireProduto(produtoRepository.buscarPorCodigo(codigo), codigo);

  const atualizado = produtoRepository.atualizarEstoque(codigo, produto.estoque + quantidade);
  return { codigo: atualizado.codigo, estoque: atualizado.estoque };
}

module.exports = { entradaEstoque };
