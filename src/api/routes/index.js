const { Router } = require('express');

const router = Router();

router.use(require('./produtoRoutes'));

module.exports = router;
