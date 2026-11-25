// Converte o texto do input: vazio → undefined (campo omitido); número válido → Number;
// qualquer outra coisa → envia o texto como veio, para a API devolver 400.
function lerNumero(valor) {
  const texto = valor.trim();
  if (texto === '') return undefined;
  const numero = Number(texto);
  return Number.isNaN(numero) ? texto : numero;
}

async function chamarApi(metodo, caminho, corpo) {
  const opcoes = { method: metodo, headers: { 'Content-Type': 'application/json' } };
  if (corpo !== undefined) opcoes.body = JSON.stringify(corpo);
  const resposta = await fetch(caminho, opcoes);
  const dados = await resposta.json().catch(() => null);
  mostrarResultado(`${metodo} ${caminho} → ${resposta.status}`, dados);
}

function mostrarResultado(titulo, dados) {
  document.getElementById('resultado').textContent = `${titulo}\n${JSON.stringify(dados, null, 2)}`;
}

document.getElementById('form-cadastrar').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  chamarApi('POST', '/loja/produto', {
    codigo: lerNumero(form.codigo.value),
    preco: lerNumero(form.preco.value),
  });
});

document.getElementById('form-consultar').addEventListener('submit', (event) => {
  event.preventDefault();
  const codigo = encodeURIComponent(event.target.codigo.value.trim());
  chamarApi('GET', `/loja/produto/${codigo}/estoque`);
});
