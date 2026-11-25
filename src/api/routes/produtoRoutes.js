const { Router } = require('express');
const produtoService = require('../../service/produtoService');

const router = Router();

router.post('/produto', (req, res) => {
  const produto = produtoService.cadastrarProduto(req.body ?? {});
  res.status(201).json(produto);
});

module.exports = router;
