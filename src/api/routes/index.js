const { Router } = require('express');

const router = Router();

router.use(require('./produtoRoutes'));
router.use(require('./estoqueRoutes'));
router.use(require('./vendaRoutes'));

module.exports = router;
