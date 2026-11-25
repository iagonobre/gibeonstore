class AppError extends Error {
  constructor(status, mensagem) {
    super(mensagem);
    this.name = 'AppError';
    this.status = status;
  }
}

const badRequest = (mensagem = 'Requisição inválida') => new AppError(400, mensagem);
const notFound = (mensagem = 'Produto não encontrado') => new AppError(404, mensagem);
const conflict = (mensagem = 'Conflito') => new AppError(409, mensagem);

module.exports = { AppError, badRequest, notFound, conflict };
