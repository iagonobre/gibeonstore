const { Router } = require('express');
const produtoService = require('../../service/produtoService');

const router = Router();

router.post('/produto', (req, res) => {
  const produto = produtoService.cadastrarProduto(req.body ?? {});
  res.status(201).json(produto);
});

router.get('/produto/:codigo/estoque', (req, res) => {
  const resultado = produtoService.consultarEstoque(Number(req.params.codigo));
  res.status(200).json(resultado);
});

module.exports = router;
