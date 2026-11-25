const { Router } = require('express');

const router = Router();

router.use(require('./produtoRoutes'));
router.use(require('./estoqueRoutes'));

module.exports = router;
