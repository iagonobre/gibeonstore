const { Router } = require('express');
const estoqueService = require('../../service/estoqueService');

const router = Router();

router.put('/produto/:codigo/entrada', (req, res) => {
  const resultado = estoqueService.entradaEstoque(Number(req.params.codigo), req.body ?? {});
  res.status(200).json(resultado);
});

router.put('/produto/:codigo/saida', (req, res) => {
  const resultado = estoqueService.saidaEstoque(Number(req.params.codigo), req.body ?? {});
  res.status(200).json(resultado);
});

module.exports = router;
