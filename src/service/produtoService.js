const produtoRepository = require('../db/produtoRepository');
const { conflict } = require('../errors/AppError');
const { requireInteiroPositivo, requireNumeroPositivo } = require('../validation/validators');

function cadastrarProduto({ codigo, preco } = {}) {
  requireInteiroPositivo(codigo, 'codigo');
  requireNumeroPositivo(preco, 'preco');

  if (produtoRepository.buscarPorCodigo(codigo)) {
    throw conflict(`Já existe produto com o código ${codigo}`);
  }

  const produto = produtoRepository.inserir(codigo, preco);
  return { codigo: produto.codigo, preco: produto.preco, estoque: produto.estoque };
}

module.exports = { cadastrarProduto };
