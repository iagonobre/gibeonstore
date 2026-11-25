function arredondar(valor) {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}

module.exports = { arredondar };
