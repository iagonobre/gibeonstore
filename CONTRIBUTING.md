# Como contribuir

Este projeto segue o modelo **GitFlow**. Toda mudança começa com uma issue, é feita numa branch
própria e entra no código por Pull Request revisado.

```
Issue #7 ──► branch feature/7-venda ──► commits "Refs #7" ──► PR "Closes #7" ──► merge em develop
```

## Branches

| Branch | Sai de | Volta para | Uso |
|---|---|---|---|
| `main` | — | — | Código em produção. Só recebe merge de `release/*` ou `hotfix/*` |
| `develop` | `main` | — | Integração das funcionalidades. É a branch padrão do repositório |
| `feature/<issue>-<slug>` | `develop` | `develop` | Nova funcionalidade, configuração ou documentação |
| `release/<versão>` | `develop` | `main` e `develop` | Estabilização de uma versão. Não recebe funcionalidades novas |
| `bugfix/<issue>-<slug>` | `release/<versão>` | `release/<versão>` | Correção de bug encontrado durante a estabilização |
| `hotfix/<issue>-<slug>` | `main` | `main` e `develop` | Correção urgente em produção |

- `<issue>` é o número da issue no GitHub (obrigatório). `<slug>` usa letras minúsculas e hífens,
  sem acento. Exemplo: `feature/7-venda`.
- Baselines de teste são marcadas com tags `rc-X.Y` (*release candidate*) na branch de release:
  `rc-1.1`, `rc-1.2`... Versões de produção recebem a tag `vX.Y`.

## Regras

1. **Toda branch auxiliar está ligada a uma issue**, com o número no nome. Não crie branch sem issue.
2. **Nunca apague branches**, nem as auxiliares, nem depois do merge. Não use "Delete branch" no PR.
3. **Nunca faça commit direto** em `main`, `develop` ou `release/*`. Tudo entra por Pull Request.
4. **Todo PR é revisado** por outra pessoa da equipe e aprovado antes do merge.
5. **O merge é sempre um merge commit** ("Create a merge commit"). Sem squash e sem rebase.
6. **Nunca use `git push --force`** em branch compartilhada.
7. Não versione `node_modules/`, `data/` nem arquivos `*.db`.

## Commits

Formato ([Conventional Commits](https://www.conventionalcommits.org/)):

```
<tipo>(<escopo>): <descrição no imperativo, em minúsculas, sem ponto final>

Refs #<issue>
```

| Tipo | Quando usar |
|---|---|
| `feat` | Funcionalidade nova |
| `fix` | Correção de bug |
| `docs` | Documentação (README, CONTRIBUTING, CHANGELOG) |
| `chore` | Configuração, dependências, versão |
| `refactor` | Mudança interna sem alterar o comportamento |
| `test` | Testes |
| `ci` | Pipelines |

O escopo é opcional e indica a parte do sistema: `service`, `api`, `db`, `frontend`, `github`, `release`...

```bash
git add src/service/estoqueService.js
git commit -m "feat(service): adiciona entrada de estoque" -m "Refs #5"
```

- Um bloco lógico por commit. Adicione os arquivos explicitamente (`git add <arquivos>`), evitando `git add .`.
- O projeto precisa continuar funcionando a cada commit (`npm start` sobe sem erro).
- Cada pessoa faz commit com a própria identidade do GitHub (`git config user.name` e `user.email`).

## Fluxo de uma funcionalidade

```bash
# 1. Partir do develop atualizado
git checkout develop
git pull origin develop

# 2. Criar a branch da issue
git checkout -b feature/5-entrada-estoque

# 3. Fazer os commits
git add <arquivos>
git commit -m "feat(service): adiciona entrada de estoque" -m "Refs #5"

# 4. Trazer o que entrou em develop e resolver conflitos localmente
git fetch origin
git merge origin/develop

# 5. Publicar e abrir o Pull Request para develop
git push -u origin feature/5-entrada-estoque
gh pr create --base develop --title "feat: Entrada de Estoque (#5)" --body "Closes #5"
```

## Pull Requests

- **Base:** `develop` para funcionalidades; `release/<versão>` para correções de bug da estabilização.
- **Título:** `<tipo>: <Nome da tarefa> (#<issue>)`. Exemplo: `feat: Venda (#7)`.
- **Corpo:** preencha o template do repositório e inclua `Closes #<issue>`, para a issue fechar no merge.
- **Revisão:** marque outra pessoa da equipe como reviewer. Ela confere os critérios de aceite e
  aprova (*Review changes → Approve*) ou pede ajustes.
- **Ajustes** viram novos commits na mesma branch, sem reescrever o histórico.
- **Merge:** só depois da aprovação, com **Create a merge commit**, sem apagar a branch.

```bash
gh pr merge <numero> --merge
```

## Como reportar um bug (estabilização)

1. Abra uma issue com o template **Bug**, informando a versão ou tag afetada (ex.: `rc-1.1`), os passos
   para reproduzir, o resultado esperado e o obtido.
2. Crie a branch `bugfix/<issue>-<slug>` a partir de `release/<versão>`:
   ```bash
   git checkout release/1.0 && git pull
   git checkout -b bugfix/21-saida-com-estoque-zero
   ```
3. Corrija com commits `fix(...)` e `Refs #<issue>`.
4. Abra o PR com base em `release/<versão>` e `Closes #<issue>` no corpo.
5. Como `release/*` não é a branch padrão, a issue **não fecha sozinha**: feche-a manualmente após o
   merge, com um comentário apontando o PR.
6. Cada rodada de correções gera uma nova baseline: `rc-1.2`, `rc-1.3`...
