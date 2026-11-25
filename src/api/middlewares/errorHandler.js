const { AppError } = require('../../errors/AppError');

function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ erro: err.message });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido' });
  }
  console.error(err);
  return res.status(500).json({ erro: 'Erro interno' });
}

module.exports = errorHandler;
