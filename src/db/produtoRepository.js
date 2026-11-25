const db = require('./connection');

const sqlBuscar = db.prepare('SELECT codigo, preco, estoque FROM produto WHERE codigo = ?');
const sqlInserir = db.prepare('INSERT INTO produto (codigo, preco, estoque) VALUES (?, ?, 0)');
const sqlAtualizarEstoque = db.prepare('UPDATE produto SET estoque = ? WHERE codigo = ?');

function buscarPorCodigo(codigo) {
  return sqlBuscar.get(codigo) ?? null;
}

function inserir(codigo, preco) {
  sqlInserir.run(codigo, preco);
  return buscarPorCodigo(codigo);
}

function atualizarEstoque(codigo, estoque) {
  sqlAtualizarEstoque.run(estoque, codigo);
  return buscarPorCodigo(codigo);
}

function emTransacao(fn) {
  return db.transaction(fn)();
}

module.exports = { buscarPorCodigo, inserir, atualizarEstoque, emTransacao };
