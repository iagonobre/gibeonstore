const { Router } = require('express');
const vendaService = require('../../service/vendaService');

const router = Router();

router.post('/venda', (req, res) => {
  const venda = vendaService.realizarVenda(req.body ?? {});
  res.status(201).json(venda);
});

module.exports = router;
