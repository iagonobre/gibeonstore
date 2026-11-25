# GibeonStore

Sistema de controle de produtos e estoque de uma loja virtual, desenvolvido na disciplina
**DIM0517 – Gerência de Configuração e Mudanças** (UFRN).

O sistema tem cinco operações: cadastrar produto, consultar estoque, entrada de estoque, saída de
estoque e venda. Elas são expostas por uma API REST e podem ser usadas por uma página web simples.

## Equipe

- Iago
- Liriel

## Requisitos

- [Node.js](https://nodejs.org/) **20 ou superior** (inclui o `npm`)
- Git

## Instalação

```bash
git clone https://github.com/iagonobre/gibeonstore.git
cd gibeonstore
npm install
```

## Execução

```bash
npm start
```

O servidor sobe em `http://localhost:3000` e mostra no terminal:

```
GibeonStore rodando em http://localhost:3000
```

Durante o desenvolvimento, use o modo que reinicia o servidor sozinho a cada alteração:

```bash
npm run dev
```

## Variáveis de ambiente

| Variável | Padrão | Descrição |
|---|---|---|
| `PORT` | `3000` | Porta do servidor HTTP |
| `DB_PATH` | `data/loja.db` | Arquivo do banco SQLite. A pasta é criada automaticamente. Use `:memory:` para um banco temporário em memória |

Exemplo:

```bash
PORT=4000 DB_PATH=data/teste.db npm start
```

O banco começa vazio. Para recomeçar do zero, pare o servidor e apague a pasta `data/`.

## Front-end

Com o servidor rodando, abra **http://localhost:3000** no navegador.

A página tem um formulário para cada operação e mostra, a cada envio, o método, o caminho, o status
HTTP e o JSON devolvido pela API.

## API REST

Todas as rotas ficam sob `/loja`, recebem e devolvem JSON (`Content-Type: application/json`).

- `codigo`, `quantidade` e `estoque` são **inteiros positivos** (`estoque` pode ser 0).
- `preco` é um **número positivo** (ex.: `59.90`).
- Números precisam ser enviados como número no JSON: `"10"` (texto) é rejeitado.

| Operação | Método e caminho | Corpo da requisição | Sucesso | Erros |
|---|---|---|---|---|
| Cadastrar produto | `POST /loja/produto` | `{"codigo": 123, "preco": 59.90}` | `201` `{"codigo": 123, "preco": 59.9, "estoque": 0}` | 400, 409 |
| Consultar estoque | `GET /loja/produto/{codigo}/estoque` | — | `200` `{"codigo": 123, "estoque": 15}` | 400, 404 |
| Entrada de estoque | `PUT /loja/produto/{codigo}/entrada` | `{"quantidade": 10}` | `200` `{"codigo": 123, "estoque": 25}` | 400, 404 |
| Saída de estoque | `PUT /loja/produto/{codigo}/saida` | `{"quantidade": 10}` | `200` `{"codigo": 123, "estoque": 5}` | 400, 404, 409 |
| Venda | `POST /loja/venda` | `{"itens": [{"codigo": 123, "quantidade": 2}]}` | `201` com total e itens | 400, 404, 409 |

### Venda

A venda recebe uma lista de itens, dá baixa no estoque de cada produto e calcula o valor:

- `subtotal` = preço × quantidade de cada item; `total` = soma dos subtotais (2 casas decimais).
- `estoque` de cada item é o estoque **depois** da baixa. Os itens voltam na mesma ordem do pedido.
- É **atômica**: se qualquer item for inválido, nenhum estoque é alterado.

### Erros

Toda resposta de erro tem o formato `{ "erro": "<mensagem>" }`. Quando a operação falha, nenhum estoque
é alterado.

| Status | Quando | Exemplo de mensagem |
|---|---|---|
| `400 Bad Request` | Campo ausente, com tipo ou valor inválido, lista de itens vazia ou JSON malformado | `Campo 'quantidade' deve ser um número inteiro positivo` |
| `404 Not Found` | O produto informado não existe | `Produto 777 não encontrado` |
| `409 Conflict` | Código já cadastrado ou estoque insuficiente | `Estoque insuficiente para o produto 123` |

Se houver mais de um problema, vale a ordem 400 → 404 → 409.

### Exemplos com `curl`

Com o servidor rodando e o banco vazio, execute na ordem:

```bash
H='Content-Type: application/json'

# Cadastrar dois produtos
curl -X POST localhost:3000/loja/produto -H "$H" -d '{"codigo": 123, "preco": 59.90}'
curl -X POST localhost:3000/loja/produto -H "$H" -d '{"codigo": 456, "preco": 69.90}'

# Entrada de estoque
curl -X PUT localhost:3000/loja/produto/123/entrada -H "$H" -d '{"quantidade": 15}'
curl -X PUT localhost:3000/loja/produto/456/entrada -H "$H" -d '{"quantidade": 8}'

# Venda: total 189.7, estoques 13 e 7
curl -X POST localhost:3000/loja/venda -H "$H" \
  -d '{"itens": [{"codigo": 123, "quantidade": 2}, {"codigo": 456, "quantidade": 1}]}'

# Saída de estoque: 123 fica com 3
curl -X PUT localhost:3000/loja/produto/123/saida -H "$H" -d '{"quantidade": 10}'

# Consultar estoque
curl localhost:3000/loja/produto/123/estoque

# Erros: 409 (estoque insuficiente) e 404 (produto inexistente)
curl -X PUT localhost:3000/loja/produto/123/saida -H "$H" -d '{"quantidade": 999}'
curl localhost:3000/loja/produto/777/estoque
```

Use `curl -i` para ver também o status HTTP.

## Arquitetura

O sistema é dividido em três camadas. Cada camada só conhece a camada logo abaixo:

```
frontend/  ──fetch──►  src/api/  ──chama──►  src/service/  ──usa──►  src/db/
(HTML/JS)              (rotas Express)       (regras de negócio)     (SQLite)
```

| Camada | Responsabilidade |
|---|---|
| **Front-end** (`frontend/`) | Página web em HTML, CSS e JavaScript puro. Só chama a API |
| **API** (`src/api/`) | Rotas Express. Lê a requisição, chama o serviço e devolve o JSON. Não tem regra de negócio |
| **Serviço** (`src/service/`) | Todas as validações e regras de negócio. Independe do Express e pode ser chamado direto, sem a API |
| **Banco** (`src/db/`) | Conexão SQLite e acesso à tabela `produto` |

Exemplo de uso direto da camada de serviço (útil para testes):

```js
const produtoService = require('./src/service/produtoService');
produtoService.cadastrarProduto({ codigo: 1, preco: 10.5 });
```

### Estrutura de pastas

```
gibeonstore/
├── .github/                 templates de issue e pull request
├── frontend/                página web (index.html, app.js, style.css)
├── src/
│   ├── server.js            sobe o servidor (app.listen)
│   ├── app.js               cria o app Express (rotas, front-end e tratamento de erros)
│   ├── config.js            PORT e DB_PATH
│   ├── api/
│   │   ├── routes/          produtoRoutes, estoqueRoutes, vendaRoutes
│   │   └── middlewares/     errorHandler (único lugar que gera respostas de erro)
│   ├── service/             produtoService, estoqueService, vendaService
│   ├── db/                  connection, produtoRepository
│   ├── errors/              AppError (400, 404, 409)
│   ├── validation/          validadores de campos
│   └── utils/               arredondamento de valores em dinheiro
├── data/                    banco SQLite (criado ao rodar; fora do Git)
└── package.json
```
