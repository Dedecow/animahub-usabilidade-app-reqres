# AnimaHub

Dashboard React para gestão de estudantes com integração à API Reqres. A interface inclui diretório acadêmico, CRUD de estudantes, busca local, filtros, ordenação, paginação e uma Central de Atividades em tempo real.

## Executar

```bash
npm install
npm run dev
```

Abra `http://127.0.0.1:5173` no navegador.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor Vite em desenvolvimento |
| `npm run build` | Gera a versão de produção |
| `npm run preview` | Executa a versão de produção localmente |
| `npm run lint` | Verifica o código com Oxlint |
| `npm run test:e2e` | Executa testes E2E de acessibilidade com Playwright e axe |

## Testes E2E de acessibilidade

Instale o navegador Chromium do Playwright uma vez por ambiente:

```bash
npx playwright install chromium
```

Execute a auditoria com o servidor Vite iniciado automaticamente pelos testes:

```bash
npm run test:e2e
```

Os testes usam `@axe-core/playwright` para verificar WCAG 2.0/2.1 A e AA na página inicial, no Modo Leitura, em viewport móvel, na Central de Atividades e com o painel de notificações aberto. Violações fazem o comando terminar com código diferente de zero. O workflow `.github/workflows/accessibility-ci.yml` executa os testes em pushes e pull requests para `main`.

## Funcionalidades

### Diretório acadêmico

- Lista estudantes retornados pela Reqres.
- Cadastra, edita e remove estudantes.
- Busca local por nome, sobrenome ou e-mail.
- Filtra estudantes ativos.
- Ordena por cadastro recente ou ordem alfabética.
- Pagina os resultados em blocos de quatro registros.
- Mostra estados de carregamento, erro e lista vazia.

### Central de Atividades

A Central de Atividades é atualizada sem recarregar a página. Cada operação concluída no diretório gera imediatamente um novo evento:

- Cadastro gera um evento de novo estudante.
- Edição gera um evento de perfil atualizado.
- Exclusão gera um evento de estudante removido.
- Os eventos aparecem no topo da lista assim que a operação termina com sucesso.
- O horário do novo evento é exibido como `Agora`.
- A interface mantém um relógio interno para atualizar o estado de atividade em tempo real.
- Os filtros permitem visualizar todas as atividades, cadastros, atualizações ou sincronizações.

Os eventos iniciais são dados de demonstração da sessão. Como a API Reqres simula operações de criação, edição e exclusão, as alterações ficam refletidas no estado da interface durante a sessão atual.

## Integração com a API

O serviço está em [`src/services/userService.js`](./src/services/userService.js) e usa `fetch`:

| Operação | Método | Endpoint |
| --- | --- | --- |
| Listar estudantes | GET | `/users?page={page}` |
| Consultar estudante | GET | `/users/{id}` |
| Cadastrar estudante | POST | `/users` |
| Atualizar estudante | PUT | `/users/{id}` |
| Excluir estudante | DELETE | `/users/{id}` |

## Arquitetura

- `src/App.jsx`: shell do dashboard, navegação e Central de Atividades.
- `src/features/users/UserHub.jsx`: formulário, diretório e interações do CRUD.
- `src/features/users/hooks/useUsersData.js`: estado dos estudantes e coordenação das operações.
- `src/services/userService.js`: comunicação com a API.
- `src/context/DemoModeContext.jsx`: contexto de modo demonstração.
- `src/App.css` e `src/index.css`: identidade visual, responsividade e animações.

## Validação

```bash
npm run build
npm run lint
npm run test:e2e
```

O lint pode apresentar avisos preexistentes relacionados ao Fast Refresh e ao carregamento inicial via efeito; eles não impedem a execução ou o build.
