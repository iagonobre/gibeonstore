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
