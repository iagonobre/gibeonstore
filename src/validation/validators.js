const { badRequest, notFound } = require('../errors/AppError');

function requireInteiroPositivo(valor, campo) {
  if (valor === undefined || valor === null) {
    throw badRequest(`Campo '${campo}' é obrigatório`);
  }
  if (typeof valor !== 'number' || !Number.isInteger(valor) || valor <= 0) {
    throw badRequest(`Campo '${campo}' deve ser um número inteiro positivo`);
  }
  return valor;
}

function requireNumeroPositivo(valor, campo) {
  if (valor === undefined || valor === null) {
    throw badRequest(`Campo '${campo}' é obrigatório`);
  }
  if (typeof valor !== 'number' || !Number.isFinite(valor) || valor <= 0) {
    throw badRequest(`Campo '${campo}' deve ser um número positivo`);
  }
  return valor;
}

function requireLista(valor, campo) {
  if (!Array.isArray(valor) || valor.length === 0) {
    throw badRequest(`Campo '${campo}' deve ser uma lista não vazia`);
  }
  return valor;
}

function requireProduto(produto, codigo) {
  if (!produto) {
    throw notFound(`Produto ${codigo} não encontrado`);
  }
  return produto;
}

module.exports = { requireInteiroPositivo, requireNumeroPositivo, requireLista, requireProduto };
