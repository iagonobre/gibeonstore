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
